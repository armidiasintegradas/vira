# AR OS 1.0 — Operations & Runbook Guide
## AR Mídias Integradas • Operações de Engenharia & SRE

---

## 1. Monitoramento de Saúde da Plataforma
O estado operacional do ecossistema AR OS é monitorado continuamente através de:
- **Health Check Endpoint:** `GET /health` $\to$ Valida latência de banco de dados, status de workers e disponibilidade de storage.
- **Telemetria de Eficiência:** Rastreamento em tempo real do Tempo para Especificar (TTS), Tempo para Memorial (TTB) e Tempo para Exportar (TTE).
- **Taxa de Erro:** Alarme disparado se requisições 5xx excederem 0.1% do tráfego.

---

## 2. Rotinas de Backup & Recuperação (Disaster Recovery)
- **Point-in-Time Recovery (PITR):** Backup contínuo do banco de dados Supabase/PostgreSQL com retenção de 30 dias.
- **RPO (Recovery Point Objective):** $< 5$ minutos.
- **RTO (Recovery Time Objective):** $< 30$ minutos.

---

## 3. Gestão de Filas de Processamento Assíncrono (Workers)
- **Fila de PDFs e Cadernos:** Processada por `pdfWorker.js`. Em caso de falha, repete com backoff exponencial até 3 tentativas.
- **Fila de Embeddings Semânticos:** Processada por `embeddingWorker.js` na inclusão de novas normas ABNT.
- **Fila de Telemetria:** Agregação horária de indicadores de uso dos Design Partners.
