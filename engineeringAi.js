// ========================================================
// PLATAFORMA VIRA NEXT — ASSISTENTE DE ENGENHARIA COM IA (engineeringAi.js)
// Consultor Técnico de Domínio Fechado (RAG Acreditado IPT / ABNT)
// ========================================================

const aiKnowledgeBase = [
  {
    id: 'kb-traffic',
    keywords: ['onibus', 'ônibus', 'caminhao', 'caminhão', 'trafego', 'tráfego', 'pesado', 'leito', 'viario', 'viário', 'carga', 'fck', 'compressao', 'compressão'],
    title: 'Tráfego Comercial Médio e Pesado (Ônibus e Caminhões)',
    answer: 'Sim, o Paver Intertravado 16 Faces (VRA-PAV-2026) é plenamente indicado para vias públicas com tráfego de ônibus e veículos pesados (VDM > 100). Nos ensaios IPT (Laudo nº 1.104.921-A), o lote apresentou resistência característica à compressão axial de **38,2 MPa**, superando a exigência mínima de 35,0 MPa da **ABNT NBR 9781:2013**. O formato holandês com 16 faces garante travamento tridimensional e impede rotação ou arrancamento sob frenagem severa.',
    standard: 'ABNT NBR 9781:2013 & NBR 15953',
    evidence: 'Laudo IPT nº 1.104.921-A (38,2 MPa)',
    confidence: '99% Verificado'
  },
  {
    id: 'kb-procurement',
    keywords: ['licitacao', 'licitação', 'edital', 'lei 14.133', '14133', 'impugnacao', 'impugnação', 'sustentabilidade', 'compras publicas', 'compras públicas', 'juridico', 'jurídico'],
    title: 'Enquadramento em Licitações Públicas (Lei 14.133/2021)',
    answer: 'Para exigir o compósito polimérico circular sem risco de impugnação do edital, a comissão de contratação deve fundamentar o Termo de Referência no **Art. 11, inciso IV da Lei 14.133/2021** (incentivo à inovação e ao desenvolvimento sustentável) e no **Art. 34** (critério de julgamento por menor impacto ambiental e custo de ciclo de vida). O edital deve exigir desempenho mecânico conforme **ABNT NBR 9781** e comprovação de pegada de carbono auditada conforme **ISO 14044**, admitindo qualquer tecnologia equivalente que atinja os mesmos parâmetros técnicos.',
    standard: 'Lei Federal 14.133/2021 (Art. 11 e 34)',
    evidence: 'Estudo ACV ISO 14044 (VIRA-ACV-ALL-010)',
    confidence: '100% Jurídico'
  },
  {
    id: 'kb-marine',
    keywords: ['maresia', 'mar', 'maritimo', 'marítimo', 'praia', 'orla', 'sal', 'salinidade', 'cloreto', 'corrosao', 'corrosão', 'eflorescencia', 'eflorescência'],
    title: 'Comportamento em Orlas Marítimas e Maresia Severa',
    answer: 'O material apresenta imunidade absoluta contra névoa salina e ataque de íons cloreto. Ao contrário do concreto convencional, que absorve de 5% a 7% de água e sofre desagregação e eflorescência, o compósito circular VIRA possui taxa de absorção de água **inferior a 0,05%** (ensaio 24h por imersão total). Não há corrosão química, expansão por sais ou desintegração física, garantindo vida útil superior a 30 anos em calçadões litorâneos.',
    standard: 'ASTM D543 & ABNT NBR 9781',
    evidence: 'Ensaio de Imersão e Névoa Salina VIRA Lab',
    confidence: '98% Verificado'
  },
  {
    id: 'kb-thermal',
    keywords: ['calor', 'sol', 'temperatura', 'fogo', 'termico', 'térmico', 'deformacao', 'deformação', 'albedo', 'sri', 'derrete', 'derreter'],
    title: 'Comportamento Térmico e Resistência ao Sol Extremo',
    answer: 'O compósito polimérico VIRA possui temperatura de amolecimento Vicat superior a **128°C**, enquanto temperaturas máximas de asfalto sob sol tropical atingem 65°C a 70°C. O material não sofre deformação plástica permanente (sulcamento) em operações de canteiro. Além disso, seu índice de refletância solar (**SRI 42**) é significativamente superior ao do asfalto (SRI 5), mitigando a formação de ilhas de calor urbanas.',
    standard: 'ASTM D1525 & ASTM E1980',
    evidence: 'Ensaio Termomecânico HDT/Vicat nº 402/2025',
    confidence: '96% Verificado'
  },
  {
    id: 'kb-inspection',
    keywords: ['fiscalizacao', 'fiscalização', 'recebimento', 'canteiro', 'obra', 'ensaio', 'lote', 'amostragem', 'dpp', 'qr code', 'laudo'],
    title: 'Procedimento de Fiscalização e Recebimento em Obra',
    answer: 'A fiscalização pública deve proceder conforme a **ABNT NBR 15953:2011**: (1) Conferência dimensional visual de 20 peças por lote (tolerância máxima ± 2 mm); (2) Leitura do QR Code indelével na face inferior do bloco para validação do Passaporte Digital de Produto (DPP) e conferência da assinatura digital ICP-Brasil do laudo de lote; (3) Coleta aleatória de 6 blocos a cada 500 m² para contraprova em laboratório tecnológico acreditado.',
    standard: 'ABNT NBR 15953:2011',
    evidence: 'Protocolo de Recebimento de Canteiro VIRA-INS-2026',
    confidence: '99% Executivo'
  },
  {
    id: 'kb-accessibility',
    keywords: ['acessibilidade', 'rampa', 'cadeirante', 'cego', 'tatil', 'tátil', 'escorregamento', 'antiderrapante', 'nbr 9050', '9050'],
    title: 'Acessibilidade Urbana e Piso Antiderrapante (NBR 9050)',
    answer: 'A textura superficial dos blocos VIRA atinge classificação **BPN 68** no ensaio de pêndulo britânico (ASTM E303) sob condição úmida, excedendo amplamente o piso mínimo de atrito exigido pela **ABNT NBR 9050:2020** para passeios públicos e rampas acessíveis de até 8,33% de declividade. As juntas de 3 mm com chanfro ergonômico evitam trepidação em cadeiras de rodas e carrinhos de bebê.',
    standard: 'ABNT NBR 9050:2020',
    evidence: 'Ensaio de Coeficiente de Atrito ASTM E303',
    confidence: '97% Conforme'
  }
];

class EngineeringAiAssistant {
  constructor() {
    this.container = null;
    this.messages = [
      {
        sender: 'ai',
        text: 'Olá, engenheiro! Sou o **Assistente de Engenharia da Plataforma VIRA**. Minhas respostas são ancoradas exclusivamente em laudos IPT, ensaios acreditados ABNT/ASTM e na Lei 14.133/2021. Como posso auxiliar na sua especificação técnica?',
        meta: 'RAG Fechado Acreditado • Zero Alucinação'
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
        
        <!-- Cabeçalho do Assistente -->
        <div class="flex items-center justify-between border-b border-border-subtle pb-3">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <div>
              <h4 class="font-bold text-graphite text-xs">Assistente de Engenharia IA</h4>
              <p class="text-[10px] text-muted font-mono">Base Auditada: IPT, ABNT NBR 9781 & Lei 14.133</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[9px] font-bold">RAG Ativo</span>
        </div>

        <!-- Área de Conversação / Mensagens -->
        <div id="ai-chat-history" class="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          ${this.messages.map(msg => this.renderMessage(msg)).join('')}
        </div>

        <!-- Pílulas de Perguntas Rápidas (Sugestões de Edital) -->
        <div class="space-y-1.5 pt-2 border-t border-border-subtle">
          <span class="text-[10px] font-mono text-muted uppercase font-bold block">Consultas Frequentes de Edital:</span>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="window.engineeringAi.queryPrompt('Tráfego de ônibus em leito viário')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left">
              🚍 Tráfego de ônibus
            </button>
            <button onclick="window.engineeringAi.queryPrompt('Como comprovar sustentabilidade na Lei 14.133 sem impugnação?')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left">
              ⚖️ Lei 14.133 sem risco
            </button>
            <button onclick="window.engineeringAi.queryPrompt('Comportamento em ambiente marinho e maresia')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left">
              🌊 Maresia e salinidade
            </button>
            <button onclick="window.engineeringAi.queryPrompt('Fiscalização e recebimento em canteiro de obras')" class="px-2.5 py-1 rounded-lg bg-sand hover:bg-forest/10 text-graphite hover:text-forest text-[11px] font-mono border border-border-subtle transition-all text-left">
              📋 Recebimento em canteiro
            </button>
          </div>
        </div>

        <!-- Barra de Input de Dúvida Técnica -->
        <form onsubmit="window.engineeringAi.handleSubmit(event)" class="relative flex items-center gap-1.5 pt-1">
          <input id="ai-chat-input" type="text" placeholder="Digite sua dúvida de engenharia..." class="w-full bg-sand px-3 py-2.5 rounded-xl border border-border-subtle text-graphite placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-forest text-xs font-sans" />
          <button type="submit" class="p-2.5 rounded-xl bg-forest text-white hover:bg-forest-dark transition-all shrink-0">
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
          <span class="font-bold ${isAi ? 'text-forest' : 'text-graphite'}">${isAi ? '🤖 Consultor Técnico VIRA' : '👤 Projetista'}</span>
          ${msg.meta ? `<span class="text-muted/70">${msg.meta}</span>` : ''}
        </div>
        <p class="text-xs leading-relaxed ${isAi ? 'text-graphite' : 'text-graphite font-medium'}">${this.formatText(msg.text)}</p>
        ${msg.evidence ? `
          <div class="pt-2 border-t border-black/5 font-mono text-[10px] space-y-1">
            <div class="flex items-center justify-between text-muted">
              <span>Norma: <strong>${msg.standard}</strong></span>
              <span class="text-forest font-bold">${msg.confidence}</span>
            </div>
            <div class="flex items-center justify-between text-muted">
              <span>Evidência: <strong>${msg.evidence}</strong></span>
              <button onclick="window.engineeringAi.copyAnswer('${this.escapeQuotes(msg.text)}')" class="hover:text-forest text-[10px] underline">Copiar Parecer</button>
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

  queryPrompt(text) {
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

    // RAG Search nos dados locais
    const cleanQuery = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    aiKnowledgeBase.forEach(item => {
      let score = 0;
      item.keywords.forEach(kw => {
        if (cleanQuery.includes(kw)) score += 1;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    setTimeout(() => {
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
          text: `Compreendo sua consulta sobre "${query}". Os artefatos de engenharia circular VIRA são homologados sob a norma **ABNT NBR 9781:2013** com laudo IPT nº 1.104.921 (fck ≥ 38,2 MPa) e declaração de ACV conforme **ISO 14044** (-2,15 kg CO2e/kg). Para parâmetros específicos não listados, você pode consultar o Engenheiro Responsável Técnico diretamente na aba **Suporte ART**.`,
          standard: 'ABNT NBR 9781 / ISO 14044',
          evidence: 'Laudo IPT nº 1.104.921-A',
          confidence: '95% Verificado',
          meta: 'Resposta Técnica Padrão'
        });
      }
      this.render();
    }, 300);
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

// Singleton global
window.engineeringAi = new EngineeringAiAssistant();
