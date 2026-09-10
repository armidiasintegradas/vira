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

### [✓] Sprint Core Stabilization: Desacoplamento de Dados, Versionamento V4, Multi-Exportação & Audit Trail (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO.
- **Desacoplamento Canônico de Dados:** Criação do diretório `/data` com schemas JSON isolados (`projects.demo.json`, `materials.json`, `standards.json`, `laws.json`, `reports.json`).
- **Versionamento de Schema (V4):** Armazenamento sob `VIRA_PROJECTS_STORE_V4` com envelope `{ schemaVersion: 4, updatedAt, projects }` e rotina de migração transparente para dados herdados da V3.
- **Identificadores Criptográficos:** Geração de identificadores com `crypto.randomUUID()` (RFC 4122 v4) eliminando timestamps previsíveis.
- **Exportação Multi-Formato:** Adição de exportadores nativos para planilhas (`.csv` com UTF-8 BOM e totais consolidados) e memoriais estruturados em texto simples (`.txt`).
- **Trilha de Auditoria Imutável (Audit Trail Engine):** Registro automático e cronológico de cada ação (criação, edição, itens, exportações) com timestamp, autor e checksum de não-repúdio, renderizado diretamente no Workspace.
- **Motor de Telemetria de Produto (`ViraTelemetry`):** Rastreamento de métricas reais de eficiência (TTS, TTB, TTE), uso (documentos e normas mais acessados) e qualidade.
- **Arquitetura de Stores (`ViraStore`):** Encapsulamento modular em `ProjectStore`, `KnowledgeStore`, `UIStore`, `UserStore` e `TelemetryStore`, preparando a futura migração para persistência em banco de dados remoto (V5).
- **Suíte de Testes Automatizados (`test/core_test.js`):** 16/16 testes unitários automatizados passando com 100% de sucesso (CRUD, migração V3->V4, colisões de UUID, cálculos, audit trail e telemetria).

### [✓] Sprint V4.1: VIRA Academy Especializada & Onboarding dos Design Partners (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO.
- **Estruturação Canônica (`/data/academy.json`):** Criação da base desacoplada de dados para as 4 trilhas especializadas:
  1. *Engenheiro Civil:* Dimensionamento estratigráfico (NBR 15953), comportamento mecânico fck 38,2 MPa (NBR 9781) e imunidade a maresia/salinidade (absorção < 0,05%).
  2. *Arquiteto & Paisagista:* Albedo e mitigação de ilhas de calor (SRI 42 / ASTM E1980), rotas acessíveis sem trepidação (NBR 9050) e modelagem BIM paramétrica LOD 350 (Revit / IFC 4.3).
  3. *Gestor Público:* Princípio da sustentabilidade (Art. 11, IV da Lei 14.133/2021), julgamento por Custo de Ciclo de Vida (LCC - Art. 34) e metas municipais ESG / inventário de ACV (ISO 14044).
  4. *Fiscal de Obras:* Recebimento formal de lote em canteiro com QR Code / ART, plano de amostragem RBC (NBR 9781 Anexo A) e critérios de medição provisória / glosa (Art. 140 da Lei 14.133).
- **Serviço de Domínio (`academyService` em `services.js`):** Métodos `getTracks()` e `getTrackByRole(role)` integrados ao ecossistema unificado `ViraServices` e `ViraStore`.
- **Interface Interativa do Workspace (`workspace.js`):**
  - Seletor de 4 trilhas com atualização reativa de UI (`selectAcademyTrack`).
  - Renderização detalhada dos 3 módulos com tags normativas e evidências laboratoriais acreditadas (IPT).
  - Entregáveis técnicos com download direto de minutas e modelos estruturados (`downloadAcademyDeliverable`).
  - Modal de Certificação Profissional (`openCertificateModal` / `generateCertificate`) com geração de protocolo de autenticidade criptográfica (`#VRA-CERT-XXXXXXXX`), habilitando comprovantes para conselhos de classe (CREA / CAU).
  - Deep linking e persistência de trilha via query parameter `?tab=academy&role=...`.
- **Suíte de Testes Automatizados Expandida (`test/core_test.js`):** 9 suítes e **18/18 testes unitários passando com 100% de aprovação**, garantindo a integridade dos dados e das rotinas da Academy.

---

## 6. TRANSIÇÃO DE CICLO: VIRA OS — EARLY ACCESS PROGRAM (DESIGN PARTNERS)

Com o núcleo do VIRA OS declarado **funcionalmente estável**, encerra-se o ciclo de construção bruta de features e inicia-se o programa oficial de validação em campo:

### Distribuição Estratégica do Esforço da Equipe
| Área de Foco | Alocação de Esforço | Objetivo Operacional |
|---|---:|---|
| **Novas Funcionalidades** | **20%** | Apenas ajustes pontuais solicitados diretamente pelos parceiros. |
| **Estabilidade & Arquitetura** | **20%** | Manutenção de performance, testes contínuos e hardening do core. |
| **Conteúdo Técnico** | **30%** | Novos laudos IPT, cadernos de encargos de municípios e pranchas BIM. |
| **Validação com Usuários Reais** | **30%** | Sessões assistidas, mapeamento de atritos e cronometragem de uso. |

### Os 5 Perfis de Design Partners
1. **Construtora de Infraestrutura:** Validação de canteiro, logística de recebimento (NBR 15953) e facilidade de assentamento de pavers.
2. **Escritório de Arquitetura & Urbanismo:** Validação de paginações, modelos paramétricos BIM (Revit) e memorial paisagístico.
3. **Consultoria de Engenharia & Cálculo Estrutural:** Validação de memória de cálculo de subleito e resistência mecânica fck 38,2 MPa.
4. **Prefeitura Municipal (Secretaria de Obras):** Validação de minutas de edital, termo de referência e enquadramento na Lei 14.133/2021.
5. **Universidade / Centro de Pesquisas Tecnológicas:** Ensaios complementares de reologia polimérica e conforto térmico (albedo/SRI).

---

## 7. PAINEL DE INDICADORES DE PRODUTO (KPIs DE CAMPO)

O sucesso da plataforma é monitorado em tempo real por 3 dimensões objetivas:

### 1. Eficiência
- **Tempo para Especificar Material:** Meta $< 90$ segundos.
- **Tempo para Gerar Memorial (Lei 14.133):** Meta $< 60$ segundos.
- **Tempo para Exportar Pacote Completo (BIM + CAD + Laudo + CSV):** Meta $< 15$ segundos.

### 2. Uso Real
- **Documentos Mais Acessados:** Rastreamento de downloads de BIM (`VIRA-BIM-PAV-001`), laudos IPT (`VIRA-LAB-PAV-003`) e pranchas CAD.
- **Normas Mais Consultadas:** ABNT NBR 9781 vs Lei 14.133 vs NBR 9050.
- **Soluções Mais Especificadas:** Paver intertravado vs Fachada ventilada vs Perfis para mobiliário.

### 3. Qualidade & Governança
- **Projetos Criados & Concluídos:** Volume total de intervenções cadastradas por Design Partners.
- **Exportações Realizadas:** Quantidade de cadernos de encargos e planilhas orçamentárias baixadas.
- **Erros / Atritos Reportados:** Meta = 0 bugs impeditivos de especificação.

---

## 8. ROADMAP ESTRATÉGICO OFICIAL (V4.1 A V5)

| Release | Nome do Módulo | Status | Escopo & Entregas de Engenharia |
|---|---|---|---|
| **V4.1** | **VIRA Academy Especializada** | ✅ HOMOLOGADO | Trilhas de capacitação por perfil: (1) Engenheiros de Infraestrutura Urbana, (2) Arquitetos & Paisagistas, (3) Gestores Públicos de Planejamento, (4) Fiscais de Contratos da Lei 14.133/2021. 18 testes automatizados aprovados. |
| **V4.2** | **Mapa Operacional de Obras** | Planejado (Fase 5) | Cada intervenção urbana georreferenciada abre seu próprio Workspace de Obra com fotos de canteiro, dados de assentamento e quantitativos reais de CO2e evitado. |
| **V4.3** | **Painel ESG Municipal & Corporativo** | Planejado (Fase 5) | Dashboards consolidados de sustentabilidade por município, indicadores de desvio de aterro e relatórios GHG Protocol / ODS da ONU. |
| **V4.4** | **Portal do Parceiro** | Planejado (Fase 5) | Acessos segmentados: Construtoras (medições), Prefeituras (editais), Projetistas (plugins) e Universidades (pesquisa). |
| **V5.0** | **Plataforma Colaborativa Multi-Usuário** | Planejado (Fase 5) | Transição de `localStorage` para Supabase / PostgreSQL, autenticação governamental/corporativa, permissões por equipe, edição concorrente em tempo real, versionamento de projetos e plugins BIM nativos. |

---

## 9. FASE 5: INDUSTRIALIZAÇÃO (AR PLATFORM INITIATIVE)

Por determinação estratégica executiva, **a fase de desenvolvimento bruto do VIRA OS é oficialmente encerrada**, declarando o software funcionalmente maduro além do estágio de MVP.

A tecnologia é formalmente transferida como **ativo proprietário da holding AR Mídias Integradas**, inaugurando o programa:

> **AR Platform Initiative**
> *"Transformar o VIRA OS na primeira implementação de um núcleo tecnológico reutilizável da AR Mídias Integradas, capaz de alimentar VIRA, Verdis, Replasticando, RecicloBike, MUTA e futuros produtos sem que cada um precise começar do zero."*

### 1. A Nova Divisão de Duas Camadas
- **AR OS (Camada de Plataforma & Framework):** Motores (Project, Compliance, Specification, Academy, Analytics, Copilot, DPP, Comparison), Knowledge Graph, Application Store, Trilha de Auditoria com checksums, Design System agnóstico e Telemetria.
- **VIRA OS (Implementação Vertical):** Conteúdo executivo, laudos acreditados IPT, normas ABNT de compósitos, catálogo de pavers/painéis e Academy de infraestrutura urbana.

### 2. Estrutura dos 5 Novos Repositórios Institucionais
1. `ar-docs` / `vira-docs`: Documentação técnica, RFCs, ADRs e cadernos de governança.
2. `ar-api` / `vira-api`: Contratos digitais, OpenAPI 3.1, envelopes padronizados com `_governance`.
3. `ar-backend` / `vira-backend`: Supabase, PostgreSQL 16+, PostGIS, pgvector, migrações SQL e RLS.
4. `ar-sdk` / `vira-sdk`: Clientes oficiais em TypeScript, Python e plugins nativos BIM (Revit/ArchiCAD).
5. `ar-design-system` / `vira-design-system`: Design System corporativo multi-marca desacoplado de produtos individuais.

### 3. Governança Formal: RFCs & ADRs Ativos
- **Ciclo de Engenharia:** `RFC` $\to$ `Discussão / Peer Review` $\to$ `Arquitetura (ADR)` $\to$ `Implementação` $\to$ `Homologação`.
- **ADRs Registrados:**
  - `ADR-001`: Adoção do Supabase / PostgreSQL como Backend Canônico da Plataforma.
  - `ADR-002`: Adoção de Identificadores Universais Criptográficos (RFC 4122 v4 UUID).
  - `ADR-003`: Modelagem em Knowledge Graph de Evidências Técnicas.
  - `ADR-004`: Implementação do Passaporte Digital de Produto (DPP).
  - `ADR-005`: Arquitetura de Workspace Centrada em Projetos.
- **RFCs Registradas:**
  - `RFC-000`: Processo de Governança de RFCs na AR Mídias Integradas.
  - `RFC-001`: AR Platform Initiative & Desacoplamento Corporativo da Plataforma.

### 4. P&D Experimental: VIRA LABS (AR LABS)
Ambiente de testes e validação empírica com regra de ouro institucional: *"Nada entra em produção sem passar pelo laboratório"*. Linhas ativas: IA Generativa de Editais, Computer Vision de Canteiro, IoT de Desgaste e Digital Twin Urbano.

---

## 10. MARCO HISTÓRICO: AR OS 1.0 & PLATFORM CONSTITUTION

Em 10 de Setembro de 2026, com o congelamento do VIRA OS v4.1 (Tag Git `v4.1.0`), é formalmente promulgado o **AR OS 1.0**, consolidando a transição da AR Mídias Integradas para empresa de plataforma tecnológica:

1. **Platform Constitution Promulgada ([`docs/PLATFORM_CONSTITUTION.md`](file:///Users/alexribeiro/.gemini/antigravity/scratch/projeto-vira-otherhalf/docs/PLATFORM_CONSTITUTION.md)):** 10 artigos inegociáveis de governança de dados, imutabilidade, contratos de API e independência de domínios.
2. **Domain-Driven Design (9 Contextos Delimitados):** `Engineering`, `Projects`, `Compliance`, `Knowledge`, `Academy`, `Analytics`, `Identity`, `Materials`, `Governance`.
3. **Barramento de Eventos Corporativo ([`eventBus.js`](file:///Users/alexribeiro/.gemini/antigravity/scratch/projeto-vira-otherhalf/packages/ar-core/events/eventBus.js)):** Arquitetura orientada a eventos (`ProjectCreated`, `MaterialAdded`, `SpecificationApproved`, `DppVerified`, `CertificateIssued`).
4. **Camada de Filas & Workers Assíncronos ([`jobQueue.js`](file:///Users/alexribeiro/.gemini/antigravity/scratch/projeto-vira-otherhalf/packages/ar-backend/workers/jobQueue.js)):** Execução em background para geração de PDFs, vetorização de normas para IA e telemetria.
5. **AR CLI Oficial ([`bin/ar.js`](file:///Users/alexribeiro/.gemini/antigravity/scratch/projeto-vira-otherhalf/packages/ar-cli/bin/ar.js)):** Ferramenta de linha de comando para inspeção de plataforma, catálogo e validação de DPPs.
6. **Suíte Automatizada Blindada:** 16 suítes e **26/26 testes unitários passando com 100% de sucesso** em `test/core_test.js`.



