# RFC-001: AR Platform Initiative & Desacoplamento Corporativo da Plataforma
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Alex Ribeiro (CEO & Founder) & Principal Product Architect
- **Decisores:** Conselho Executivo da AR Mídias Integradas
- **Impacto:** Arquitetura Global da Holding • Todos os Produtos do Ecossistema

---

## 1. Sumário Executivo
Esta RFC formaliza a transição histórica do **VIRA OS** de um software/MVP isolado para a **Plataforma-Base Corporativa da AR Mídias Integradas**.
Estabelece a divisão da tecnologia em duas camadas desacopladas:
1. **AR OS (Camada de Plataforma & Framework):** O núcleo tecnológico reutilizável, composto pelos 8 motores de engenharia, arquitetura de stores, telemetria, governança, copiloto de IA e Design System agnóstico.
2. **Verticais de Negócio (Implementações Específicas):** Camadas verticais de aplicação para cada empresa do ecossistema:
   - **VIRA OS:** Pavimentação, compósitos de alta densidade, obras viárias e licitações (Lei 14.133);
   - **Verdis OS:** Soluções baseadas na natureza (NbS), recomposição florestal e ativos ambientais;
   - **Replasticando OS:** Gestão de resíduos industriais, triagem de cooperativas e créditos de logística reversa;
   - **RecicloBike OS:** Micro-logística reversa urbana, roteirização cicloviária e inclusão socioeconômica;
   - **MUTA OS:** Mobiliário urbano circular, design paramétrico e intervenções de urbanismo tático.

---

## 2. A Divisão em Duas Camadas: AR OS $\to$ Aplicações

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AR OS (PLATFORM CORE)                           │
│                      Ativo da AR Mídias Integradas                     │
├────────────────────────────────────────────────────────────────────────┤
│ • 8 Motores de Engenharia (Project, Compliance, Specification, etc.)    │
│ • Camada de Dados Canônicos (/data) & Modelagem Knowledge Graph        │
│ • Application Store & Adaptadores de Persistência (Local/Supabase)     │
│ • Motor de Telemetria de Eficiência, Uso e Qualidade                   │
│ • Trilha de Auditoria Imutável com Checksums Criptográficos             │
│ • Design System Canônico Multi-Marca (Tokens, Blueprint, Acessibilidade)│
│ • Infraestrutura de IA & Copilotos Técnicos Especializados             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│    VIRA OS    │           │   VERDIS OS   │           │ REPLASTICANDO │
│ Infraestrutura│           │ Restauração   │           │ Logística     │
│  & Compósitos │           │ & Clima       │           │   Reversa     │
└───────┬───────┘           └───────┬───────┘           └───────┬───────┘
        │                           │                           │
        └───────────────────────────┼───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            ┌───────────────┐               ┌───────────────┐
            │ RECICLOBIKE OS│               │    MUTA OS    │
            │ Micrologística│               │   Mobiliário  │
            │   Urbana      │               │     Urbano    │
            └───────────────┘               └───────────────┘
```

---

## 3. Os 5 Novos Repositórios Institucionais

Para industrializar a operação tecnológica e garantir independência de desenvolvimento, a base de código do VIRA OS é decomposta em 5 módulos/repositórios sob a organização `ar-midias-integradas`:

### 1. `ar-docs` (ou `vira-docs`)
- **Escopo:** Toda a documentação de engenharia, governança, arquitetura, RFCs e ADRs.
- **Conteúdo:** 
  - Livro de Arquitetura da Plataforma;
  - Caderno de Governança dos 3 Tiers de Dados;
  - Histórico de Sprints e Decisões Técnicas (ADRs 001 a 005);
  - Guias de onboarding para desenvolvedores e Design Partners.

### 2. `ar-api` (ou `vira-api`)
- **Escopo:** Especificação de contratos uniformes de API (OpenAPI 3.1 / Swagger).
- **Conteúdo:**
  - Contratos `/materials`, `/specifications`, `/compliance`, `/acv`, `/projects`, `/bim`, `/dpp`;
  - Envelopes padronizados com metadados de governança (`_governance`);
  - Tipagens estritas TypeScript para clientes externos.

### 3. `ar-backend` (ou `vira-backend`)
- **Escopo:** Camada central de persistência e serviços em nuvem.
- **Tecnologia:** Supabase, PostgreSQL 16+, PostGIS, pgvector.
- **Conteúdo:**
  - Migrações SQL versionadas;
  - Políticas de Row Level Security (RLS) multi-tenant;
  - Edge Functions para cálculos complexos e geração de PDFs/certificados;
  - Sincronização offline-to-online com o `ProjectStore`.

### 4. `ar-sdk` (ou `vira-sdk`)
- **Escopo:** Bibliotecas cliente oficiais para consumo da plataforma por terceiros.
- **Distribuições:**
  - `@ar-platform/sdk-js`: Pacote NPM para aplicações web e plugins;
  - `@ar-platform/sdk-py`: Pacote PyPI para análise de dados e integrações governamentais;
  - Plugins BIM nativos para Autodesk Revit e ArchiCAD.

### 5. `ar-design-system` (ou `vira-design-system`)
- **Escopo:** Design System unificado da AR Mídias Integradas.
- **Conteúdo:**
  - Tokens semânticos de cores, tipografia, espaçamento e elevação;
  - Suporte a temas dinâmicos (Tema VIRA: Forest Green; Tema Verdis: Leaf Green; Tema MUTA: Warm Terracotta);
  - Componentes agnósticos de framework (Web Components / Tailwind CSS);
  - Conformidade estrita WCAG AA e renderização blueprint técnica.

---

## 4. O Braço Experimental: VIRA LABS (ou AR LABS)
Fica formalizada a criação do laboratório de P&D avançado **VIRA LABS**:
- **Regra de Ouro:** *Nada entra em produção sem passar pelo laboratório.*
- **Linhas de Pesquisa Ativas:**
  1. **IA Generativa de Especificações:** Copilotos autônomos para análise de editais e geração de anteprojetos;
  2. **Computer Vision de Canteiro:** Leitura de imagens de celular para validação de paginação e conferência de juntas de assentamento (NBR 15953);
  3. **IoT & Sensores de Desgaste:** Integração com sensores embutidos em peças de teste na fábrica de Caruaru;
  4. **Digital Twin Urbano:** Integração entre modelos federados BIM IFC 4.3 e bases cartográficas abertas (OpenStreetMap).

---

## 5. Cronograma de Rollout da Fase 5

| Fase | Etapa | Entregas Principais |
|---|---|---|
| **5.1** | **Formalização & Estruturação** | Repositório `docs/` com RFCs e ADRs; matriz de reuso de plataformas. |
| **5.2** | **Desacoplamento do Design System** | Extração de `tokens.css` e estilos base em pacote de Design System corporativo multi-marca. |
| **5.3** | **API & Backend Cloud** | Configuração do projeto Supabase, schemas SQL e RLS com testes de migração. |
| **5.4** | **SDK & Plugins** | Publicação do SDK v1.0 para testes com os Design Partners da universidade e consultorias. |
| **5.5** | **Multi-Tenant Rollout** | Replicação do template AR OS para o primeiro piloto da segunda vertical (Verdis ou MUTA). |
