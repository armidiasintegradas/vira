# AR OS HANDBOOK
## O Guia Mestre da Plataforma Tecnológica • AR Mídias Integradas

**Versão:** 1.0.0  
**Data de Publicação:** 10 de Setembro de 2026  
**Definição:** Uma plataforma de infraestrutura digital para economia circular, engenharia e gestão ambiental.  
**Público-Alvo:** Engenheiros de software, arquitetos de soluções, designers, gerentes de produto, operadores de SRE e lideranças executivas da AR Mídias Integradas e parceiros homologados.

---

```
┌────────────────────────────────────────────────────────────────────────┐
│                            AR OS HANDBOOK                              │
│                O Guia Canônico de Engenharia e Operação                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
   ┌────────────────────────────────┼────────────────────────────────┐
   │                                │                                │
┌──▼───────────────┐       ┌────────▼─────────┐             ┌────────▼───────┐
│ 01 a 03          │       │ 04 a 08          │             │ 09 a 12        │
│ FUNDAÇÃO         │       │ PLATAFORMA &     │             │ OPERAÇÃO,      │
│ Visão Geral,     │       │ ENGENHARIA       │             │ SEGURANÇA,     │
│ Constitution &   │       │ Arquitetura,     │             │ ROADMAP &      │
│ Manifesto        │       │ Capabilities,    │             │ PRODUTOS       │
│                  │       │ Domains, APIs,   │             │                │
│                  │       │ SDKs             │             │                │
└──────────────────┘       └──────────────────┘             └────────────────┘
```

---

## Índice Geral

1. [01. Visão Geral & Posicionamento Estratégico](#01-visão-geral--posicionamento-estratégico)
2. [02. Platform Constitution (15 Artigos Fundamentais)](#02-platform-constitution-15-artigos-fundamentais)
3. [03. Platform Manifesto & Os 5 Vetores de Decisão](#03-platform-manifesto--os-5-vetores-de-decisão)
4. [04. Arquitetura Geral & Desacoplamento em 4 Camadas](#04-arquitetura-geral--desacoplamento-em-4-camadas)
5. [05. Capability Registry](#05-capability-registry)
6. [06. Domain-Driven Design (11 Bounded Contexts) & EventBus](#06-domain-driven-design-11-bounded-contexts--eventbus)
7. [07. Contratos Digitais & APIs (OpenAPI 3.1)](#07-contratos-digitais--apis-openapi-31)
8. [08. SDKs Oficiais Multi-Linguagem](#08-sdks-oficiais-multi-linguagem)
9. [09. Arquitetura de Operação, SRE & SLAs](#09-arquitetura-de-operação-sre--slas)
10. [10. Segurança, RLS & Governança de Segredos](#10-segurança-rls--governança-de-segredos)
11. [11. Roadmap de Três Horizontes & Critérios de Saída](#11-roadmap-de-três-horizontes--critérios-de-saída)
12. [12. Catálogo de Aplicações Verticais do Ecossistema](#12-catálogo-de-aplicações-verticais-do-ecossistema)

---

## 01. Visão Geral & Posicionamento Estratégico

O **AR OS** é o sistema operacional tecnológico proprietário da **AR Mídias Integradas**. Ele transcende o conceito de software aplicativo ou portal isolado, constituindo uma **plataforma de infraestrutura digital para economia circular, engenharia e gestão ambiental**.

Toda e qualquer solução da empresa é construída sobre seu núcleo compartilhado, preservando princípios inegociáveis de rastreabilidade, cálculo mecânico auditado, conformidade pública e inteligência artificial soberana.

- **Documento Raiz:** [`README.md`](file:///README.md)
- **Matriz de Reuso Transversal:** [`docs/platform/AR_PLATFORM_MATRIX.md`](file:///docs/platform/AR_PLATFORM_MATRIX.md)

---

## 02. Platform Constitution (15 Artigos Fundamentais)

A **Platform Constitution** é a lei suprema e irrevogável que rege todo o desenvolvimento de código, contratos de API e infraestrutura da holding.

- **Status:** VINCULANTE & PERPÉTUO.
- **Destaques:**
  - **Artigo 1º:** Classificação universal em 3 Tiers de Governança (Homologado, Meta de Produto, Exemplo Ilustrativo).
  - **Artigo 3º:** Obrigatoriedade do `GovernanceEnvelope` em todas as APIs e exportações.
  - **Artigo 7º:** Blindagem por testes automatizados contínuos em pipelines de CI/CD.
  - **Artigo 10º:** Desacoplamento estrito entre domínios (comunicação exclusiva por API/EventBus).
  - **Artigo 11º:** Compatibilidade retroativa garantida para dados e especificações históricas.
  - **Artigo 13º:** Soberania e proibição absoluta de segredos ou chaves mestras no frontend.
- **Documento Completo:** [`docs/PLATFORM_CONSTITUTION.md`](file:///docs/PLATFORM_CONSTITUTION.md)

---

## 03. Platform Manifesto & Os 5 Vetores de Decisão

O Manifesto define a cultura técnica e a bússola ética da engenharia da AR Mídias Integradas:

> *"Nós não desenvolvemos aplicações. **Construímos plataformas.**"*  
> *"Nós não duplicamos soluções. **Criamos motores reutilizáveis.**"*  
> *"Nós não vendemos software. **Entregamos infraestrutura digital.**"*  
> *"Nós não armazenamos documentos. **Construímos conhecimento.**"*  
> *"Nós não utilizamos IA para substituir engenharia. **Utilizamos IA para amplificar engenharia.**"*

Toda decisão técnica deve maximizar os **5 Vetores:** **Qualidade**, **Rastreabilidade**, **Transparência**, **Reutilização** e **Longevidade**.
- **Documento Completo:** [`docs/PLATFORM_MANIFESTO.md`](file:///docs/PLATFORM_MANIFESTO.md)

---

## 04. Arquitetura Geral & Desacoplamento em 4 Camadas

O sistema operacional organiza-se no fluxo estrito de quatro responsabilidades:

1. **Capabilities (Capacidades da Plataforma):** Abstrações funcionais institucionais geridas pelo `CapabilityRegistry`.
2. **Domains (11 Bounded Contexts DDD):** Regras de negócio puras e isoladas.
3. **Services & Feature Flags (Motores Reutilizáveis):** Execução orquestrada com ativação declarativa e tolerância a falhas.
4. **Applications (Marcas Verticais):** Experiências de usuário especializadas (VIRA, Verdis, Replasticando, RecicloBike, MUTA).

- **Documento Completo:** [`docs/architecture/ARCHITECTURE_OVERVIEW.md`](file:///docs/architecture/ARCHITECTURE_OVERVIEW.md)
- **Decisões Arquiteturais Registradas:** [`docs/adr/`](file:///docs/adr/) (ADRs 001 a 005).

---

## 05. Capability Registry

O catálogo formal de capacidades institucionais da holding desacopla a tecnologia de qualquer aplicação individual.

- **Módulo:** [`packages/ar-core/capabilities/registry.js`](file:///packages/ar-core/capabilities/registry.js)
- **Capacidades Oficiais (11):**
  1. `auth_identity` (Autenticação, SSO e Perfis Técnicos)
  2. `structural_engineering` (Cálculo Mecânico e Dimensionamento de Pavimentos)
  3. `parametric_projects` (Workspace de Projetos e Quantitativos Auditados)
  4. `regulatory_compliance` (Auditoria NBR 9781 e Lei 14.133/2021)
  5. `knowledge_graph` (Grafo de Evidências Técnicas e Laudos IPT)
  6. `digital_product_passport` (Passaporte Digital de Produto - DPP)
  7. `carbon_lca_analytics` (Mitigação de Carbono e ACV ISO 14044)
  8. `technical_academy` (Capacitação e Certificação de Parceiros)
  9. `realtime_collaboration` (Colaboração Multiusuário e Locks Concorrentes)
  10. `bim_governmental_integrations` (Exportação IFC4 e Webhooks SEI)
  11. `circular_materials_catalog` (Catálogo Técnico de Matérias-Primas Circulares)

---

## 06. Domain-Driven Design (11 Bounded Contexts) & EventBus

- **Domínios Canônicos:** [`packages/ar-core/domains/index.js`](file:///packages/ar-core/domains/index.js)
- **EventBus Corporativo:** [`packages/ar-core/events/eventBus.js`](file:///packages/ar-core/events/eventBus.js)
  - Comunicação assíncrona orientada a eventos versionados (`ar.domain.projects.created.v1`).
  - Fallback inteligente para compatibilidade com ouvintes legados.
  - Checksum determinístico em cada publicação para trilha de auditoria.

---

## 07. Contratos Digitais & APIs (OpenAPI 3.1)

Todas as integrações externas e internas operam rigorosamente sobre a especificação canônica OpenAPI 3.1:

- **Especificação:** [`packages/ar-api/openapi.json`](file:///packages/ar-api/openapi.json)
- **Postman Collection Oficial:** [`packages/ar-api/ar_os_postman_collection.json`](file:///packages/ar-api/ar_os_postman_collection.json)
- **Padronização:** Toda resposta encapsula o schema mandatório `GovernanceEnvelope`.

---

## 08. SDKs Oficiais Multi-Linguagem

Para consumo corporativo e desenvolvimento de integrações:

- **SDK JavaScript / TypeScript:** [`packages/ar-sdk/js/`](file:///packages/ar-sdk/js/) (`@ar-platform/sdk` com tipagens completas).
- **SDK Python:** [`packages/ar-sdk/py/`](file:///packages/ar-sdk/py/) (`ar_platform_sdk` para automação governamental e análise de dados).

---

## 09. Arquitetura de Operação, SRE & SLAs

Diretrizes mandatórias para sustentação de produção, continuidade e confiabilidade:

- **SLA Tiers de Workers:**
  - `Critical` ($< 2\text{s}$): Assinaturas de integridade, autorizações e concorrência.
  - `Normal` ($< 30\text{s}$): Cadernos de licitação PDF e exportações.
  - `Background` ($< 5\text{min}$): Indexação pgvector e processamento em lote.
  - `Scheduled` ($< 1\text{h}$): Telemetria e consolidação analítica.
- **Continuidade de Negócio:** RPO $< 5\text{ min}$, RTO $< 30\text{ min}$ com PITR contínuo de 30 dias.
- **Documento Completo:** [`docs/operations/OPERATIONAL_ARCHITECTURE.md`](file:///docs/operations/OPERATIONAL_ARCHITECTURE.md)

---

## 10. Segurança, RLS & Governança de Segredos

- **Isolamento de Dados:** Row Level Security (RLS) mandatório no PostgreSQL 16+.
- **Integridade Criptográfica:** Todos os registros e lotes utilizam UUIDs v4 e hashes SHA-256.
- **Soberania de Segredos:** Proibição irrestrita de tokens de serviço no frontend.
- **Documento Completo:** [`docs/security/SECURITY_POLICY.md`](file:///docs/security/SECURITY_POLICY.md)

---

## 11. Roadmap de Três Horizontes & Critérios de Saída

O planejamento estratégico da plataforma é delimitado em três horizontes com critérios objetivos de conclusão:

- **Horizonte 1 (0 a 6 meses) — Consolidação:** Supabase em produção, RLS, SSO, colaboração realtime e PITR testado.
- **Horizonte 2 (6 a 18 meses) — Ecossistema:** Mínimo de 3 marcas da holding (VIRA, Verdis, MUTA) operando sobre o mesmo núcleo sem forks.
- **Horizonte 3 (18 a 36 meses) — Plataforma Aberta:** Terceiros e editais públicos integrados exclusivamente via APIs e SDKs.
- **Documento Completo:** [`docs/strategy/THREE_HORIZONS_ROADMAP.md`](file:///docs/strategy/THREE_HORIZONS_ROADMAP.md)

---

## 12. Catálogo de Aplicações Verticais do Ecossistema

As 5 marcas da holding que materializam o impacto da economia circular nas cidades:

1. **VIRA OS:** Pavimentação urbana contínua, infraestrutura circular e cadernos de encargos para licitações municipais (Lei 14.133/2021).
2. **Verdis OS:** Biofilia urbana, telhados verdes, parques ecológicos e jardins de chuva.
3. **Replasticando OS:** Logística reversa industrial de polímeros pós-consumo, gestão de fardos e rastreio de cooperativas.
4. **RecicloBike OS:** Infraestrutura de mobilidade ativa sustentável e ciclovias em compósito circular de alto tráfego.
5. **MUTA OS:** Mobiliário urbano regenerativo, upcycling arquitetônico e design circular corporativo.
