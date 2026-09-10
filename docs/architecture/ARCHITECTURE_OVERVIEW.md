# AR OS 1.0 — Architecture Overview & Domain-Driven Design
## AR Mídias Integradas • Plataforma Tecnológica Corporativa

---

## 1. Visão Macro da Arquitetura

O **AR OS 1.0** é estruturado segundo os princípios de **Domain-Driven Design (DDD)** e **Event-Driven Architecture (EDA)**, dividindo a responsabilidade da plataforma em 9 contextos delimitados (Bounded Contexts) e desacoplando o núcleo de serviços das aplicações cliente:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   APLICAÇÕES CLIENTE (VERTICALS)                       │
│      VIRA OS  •  VERDIS OS  •  REPLASTICANDO  •  RECICLOBIKE  •  MUTA   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (SDK / REST API)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    AR OS API GATEWAY & CONTRATOS                       │
│          Public API     •     Partner API     •     Internal API       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    AR EVENT BUS (ASSÍNCRONO & PUB/SUB)                 │
│  ProjectCreated • MaterialAdded • ReportGenerated • DppVerified        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│               BOUNDED CONTEXTS (DOMÍNIOS DE DOMAIN-DRIVEN DESIGN)       │
│                                                                        │
│  1. EngineeringDomain   (Cálculo mecânico, fck, tensões de subleito)    │
│  2. ProjectsDomain      (Gestão de intervenções, memoriais, orçamentos)│
│  3. ComplianceDomain    (Verificação de conformidade NBR/ISO e laudos) │
│  4. KnowledgeDomain     (Knowledge Graph de normas, leis e estudos)    │
│  5. AcademyDomain       (Trilhas formativas, módulos e certificações)  │
│  6. AnalyticsDomain     (Métricas de descarbonização, ACV, telemetria) │
│  7. IdentityDomain      (Tenants, perfis, órgãos, autenticação e RLS)  │
│  8. MaterialsDomain     (Catálogo de compósitos, fichas e densidades)  │
│  9. GovernanceDomain    (Auditoria, checksums, DPPs e blockchain-ready)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│               PERSISTÊNCIA, QUEUES & WORKERS DE EXECUÇÃO               │
│  PostgreSQL 16+ • Supabase RLS • PostGIS • pgvector • Asynchronous Jobs│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Catálogo Canônico de Eventos de Domínio

Toda transição de estado significativa emite um evento no **AR Event Bus**:

1. `ProjectCreated`: Emitido quando um anteprojeto ou obra é cadastrado.
2. `MaterialAdded`: Emitido ao adicionar insumos ou metragem a um projeto.
3. `SpecificationApproved`: Emitido ao validar as exigências de edital (Lei 14.133).
4. `ReportGenerated`: Emitido na emissão de laudo de conformidade ou caderno técnico.
5. `ExportCompleted`: Emitido após download de CSV, TXT ou JSON auditado.
6. `DppVerified`: Emitido quando o QR Code de um lote fabril é inspecionado em canteiro.
7. `CertificateIssued`: Emitido na homologação de conclusão de trilha na Academy.

---

## 3. Matriz de Bounded Contexts & Responsabilidades

| Domínio | Entidades Principais | Serviços de Domínio | Eventos Publicados |
|---|---|---|---|
| **Engineering** | StressTensor, SubgradeLayer, CompressiveStrength | `MechanicalCalculationService` | `StructuralCapacityChecked` |
| **Projects** | Project, ProjectItem, QuantitySchedule | `ProjectLifecycleService` | `ProjectCreated`, `ProjectUpdated` |
| **Compliance** | ComplianceCheck, StandardClause, LabProtocol | `StandardAuditService` | `SpecificationApproved` |
| **Knowledge** | KnowledgeNode, GraphEdge, DigitalDocument | `GraphSearchService` | `KnowledgeIndexed` |
| **Academy** | Track, Module, ProfessionalCertificate | `CertificationService` | `CertificateIssued` |
| **Analytics** | CarbonFootprint, MitigationIndex, TelemetryEvent | `LcaEvaluationService` | `MetricsAggregated` |
| **Identity** | Tenant, Profile, RolePermission | `AccessControlService` | `UserAuthenticated` |
| **Materials** | CompositeSolution, PhysicalProperty, Mixture | `MaterialCatalogService` | `MaterialRegistered` |
| **Governance** | AuditLogEntry, DigitalProductPassport (DPP) | `IntegrityAuditService` | `DppVerified`, `AuditEntryLogged` |
