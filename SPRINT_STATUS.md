# PLATAFORMA VIRA NEXT — GOVERNANÇA & SPRINT STATUS

Este documento é a **fonte oficial de verdade**, governança de versão e estado de evolução da **Plataforma Digital de Engenharia VIRA NEXT**.

---

## 1. Governança de Release & Congelamento da V1

- **Tag Oficial de Produção:** `v1.0.0`
- **Branch de Release Congelada:** `release/v1` (nenhum desenvolvimento direto é permitido)
- **Branch Ativa de Desenvolvimento / V2:** `next`
- **Posicionamento Estratégico Oficial:** Plataforma Digital de Engenharia Circular para Infraestrutura Urbana (não utilizar a terminologia "site" ou "website" em documentações e entregas).

---

## 2. Histórico de Sprints Concluídos (V1.0.0)

### [✓] Sprint 0 a 6: Reconstrução Integral da Home e Design System
- **Status:** CONCLUÍDO & HOMOLOGADO
- Design System unificado (`tokens.css` e `styles.css`) com as cores do Brandbook 2026.
- 9 Capítulos estruturados em sequência estrita (Hero, Uma Única Engenharia, Como Funciona, Materiais, Aplicações, Especificação, Impacto, Agenda 2030, Contato).
- Header dinâmico inteligente com `requestAnimationFrame` (transparente -> sólido on-scroll).
- Rodapé monumental em 4 colunas com crédito institucional de engenharia e tecnologia por AR Mídias Integradas.

### [✓] Sprint Hardening: Performance, Acessibilidade & SEO
- **Status:** CONCLUÍDO & HOMOLOGADO
- Pipeline Next-Gen AVIF implementado para 100% das imagens da Home (-62% de payload, redução de 6,56 MB para 2,45 MB).
- Core Web Vitals blindados: Preload de LCP, `width` e `height` explícitos em todas as imagens (zero layout shift / CLS = 0.000).
- WCAG AA: Hierarquia semântica estrita (`h1` único seguido de `h2/h3`), skip-link, contraste e navegação total por teclado.
- SEO & Dados Estruturados: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, SVG favicon e Schema.org JSON-LD expandido.
- Calculadora: Nota metodológica de Análise de Ciclo de Vida (ISO 14044) adicionada.

---

## 3. Próximos Sprints — Refinamento Fino & Fase 2 (Branch: `next`)

### [ ] Sprint 0.1: Homologação Visual Multi-Device
- **Objetivo:** Verificação responsiva exaustiva através de todos os breakpoints críticos:
  - Desktop: 1920px, 1680px, 1440px, 1366px
  - Tablet: iPad Pro (1024px), iPad Air/Mini (768px - 820px)
  - Mobile: iPhone SE (375px), iPhone 14/15/16 (390px - 393px), iPhone 16 Pro Max (430px), Galaxy S24 (360px - 412px)

### [ ] Sprint 1.1: Refinamento Invisível & Microtipografia
- **Objetivo:** Ajuste de tracking em títulos grandes, line-height ótico, prevenção de palavras órfãs com `&nbsp;`, ritmo vertical de espaçamento harmônico e alinhamento de stroke/grid de todos os ícones Lucide.

### [ ] V2: Construção de Autoridade Técnica
- **Módulo 1: Biblioteca Técnica** — Matriz de arquivos BIM (Revit), blocos CAD/DWG e memoriais descritivos normatizados para editais.
- **Módulo 2: Centro de Downloads Estruturado** — Sistema com busca facetada, filtros por família de material, versionamento e laudos ABNT.
- **Módulo 3: Obras & Aplicações** — Mapa interativo de intervenções urbanas, estudos de caso e métricas de mitigação por cidade.
- **Módulo 4: VIRA Academy** — Formação técnica para secretarias de obras, concessionárias e especificadores de infraestrutura circular.
- **Módulo 5: VIRA Lab** — Ensaios laboratoriais em tempo real, laudos reológicos e caracterização mecânica contínua.
