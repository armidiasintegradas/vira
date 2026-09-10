# PLATAFORMA VIRA NEXT — GOVERNANÇA & SPRINT STATUS

Este documento é a **fonte oficial de verdade**, governança de versão e estado de evolução da **Plataforma Digital de Engenharia VIRA NEXT**.

---

## 1. Governança de Release & Congelamento da V1

- **Tag Oficial de Produção:** `v1.0.0`
- **Branch de Release Congelada:** `release/v1` (nenhum desenvolvimento direto é permitido)
- **Branch Ativa de Desenvolvimento / V2:** `next`
- **Posicionamento Estratégico Oficial:** Plataforma Digital de Engenharia Circular para Infraestrutura Urbana (não utilizar a terminologia "site" ou "website" em documentações e entregas).

---

## 2. Histórico de Sprints Concluídos

### [✓] Sprint 0 a 6: Reconstrução Integral da Home e Design System (V1.0.0)
- **Status:** CONCLUÍDO & HOMOLOGADO
- Design System unificado (`tokens.css` e `styles.css`) com as cores do Brandbook 2026.
- 9 Capítulos estruturados em sequência estrita (Hero, Uma Única Engenharia, Como Funciona, Materiais, Aplicações, Especificação, Impacto, Agenda 2030, Contato).
- Header dinâmico inteligente com `requestAnimationFrame` (transparente -> sólido on-scroll).
- Rodapé monumental em 4 colunas com crédito institucional por AR Mídias Integradas.

### [✓] Sprint Hardening: Performance, Acessibilidade & SEO
- **Status:** CONCLUÍDO & HOMOLOGADO
- Pipeline Next-Gen AVIF implementado para 100% das imagens da Home (-62% de payload, 2,45 MB total).
- Core Web Vitals blindados: Preload de LCP, `width` e `height` explícitos em todas as imagens (CLS = 0.000).
- WCAG AA: Hierarquia semântica estrita, skip-link, contraste e navegação total por teclado.
- SEO: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon e Schema.org JSON-LD expandido.
- Calculadora: Nota metodológica de Análise de Ciclo de Vida (ISO 14044) adicionada.

### [✓] Sprint 0.1 & 1.1: Refinamento Invisível & Microtipografia (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO
- Microtipografia com `text-wrap: balance` em títulos (zero órfãs) e `text-wrap: pretty` em parágrafos.
- Tracking ótico calibrado (-0.035em a -0.04em em displays; 0.14em em mono badges).
- Números tabulares `font-variant-numeric: tabular-nums` para alinhamento vertical estrito de métricas.
- Ícones Lucide padronizados com stroke-width 1.75 (estilo blueprint técnico).
- Fluid clamp scaling calibrado para todos os breakpoints (360px a 1920px).

### [✓] V2 — Centro de Especificação & Knowledge Graph (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO (Implementação das 10 Recomendações de Arquitetura)
- **Nomenclatura Oficial:** Evolução da "Biblioteca Técnica" para o **Centro de Especificação & Engineering Center** (`centro-de-especificacao.html` e `especificacao.js`).
- **Os 4 Portais de Entrada:** Acesso direto organizado por: Modelos BIM, Desenhos CAD, Laudos Laboratoriais e Memoriais para Licitação.
- **Navegação por Intenção da Solução:** Agrupamento por solução técnica (Pavimentação 16 Faces, Fachadas 15mm, Decks 80x80, Resina VIRA-HD) e alternância instantânea para visualização por tipo de ativo.
- **Engineering IDs Unificados:** Todos os 10 ativos catalogados sob códigos de governança da engenharia (`VIRA-BIM-001`, `VIRA-CAD-002`, `VIRA-LAB-003`, `VIRA-MEM-004`, `VIRA-BIM-005`, `VIRA-CAD-006`, `VIRA-BIM-007`, `VIRA-TEX-008`, `VIRA-MAT-009`, `VIRA-ACV-010`).
- **Ficha Técnica & Governança:** Metadados estruturados (Código, Versão, Data, Normas ABNT/ISO, Softwares Compatíveis, Peso, Licença de Uso Profissional).
- **Histórico de Versões (Changelog):** Histórico detalhado de revisões técnicas e notas de engenharia para cada ativo.
- **Fluxo de Ação em 3 Passos:** Visualizar Ficha Técnica -> Copiar Memorial para Edital -> Download Imediato.
- **Citação Padronizada ABNT NBR 6023:** Copiador formatado para citações acadêmicas, prefeituras e consultorias técnicas.
- **Responsáveis Técnicos Homologadores:** Identificação nominal, registro profissional (CREA/CAU/OAB) e canal direto de consulta técnica para cada ativo.
- **Grafo de Conhecimento (Knowledge Graph):** Camada de conexões bidirecionais entre a Home (Capítulos 4, 5, 6 e 7) e o Centro de Especificação, permitindo navegação fluida de materiais para laudos, modelos BIM, desenhos CAD, memoriais da Lei 14.133 e relatórios de ACV.
- **Redirecionamento & Compatibilidade:** `biblioteca-tecnica.html` preservada com redirecionamento automático (zero links quebrados) e `sitemap.xml` atualizado com prioridade 0.95.

---

## 3. Próximos Módulos Estruturais do Ecossistema (Branch: `next`)

- [ ] **VIRA Obras & Infraestrutura Urbana** — Mapeamento interativo de intervenções executadas, estudos de caso e métricas de mitigação por município.
- [ ] **VIRA Academy** — Formação técnica continuada para secretarias de planejamento, concessionárias e projetistas de infraestrutura circular.
- [ ] **VIRA Lab & DPP** — Rastreabilidade digital de lote por Passaporte Digital de Produto e telemetria de caracterização de compósitos.
