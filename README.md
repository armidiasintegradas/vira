# AR OS — Sistema Operacional de Engenharia Circular & Plataforma Tecnológica
## Holding: AR Mídias Integradas

> **"AR OS é a plataforma tecnológica da AR Mídias Integradas. Toda aplicação do ecossistema deve ser construída sobre seus princípios, motores e contratos, preservando rastreabilidade, reutilização, governança e evolução contínua."**

---

## 1. Arquitetura em Três Níveis

```
┌────────────────────────────────────────────────────────────────────────┐
│                        NÍVEL 1: AR OS FOUNDATION                       │
│  Platform Constitution (15 Artigos) • RFCs • ADRs • Core • EventBus   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        NÍVEL 2: AR OS SERVICES                         │
│  Engineering • Projects • Compliance • Knowledge • Academy • Analytics │
│  Identity • Materials • Governance • Collaboration • Integrations      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                      NÍVEL 3: AR OS APPLICATIONS                       │
│    VIRA OS    •    VERDIS OS    •    REPLASTICANDO    •    MUTA OS     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Estrutura de Pacotes do Monorepo

- [`packages/ar-core/`](file:///packages/ar-core/): Domínios DDD e Barramento de Eventos Versionados (`arEventBus`).
- [`packages/ar-design-system/`](file:///packages/ar-design-system/): Design System Multi-Marca e alternador de temas.
- [`packages/ar-api/`](file:///packages/ar-api/): Contratos OpenAPI 3.1 segmentados e Postman Collection oficial.
- [`packages/ar-backend/`](file:///packages/ar-backend/): Migrações PostgreSQL / Supabase, RLS, PostGIS, pgvector e filas de workers.
- [`packages/ar-sdk/`](file:///packages/ar-sdk/): Clientes oficiais em TypeScript/JavaScript e Python.
- [`packages/ar-cli/`](file:///packages/ar-cli/): Interface de linha de comando `ar` para diagnósticos e auditorias.
- [`docs/`](file:///docs/): Platform Constitution, Manifesto, RFCs e ADRs.

---

## 3. Interface de Linha de Comando (`ar` CLI)

```bash
# Diagnóstico completo de saúde da plataforma
node packages/ar-cli/bin/ar.js doctor --verbose

# Validação estrita de normas, DPPs e contratos
node packages/ar-cli/bin/ar.js validate

# Execução de benchmarks de performance e cálculo
node packages/ar-cli/bin/ar.js benchmark

# Estado geral do sistema e marcas ativas
node packages/ar-cli/bin/ar.js status
```

---

## 4. Testes Automatizados

O núcleo do AR OS é 100% coberto por testes unitários contínuos:
```bash
node test/core_test.js
```

---

## 5. Governança e Decisões Técnicas
Consulte a documentação oficial para compreender o racional de cada motor:
- [Platform Constitution (15 Artigos)](file:///docs/PLATFORM_CONSTITUTION.md)
- [Platform Manifesto](file:///docs/PLATFORM_MANIFESTO.md)
- [Architecture Overview & DDD](file:///docs/architecture/ARCHITECTURE_OVERVIEW.md)
- [Architecture Decision Records (ADRs 001 a 005)](file:///docs/adr/)
- [Request for Comments (RFCs 000 e 001)](file:///docs/rfc/)
- [Matriz de Reuso da Plataforma](file:///docs/platform/AR_PLATFORM_MATRIX.md)
