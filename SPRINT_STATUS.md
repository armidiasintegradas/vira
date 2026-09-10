# VIRA OS — GOVERNANÇA, ARQUITETURA & SPRINT STATUS

Este documento é a **fonte oficial de verdade**, governança de versão e estado de evolução do **VIRA OS — Sistema Operacional para Engenharia Circular**.

---

## 1. Governança de Release & Congelamentos Oficiais

- **V1.0.0 (Release Congelada):** Branch `release/v1` • Tag `v1.0.0` (Design System, Home 9 Capítulos, AVIF, Hardening WCAG AA).
- **V2.0.0 (Release Congelada):** Branch `release/v2` • Tag `v2.0.0` (VIRA Engineering Hub™, Knowledge Graph, IDs Tripartites, Fichas de Governança, Changelog e Deep Linking).
- **Branch Ativa de Desenvolvimento:** `next` (Desenvolvimento do VIRA OS v4.0).
- **Posicionamento Estratégico Oficial:** *"Sistema Operacional para Engenharia Circular — Da Concepção Municipal à Cadeia de Custódia e Licitação Pública"*.

---

## 2. Governança da Verdade Técnica: Os 3 Tiers de Dados

Para garantir integridade jurídica e conformidade estrita em licitações públicas (Lei 14.133/2021) e auditorias corporativas, todas as informações que trafegam no VIRA OS são classificadas em três níveis:

| Nível | Classificação | Critério & Validade Legal | Exemplo no Sistema |
|---|---|---|---|
| **Tier 1** | **[DADO HOMOLOGADO]** | Certificado formalmente por laboratório acreditado Inmetro ou norma técnica ABNT/ISO em vigor. Informação juridicamente vinculante para termos de referência e cadernos de encargos. | Resistência $f_{ck} = 38,2\text{ MPa}$ (IPT nº 1.104.921-A), Absorção $< 0,05\%$, Fator ACV $-2,15\text{ kg CO}_2\text{e/kg}$ (ISO 14044). |
| **Tier 2** | **[META DE PRODUTO]** | Alvo de engenharia, benchmark de P&D fabril ou meta de escala industrial em fase de homologação. Declarado explicitamente como meta técnica interna. | Capacidade fabril expandida de 120 t/mês em Caruaru, redução de ciclo de moldagem em 12%, novos pigmentos minerais fotoestáveis. |
| **Tier 3** | **[EXEMPLO ILUSTRATIVO]** | Cenários simulados, modelos paramétricos e estudos de caso demonstrativos para treinamento e pré-dimensionamento de anteprojetos. Exigem levantamento topográfico e projeto executivo definitivo. | Projetos demonstrativos de Recife (Orla de Boa Viagem, 4.200 m²) e Caruaru (Parque Linear Capibaribe, 2.500 m²), metragens geradas no Copiloto. |

---

## 3. Arquitetura da Plataforma de Serviços Digitais (4 Camadas)

O VIRA OS estrutura-se como uma plataforma de serviços em 4 camadas desacopladas e auditáveis:

```
┌────────────────────────────────────────────────────────────────────────┐
│ CAMADA 1: PRODUTO (Client Cockpit)                                     │
│ Workspace UI • Project Engine UI • Copiloto de IA • Comparador • DPP   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ CAMADA 4: APIs & CONTRATOS DIGITAIS (services.js)                      │
│ /materials • /specifications • /compliance • /acv • /projects • /bim   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ CAMADA 3: SERVIÇOS DE DOMÍNIO (Domain Services)                        │
│ Specification • Compliance • Analytics • Export • Search • AI Service  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ CAMADA 2: DADOS (Engineering Knowledge Base)                           │
│ Produtos • Normas ABNT/ISO • Ensaios IPT • Memoriais • Modelos BIM/CAD │
└────────────────────────────────────────────────────────────────────────┘
```

### Detalhamento das 4 Camadas

1. **Camada 1 — Produto (`workspace.html`, `workspace.js`):** O ambiente visual de trabalho do engenheiro, com persistência local sem atrito (`localStorage`), alternância de abas contextuais e interface de comando.
2. **Camada 2 — Dados (`EngineeringKnowledgeBase` em `services.js`):** Repositório único, padronizado e auditado com rastreabilidade formal por Engineering ID e Data Tier.
3. **Camada 3 — Serviços de Domínio (`ViraServices` em `services.js`):** Lógica de negócios desacoplada em 7 serviços independentes (`specificationService`, `complianceService`, `analyticsService`, `exportService`, `searchService`, `knowledgeService`, `aiService`).
4. **Camada 4 — APIs Uniformes (`ViraApi` em `services.js`):** Interface de contratos com respostas envelopadas com metadados de governança (`_governance`), preparando o sistema para integrações com ERPs, plataformas BIM (plugins Revit/ArchiCAD) e portais de compras governamentais.

---

## 4. Histórico de Evolução do Projeto

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

## 5. Sprints Concluídos & Homologados

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

### [✓] Sprint V4.0: Formalização do VIRA OS & Plataforma de Serviços (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO.
- Formalização dos **8 Motores de Engenharia** (Project, Specification, Comparison, Compliance, Universal Launcher, Copilot, Analytics, DPP).
- Implementação de `services.js` (Camada 2 de Dados, Camada 3 de Serviços e Camada 4 de APIs).
- Classificação estrita de Dados em 3 Tiers (Homologado, Meta de Produto, Exemplo Ilustrativo).
- Declaração explícita de Governança de Dados no Exportador de Cadernos e Projetos Demonstrativos.

---

## 6. ROADMAP ESTRATÉGICO OFICIAL (V4.1 A V5)

| Release | Nome do Módulo | Escopo & Entregas de Engenharia |
|---|---|---|
| **V4.1** | **VIRA Academy Especializada** | Não apenas cursos, mas **trilhas de capacitação por perfil**: (1) Engenheiros de Infraestrutura Urbana, (2) Arquitetos & Paisagistas, (3) Gestores Públicos de Planejamento, (4) Fiscais de Contratos da Lei 14.133/2021. |
| **V4.2** | **Mapa Operacional de Obras** | Mais do que um mapa institucional: cada ponto georreferenciado abre um **Workspace próprio da obra**, com pranchas executivas, fotos de canteiro, dados de assentamento e quantitativos reais de CO2e evitado. |
| **V4.3** | **Painel ESG Municipal & Corporativo** | Dashboards executivos consolidados com relatórios de sustentabilidade por município, indicadores de desvio de aterro e métricas alinhadas ao GHG Protocol e ODS da ONU. |
| **V4.4** | **Portal do Parceiro** | Acesso segmentado com perfis e ferramentas dedicadas para: Construtoras (medições e canteiro), Prefeituras (editais e fiscalização), Projetistas (plugins e memoriais) e Universidades (pesquisa e laudos). |
| **V5.0** | **Integrações de Ecossistema** | Conectores externos: Plugins BIM (Autodesk Revit / Graphisoft ArchiCAD), integração com ERPs de obras (Sienge/Totvs), portais de compras públicas e telemetria IoT da planta fabril de Caruaru em tempo real. |

---

## 7. ESTRATÉGIA DE ADOÇÃO: PROGRAMA PILOTO DE ESPECIFICADORES CIRCULARES (PPEC)

A fase de expansão de código atinge sua maturidade. O foco estratégico passa a ser a **validação e adoção real com usuários em campo**.

### Metodologia do Piloto
1. **Grupo Focal Selecionado:** 10 a 15 profissionais reais convidados:
   - 4 Engenheiros civis de Secretarias de Infraestrutura Municipal.
   - 4 Arquitetos e urbanistas de escritórios de projetos urbanos.
   - 3 Fiscais de obras e contratos da administração pública.
   - 2 Consultores de certificação ambiental (LEED / AQUA-HQE).
2. **Ciclos de Sessões Assistidas:** Acompanhar a especificação real de um projeto do zero e mensurar pontos de atrito.

### Indicadores de Sucesso em Campo (Métricas de Adoção)
- **Tempo Médio para Gerar Memorial:** Meta $< 3$ minutos (vs dias no modelo manual).
- **Tempo para Localizar Norma/Laudo:** Meta $< 30$ segundos via Command Launcher (`⌘K`).
- **Taxa de Reutilização de Projetos:** Percentual de componentes reutilizados entre estudos de caso.
- **Volume e Tipologia de Exportações:** Monitoramento dos perfis mais demandados (Licitação vs Canteiro vs ESG).
- **Taxa de Retenção e Frequência de Uso:** Retorno semanal dos profissionais ao Workspace.
