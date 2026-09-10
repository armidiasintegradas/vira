# AR OS — ROADMAP DE TRÊS HORIZONTES
## Planejamento Estratégico Corporativo • AR Mídias Integradas

**Definição:** Uma plataforma de infraestrutura digital para economia circular, engenharia e gestão ambiental.  
**Horizonte Temporal:** 2026 – 2029  
**Princípio Orientador:** O núcleo da plataforma (AR OS Foundation & Services) evolui de forma independente das aplicações verticais, garantindo reutilização, previsibilidade de custo e perenidade técnica.

---

```
  HORIZONTE 1: CONSOLIDAÇÃO           HORIZONTE 2: ECOSSISTEMA            HORIZONTE 3: PLATAFORMA
       (0 a 6 meses)                      (6 a 18 meses)                     (18 a 36 meses)
┌─────────────────────────┐         ┌─────────────────────────┐         ┌─────────────────────────┐
│ • Supabase em Produção  │         │ • Verdis OS             │         │ • APIs Públicas Abertas │
│ • RLS & Autenticação    │         │ • Replasticando OS      │         │ • Marketplace Soluções  │
│ • Colaboração Real-Time │ ──────> │ • RecicloBike OS        │ ──────> │ • Plugins BIM (Revit)   │
│ • CI/CD & Observability │         │ • MUTA OS               │         │ • Conexão PNCP / Gov.br │
│ • SRE, Backups & PITR   │         │ • Gestão por Flags/Caps │         │ • IA Especializada RAG  │
└─────────────────────────┘         └─────────────────────────┘         └─────────────────────────┘
```

---

## Horizonte 1 — Consolidação (0 a 6 Meses)
*Foco: Operação resiliente, blindagem de dados, infraestrutura em nuvem e garantia de SLAs.*

1. **Supabase / PostgreSQL 16+ em Produção:**
   - Provisionamento de cluster gerenciado com alta disponibilidade.
   - Aplicação e validação estrita das 5 migrações canônicas (Schemas, RLS multi-tenant, PostGIS geográfico, pgvector e filas transacionais).
2. **Autenticação & Federação de Identidades:**
   - Single Sign-On (SSO) corporativo com suporte a OAuth2 / SAML.
   - Validação automatizada de registros profissionais em conselhos de classe (CREA/CAU) e integração Gov.br.
3. **Colaboração em Tempo Real (Presence Engine):**
   - Transição do mock de sessão para WebSockets/Supabase Realtime, viabilizando edição simultânea de pranchas e quantitativos com lock de revisão concorrente.
4. **Pipelines de CI/CD & Automação:**
   - Workflows no GitHub Actions executando a suíte `node test/core_test.js` e `ar doctor` a cada Pull Request.
   - Deploy contínuo automatizado com gates de aprovação constitucional.
5. **Observabilidade & SRE:**
   - Métricas de latência com monitoramento dos SLAs de Workers (`Critical < 2s`, `Normal < 30s`, `Background < 5m`, `Scheduled < 1h`).
   - Auditoria de logs estruturados (Elastic/Grafana) para conformidade com a LGPD e Lei 14.133/2021.
6. **Política de Continuidade de Negócio:**
   - Backups automáticos contínuos com Point-in-Time Recovery (PITR) de 30 dias e replicação geográfica de dados e laudos IPT.

### Critérios Objetivos de Saída (Exit Criteria — Horizonte 1)
O Horizonte 1 será formalmente considerado homologado quando:
- [ ] **Autenticação Concluída:** SSO e isolamento RLS multi-tenant 100% operacionais em produção.
- [ ] **Observabilidade Ativa:** Dashboards de latência e SLAs de workers (`Critical < 2s`, `Normal < 30s`) implantados.
- [ ] **Backup & Restore Testados:** Simulação de recuperação de desastres via PITR homologada (RTO < 1h, RPO < 5min).
- [ ] **Colaboração Homologada:** Sessões concorrentes e travas de revisão operando em tempo real.

---

## Horizonte 2 — Ecossistema Multi-Marca (6 a 18 Meses)
*Foco: Escala transversal da holding sem duplicação de esforço de engenharia.*

1. **Instanciação das 4 Novas Aplicações Verticais:**
   - **Verdis OS:** Sistema operacional para infraestrutura verde, telhados biofílicos e jardins de chuva urbanos.
   - **Replasticando OS:** Gestão de logística reversa de polímeros, rastreabilidade de cooperativas e fardos industriais.
   - **RecicloBike OS:** Infraestrutura de mobilidade ativa sustentável, paraciclos inteligentes e ciclofaixas circulares.
   - **MUTA OS:** Plataforma de upcycling arquitetônico, mobiliário corporativo regenerativo e design circular.
2. **Operação Orientada a Capacidades e Flags:**
   - Cada aplicação herda 100% dos motores do `ar-core` através do `CapabilityRegistry` e parametriza seus módulos via `FeatureFlagService`.
   - Adição de novos materiais e propriedades no catálogo canônico sem alteração em código de aplicação.
3. **Economia de Escala Tecnológica:**
   - Um único aprimoramento no motor de conformidade ABNT ou no barramento de eventos beneficia simultaneamente todas as 5 marcas da holding.

### Critérios Objetivos de Saída (Exit Criteria — Horizonte 2)
O Horizonte 2 será formalmente considerado homologado quando:
- [ ] **Três Aplicações em Produção:** Pelo menos 3 marcas verticais (VIRA, Verdis, MUTA) operando sobre o mesmo núcleo sem forks.
- [ ] **Governança por Flags:** 100% da diferenciação de produtos gerida exclusivamente pelo Capability Registry e Feature Flags.

---

## Horizonte 3 — Plataforma Aberta & Terceiros (18 a 36 Meses)
*Foco: Tornar o AR OS o padrão de infraestrutura de mercado para contratação e engenharia circular.*

1. **APIs Públicas Federadas & Portal do Desenvolvedor:**
   - Exposição externa dos contratos OpenAPI 3.1 com controle de quotas, chaves de API e documentação interativa.
   - SDKs maduros e versionados para Python, TypeScript, Go e C# (.NET).
2. **Marketplace de Soluções & Especificações Circulares:**
   - Fabricantes parceiros e usinas de reciclagem podem homologar seus compósitos e emitir Passaportes Digitais de Produto (DPP) auditados pelo Inmetro.
3. **Plugins Nativos para Softwares de Engenharia (BIM/CAD/GIS):**
   - **Plugin Revit / Archicad:** Especificação direta de compósitos circulares em modelos BIM com cálculo em tempo real de crédito de carbono e resistência mecânica.
   - **Extensão QGIS:** Mapeamento de manchas urbanas pavimentadas e emissão de memoriais de loteamento.
4. **Integrações Nacionais Governamentais:**
   - Conector oficial com o **Portal Nacional de Contratações Públicas (PNCP)** e **Compras.gov.br** para inclusão automática de critérios de sustentabilidade (Art. 11, IV da Lei 14.133/2021).
   - Integração bidirecional com processos do **SEI** (Sistema Eletrônico de Informações).
5. **Inteligência Artificial Soberana em Engenharia:**
   - Agentes autônomos treinados estritamente sobre normas ABNT, acervo de teses do IPT e legislação nacional, eliminando risco de alucinação jurídica e técnica.

### Critérios Objetivos de Saída (Exit Criteria — Horizonte 3)
O Horizonte 3 será formalmente considerado homologado quando:
- [ ] **Integração Exclusiva por API/SDK:** Parceiros e terceiros integrados diretamente pelos contratos oficiais sem intervenção manual de engenharia.
- [ ] **Edital Público Integrado:** Conexão direta homologada em processo licitatório real através do PNCP ou SEI.
