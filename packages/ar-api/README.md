# @ar-platform/api
## Contratos Digitais & Especificação OpenAPI 3.1 • AR Mídias Integradas

Especificação canônica de contratos REST da plataforma **AR OS**, garantindo envelopes de governança com dados auditados em 3 Tiers para VIRA, Verdis, Replasticando, RecicloBike e MUTA.

---

## Estrutura do Envelope de Governança
Todas as respostas da API contêm o envelope institucional padronizado:

```json
{
  "status": 200,
  "timestamp": "2026-09-10T16:00:00Z",
  "governance": {
    "dataTier": "homologado",
    "auditSource": "IPT Relatório nº 1.104.921-A",
    "accreditationNotice": "Dados certificados por laboratório acreditado Inmetro ou norma ABNT vigente."
  },
  "data": { ... }
}
```

---

## Como Validar o Contrato
Execute a validação via suíte de testes do repositório:
```bash
node test/core_test.js
```
