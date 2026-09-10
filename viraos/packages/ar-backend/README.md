# @ar-platform/backend
## Arquitetura Cloud & Persistência Supabase / PostgreSQL • AR Mídias Integradas

Camada central de banco de dados e persistência relacional do **AR OS**, suportando multi-tenant RLS, georreferenciamento de obras (PostGIS) e inteligência semântica de normas (pgvector).

---

## Migrações Canônicas
1. `20260910000001_initial_schema.sql`: Tenants, profiles, projetos, itens e audit trail imutável.
2. `20260910000002_row_level_security.sql`: Políticas de RLS para isolamento entre prefeituras e empreiteiras.
3. `20260910000003_postgis_and_dpp.sql`: Canteiros espaciais e passaportes digitais com QR Code.
4. `20260910000004_pgvector_knowledge.sql`: Vetorização HNSW de normas ABNT e pareceres da Lei 14.133/2021.

---

## Como Executar Localmente
```bash
supabase start
supabase db reset
```
