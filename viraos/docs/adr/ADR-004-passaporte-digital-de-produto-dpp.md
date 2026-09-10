# ADR-004: Implementação do Passaporte Digital de Produto (Digital Product Passport - DPP)
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Principal Tech Lead & Architecture Team
- **Decisores:** Conselho de Tecnologia AR Mídias Integradas
- **Impacto:** AR OS Core, VIRA OS, Verdis, Replasticando, RecicloBike, MUTA

---

## 1. Contexto & Forças Motrizes
A comprovação de circularidade, reciclabilidade e pegada de carbono no setor de infraestrutura frequentemente sofre com o risco de *greenwashing* ou falta de rastreabilidade na entrega física em canteiro.
A nova legislação europeia (Ecodesign for Sustainable Products Regulation - ESPR) e as diretrizes do Ministério do Meio Ambiente / Plano Nacional de Resíduos Sólidos (PNRS) estabelecem que materiais sustentáveis devem apresentar identificadores digitais rastreáveis por lote fabril.
Para os fiscais de obras e gestores públicos, é fundamental dispor de uma ferramenta de checagem imediata que comprove:
- A origem da matéria-prima reciclada (cooperativas homologadas);
- A data de extrusão/injeção e identificação do lote;
- A Anotação de Responsabilidade Técnica (ART) de fabricação;
- O laudo do ensaio mecânico correspondente ao lote entregue.

## 2. Decisão Arquitetural
Adotamos a arquitetura de **Passaporte Digital de Produto (DPP)** nativa na plataforma AR OS.
Cada remessa fabril gera uma credencial digital verificável vinculada a um QR Code gravado ou afixado nos paletes, com resolução de URL canônica do tipo:
`https://id.arplatform.com.br/dpp/{tenant}/{batchId}`
Acessível tanto por smartphones de fiscais em campo quanto via API REST pelos sistemas municipais de controle.

## 3. Alternativas Analisadas & Racional de Descarte
- **Certificados em Papel / Guias Físicas Tradicionais:** Descartado pela alta incidência de perda, falsificação e impossibilidade de auditoria remota em tempo real.
- **Blockchain Pública Não-Permissionada (Ethereum/Polygon puro para cada peça):** Descartado pelo custo exorbitante de *gas fees*, lentidão e complexidade desnecessária para operadores municipais.
- **Etiquetas RFID Passivas Isoladas:** Úteis na fábrica, mas insuficientes na ponta final caso não haja leitores específicos de alta frequência nos municípios. O QR Code web é universalmente compatível com qualquer dispositivo.

## 4. Consequências & Impactos
### 4.1. Impactos Positivos
- **Transparência Radical em Canteiro:** O fiscal de obra aponta a câmera do celular e acessa imediatamente o protocolo do lote, laudo IPT e ART do engenheiro responsável.
- **Ativo Central para Toda a AR Mídias Integradas:**
  - *VIRA:* Lotes de pavers e perfis maciços;
  - *Replasticando:* Rastreabilidade de fardos plásticos triados em cooperativas;
  - *RecicloBike:* Rastreabilidade de rotas de logística reversa de cooperados;
  - *Verdis:* Créditos de biodiversidade e mudas plantadas rastreadas individualmente.
- **Blindagem Contra Impugnações:** Editações públicas baseadas na Lei 14.133/2021 ganham respaldo incontestável de comprovação de entrega do objeto licitado.

### 4.2. Custos & Trade-offs Assumidos
- Exige integração com o sistema de etiquetagem da fábrica em Caruaru e rotinas de geração de QR Code serializadas.

## 5. Rastreabilidade & Validação
- **Especificação de Domínio:** Mapeado na aba `dpp` do Workspace e no módulo de fiscalização da VIRA Academy (`data/academy.json`).
- **Métricas de Sucesso:** 100% dos lotes expedidos rastreáveis por DPP; tempo de leitura do QR Code pelo fiscal $< 2\text{ segundos}$.
