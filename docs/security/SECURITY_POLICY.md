# AR OS 1.0 — Security & Compliance Policy
## AR Mídias Integradas • Políticas de Segurança da Informação

---

## 1. Princípios de Segurança
1. **Defesa em Profundidade:** Segurança aplicada em múltiplas camadas (HTTPS/TLS 1.3, Headers HSTS, CSP, RLS e autenticação multi-fator).
2. **Isolamento Estrito de Tenant:** Garantia física e lógica de que dados de um município ou construtora jamais sejam acessados por entidades não autorizadas.
3. **Não-Repúdio e Integridade Criptográfica:** Checksums determinísticos anexados a todas as ações em projetos e emissões de certificados.
4. **Princípio do Menor Privilégio:** Chaves de API de parceiros limitadas estritamente aos escopos homologados.

---

## 2. Segmentação de Chaves de API
- **Public Keys (`pk_live_...`):** Apenas leitura de dados homologados (Tier 1), modelos BIM públicos e validação de QR Code do DPP.
- **Partner Keys (`partner_live_...`):** Criação de projetos, simulações paramétricas de orçamento e geração de minutas de edital.
- **Admin/Internal Keys (`sk_live_...`):** Acesso total para workers de fila, migrações de banco e auditoria corporativa.

---

## 3. Conformidade Legal & LGPD
- Anonimização de registros pessoais nos logs de telemetria;
- Armazenamento em conformidade com a Lei Geral de Proteção de Dados (Lei Federal 13.709/2018);
- Trilhas de auditoria protegidas contra exclusão acidental ou intencional (Append-Only Triggers).
