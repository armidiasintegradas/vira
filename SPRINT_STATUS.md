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

### [✓] V2 — Módulos 1 & 2: Biblioteca Técnica & Centro de Downloads de Engenharia (Branch: `next`)
- **Status:** CONCLUÍDO & HOMOLOGADO
- Criação de `biblioteca-tecnica.html` e controlador reativo `biblioteca.js`.
- Base de dados estruturada com 10 ativos de engenharia catalogados (Famílias BIM Revit .RVT/.IFC, pranchas CAD .DWG/.DXF, laudos laboratoriais auditados ABNT NBR 9781 / IPT, memoriais descritivos para a Nova Lei de Licitações 14.133/2021 e pacotes de texturas PBR 4K).
- Sistema de filtros facetados cruzados (por tipo de ativo e por linha de material) e busca em tempo real por palavra-chave e norma.
- Drawer lateral de metadados com copiador de memorial descritivo com 1 clique para editais.
- Chamada estratégica inserida no Capítulo 6 da Home conectando a tabela normativa diretamente à Biblioteca Técnica.
- Atualização do `sitemap.xml` com prioridade 0.95.

---

## 3. Próximos Módulos Estruturais da V2 (Branch: `next`)

- [ ] **Módulo 3: Obras & Aplicações** — Mapa interativo de intervenções urbanas, estudos de caso e métricas de mitigação por cidade.
- [ ] **Módulo 4: VIRA Academy** — Formação técnica para secretarias de obras, concessionárias e especificadores de infraestrutura circular.
- [ ] **Módulo 5: VIRA Lab** — Ensaios laboratoriais em tempo real, laudos reológicos e caracterização mecânica contínua.
