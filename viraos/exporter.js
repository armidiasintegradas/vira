// ========================================================
// VIRA OS — EXPORTADOR EXECUTIVO MULTIPERFIL (exporter.js)
// Engine 02: Specification & Export Engine
// Perfis Especializados: Licitação (Lei 14.133) • Executivo • Memorial • Cliente • ESG
// ========================================================

class ProjectExporter {
  constructor() {
    this.currentProfile = 'licitacao'; // 'licitacao' | 'executivo' | 'memorial' | 'cliente' | 'esg'
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
          padding: 15mm !important;
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
          <div id="exporter-modal-dialog" class="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[92vh] animate-fadeIn my-auto">
            
            <!-- Barra Superior do Modal com Seleção de Perfil -->
            <div class="px-6 sm:px-8 py-5 border-b border-border-subtle bg-sand flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
              <div>
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Engine 02 • Specification Engine</span>
                  <span class="font-mono text-[10px] text-muted font-bold">VIRA OS Multi-Profile Exporter</span>
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

            <!-- Seletor de Perfis Especializados de Exportação -->
            <div class="px-6 sm:px-8 py-3 bg-surface/60 border-b border-border-subtle flex items-center gap-1 overflow-x-auto no-scrollbar font-mono text-xs no-print">
              <span class="text-muted text-[10px] uppercase font-bold shrink-0 mr-2">Perfil de Emissão:</span>
              <button onclick="window.projectExporter.setProfile('licitacao')" id="exp-prof-licitacao" class="px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shrink-0 bg-white border-forest text-forest shadow-sm">
                ⚖️ Licitação Pública (Lei 14.133)
              </button>
              <button onclick="window.projectExporter.setProfile('executivo')" id="exp-prof-executivo" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 bg-transparent border-transparent text-muted hover:text-graphite">
                📐 Caderno Executivo de Obra
              </button>
              <button onclick="window.projectExporter.setProfile('memorial')" id="exp-prof-memorial" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 bg-transparent border-transparent text-muted hover:text-graphite">
                📋 Memorial Descritivo Síntese
              </button>
              <button onclick="window.projectExporter.setProfile('cliente')" id="exp-prof-cliente" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 bg-transparent border-transparent text-muted hover:text-graphite">
                👔 Apresentação para Cliente / Conselho
              </button>
              <button onclick="window.projectExporter.setProfile('esg')" id="exp-prof-esg" class="px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 bg-transparent border-transparent text-muted hover:text-graphite">
                🌱 Relatório ESG & Descarbonização
              </button>
            </div>

            <!-- Prancha Visual de Visualização de Impressão -->
            <div class="overflow-y-auto p-6 sm:p-10 bg-surface/40">
              <div id="project-exporter-sheet" class="bg-white p-8 sm:p-12 rounded-2xl border border-border-subtle shadow-md max-w-3xl mx-auto text-graphite space-y-8">
                <!-- Conteúdo gerado dinamicamente -->
              </div>
            </div>

            <!-- Rodapé do Modal -->
            <div class="px-6 sm:px-8 py-4 border-t border-border-subtle bg-sand flex items-center justify-between text-xs font-mono text-muted no-print">
              <span id="exporter-compliance-badge" class="flex items-center gap-1.5 text-forest font-semibold">
                <i data-lucide="check-circle" class="w-4 h-4"></i>
                Documento gerado pelo VIRA OS Specification Engine.
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

  setProfile(profileId) {
    this.currentProfile = profileId;
    const profiles = ['licitacao', 'executivo', 'memorial', 'cliente', 'esg'];
    profiles.forEach(p => {
      const btn = document.getElementById(`exp-prof-${p}`);
      if (btn) {
        if (p === profileId) {
          btn.className = 'px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shrink-0 bg-white border-forest text-forest shadow-sm';
        } else {
          btn.className = 'px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 bg-transparent border-transparent text-muted hover:text-graphite';
        }
      }
    });
    this.render();
  }

  render() {
    const sheet = document.getElementById('project-exporter-sheet');
    if (!sheet) return;

    const proj = window.projectEngine ? window.projectEngine.getActiveProject() : null;
    if (!proj) {
      sheet.innerHTML = `<p class="font-sans text-muted text-sm text-center py-10">Nenhum projeto ativo selecionado no momento.</p>`;
      return;
    }

    const totals = window.projectEngine.calculateProjectTotals(proj);
    const tonsPlastic = (totals.totalPlasticKg / 1000).toFixed(1).replace('.', ',');
    const tonsCo2 = (totals.totalCo2MitigatedKg / 1000).toFixed(1).replace('.', ',');

    switch (this.currentProfile) {
      case 'licitacao':
        this.renderLicitacaoProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
        break;
      case 'executivo':
        this.renderExecutivoProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
        break;
      case 'memorial':
        this.renderMemorialProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
        break;
      case 'cliente':
        this.renderClienteProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
        break;
      case 'esg':
        this.renderEsgProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
        break;
      default:
        this.renderLicitacaoProfile(sheet, proj, totals, tonsPlastic, tonsCo2);
    }

    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  renderLicitacaoProfile(sheet, proj, totals, tonsPlastic, tonsCo2) {
    sheet.innerHTML = `
      <div class="border-b-2 border-graphite pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <span class="font-mono text-[10px] text-forest font-bold uppercase tracking-widest block">Caderno Técnico de Licitação Pública • Lei 14.133/2021</span>
          <h1 class="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-graphite mt-1">${proj.name}</h1>
          <p class="font-sans text-xs text-muted mt-1">Órgão Contratante: <strong class="text-graphite">${proj.client}</strong></p>
        </div>
        <div class="font-mono text-right text-xs text-muted shrink-0 space-y-0.5">
          <p class="font-bold text-graphite">${proj.id.toUpperCase()}</p>
          <p>Emissão: ${proj.updatedAt || proj.createdAt}</p>
          <span class="inline-block px-2 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-bold uppercase">${proj.status}</span>
        </div>
      </div>

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

      <div class="space-y-3 font-sans text-xs text-graphite leading-relaxed">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">1. Objeto e Cláusulas de Qualificação Técnica</h2>
        
        <div class="space-y-1">
          <h3 class="font-bold text-graphite">1.1. Critérios de Julgamento e Desenvolvimento Sustentável</h3>
          <p class="text-muted">
            Em observância ao <strong class="text-graphite">Art. 11, inciso IV e Art. 34 da Lei Federal 14.133/2021</strong>, a presente contratação adota critério de mitigação climática e circularidade. Fica admitido o emprego de artefatos de compósito polimérico circular que comprovem inventário de ciclo de vida auditado conforme <strong class="text-graphite">ABNT NBR ISO 14044:2009</strong> com abatimento de carbono mínimo de 2,00 kg CO2e/kg.
          </p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold text-graphite">1.2. Desempenho Mecânico e Resistência à Compressão</h3>
          <p class="text-muted">
            Os blocos de pavimentação intertravada deverão atingir resistência característica à compressão axial estática de <strong class="text-graphite">fck ≥ 35,0 MPa</strong> (NBR 9781:2013), aferida em laboratório acreditado pelo Inmetro (IPT protocolo nº 1.104.921-A ou equivalente).
          </p>
        </div>

        <div class="space-y-1">
          <h3 class="font-bold text-graphite">1.3. Imunidade Salina e Absorção de Água</h3>
          <p class="text-muted">
            A absorção máxima de água por imersão total permitida é de <strong class="text-graphite">0,05%</strong>, sendo terminantemente vedada a entrega de lotes cimentícios convencionais sem aditivação hidro-repelente comprovada.
          </p>
        </div>
      </div>

      <div class="space-y-2">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">2. Quadro Consolidado de Quantitativos e Metas de Descarbonização</h2>
        <div class="grid grid-cols-3 gap-3 font-mono text-xs">
          <div class="p-3 bg-sand rounded-xl text-center">
            <span class="text-[10px] text-muted uppercase block">Área Total</span>
            <span class="font-bold text-graphite text-base">${totals.totalArea.toLocaleString('pt-BR')} m²</span>
          </div>
          <div class="p-3 bg-sand rounded-xl text-center">
            <span class="text-[10px] text-forest font-bold uppercase block">Plástico Regenerado</span>
            <span class="font-bold text-forest text-base">${tonsPlastic} t</span>
          </div>
          <div class="p-3 bg-sand rounded-xl text-center">
            <span class="text-[10px] text-forest font-bold uppercase block">CO2e Evitado</span>
            <span class="font-bold text-forest text-base">${tonsCo2} t</span>
          </div>
        </div>
      <div class="p-3 bg-white border border-border-subtle rounded-xl font-sans text-[11px] text-muted space-y-1">
        <p class="font-bold text-graphite flex items-center gap-1">
          <span>⚖️ Declaração de Governança de Dados Técnicos & Validade Jurídica</span>
        </p>
        <p>• <strong>Dados Homologados:</strong> Resistência mecânica (fck 38,2 MPa), absorção (&lt; 0,05%) e balanço de ACV (-2,15 kg CO2e/kg) são certificados por ensaios acreditados (IPT Relatório nº 1.104.921-A e ABNT NBR 9781:2013).</p>
        <p>• <strong>Dados Paramétricos do Projeto:</strong> As metragens (${totals.totalArea.toLocaleString('pt-BR')} m²), quantitativos e orçamentos deste caderno decorrem de parâmetros inseridos pelo projetista responsável e requerem confirmação topográfica in loco.</p>
      </div>

      <div class="pt-8 border-t border-border-subtle flex justify-between items-end font-sans text-xs">
        <div>
          <p class="font-bold text-graphite">VIRA OS • Sistema Operacional para Engenharia Circular</p>
          <p class="text-muted text-[11px]">Homologação Digital de Conformidade ICP-Brasil</p>
        </div>
        <div class="text-right">
          <div class="w-48 border-b border-graphite mb-1 ml-auto"></div>
          <p class="font-bold text-graphite">${proj.responsible}</p>
          <p class="text-muted text-[11px]">Responsável Técnico pelo Edital</p>
        </div>
      </div>
    `;
  }

  renderExecutivoProfile(sheet, proj, totals, tonsPlastic, tonsCo2) {
    sheet.innerHTML = `
      <div class="border-b-2 border-forest pb-6 flex justify-between items-end">
        <div>
          <span class="font-mono text-[10px] text-forest font-bold uppercase tracking-widest block">Caderno de Encargos Executivo de Canteiro • ABNT NBR 15953</span>
          <h1 class="text-2xl sm:text-3xl font-bold font-sans text-graphite mt-1">${proj.name}</h1>
          <p class="font-sans text-xs text-muted">Diretrizes de Canteiro, Subleito e Assentamento</p>
        </div>
        <div class="font-mono text-right text-xs text-muted">
          <p class="font-bold text-forest">CANTEIRO HOMOLOGADO</p>
          <p>${proj.updatedAt || proj.createdAt}</p>
        </div>
      </div>

      <div class="space-y-4 font-sans text-xs text-graphite leading-relaxed">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">1. Procedimento Estratigráfico Executivo</h2>
        <div class="p-4 bg-sand rounded-xl space-y-2 font-mono text-xs">
          <p>• <strong>Camada 01 (Subleito):</strong> Regularizado e compactado com massa específica aparente seca ≥ 98% do ensaio Proctor Normal.</p>
          <p>• <strong>Camada 02 (Sub-base):</strong> Brita graduada simples (BGS) ou BGT com espessura de 15 cm compactada.</p>
          <p>• <strong>Camada 03 (Colchão de Areia):</strong> Areia média/grossa lavada, espessura uniforme de 3,0 cm a 4,0 cm não compactada antes do assentamento.</p>
          <p>• <strong>Camada 04 (Juntas e Travamento):</strong> Areia fina de sílica (0,075 a 1,2 mm) espalhada e vibrada mecanicamente com placa de rolos de poliuretano.</p>
        </div>

        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">2. Tolerâncias e Critérios de Recebimento</h2>
        <p class="text-muted">
          Conforme a ABNT NBR 15953, a declividade longitudinal mínima aceitável é de 1,5% e transversal de 2,5%. Variações de alinhamento entre blocos vizinhos não poderão ultrapassar ± 2,0 mm sob régua de 3 metros.
        </p>
      </div>

      <div class="space-y-2">
        <h2 class="font-sans text-sm font-bold uppercase tracking-wider text-graphite border-b border-border-subtle pb-1">3. Quadro de Aplicação de Canteiro</h2>
        <table class="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr class="font-mono text-[10px] text-muted uppercase border-b">
              <th class="py-2">Item</th>
              <th class="py-2">Elemento</th>
              <th class="py-2">Aplicação</th>
              <th class="py-2 text-right">Extensão/Área</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            ${proj.items.map((it, idx) => `
              <tr>
                <td class="py-2 font-mono">#0${idx + 1}</td>
                <td class="py-2 font-bold">${it.name}</td>
                <td class="py-2 text-muted">${it.solutionId === 'paver' ? 'Leito viário e passeios' : 'Vedações e decks'}</td>
                <td class="py-2 text-right font-mono font-bold">${it.quantityM2.toLocaleString('pt-BR')} ${it.solutionId === 'perfil' ? 'm' : 'm²'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  renderMemorialProfile(sheet, proj, totals, tonsPlastic, tonsCo2) {
    sheet.innerHTML = `
      <div class="border-b-2 border-graphite pb-4">
        <span class="font-mono text-[10px] text-muted uppercase tracking-widest block">Memorial Descritivo Sintético de Especificação</span>
        <h1 class="text-2xl font-bold font-sans text-graphite mt-1">${proj.name}</h1>
      </div>

      <div class="p-5 bg-sand rounded-xl border border-border-subtle font-sans text-xs leading-relaxed space-y-3">
        <p>
          <strong>ESPECIFICAÇÃO TÉCNICA PADRÃO:</strong> Fornecimento e instalação de pavimento intertravado de alta densidade em compósito circular VIRA (geometria 16 faces autobloqueante), dimensões 200 × 100 × 60 mm, resistência à compressão axial fck ≥ 35,0 MPa (ABNT NBR 9781:2013), taxa de absorção de água &lt; 0,05%, resistência ao escorregamento BPN 68 sob pista molhada (NBR 9050:2020), assentado sobre colchão de areia média de 3 cm e juntas seladas com sílica fina.
        </p>
        <p>
          <strong>DESCARBONIZAÇÃO COMPROVADA:</strong> Produto munido de Passaporte Digital de Produto (DPP) e Análise de Ciclo de Vida auditada (ISO 14044) com mitigação de 2,15 kg CO2e por quilograma de material instalado.
        </p>
      </div>

      <div class="font-mono text-xs text-muted pt-4 border-t flex justify-between">
        <span>Quantitativo Total: ${totals.totalArea.toLocaleString('pt-BR')} m²</span>
        <span>Crédito de CO2e: ${tonsCo2} t</span>
      </div>
    `;
  }

  renderClienteProfile(sheet, proj, totals, tonsPlastic, tonsCo2) {
    sheet.innerHTML = `
      <div class="border-b-2 border-ochre pb-6 flex justify-between items-end">
        <div>
          <span class="font-mono text-[10px] text-ochre font-bold uppercase tracking-widest block">Relatório Executivo para Conselho & Gestor Público</span>
          <h1 class="text-3xl font-bold font-sans text-graphite mt-1">${proj.name}</h1>
          <p class="font-sans text-xs text-muted">Apresentação de Impacto Econômico, Social e Urbano</p>
        </div>
        <div class="font-mono text-right text-xs text-ochre font-bold">
          ESTRATÉGIA DE VALOR
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 font-sans text-xs">
        <div class="p-4 bg-sand rounded-xl space-y-1">
          <span class="font-mono text-[10px] text-muted uppercase block">Economia Operacional (10 Anos)</span>
          <p class="text-xl font-bold text-graphite">32% menor que Concreto</p>
          <p class="text-muted text-[11px]">Zero desagregação de blocos, sem esfarelamento ou necessidade de pintura periódica.</p>
        </div>
        <div class="p-4 bg-sand rounded-xl space-y-1">
          <span class="font-mono text-[10px] text-forest uppercase block">Legado Ambiental Positivo</span>
          <p class="text-xl font-bold text-forest">${tonsPlastic} t de Plástico Retiradas</p>
          <p class="text-muted text-[11px]">Equivalente a milhões de embalagens plásticas regeneradas em infraestrutura pública permanente.</p>
        </div>
      </div>

      <div class="p-5 bg-forest/5 rounded-xl border border-forest/20 font-sans text-xs space-y-2">
        <h3 class="font-bold text-forest">Por que escolher o VIRA OS para esta intervenção urbana?</h3>
        <p class="text-muted leading-relaxed">
          O projeto combina alta resistência para tráfego de pedestres e veículos com conforto térmico superior (índice SRI 42), não retém água da chuva na superfície e é imune a fungos e maresia. O município consolida sua liderança na Agenda 2030 da ONU e nas metas ESG de descarbonização pública.
        </p>
      </div>
    `;
  }

  renderEsgProfile(sheet, proj, totals, tonsPlastic, tonsCo2) {
    sheet.innerHTML = `
      <div class="border-b-2 border-forest pb-6 flex justify-between items-end">
        <div>
          <span class="font-mono text-[10px] text-forest font-bold uppercase tracking-widest block">Declaração de Sustentabilidade & Pegada Ambiental (ESG)</span>
          <h1 class="text-3xl font-bold font-sans text-graphite mt-1">${proj.name}</h1>
          <p class="font-sans text-xs text-muted">Inventário de Descarbonização conforme Metodologia ABNT NBR ISO 14044</p>
        </div>
        <div class="font-mono text-right text-xs text-forest font-bold">
          ESCOPO 3 HOMOLOGADO
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-4 bg-sand rounded-xl text-center">
          <span class="text-[10px] text-muted uppercase block">Plástico Regenerado</span>
          <span class="font-bold text-forest text-xl">${tonsPlastic} t</span>
        </div>
        <div class="p-4 bg-sand rounded-xl text-center">
          <span class="text-[10px] text-forest uppercase block">CO2e Evitado Líquido</span>
          <span class="font-bold text-forest text-xl">${tonsCo2} t</span>
        </div>
        <div class="p-4 bg-sand rounded-xl text-center">
          <span class="text-[10px] text-muted uppercase block">Fator de Abatimento</span>
          <span class="font-bold text-graphite text-xl">-2,15 kg/kg</span>
        </div>
      </div>

      <div class="space-y-3 font-sans text-xs text-graphite leading-relaxed">
        <h3 class="font-bold border-b pb-1">Enquadramento nos Objetivos de Desenvolvimento Sustentável (ODS)</h3>
        <p class="text-muted">• <strong>ODS 09 (Indústria, Inovação e Infraestrutura):</strong> Modernização de pavimentos urbanos com compósitos reciclados de alto desempenho mecânico.</p>
        <p class="text-muted">• <strong>ODS 11 (Cidades e Comunidades Sustentáveis):</strong> Espaços públicos acessíveis (NBR 9050) com drenagem eficiente e redução de ilhas de calor.</p>
        <p class="text-muted">• <strong>ODS 12 (Consumo e Produção Responsáveis):</strong> Fechamento do ciclo de vida de resíduos plásticos da bacia hidrográfica do Capibaribe.</p>
        <p class="text-muted">• <strong>ODS 13 (Ação Contra a Mudança Global do Clima):</strong> Redução comprovada de emissões na comparação direta com clínquer de cimento e asfalto fóssil.</p>
      </div>
    `;
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
        showWorkspaceToast(`✓ Perfil [${this.currentProfile.toUpperCase()}] copiado com sucesso!`);
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
