# AR OS & VIRA OS — NOTAS OFICIAIS DE RELEASE (CHANGELOG)
## Histórico Versionado de Entregas da AR Mídias Integradas

Documento dinâmico de acompanhamento de versões estáveis, novidades, correções, migrações de dados e alterações com impacto retroativo (breaking changes).

---

## [AR OS 1.0.0] — 10/09/2026
### *A Plataforma Corporativa da AR Mídias Integradas*

#### ⭐ Principais Novidades
- **Instituição do AR OS:** Elevação da base de código a plataforma proprietária da holding AR Mídias Integradas.
- **Estrutura em 3 Camadas:** AR OS Foundation, AR OS Services e AR OS Applications.
- **Capability Registry (`packages/ar-core/capabilities/`):** Camada formal de abstração (*Capabilities -> Domains -> Services -> Applications*), desacoplando a entrega de valor de aplicações específicas.
- **Feature Flags Engine (`packages/ar-core/features/`):** Motor declarativo para habilitação e desabilitação dinâmica de módulos por marca (`vira`, `verdis`, `replasticando`, `reciclobike`, `muta`) e tenant municipal sem bifurcação de código.
- **Domain-Driven Design (11 Bounded Contexts):** Adicionados os domínios `CollaborationDomain` (presença e locks concorrentes) e `IntegrationsDomain` (exportação BIM IFC4 e webhooks governamentais SEI).
- **EventBus Versionado:** Suporte nativo a eventos `.v1` e `.v2` (`ar.domain.projects.created.v1`) com barramento dotado de fallback inteligente para ouvintes de tópicos legados.
- **Background Workers com Gestão de SLAs:** Implementação de fila prioritária (*Priority Queue*) com 4 tiers de SLA: `Critical (< 2s)`, `Normal (< 30s)`, `Background (< 5m)` e `Scheduled (< 1h)`.
- **AR CLI Oficial (`ar`):** Interface de linha de comando corporativa com os subcomandos `status`, `doctor`, `validate`, `benchmark`, `materials` e `dpp`.
- **Platform Constitution (15 Artigos):** Promulgação dos Artigos 11º a 15º cobrindo retrocompatibilidade, observabilidade, proibição de segredos no front-end, documentação obrigatória e depreciação governada.
- **Platform Manifesto:** Registro dos 5 vetores de decisão (*Qualidade, Rastreabilidade, Transparência, Reutilização e Longevidade*).

#### 🔄 Migrações & Dados
- Adoção dos esquemas canônicos em `packages/ar-backend/supabase/migrations/` (001 a 005) cobrindo PostgreSQL 16+, RLS, PostGIS e pgvector.
- Contratos de API homologados em OpenAPI 3.1 com schema mandatório `GovernanceEnvelope`.

#### 🧪 Validação Automatizada
- 34/34 testes unitários automatizados cobrindo 17 suítes com 100% de sucesso (`node test/core_test.js`).

---

## [VIRA OS v4.1.0] — 09/09/2026
### *VIRA Academy & Fechamento do Ciclo de Produto Isolado (Tag Frozen)*

#### ⭐ Principais Novidades
- **VIRA Academy Especializada:** 4 trilhas de formação com 3 módulos cada para Engenheiros de Obra, Arquitetos e Urbanistas, Gestores Municipais e Fiscais de Contratos.
- **Emissão de Certificados Digitais:** Assinatura criptográfica determinística (`#VRA-CERT-...`) e validação de autenticidade.
- **Integração Normativa Fina:** Enquadramento explícito de cada módulo à Lei Federal 14.133/2021 e normas ABNT.
- **Congelamento do Ciclo MVP:** Aplicação da tag Git permanente `v4.1.0`.

---

## [VIRA OS v4.0.0] — 05/09/2026
### *Operating System de Serviços Digitais & Governança de Dados*

#### ⭐ Principais Novidades
- **Tiers de Governança de Dados:** Separação explícita entre *Tier 1 (Dado Homologado)*, *Tier 2 (Meta de Produto)* e *Tier 3 (Exemplo Ilustrativo)*.
- **Extração Canônica para `/data`:** Desacoplamento de dados estáticos para arquivos JSON universais (`materials.json`, `standards.json`, `reports.json`, `projects.demo.json`, `academy.json`).
- **Identificadores Criptográficos RFC 4122 v4:** Eliminação de IDs legados e injeção automática de UUIDs v4 com garantia de zero colisão.
- **Migração Automática de Armazenamento:** Implementação de `schemaVersion: 4` e rotina transparente de migração de projetos legados do `localStorage` V3 para V4.
- **Trilha de Auditoria Imutável (Audit Trail):** Registro de eventos operacionais com hash SHA-256 de integridade e ator responsável.
- **Telemetria de Produto (`ViraTelemetry`):** Indicadores de tempo até especificação (TTS) e conversão de editais.
- **Suíte de Testes Automatizados:** Criação do runner de testes unitários contínuo `test/core_test.js`.

---

## [VIRA OS v3.0.0] — 25/08/2026
### *Engineering Workspace & Especificação Centrada em Projetos*

#### ⭐ Principais Novidades
- **Workspace Centrado em Projetos:** Transição de catálogo de produtos para ambiente de trabalho e montagem de cadernos de encargos.
- **Motor Paramétrico de Projetos (`projectEngine.js`):** Cálculo automatizado de quantitativos de área, densidade, custo estimado e mitigação de pegada de carbono.
- **Exportação Multi-Formato:** Geração de planilhas CSV estruturadas e memoriais descritivos normativos em TXT para anexação em editais.

---

## [VIRA v2.0.0] — 10/08/2026
### *Centro de Especificação Técnica & Knowledge Graph*

#### ⭐ Principais Novidades
- **Knowledge Graph de Engenharia:** Conexão entre laudos do IPT (nº 1.104.921-A), ensaios de compressão axial e requisitos da NBR 9781.
- **Validador de Conformidade Técnica:** Verificação de resistências mínimas ($f_{ck} \ge 35\text{ MPa}$).

---

## [VIRA v1.0.0] — 20/07/2026
### *Plataforma Institucional & Design System Foundation*

#### ⭐ Principais Novidades
- Lançamento inicial da plataforma digital institucional.
- Definição das diretrizes visuais Blueprint e acessibilidade WCAG AA.
- Apresentação inicial do compósito circular VIRA.
