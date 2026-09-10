# PLATAFORMA VIRA NEXT — GOVERNANÇA & SPRINT STATUS

Este documento é a **fonte oficial de verdade**, governança de versão e estado de evolução da **Plataforma Digital de Engenharia VIRA NEXT**.

---

## 1. Governança de Release & Congelamentos Oficiais

- **V1.0.0 (Release Congelada):** Branch `release/v1` • Tag `v1.0.0` (Design System, Home 9 Capítulos, AVIF, Hardening WCAG AA).
- **V2.0.0 (Release Congelada):** Branch `release/v2` • Tag `v2.0.0` (VIRA Engineering Hub™, Knowledge Graph, IDs Tripartites, Fichas de Governança, Changelog e Deep Linking).
- **Branch Ativa de Desenvolvimento:** `next` (Desenvolvimento da V3).
- **Missão Estratégica Oficial da V3:** *"Construir a plataforma de referência para quem projeta infraestrutura urbana com materiais circulares"*.

---

## 2. Histórico de Sprints Concluídos

### [✓] Sprint 0 a 6: Reconstrução Integral da Home e Design System (V1.0.0)
- **Status:** CONCLUÍDO & HOMOLOGADO
- Design System unificado (`tokens.css` e `styles.css`) com as cores do Brandbook 2026.
- 9 Capítulos estruturados em sequência estrita (Hero, Uma Única Engenharia, Como Funciona, Materiais, Aplicações, Especificação, Impacto, Agenda 2030, Contato).
- Header dinâmico inteligente com `requestAnimationFrame` (transparente -> sólido on-scroll).
- Rodapé monumental em 4 colunas com crédito institucional por AR Mídias Integradas.

### [✓] Sprint Hardening: Performance, Acessibilidade & SEO
- **Status:** CONCLUÍDO & HOMOLOGADO
- Pipeline Next-Gen AVIF implementado para 100% das imagens da Home (-62% de payload, 2,45 MB total).
- Core Web Vitals blindados: Preload de LCP, `width` e `height` explícitos em todas as imagens (CLS = 0.000).
- WCAG AA: Hierarquia semântica estrita, skip-link, contraste e navegação total por teclado.
- SEO: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon e Schema.org JSON-LD expandido.
- Calculadora: Nota metodológica de Análise de Ciclo de Vida (ISO 14044) adicionada.

### [✓] Sprint 0.1 & 1.1: Refinamento Invisível & Microtipografia (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO
- Microtipografia com `text-wrap: balance` em títulos (zero órfãs) e `text-wrap: pretty` em parágrafos.
- Tracking ótico calibrado (-0.035em a -0.04em em displays; 0.14em em mono badges).
- Números tabulares `font-variant-numeric: tabular-nums` para alinhamento vertical estrito de métricas.
- Ícones Lucide padronizados com stroke-width 1.75 (estilo blueprint técnico).
- Fluid clamp scaling calibrado para todos os breakpoints (360px a 1920px).

### [✓] V2.0.0 — VIRA Engineering Hub™ & Knowledge Graph (Branch: `release/v2`, Tag `v2.0.0`)
- **Status:** CONCLUÍDO, HOMOLOGADO & PERMANENTEMENTE CONGELADO
- Conceito proprietário **VIRA Engineering Hub™** (`centro-de-especificacao.html` e `especificacao.js`).
- 4 Portais de entrada de engenharia: Modelos BIM, Desenhos CAD, Laudos Laboratoriais e Memoriais de Licitação.
- Navegação por intenção de solução integrada vs formato técnico.
- Engineering IDs tripartites padronizados (`VIRA-BIM-PAV-001`, `VIRA-CAD-PAV-002`, `VIRA-LAB-PAV-003`, etc.).
- Ficha de governança com metadados ABNT/ISO, compatibilidade e licença de uso.
- Índice de Confiança & Autoridade Técnica (Homologado ★★★★★, downloads, citações ABNT).
- Changelog com governança expandida (status, responsável técnico, data, versão e notas).
- Fluxo de 3 passos: Visualizar -> Copiar Memorial (Lei 14.133) -> Download.
- Citação padronizada ABNT NBR 6023 com 1 clique.
- Knowledge Graph ativo interligando a Home (Cap. 4, 5, 6 e 7) ao Hub via Deep Linking bidirecional.
- Redirecionamento transparente de `biblioteca-tecnica.html` e `sitemap.xml` atualizado.

---

## 3. ROADMAP OFICIAL V3 — The Knowledge Engine & Workspace (Branch: `next`)

A V3 encerra a fase de "site institucional" e materializa a VIRA como uma **ferramenta de trabalho e referência técnica contínua**:

- [x] **Sprint 1: Knowledge Workspace (O Motor Unificado de Engenharia)**
  - **Status:** CONCLUÍDO & HOMOLOGADO (`workspace.html` e `workspace.js`).
  - Motor de especificação técnica unificado em tela única para as 4 soluções estruturais (`paver`, `painel`, `perfil`, `insumo`).
  - 13 Visões contextuais com transição instantânea sem recarregamento de página:
    *Visão Geral • Especificação & Ensaios • Aplicações Urbanas • Normas ABNT/ISO • BIM Paramétrico • CAD DWG • Laudos Laboratoriais • ACV & Descarbonização • Obras Executadas • VIRA Academy • FAQ Técnico • Downloads & Documentos • Suporte ART*.
  - Painel lateral fixo persistente **"Related Knowledge Graph"**: navegação context-aware pelo grafo em tempo real com dados de autoridade, métricas auditadas e responsáveis técnicos.
  - Simulador interativo de impacto ambiental de metragem quadrada com cálculo imediato de plástico desviado e CO2e evitado.
  - Deep Linking bidirecional via URL (`?solution=...&tab=...`) e botões de atalho integrados na Home e no Engineering Hub.
  - Inclusão no `sitemap.xml` com prioridade 0.95.

- [x] **Sprint V3.2: Project-Centric Workspace & Intelligence Engine (Operating System)**
  - **Status:** CONCLUÍDO & HOMOLOGADO (5 Pilares Integrados)
  - **Pilar 1 — Motor de Projetos (`projectEngine.js`):** Transição de catálogo de soluções para sistema operacional centrado em projetos executivos municipais (Recife Orla 4.200 m², Caruaru Linear 2.500 m²). Persistência no `localStorage` (`VIRA_PROJECTS_STORE_V3`), cálculo em tempo real de plástico regenerado e CO2e mitigado, gestão de quantitativos e exportação em JSON.
  - **Pilar 2 — Universal Command Palette (`commandPalette.js`):** Indexação global via `⌘K` / `Ctrl+K` para normas técnicas (ABNT NBR 9781, 9050, 15575, 14044, Lei 14.133), Engineering IDs (`VIRA-BIM-PAV-001`, `VIRA-LAB-PAV-003`, etc.), busca facetada e ações de produtividade em tempo real.
  - **Pilar 3 — Comparador Técnico Multivariado (`comparator.js`):** Matriz paramétrica auditável lado a lado comparando Compósito Circular VIRA vs Concreto Intertravado vs Asfalto CBUQ vs Madeira de Lei, aferindo fck, absorção, pegada de carbono ACV, garantia, custo de ciclo de vida em 10 anos e conforto térmico (SRI).
  - **Pilar 4 — Exportador Executivo Inteligente (`exporter.js`):** Emissão formal do Caderno Executivo de Encargos do Projeto, fundamentado na Nova Lei de Licitações (Lei 14.133/2021, Art. 11 e Art. 34), consolidação de quantitativos, laudos IPT e pranchas com modal de impressão e geração de PDF.
  - **Pilar 5 — Assistente de Engenharia com IA (`engineeringAi.js`):** Consultor técnico de domínio fechado (RAG acreditado) integrado no painel lateral do Workspace, fundamentando dúvidas em ensaios IPT nº 1.104.921, ABNT NBR 9781 e diretrizes de obras públicas, com citação de laudos e confiança técnica sem alucinações.

- [ ] **Sprint 3: VIRA Academy & Certificação Técnica**
  - Guias de especificação de infraestrutura circular, cursos técnicos rápidos para fiscais de contratos públicos (Lei 14.133), webinars e certificação de especificador circular.
- [ ] **Sprint 4: VIRA Lab & Rastreabilidade DPP**
  - Ensaios reológicos e mecânicos em lote contínuo, Passaporte Digital de Produto (DPP) com verificação de autenticidade e telemetria de produção sustentável.
- [ ] **Sprint 5: Mapa de Obras & Infraestrutura**
  - Mapeamento georreferenciado e interativo de intervenções urbanas executadas, estudos de caso com prefeituras e concessionárias, fotos executivas e métricas de CO2e evitadas por município.
- [ ] **Sprint 6: Analytics & Telemetria em Larga Escala**
  - Monitor de descarbonização em tempo real, painel de economia de recursos naturais e relatórios ESG prontos para emissão corporativa e governamental.
