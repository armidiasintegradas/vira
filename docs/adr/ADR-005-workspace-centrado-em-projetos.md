# ADR-005: Arquitetura de Workspace Centrada em Projetos
## AR Platform Initiative • AR Mídias Integradas

- **Status:** HOMOLOGADO
- **Data:** 2026-09-10
- **Autor(es):** Principal Tech Lead & Architecture Team
- **Decisores:** Conselho de Tecnologia AR Mídias Integradas
- **Impacto:** AR OS Core, VIRA OS, Verdis, Replasticando, RecicloBike, MUTA

---

## 1. Contexto & Forças Motrizes
No estágio inicial (V0 e V1), o projeto operava como um catálogo institucional estático. O usuário apenas navegava passivamente por páginas de produtos.
Entretanto, o fluxo de trabalho real de engenheiros civis, arquitetos e secretários municipais não se organiza por "produtos", mas por **projetos e intervenções urbanas**:
- Uma praça com $2.500\text{ m}^2$ contendo piso intertravado, guias de contenção e bancos;
- Uma orla marítima com $4.200\text{ m}^2$ exigindo memorial de cálculo e orçamento detalhado;
- Uma licitação pública com planilha orçamentária que consolida múltiplos insumos, metas ESG e descarbonização acumulada.
Sem um ambiente de trabalho ativo, o usuário precisava abrir uma planilha externa no Excel para fazer os cálculos e copiar manualmente trechos de memoriais.

## 2. Decisão Arquitetural
Substituímos o paradigma passivo de "catálogo/página" por um **Engineering Workspace Unificado** centrado em projetos (`projectEngine.js` e `workspace.js`):
- O usuário cria, gerencia, duplica e audita múltiplos projetos simultaneamente;
- Adiciona itens de qualquer solução do ecossistema informando metragem ou quantidade;
- Os totais de área, peso em toneladas de plástico regenerado, abatimento de $\text{CO}_2\text{e}$ e orçamento preliminar são calculados parametricamente em tempo real;
- Exporta o projeto consolidado em múltiplos formatos (.json, .csv, .txt, .pdf);
- Mantém uma trilha de auditoria contínua e imutável para prestação de contas.

## 3. Alternativas Analisadas & Racional de Descarte
- **E-Commerce Tradicional com "Carrinho de Compras":** Descartado porque engenheiros e órgãos públicos não compram obras públicas através de checkout de e-commerce; eles elaboram termos de referência e cadernos de encargos para licitação.
- **Simples Calculadora Isolada na Home:** Descartado por não reter os dados, não permitir comparação entre cenários nem suportar múltiplos projetos simultâneos.

## 4. Consequências & Impactos
### 4.1. Impactos Positivos
- **Conversão de Usuário Passivo em Operador Ativo:** O profissional passa horas trabalhando dentro do sistema, desenhando e orçando a intervenção de engenharia.
- **Aplicabilidade Universal em Todas as Verticais da AR:**
  - *VIRA:* Obras de infraestrutura urbana, calçadões e pátios;
  - *Verdis:* Projetos de reflorestamento e recuperação de áreas degradadas;
  - *Replasticando:* Planos de gerenciamento de resíduos sólidos (PGRS) para empresas;
  - *RecicloBike:* Projetos de logística reversa municipal e rotas de coleta;
  - *MUTA:* Projetos de requalificação de praças com mobiliário urbano circular.

### 4.2. Custos & Trade-offs Assumidos
- Exige maior responsabilidade com a integridade e persistência de dados do usuário (solucionado pelo versionamento V4 e migração automática de schemas).

## 5. Rastreabilidade & Validação
- **Testes Unitários:** Validado em `test/core_test.js` (Suíte 4: Operações de CRUD e Totalizadores Paramétricos; Suíte 5: Exportação Multi-Formato; Suíte 7: Audit Trail).
- **Métricas de Sucesso:** Mais de 20 projetos demonstrativos e reais simulados em testes de campo; tempo de emissão de memorial reduzido em mais de 75%.
