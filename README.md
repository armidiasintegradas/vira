# AR OS — Plataforma Tecnológica Corporativa
## Holding: AR Mídias Integradas

> **Definição Institucional:**  
> **"Uma plataforma de infraestrutura digital para economia circular, engenharia e gestão ambiental."**

> **Lema Fundacional:**  
> *"AR OS é a plataforma tecnológica da AR Mídias Integradas. Toda aplicação do ecossistema deve ser construída sobre seus princípios, motores e contratos, preservando rastreabilidade, reutilização, governança e evolução contínua."*

---

## 1. Arquitetura em Camadas & Fluxo de Entrega

O AR OS estrutura-se em um fluxo hierárquico estrito que desacopla capacidades conceituais de implementações verticais:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NÍVEL 1: AR OS FOUNDATION                       │
│  Platform Constitution (15 Artigos) • Manifesto • RFCs • ADRs • CLI    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        NÍVEL 2: AR OS SERVICES                         │
│  Capabilities ──> 11 Bounded Contexts (DDD) ──> Motores Especializados │
│  EventBus Versionado (.v1/.v2) • Feature Flags • Job Queue com SLAs    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                      NÍVEL 3: AR OS APPLICATIONS                       │
│    VIRA OS    •    VERDIS OS    •    REPLASTICANDO    •    MUTA OS     │
└────────────────────────────────────────────────────────────────────────┘
```

### O Desacoplamento de Valor:
```
Capabilities (Capacidades da Plataforma)
     ↓
Domains (11 Bounded Contexts do DDD)
     ↓
Services & Feature Flags (Motores Reutilizáveis & Ativação Dinâmica)
     ↓
Applications (Marcas Verticais: VIRA, Verdis, Replasticando, RecicloBike, MUTA)
```

---

## 2. Estrutura de Pacotes do Monorepo

- [`packages/ar-core/`](file:///packages/ar-core/):
  - **Capability Registry:** Catálogo institucional de capacidades da holding.
  - **Feature Flags Engine:** Ativação declarativa por marca (`vira`, `verdis`, etc.) e tenant municipal/corporativo sem alteração no núcleo.
  - **11 Bounded Contexts:** Engenharia, Projetos, Compliance, Conhecimento, Academy, Analytics, Identidade, Materiais, Governança, Colaboração e Integrações.
  - **EventBus:** Barramento corporativo versionado com checksum determinístico.
- [`packages/ar-design-system/`](file:///packages/ar-design-system/): Tokens semânticos multi-marca (`tokens.css`) e alternador reativo de temas.
- [`packages/ar-api/`](file:///packages/ar-api/): Contratos canônicos OpenAPI 3.1 com envelope mandatório de governança.
- [`packages/ar-backend/`](file:///packages/ar-backend/): Migrações PostgreSQL / Supabase 16+, RLS, PostGIS, pgvector e filas com SLAs (`Critical`, `Normal`, `Background`, `Scheduled`).
- [`packages/ar-sdk/`](file:///packages/ar-sdk/): Clientes oficiais em TypeScript/JavaScript (`@ar-platform/sdk`) e Python (`ar_platform_sdk`).
- [`packages/ar-cli/`](file:///packages/ar-cli/): Linha de comando oficial (`ar`) para diagnósticos, auditorias, validação e benchmarks.
- [`docs/`](file:///docs/): Governança institucional estável, RFCs, ADRs e histórico de releases.

---

## 3. Interface de Linha de Comando (`ar` CLI)

```bash
# Diagnóstico completo de saúde da infraestrutura
node packages/ar-cli/bin/ar.js doctor --verbose

# Validação estrita de contratos OpenAPI, schemas JSON e integridade de UUIDs
node packages/ar-cli/bin/ar.js validate

# Execução de benchmarks de cálculo paramétrico e mensageria
node packages/ar-cli/bin/ar.js benchmark

# Exibição do estado consolidado da plataforma
node packages/ar-cli/bin/ar.js status
```

---

## 4. Testes Automatizados Contínuos

A plataforma conta com suíte automatizada sequencial assíncrona com 100% de cobertura nos motores críticos:
```bash
node test/core_test.js
```

---

## 5. Governança e Estratégia Institucional

- 📘 **[AR OS Handbook (O Guia Mestre da Plataforma)](file:///docs/AR_OS_HANDBOOK.md)** — O índice e ponto de entrada oficial para novos engenheiros e operadores.

A documentação do AR OS divide-se formalmente entre **Documentação Estável** e **Histórico de Releases**:

### Documentação Institucional (Estável):
- [Platform Constitution (15 Artigos em Vigor)](file:///docs/PLATFORM_CONSTITUTION.md)
- [Platform Manifesto & 5 Vetores de Decisão](file:///docs/PLATFORM_MANIFESTO.md)
- [Architecture Overview & 11 Domínios DDD](file:///docs/architecture/ARCHITECTURE_OVERVIEW.md)
- [Arquitetura de Operação & SRE](file:///docs/operations/OPERATIONAL_ARCHITECTURE.md)
- [Roadmap de Três Horizontes da Holding](file:///docs/strategy/THREE_HORIZONS_ROADMAP.md)
- [Matriz de Reuso da Plataforma](file:///docs/platform/AR_PLATFORM_MATRIX.md)
- [Architecture Decision Records (ADRs 001 a 005)](file:///docs/adr/)
- [Request for Comments (RFCs 000 e 001)](file:///docs/rfc/)

### Histórico de Releases & Migrações:
- [Notas Oficiais de Release (Changelog Canônico)](file:///docs/releases/RELEASE_NOTES.md)
