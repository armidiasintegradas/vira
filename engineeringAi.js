// ========================================================
// VIRA OS — COPILOTO DE ENGENHARIA (engineeringAi.js)
// Engine 06: Engineering Copilot & Task Execution Engine
// Ancorado em Laudos IPT, Normas ABNT e Lei 14.133/2021
// ========================================================

const copilotKnowledgeBase = [
  {
    id: 'kb-traffic',
    keywords: ['onibus', 'ônibus', 'caminhao', 'caminhão', 'trafego', 'tráfego', 'pesado', 'leito', 'viario', 'viário', 'carga', 'fck', 'compressao', 'compressão'],
    title: 'Tráfego Comercial Médio e Pesado (Ônibus e Caminhões)',
    answer: 'Sim, o Paver Intertravado 16 Faces (VRA-PAV-2026) é plenamente indicado para leitos viários com tráfego pesado de ônibus e caminhões (VDM > 100). Nos ensaios IPT (Laudo nº 1.104.921-A), o lote apresentou resistência característica à compressão axial de **38,2 MPa**, superando a exigência mínima de 35,0 MPa da **ABNT NBR 9781:2013**. O formato holandês com 16 faces garante travamento tridimensional que anula deslocamentos rotacionais sob frenagem pesada.',
    standard: 'ABNT NBR 9781:2013 & NBR 15953',
    evidence: 'Laudo IPT nº 1.104.921-A (38,2 MPa)',
    confidence: '99% Verificado'
  },
  {
    id: 'kb-procurement',
    keywords: ['licitacao', 'licitação', 'edital', 'lei 14.133', '14133', 'impugnacao', 'impugnação', 'sustentabilidade', 'compras publicas', 'compras públicas', 'juridico', 'jurídico'],
    title: 'Enquadramento em Licitações Públicas (Lei 14.133/2021)',
    answer: 'Para exigir o compósito polimérico circular sem risco de impugnação, o Termo de Referência deve ser fundamentado no **Art. 11, inciso IV da Lei 14.133/2021** (princípio do desenvolvimento sustentável) e no **Art. 34** (julgamento pelo menor impacto ambiental e custo de ciclo de vida). O edital deve estabelecer exigências de desempenho com base na **ABNT NBR 9781** e inventário ACV com metodologia **ISO 14044**, assegurando ampla concorrência técnica.',
    standard: 'Lei Federal 14.133/2021 (Art. 11 e 34)',
    evidence: 'Estudo ACV ISO 14044 (VIRA-ACV-ALL-010)',
    confidence: '100% Jurídico'
  },
  {
    id: 'kb-marine',
    keywords: ['maresia', 'mar', 'maritimo', 'marítimo', 'praia', 'orla', 'sal', 'salinidade', 'cloreto', 'corrosao', 'corrosão', 'eflorescencia', 'eflorescência'],
    title: 'Comportamento em Orlas Marítimas e Maresia Severa',
    answer: 'O material apresenta imunidade absoluta contra névoa salina e íons cloreto. Enquanto o concreto convencional absorve de 5% a 7% de água e sofre desagregação e eflorescência, o compósito circular VIRA possui taxa de absorção de água **inferior a 0,05%** (ensaio 24h por imersão total). Não há corrosão química, oxidação de armaduras ou esfarelamento superficial, assegurando vida útil superior a 30 anos em calçadões litorâneos.',
    standard: 'ASTM D543 & ABNT NBR 9781',
    evidence: 'Ensaio de Imersão e Névoa Salina VIRA Lab',
    confidence: '98% Verificado'
  },
  {
    id: 'kb-thermal',
    keywords: ['calor', 'sol', 'temperatura', 'fogo', 'termico', 'térmico', 'deformacao', 'deformação', 'albedo', 'sri', 'derrete', 'derreter'],
    title: 'Comportamento Térmico e Resistência ao Sol Extremo',
    answer: 'O compósito polimérico VIRA possui temperatura de amolecimento Vicat superior a **128°C**, suportando com folga temperaturas de pavimento tropical (60°C a 70°C). O material não sofre deformação plástica permanente (sulcamento). Além disso, seu índice de refletância solar (**SRI 42**) dissipa o calor com eficiência muito superior ao asfalto (SRI 5), mitigando ilhas de calor urbanas.',
    standard: 'ASTM D1525 & ASTM E1980',
    evidence: 'Ensaio Termomecânico HDT/Vicat nº 402/2025',
    confidence: '96% Verificado'
  },
  {
    id: 'kb-inspection',
    keywords: ['fiscalizacao', 'fiscalização', 'recebimento', 'canteiro', 'obra', 'ensaio', 'lote', 'amostragem', 'dpp', 'qr code', 'laudo'],
    title: 'Procedimento de Fiscalização e Recebimento em Obra',
    answer: 'A fiscalização deve adotar o rito da **ABNT NBR 15953:2011**: (1) Conferência dimensional visual de 20 peças por lote (tolerância máxima ± 2 mm); (2) Leitura do QR Code indelével na face inferior do bloco para validação do Passaporte Digital de Produto (DPP) e conferência da assinatura digital ICP-Brasil do laudo de lote; (3) Coleta aleatória de 6 blocos a cada 500 m² para contraprova em laboratório tecnológico acreditado.',
    standard: 'ABNT NBR 15953:2011',
    evidence: 'Protocolo de Recebimento de Canteiro VIRA-INS-2026',
    confidence: '99% Executivo'
  },
  {
    id: 'kb-accessibility',
    keywords: ['acessibilidade', 'rampa', 'cadeirante', 'cego', 'tatil', 'tátil', 'escorregamento', 'antiderrapante', 'nbr 9050', '9050'],
    title: 'Acessibilidade Urbana e Piso Antiderrapante (NBR 9050)',
    answer: 'A textura superficial dos blocos VIRA atinge índice **BPN 68** no ensaio de pêndulo britânico (ASTM E303) sob pista molhada, superando com ampla margem as exigências da **ABNT NBR 9050:2020** para calçadas públicas e rampas de até 8,33% de inclinação. Juntas de 3 mm com chanfro ergonômico evitam trepidações para cadeirantes.',
    standard: 'ABNT NBR 9050:2020',
    evidence: 'Ensaio de Coeficiente de Atrito ASTM E303',
    confidence: '97% Conforme'
  }
];

class EngineeringCopilot {
  constructor() {
    this.container = null;
    this.messages = [
      {
        sender: 'ai',
        text: 'Olá, engenheiro! Sou o **Copiloto de Engenharia do VIRA OS**. Estou pronto para responder dúvidas técnicas ancoradas em laudos IPT ou **executar tarefas** (ex: *"Criar memorial para praça de 4.000 m²"* ou *"Dimensionar deck marítimo"*). Como posso acelerar seu projeto?',
        meta: 'VIRA OS • Copilot Engine v4.0'
      }
    ];
  }

  mount(targetElementId) {
    this.container = document.getElementById(targetElementId);
    if (!this.container) return;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4 font-sans text-xs">
        
        <!-- Cabeçalho do Copiloto -->
        <div class="flex items-center justify-between border-b border-border-subtle pb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h4 class="font-bold text-graphite text-xs flex items-center gap-1.5">
                <span>Copiloto de Engenharia</span>
                <span class="px-1.5 py-0.2 rounded bg-forest/10 text-forest font-mono text-[9px] font-bold">VIRA OS</span>
              </h4>
              <p class="text-[10px] text-muted font-mono">Execução de Tarefas & RAG Acreditado</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-black/5 text-graphite font-mono text-[9px] font-bold">Engine 06</span>
        </div>

        <!-- Área de Conversação / Mensagens -->
        <div id="ai-chat-history" class="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          ${this.messages.map(msg => this.renderMessage(msg)).join('')}
        </div>

        <!-- Comandos Rápidos e Tarefas Prontas -->
        <div class="space-y-1.5 pt-2 border-t border-border-subtle">
          <span class="text-[10px] font-mono text-muted uppercase font-bold block">Comandos de Execução Rápida:</span>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="window.engineeringCopilot.executeTaskPrompt('Criar memorial para uma praça de 4.000 m²')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left flex items-center gap-1">
              <span>⚡ Memorial Praça 4.000 m²</span>
            </button>
            <button onclick="window.engineeringCopilot.executeTaskPrompt('Dimensionar calçadão litorâneo para maresia severa')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left flex items-center gap-1">
              <span>🌊 Orla & Maresia</span>
            </button>
            <button onclick="window.engineeringCopilot.executeTaskPrompt('Como fundamentar sustentabilidade na Lei 14.133 sem impugnação?')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left flex items-center gap-1">
              <span>⚖️ Lei 14.133</span>
            </button>
            <button onclick="window.engineeringCopilot.executeTaskPrompt('Fiscalização e recebimento em canteiro de obras')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left flex items-center gap-1">
              <span>📋 Canteiro DPP</span>
            </button>
          </div>
        </div>

        <!-- Barra de Input de Comando ou Dúvida -->
        <form onsubmit="window.engineeringCopilot.handleSubmit(event)" class="relative flex items-center gap-1.5 pt-1">
          <input id="ai-chat-input" type="text" placeholder="Digite um comando (ex: 'Criar memorial praça 3000 m²') ou dúvida..." class="w-full bg-sand px-3 py-2.5 rounded-xl border border-border-subtle text-graphite placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-forest text-xs font-sans" />
          <button type="submit" class="p-2.5 rounded-xl bg-forest text-white hover:bg-forest-dark transition-all shrink-0" title="Executar">
            <i data-lucide="send" class="w-3.5 h-3.5"></i>
          </button>
        </form>

      </div>
    `;

    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }

    const historyEl = document.getElementById('ai-chat-history');
    if (historyEl) {
      historyEl.scrollTop = historyEl.scrollHeight;
    }
  }

  renderMessage(msg) {
    const isAi = msg.sender === 'ai';
    return `
      <div class="p-3.5 rounded-2xl ${isAi ? 'bg-sand border border-border-subtle' : 'bg-forest/10 border border-forest/20 text-graphite'} space-y-2">
        <div class="flex items-center justify-between text-[10px] font-mono">
          <span class="font-bold ${isAi ? 'text-forest' : 'text-graphite'}">${isAi ? '⚙️ Copiloto de Engenharia' : '👤 Projetista'}</span>
          ${msg.meta ? `<span class="text-muted/70">${msg.meta}</span>` : ''}
        </div>
        <p class="text-xs leading-relaxed ${isAi ? 'text-graphite' : 'text-graphite font-medium'}">${this.formatText(msg.text)}</p>
        
        ${msg.taskData ? `
          <!-- Painel de Tarefa Executada com Sucesso -->
          <div class="p-3 bg-white rounded-xl border border-forest/20 space-y-2.5 font-mono text-[11px] mt-2">
            <div class="flex items-center justify-between text-forest font-bold">
              <span>✓ TAREFA CONCLUÍDA</span>
              <span>${msg.taskData.solutionName}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-[10px] text-muted border-y border-black/5 py-1.5">
              <div>Quantitativo: <strong class="text-graphite">${msg.taskData.area.toLocaleString('pt-BR')} m²</strong></div>
              <div>Plástico: <strong class="text-forest">${(msg.taskData.plasticKg / 1000).toFixed(1)} t</strong></div>
              <div>CO2e Evitado: <strong class="text-forest">${(msg.taskData.co2Kg / 1000).toFixed(1)} t</strong></div>
              <div>Norma: <strong class="text-graphite">ABNT NBR 9781</strong></div>
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button onclick="window.engineeringCopilot.applyTaskToProject('${this.escapeQuotes(JSON.stringify(msg.taskData))}')" class="vira-btn-primary py-1.5 px-3 text-[10px] font-mono flex items-center gap-1">
                <i data-lucide="plus" class="w-3 h-3"></i>
                <span>Aplicar ao Meu Projeto</span>
              </button>
              <button onclick="window.openProjectExporterModal()" class="vira-btn-outline py-1.5 px-2.5 text-[10px] font-mono bg-white">
                Ver Caderno
              </button>
            </div>
          </div>
        ` : ''}

        ${msg.evidence ? `
          <div class="pt-2 border-t border-black/5 font-mono text-[10px] space-y-1">
            <div class="flex items-center justify-between text-muted">
              <span>Norma: <strong>${msg.standard}</strong></span>
              <span class="text-forest font-bold">${msg.confidence}</span>
            </div>
            <div class="flex items-center justify-between text-muted">
              <span>Evidência: <strong>${msg.evidence}</strong></span>
              <button onclick="window.engineeringCopilot.copyAnswer('${this.escapeQuotes(msg.text)}')" class="hover:text-forest text-[10px] underline">Copiar Parecer</button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  executeTaskPrompt(text) {
    const input = document.getElementById('ai-chat-input');
    if (input) input.value = text;
    this.processQuery(text);
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;
    const query = input.value.trim();
    input.value = '';
    this.processQuery(query);
  }

  processQuery(query) {
    this.messages.push({
      sender: 'user',
      text: query,
      meta: 'Agora'
    });
    this.render();

    const cleanQuery = query.toLowerCase();

    // Verificação de Tarefa Executiva (Task Intent)
    const isTaskIntent = cleanQuery.includes('criar') || cleanQuery.includes('montar') || cleanQuery.includes('dimensionar') || cleanQuery.includes('memorial') || cleanQuery.includes('gerar');
    
    // Extração de metragem se houver
    const areaMatch = cleanQuery.match(/(\d+[\.\d]*)\s*(m²|m2|metros)/);
    const specifiedArea = areaMatch ? parseFloat(areaMatch[1].replace('.', '')) : 4000;

    setTimeout(() => {
      if (isTaskIntent && (cleanQuery.includes('praça') || cleanQuery.includes('orla') || cleanQuery.includes('pavimento') || cleanQuery.includes('deck') || cleanQuery.includes('fachada') || cleanQuery.includes('memorial'))) {
        // Execução de Tarefa
        const isOrla = cleanQuery.includes('orla') || cleanQuery.includes('mar') || cleanQuery.includes('maresia');
        const plasticKg = specifiedArea * 18.5;
        const co2Kg = plasticKg * 2.15;

        const taskData = {
          solutionId: 'paver',
          solutionName: 'Paver Intertravado 16 Faces (VRA-PAV-2026)',
          code: 'VRA-PAV-2026',
          area: specifiedArea,
          densityKgM2: 18.5,
          plasticKg: plasticKg,
          co2Kg: co2Kg,
          unitCost: 88.50,
          law: 'Lei 14.133/2021 (Art. 11 e 34)'
        };

        const taskResponseText = `Montei a especificação executiva completa para intervenção urbana de **${specifiedArea.toLocaleString('pt-BR')} m²**.\n\n` +
          `• **Solução Selecionada:** Paver 16 Faces autobloqueante (fck ≥ 38,2 MPa)\n` +
          `• **Enquadramento Legal:** Lei Federal 14.133/2021 (Art. 11, IV e Art. 34)\n` +
          `• **Mitigação Ambiental:** Desvio de **${(plasticKg / 1000).toFixed(1)} toneladas** de plástico e crédito de **${(co2Kg / 1000).toFixed(1)} t CO2e** (ISO 14044)\n` +
          `• **Laudo Anexado:** IPT nº 1.104.921-A com absorção nula (< 0,05%) e BPN 68 antiderrapante (NBR 9050).\n\n` +
          `Você pode clicar no botão abaixo para adicionar este pacote diretamente ao seu projeto ativo.`;

        this.messages.push({
          sender: 'ai',
          text: taskResponseText,
          taskData: taskData,
          meta: 'Tarefa Executada'
        });
      } else {
        // Consulta RAG Técnica
        let bestMatch = null;
        let highestScore = 0;

        copilotKnowledgeBase.forEach(item => {
          let score = 0;
          item.keywords.forEach(kw => {
            if (cleanQuery.includes(kw)) score += 1;
          });
          if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
          }
        });

        if (bestMatch && highestScore > 0) {
          this.messages.push({
            sender: 'ai',
            text: bestMatch.answer,
            standard: bestMatch.standard,
            evidence: bestMatch.evidence,
            confidence: bestMatch.confidence,
            meta: 'Citação Homologada'
          });
        } else {
          this.messages.push({
            sender: 'ai',
            text: `Compreendo sua consulta sobre "${query}". No **VIRA OS**, todos os elementos atendem rigorosamente à **ABNT NBR 9781:2013** com laudo IPT nº 1.104.921 (fck ≥ 38,2 MPa) e declaração de ACV conforme **ISO 14044** (-2,15 kg CO2e/kg). Se desejar que eu monte o memorial descritivo ou calcule os quantitativos, basta solicitar: ex: *"Criar memorial para [X] m²"*!`,
            standard: 'ABNT NBR 9781 / ISO 14044',
            evidence: 'Laudo IPT nº 1.104.921-A',
            confidence: '95% Verificado',
            meta: 'Copiloto de Engenharia'
          });
        }
      }
      this.render();
    }, 300);
  }

  applyTaskToProject(taskDataJsonStr) {
    try {
      const taskData = JSON.parse(taskDataJsonStr.replace(/&quot;/g, '"'));
      if (window.projectEngine) {
        const proj = window.projectEngine.getActiveProject();
        window.projectEngine.addItemToProject(proj.id, {
          solutionId: taskData.solutionId,
          name: taskData.solutionName,
          code: taskData.code,
          quantityM2: taskData.area,
          densityKgM2: taskData.densityKgM2,
          lcaFactorCo2: 2.15,
          unitCostEstimate: taskData.unitCost
        });
        if (typeof showWorkspaceToast === 'function') {
          showWorkspaceToast(`✓ ${taskData.area} m² aplicados com sucesso ao projeto "${proj.name}"!`);
        }
        if (typeof window.setWorkspaceMode === 'function') {
          window.setWorkspaceMode('projects');
        }
      }
    } catch (e) {
      console.error('Erro ao aplicar tarefa:', e);
    }
  }

  copyAnswer(text) {
    navigator.clipboard.writeText(text).then(() => {
      if (typeof showWorkspaceToast === 'function') {
        showWorkspaceToast('✓ Parecer técnico copiado para a área de transferência!');
      } else {
        alert('Parecer técnico copiado!');
      }
    });
  }
}

// Singleton global do Copiloto de Engenharia (VIRA OS)
window.engineeringCopilot = new EngineeringCopilot();
window.engineeringAi = window.engineeringCopilot; // retrocompatibilidade
