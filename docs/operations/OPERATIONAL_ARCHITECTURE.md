# AR OS — ARQUITETURA DE OPERAÇÃO & SRE
## Procedimentos Operacionais, Continuidade de Negócio & SLAs • AR Mídias Integradas

**Âmbito:** AR OS Foundation, AR OS Services e todas as Aplicações Verticais (VIRA, Verdis, Replasticando, RecicloBike, MUTA).  
**Classificação:** VINCULANTE & CRÍTICO  
**SRE Lead:** Conselho de Tecnologia & Operações  

---

```
┌─────────┐      ┌─────────┐      ┌─────────┐      ┌───────────┐      ┌───────────────┐
│ DEPLOY  │ ───> │ BACKUP  │ ───> │ RESTORE │ ───> │ INCIDENT  │ ───> │ OBSERVABILITY │
│ (CI/CD) │      │ (PITR)  │      │ (DR)    │      │ RESPONSE  │      │ & ALERTAS     │
└─────────┘      └─────────┘      └─────────┘      └───────────┘      └───────────────┘
```

---

## 1. Pipeline de Deploy & Entrega Contínua (CI/CD)

Todo deploy de produção subordina-se ao seguinte fluxo automatizado:

1. **Validação Pré-Merge (GitHub Actions):**
   - Execução integral da suíte de testes unitários: `node test/core_test.js` (exigência de 100% de aprovação).
   - Diagnóstico estrutural da plataforma: `node packages/ar-cli/bin/ar.js doctor --verbose`.
   - Validação estrita de esquemas OpenAPI e integridade de UUIDs: `node packages/ar-cli/bin/ar.js validate`.
2. **Migrações de Banco de Dados (Expand & Contract):**
   - Migrações SQL executadas de forma aditiva antes da subida da nova versão da aplicação.
   - Nenhuma coluna ou tabela é descartada sem antes passar por ciclo de depreciação governado (Art. 15º da Constitution).
3. **Estratégia de Release (Canary / Rolling Update):**
   - Subida progressiva de containers sem *downtime*.
   - Liberação de novos motores e recursos controlada via `FeatureFlagService` por tenant e marca.

---

## 2. Política de Backup & Continuidade (Disaster Recovery)

A integridade dos dados de engenharia, projetos de canteiro e Passaportes Digitais de Produto (DPP) é resguardada por:

- **Point-in-Time Recovery (PITR):**
  - WAL-G archiving contínuo para o PostgreSQL/Supabase com granularidade ao segundo.
  - Janela de retenção histórica: **30 dias ininterruptos**.
- **Snapshots de Storage:**
  - Cópia diária dos laudos IPT acreditados, memoriais descritivos e arquivos IFC/BIM em bucket geograficamente redundante com criptografia AES-256.
- **Objetivos de Continuidade:**
  - **RPO (Recovery Point Objective):** $< 5\text{ minutos}$ (perda máxima aceitável de dados).
  - **RTO (Recovery Time Objective):** $< 30\text{ minutos}$ (tempo máximo para restabelecimento total do serviço).

---

## 3. Procedimento de Restore & Simulação Periódica (Restore Drill)

A confiabilidade dos backups é comprovada por simulações trimestrais de restauração em ambiente isolado de Staging:

### Procedimento Passo a Passo:
1. **Identificação do Timestamp de Restauração:** Determinar o instante preciso $T_{\text{target}}$ anterior à falha ou corrupção.
2. **Provisionamento da Instância Alvo:** Criação de réplica temporária isolada via script de orquestração.
3. **Aplicação do WAL:** Replay contínuo dos logs de transação até o timestamp exato.
4. **Auditoria de Integridade:** Execução de verificação de checksum em projetos e laudos históricos (`ar dpp verify`).
5. **Comutação de Tráfego:** Redirecionamento seguro de DNS caso o cluster principal tenha sido comprometido.

---

## 4. Gestão de Incidentes & Níveis de Severidade (Incident Response)

Todo desvio operacional é classificado em 4 níveis de severidade:

| Severidade | Descrição | SLA de Resposta | SLA de Resolução | Ação Imediata |
|:---:|---|:---:|:---:|---|
| **SEV-1 [Crítico]** | Indisponibilidade total da plataforma ou violação de integridade de dados/DPP. | $< 15\text{ min}$ | $< 2\text{ horas}$ | Abertura de War Room; notificação ao Conselho; congelamento de deploys. |
| **SEV-2 [Alto]** | Degradação severa de performance ou falha contínua nos workers de alta prioridade. | $< 30\text{ min}$ | $< 6\text{ horas}$ | Engajamento do time de plantão (On-Call); isolamento da fila afetada. |
| **SEV-3 [Médio]** | Falha pontual em relatórios, exportações CSV ou em marcas secundárias. | $< 2\text{ horas}$ | $< 24\text{ horas}$ | Abertura de issue prioritária no sprint corrente. |
| **SEV-4 [Baixo]** | Dúvidas operacionais, pequenas anomalias cosméticas ou melhorias de telemetria. | $< 8\text{ horas}$ | Próximo ciclo | Tratamento em backlog regular. |

*Parágrafo Único:* Todo incidente SEV-1 ou SEV-2 exige **Post-Mortem Blameless** documentado em até 48 horas após a resolução, identificando causa-raiz e ações corretivas preventivas.

---

## 5. Observabilidade, Métricas & Monitoramento de SLAs

A saúde do AR OS é aferida em tempo real através dos quatro pilares:

### A. Monitoramento dos Tiers de SLA de Workers
- **Critical Tier (< 2s):** Autorizações, assinaturas de auditoria e travas de revisão concorrente.
- **Normal Tier (< 30s):** Geração de cadernos executivos em PDF e memoriais descritivos.
- **Background Tier (< 5min):** Indexação semântica e pgvector de acervos técnicos e normas.
- **Scheduled Tier (< 1h):** Agregações de telemetria e auditorias de rotina.

### B. Métricas RED & USE
- **Rate:** Contagem de requisições por segundo por domínio e marca.
- **Errors:** Taxa de respostas 5xx (alerta se ultrapassar $0.1\%$).
- **Duration:** Latência média e percentis p95/p99 por endpoint.
- **Utilization:** Carga de CPU, conexões ao PostgreSQL e consumo de memória.

---

## 6. Centralização de Logs & Auditoria Imutável

1. **Logs Estruturados em JSON:** Toda saída de log inclui obrigatoriamente:
   ```json
   {
     "timestamp": "2026-09-10T17:25:00.000Z",
     "level": "INFO",
     "traceId": "tr-7f9210-e01fa8",
     "tenant": "prefeitura-recife",
     "brand": "vira",
     "domain": "ProjectsDomain",
     "action": "ITEM_ADDED",
     "checksum": "c4b8e192"
   }
   ```
2. **Retenção Imutável de Trilha de Auditoria:**
   - Logs de alterações em dados homologados (Tier 1) são gravados em storage imutável (*Append-Only*) com retenção mínima de **5 anos**, atendendo a auditorias do Tribunal de Contas (TCE/TCU) e da Lei 14.133/2021.

---

## 7. Política de Alertas & Plantão Operacional (On-Call)

Alertas automáticos disparam notificações imediatas aos engenheiros responsáveis via webhook corporativo quando:
- Taxa de erro 5xx excede $0.5\%$ em janela de 5 minutos.
- Fila de jobs assíncronos acumula mais de 50 tarefas pendentes no tier `Critical`.
- O checksum de integridade de qualquer Passaporte Digital (DPP) diverge do laudo registrado.
- O tempo de resposta médio de qualquer domínio ultrapassa 2.500 ms.

---

## 8. Atualizações de Plataforma & Migração Governança

- Toda evolução de plataforma ocorre sem parada programada de serviço (*Zero-Downtime Migration*).
- Esquemas de armazenamento de clientes (`schemaVersion`) são atualizados de forma autônoma e retrocompatível no primeiro acesso, preservando a integridade histórica dos projetos criados em versões legadas.
