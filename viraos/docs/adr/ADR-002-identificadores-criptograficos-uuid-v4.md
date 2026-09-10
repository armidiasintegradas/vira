# ADR-002: Adoção de Identificadores Universais Criptográficos (RFC 4122 v4 UUID)
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Principal Tech Lead & Architecture Team
- **Decisores:** Conselho de Tecnologia AR Mídias Integradas
- **Impacto:** AR OS Core, VIRA OS, Verdis, Replasticando, RecicloBike, MUTA

---

## 1. Contexto & Forças Motrizes
Nas primeiras iterações do motor de projetos e do knowledge base, os registros utilizavam identificadores combinando prefixos de texto e timestamps sequenciais (`proj-` + Date.now()).
Essa abordagem apresenta três vulnerabilidades críticas para uma plataforma corporativa:
1. **Previsibilidade:** Timestamps revelam o ritmo e o momento exato de criação de projetos em órgãos concorrentes ou licitações públicas sigilosas;
2. **Risco de Colisão Multiusuário:** Em ambientes colaborativos distribuídos e offline-first, a criação simultânea de projetos por dois operadores gera chaves duplicadas;
3. **Incompatibilidade com Bancos Distribuídos:** Dificulta a mesclagem e sincronização assíncrona entre o cliente local e o backend central.

## 2. Decisão Arquitetural
Padronizamos o uso de **UUIDs criptograficamente seguros (RFC 4122 versão 4)** como chave primária obrigatória para todas as entidades criadas pelo usuário e registros de auditoria em todo o ecossistema AR OS.
A geração é realizada primariamente via `crypto.randomUUID()` nativo do Web Cryptography API e Node.js `crypto`, com algoritmo determinístico de fallback para ambientes legados.

## 3. Alternativas Analisadas & Racional de Descarte
- **Identificadores Numéricos Auto-Incrementais (BigInt / Serial):** Requerem coordenação central com o banco de dados antes da criação, impedindo a geração offline de projetos em canteiros remotos sem internet.
- **NanoID / CUID:** Embora menores em quantidade de caracteres, não possuem o suporte universal nativo presente nos tipos `UUID` do PostgreSQL, bibliotecas estándar de Python/Node.js e sistemas de banco de dados corporativos.
- **Timestamps em Base64:** Não eliminam a previsibilidade temporal nem protegem contra colisões em alta frequência.

## 4. Consequências & Impactos
### 4.1. Impactos Positivos
- **Geração Descentralizada e Segura:** Qualquer cliente (web, mobile, plugin BIM ou script de importação) pode instanciar entidades offline com probabilidade de colisão matematicamente insignificante ($1 \text{ em } 2^{122}$).
- **Compatibilidade com PostgreSQL:** Armazenamento nativo em 16 bytes (`uuid`), com índices B-Tree e GiST de altíssima performance.
- **Migração Transparente:** A rotina de migração V3 $\to$ V4 já injeta UUIDs automaticamente em registros legados sem quebrar referências.

### 4.2. Custos & Trade-offs Assumidos
- Strings de 36 caracteres são menos amigáveis para digitação manual direta pelo usuário (solucionado pela manutenção de um `code` ou `name` legível complementar, como `VRA-PAV-2026`).

## 5. Rastreabilidade & Validação
- **Suíte de Testes Automatizados:** Teste unitário em `test/core_test.js` (Suíte 2) valida o formato canônico (`/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i`) e executa baterias de 1.000 gerações consecutivas com zero colisões.
