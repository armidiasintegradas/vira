# ADR-003: Modelagem em Knowledge Graph de Evidências Técnicas
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Principal Tech Lead & Architecture Team
- **Decisores:** Conselho de Tecnologia AR Mídias Integradas
- **Impacto:** AR OS Core, VIRA OS, Verdis, Replasticando, RecicloBike, MUTA

---

## 1. Contexto & Forças Motrizes
No mercado tradicional da construção civil e saneamento, os fabricantes costumam organizar seus acervos técnicos como simples "diretórios de downloads de arquivos PDF".
Essa abordagem clássica gera fragilidades severas:
- O projetista baixa um arquivo PDF sem saber se a norma ABNT citada ainda está em vigor;
- Os laudos laboratoriais não estão vinculados diretamente aos parâmetros declarados de resistência e absorção;
- A cadeia de custódia e comprovação legal exigida pela nova Lei de Licitações (Lei 14.133/2021) é rompida;
- A modelagem BIM e os arquivos CAD ficam desconectados dos fatores de descarbonização e impacto ambiental da Análise de Ciclo de Vida (ACV / ISO 14044).

## 2. Decisão Arquitetural
Adotamos uma modelagem centrada em **Knowledge Graph (Grafo de Evidências)** para interconectar todas as entidades de domínio da plataforma:
```
Produto / Solução Circular
   ├── Norma ABNT / ISO (Requisito de Desempenho)
   ├── Laudo Laboratorial Acreditado (IPT / Inmetro)
   ├── Memorial Técnico & Jurídico (Lei 14.133/2021)
   ├── Modelagem Paramétrica BIM (Revit LOD 350 / IFC 4.3)
   ├── Detalhamento Executivo CAD (DWG / DXF)
   ├── Inventário de ACV & Descarbonização (ISO 14044)
   └── Passaporte Digital de Produto - DPP (Rastreabilidade de Lote)
```
Cada elemento possui um identificador tripartite canônico padronizado (ex: `VIRA-BIM-PAV-001`, `VIRA-LAB-PAV-003`) e metadados formais de governança (`dataTier`).

## 3. Alternativas Analisadas & Racional de Descarte
- **Diretório Tradicional de Arquivos (Folder/File Storage):** Descartado por romper o encadeamento lógico de evidências e impossibilitar auditorias automáticas de conformidade.
- **Tabelas Isoladas em Banco de Dados Relacional sem Semântica:** Descartado por engessar a navegação contextual cruzada entre normas, estudos de caso e projetos.

## 4. Consequências & Impactos
### 4.1. Impactos Positivos
- **Cadeia Ininterrupta de Evidências:** Um engenheiro de órgão público pode rastrear de onde veio cada valor numérico ($f_{ck} = 38,2\text{ MPa}$, $-2,15\text{ kg CO}_2\text{e/kg}$) até o respectivo protocolo acreditado do laboratório.
- **Reuso Imediato pelas Verticais da AR:** O mesmo motor de Knowledge Graph estruturará:
  - *Verdis:* Créditos de carbono, restauração ecológica e espécies arbóreas;
  - *Replasticando / RecicloBike:* Rastreabilidade de fardos, cooperativas e rotas logísticas;
  - *MUTA:* Mobiliário urbano, ensaios de intemperismo e ergonomia.
- **Alimentação Direta do Copiloto de IA:** Os agentes de inteligência artificial consultam nós conectados do grafo, eliminando alucinações e citando fontes normativas reais.

### 4.2. Custos & Trade-offs Assumidos
- Exige rigor na curadoria de novos materiais antes da inserção no sistema (o que é blindado pelos 3 Tiers de Governança).

## 5. Rastreabilidade & Validação
- **Validação de Código:** Implementado em `EngineeringKnowledgeBase` dentro de `services.js`, com testes de validação em `test/core_test.js` (Suíte 1 e Suíte 6).
