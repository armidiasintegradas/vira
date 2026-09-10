# VIRA OS — GOVERNANÇA & SPRINT STATUS

Este documento é a **fonte oficial de verdade**, governança de versão e estado de evolução do **VIRA OS — Sistema Operacional para Engenharia Circular**.

---

## 1. Governança de Release & Congelamentos Oficiais

- **V1.0.0 (Release Congelada):** Branch `release/v1` • Tag `v1.0.0` (Design System, Home 9 Capítulos, AVIF, Hardening WCAG AA).
- **V2.0.0 (Release Congelada):** Branch `release/v2` • Tag `v2.0.0` (VIRA Engineering Hub™, Knowledge Graph, IDs Tripartites, Fichas de Governança, Changelog e Deep Linking).
- **Branch Ativa de Desenvolvimento:** `next` (Desenvolvimento do VIRA OS v4.0).
- **Posicionamento Estratégico Oficial:** *"Sistema Operacional para Engenharia Circular — Da Concepção Municipal à Cadeia de Custódia e Licitação Pública"*.

---

## 2. Histórico de Evolução do Projeto

```
V0 (Site Institucional)
  ↓
V1 (Plataforma Digital & Design System)
  ↓
V2 (Centro de Especificação & Knowledge Graph)
  ↓
V3 (Engineering Workspace Unificado)
  ↓
V3.2 (Ambiente de Trabalho & Inteligência de Domínio)
  ↓
VIRA OS v4.0 (Sistema Operacional para Engenharia Circular)
```

---

## 3. Sprints Concluídos & Homologados

### [✓] Sprint 0 a 6: Reconstrução Integral da Home e Design System (V1.0.0)
- **Status:** CONCLUÍDO & HOMOLOGADO (Permanentemente congelado na branch `release/v1`).
- Design System unificado (`tokens.css` e `styles.css`) com as cores do Brandbook 2026.
- 9 Capítulos estruturados em sequência estrita (Hero, Uma Única Engenharia, Como Funciona, Materiais, Aplicações, Especificação, Impacto, Agenda 2030, Contato).
- Header dinâmico inteligente com `requestAnimationFrame` (transparente -> sólido on-scroll).
- Rodapé monumental em 4 colunas com crédito institucional por AR Mídias Integradas.

### [✓] Sprint Hardening: Performance, Acessibilidade & SEO (V1.0.0)
- **Status:** CONCLUÍDO & HOMOLOGADO.
- Pipeline Next-Gen AVIF implementado para 100% das imagens da Home (-62% de payload, 2,45 MB total).
- Core Web Vitals blindados: Preload de LCP, `width` e `height` explícitos em todas as imagens (CLS = 0.000).
- WCAG AA: Hierarquia semântica estrita, skip-link, contraste e navegação total por teclado.
- SEO: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon e Schema.org JSON-LD expandido.
- Calculadora: Nota metodológica de Análise de Ciclo de Vida (ISO 14044) adicionada (-2,15 kg CO2e/kg).

### [✓] Sprint 0.1 & 1.1: Refinamento Invisível & Microtipografia (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO.
- Microtipografia com `text-wrap: balance` em títulos (zero órfãs) e `text-wrap: pretty` em parágrafos.
- Tracking ótico calibrado (-0.035em a -0.04em em displays; 0.14em em mono badges).
- Números tabulares `font-variant-numeric: tabular-nums` para alinhamento vertical estrito de métricas.
- Ícones Lucide padronizados com stroke-width 1.75 (estilo blueprint técnico).
- Fluid clamp scaling calibrado para todos os breakpoints (360px a 1920px).

### [✓] V2.0.0 — VIRA Engineering Hub™ & Knowledge Graph (Branch: `release/v2`, Tag `v2.0.0`)
- **Status:** CONCLUÍDO, HOMOLOGADO & PERMANENTEMENTE CONGELADO.
- Conceito proprietário **VIRA Engineering Hub™** (`centro-de-especificacao.html` e `especificacao.js`).
- 4 Portais de entrada de engenharia: Modelos BIM, Desenhos CAD, Laudos Laboratoriais e Memoriais de Licitação.
- Engineering IDs tripartites padronizados (`VIRA-BIM-PAV-001`, `VIRA-CAD-PAV-002`, `VIRA-LAB-PAV-003`, etc.).
- Ficha de governança com metadados ABNT/ISO, compatibilidade e licença de uso.
- Índice de Confiança & Autoridade Técnica (Homologado ★★★★★, downloads, citações ABNT).
- Changelog com governança expandida (status, responsável técnico, data, versão e notas).
- Fluxo de 3 passos: Visualizar -> Copiar Memorial (Lei 14.133) -> Download.
- Citação padronizada ABNT NBR 6023 com 1 clique.
- Knowledge Graph ativo interligando a Home (Cap. 4, 5, 6 e 7) ao Hub via Deep Linking bidirecional.

### [✓] Sprint V3.2: Transição para o Sistema Operacional (Branch: `next`)
- **Status:** CONCLUÍDO, HOMOLOGADO & INTEGRALMENTE APROVADO PELO PRINCIPAL PRODUCT ARCHITECT.
- Conclusão da transformação de catálogo estático para ambiente de trabalho ativo:
  1. *Motor de Projetos:* Persistência local multi-projeto, quantitativos e metas ESG.
  2. *Universal Command Launcher:* Acesso instantâneo via `⌘K` a todo o ecossistema técnico.
  3. *Comparador Técnico Multivariado:* Matriz comparativa de 4 materiais com cadeia de evidências.
  4. *Exportador Executivo Multi-Perfil:* Emissão automatizada de memoriais e cadernos de encargos.
  5. *Copiloto de Engenharia com IA:* Agente técnico orientado a tarefas executáveis.

---

## 4. ARQUITETURA VIRA OS v4.0 — OS 8 MOTORES DA ENGENHARIA CIRCULAR

O VIRA OS abandona a navegação centrada em produtos e consolida a jornada **centrada em projetos**:
```
Projeto Executivo
  ↓
Área & Tipologia Urbana
  ↓
Restrições de Carga & Solo (NBR 15953)
  ↓
Conformidade Normativa ABNT/ISO
  ↓
Seleção de Soluções Regenerativas
  ↓
Quantitativos Automáticos
  ↓
Balanço ESG & Análise de Ciclo de Vida (ISO 14044)
  ↓
Exportação de Cadernos Técnicos & Rastreabilidade DPP
```

### Mapa dos 8 Motores

| Motor | Arquivo | Responsabilidade Técnica |
|-------|---------|--------------------------|
| **Engine 01: Project Engine** | `projectEngine.js` | Estado mestre do projeto, quantitativos, metragem, persistência (`localStorage`), cálculo em tempo real de plástico regenerado e CO2e mitigado. |
| **Engine 02: Specification Engine** | `exporter.js` | Emissão de cadernos técnicos em 5 perfis formais: Licitação Pública (Lei 14.133), Caderno de Canteiro (NBR 15953), Memorial Síntese, Apresentação para Cliente e Relatório ESG (ISO 14044). |
| **Engine 03: Comparison Engine** | `comparator.js` | Matriz multivariada auditável lado a lado (Compósito VIRA vs Concreto vs Asfalto vs Madeira) com Cadeia de Evidências (`Critério -> Justificativa -> Norma ABNT -> Laudo IPT -> Obra Real`). |
| **Engine 04: Compliance Engine** | `workspace.js` & `especificacao.js` | Validação de conformidade com normas (NBR 9781, NBR 9050, NBR 15575, ISO 14044, Lei 14.133), verificação de ensaios e índices de confiança técnica. |
| **Engine 05: Universal Command Launcher** | `commandPalette.js` | Cérebro do sistema via `⌘K` / `Ctrl+K`. Indexação global facetada em 10 grupos: Produtos, Normas, Laudos, Projetos, Academy, FAQ, Obras, Downloads, Copiloto Tasks e Ações Rápidas. |
| **Engine 06: Engineering Copilot** | `engineeringAi.js` | Agente técnico de inteligência de domínio fechado (RAG acreditado) com execução de tarefas: dimensionamento de praças/vias, cálculo ambiental e injeção automática no projeto via `⚡ Aplicar ao Meu Projeto`. |
| **Engine 07: Analytics Engine** | `workspace.js` & `projectEngine.js` | Telemetria agregada, monitor de descarbonização, balanço de massa de plástico desviado de aterros e bacias hidrográficas, e métricas de sustentabilidade auditadas. |
| **Engine 08: Digital Product Passport (DPP)** | `workspace.js` | Painel de rastreabilidade digital completa: composição macromolecular (PEAD 65%, PP 25%, Cargas 10%), cadeia de custódia (Bacia do Capibaribe), telemetria de lote e assinatura ICP-Brasil. |

---

## 5. NOVOS KPIs OPERACIONAIS DO PRODUTO

O sucesso do VIRA OS deixa de ser medido por "volume de features" e passa a ser auditado por métricas de produtividade do engenheiro:

1. **Time-to-Spec (TTS):** Redução do tempo necessário para encontrar, parametrizar e aprovar uma especificação circular (meta: < 3 minutos).
2. **Time-to-Bidding (TTB):** Tempo para gerar o caderno completo de licitação pública com base legal na Lei 14.133/2021 e laudos IPT anexos (meta: < 60 segundos).
3. **Time-to-Export (TTE):** Transição e download de cadernos multi-perfil e pranchas executivas em 1 clique.
4. **Component & Document Reuse Rate:** Reutilização de blocos técnicos, memoriais descritivos e bibliotecas paramétricas entre projetos municipais.
5. **Traceability & Audit Trust:** 100% das asserções ancoradas na cadeia de evidências (ensaios IPT nº 1.104.921-A, normas ABNT vigentes e rastreabilidade DPP).

---

## 6. Evolução Contínua & Próximas Entregas (Branch: `next`)

- [x] Transição de Marca para **VIRA OS — Sistema Operacional para Engenharia Circular**.
- [x] Integração completa dos 8 Motores no Workspace.
- [x] Suporte ao Passaporte Digital de Produto (DPP) com cadeia de custódia.
- [x] Emissão multi-perfil (5 perfis de exportação técnica).
- [ ] Módulo VIRA Academy & Certificação Técnica para Fiscais de Contratos Públicos.
- [ ] Telemetria IoT e ensaios reológicos em tempo real integrados ao lote fabril em Caruaru.
- [ ] Mapeamento georreferenciado e interativo de obras públicas no Nordeste.
