# ADR-001: Adoção do Supabase / PostgreSQL como Backend Canônico da Plataforma
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Principal Tech Lead & Architecture Team
- **Decisores:** Conselho de Tecnologia AR Mídias Integradas
- **Impacto:** AR OS Core, VIRA OS, Verdis, Replasticando, RecicloBike, MUTA

---

## 1. Contexto & Forças Motrizes
Nas Fases 0 a 4, o VIRA OS utilizou armazenamento local do navegador (`localStorage`) para viabilizar testes rápidos de usabilidade e prototipagem sem atrito de autenticação.
Contudo, para operar como um **Operating System de Engenharia Circular** corporativo e alimentar múltiplos produtos da **AR Mídias Integradas**, a plataforma necessita de:
- Persistência multiusuário com consistência estrita (ACID);
- Row Level Security (RLS) para isolamento entre prefeituras, consultorias e construtoras;
- Suporte a dados geoespaciais (PostGIS) para o Mapa Operacional de Obras (V4.2);
- Capacidades de busca vetorial (pgvector) para a inteligência de normas e copilotos técnicos;
- Camada de autenticação enterprise (SSO governamental / Gov.br, SAML, OAuth2).

## 2. Decisão Arquitetural
Decidimos padronizar o **Supabase sobre PostgreSQL 16+** como a espinha dorsal de persistência e backend unificado do ecossistema AR OS.
A camada de abstração de dados do frontend (`ApplicationStore` / `ProjectStore`) foi desenhada para realizar essa transição de forma transparente, substituindo os adaptadores de `localStorage` por clientes RPC/REST do Supabase via `services.js`.

## 3. Alternativas Analisadas & Racional de Descarte
- **Firebase / Firestore (NoSQL):** Descartado pela ausência de integridade relacional nativa, dificuldade de consultas geoespaciais complexas de infraestrutura urbana e custos imprevisíveis em alta escala de leitura de normas.
- **Backend Próprio em Node.js / Go com ORM puro:** Descartado pelo custo desnecessário de manutenção de infraestrutura básica (auth, storage, realtime, APIs automáticas), desviando o foco da lógica de domínio de engenharia circular.
- **MongoDB:** Descartado pela falta de garantias transacionais relacionais rigorosas exigidas em auditorias de licitações públicas e medições contratuais.

## 4. Consequências & Impactos
### 4.1. Impactos Positivos
- **Herança Imediata para Outras Verticais:** As tabelas de organizações, usuários, auditoria, telemetria e passaportes digitais tornam-se schemas compartilhados entre VIRA, Verdis, Replasticando, RecicloBike e MUTA.
- **Row Level Security (RLS):** Garantia matemática e jurídica de que uma empreiteira jamais acessará medições confidenciais de outro município.
- **Capacidades PostGIS & pgvector Nativas:** Geo-referenciamento imediato de canteiros e busca semântica em todo o acervo normativo ABNT/ISO sem necessidade de clusters adicionais.

### 4.2. Custos & Trade-offs Assumidos
- Necessidade de gerenciar migrações de schema SQL estruturadas (`supabase migrations`).
- Requisito de conectividade online para sincronização remota (mitigado por modo offline-first já garantido pelo `ProjectStore`).

## 5. Rastreabilidade & Validação
- **Validação de Contrato:** O `ViraApi` em `services.js` já encapsula chamadas em envelopes padronizados `{ status, timestamp, governance, data }`.
- **Métricas de Sucesso:** Latência média de sincronização de projetos $< 180\text{ ms}$; zero vazamentos de dados cross-tenant comprovados por testes de penetração e auditoria RLS.
