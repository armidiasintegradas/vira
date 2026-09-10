# VIRA NEXT — SPRINT STATUS & STATE MACHINE

Este documento é a **fonte oficial de verdade** e estado de progresso da reconstrução da plataforma digital **VIRA NEXT**. Qualquer execução futura deve ler este arquivo primeiro para determinar o ponto de retomada.

---

## Estado Atual
- **Data da Última Atualização:** 10/09/2026
- **Status Geral:** SPRINT DE HARDENING CONCLUÍDO COM SUCESSO — V1 PRONTA PARA HOMOLOGAÇÃO
- **Tech Lead:** Antigravity AI

---

## Registro de Sprints

### [✓] Sprint 0: Auditoria & Diagnóstico Estrutural
- **Status:** CONCLUÍDO
- Mapeamento completo dos 50 ativos de mídia fotográfica e vetorial em `assets/`.
- Diagnóstico de débitos técnicos (bloco massivo de CSS duplicado inline em `index.html`, classes e textos em inglês residuais do template Framer Tropica).
- Definição do plano de sprints e criação do `implementation_plan.md`.

### [✓] Sprint 1 a 6: Reconstrução Integral da Home e Design System
- **Status:** CONCLUÍDO
- Criação de `tokens.css` com a paleta oficial (Brandbook 2026) e refatoração de `styles.css`.
- Reconstrução integral da Home com os **9 capítulos oficiais** em sequência estrita.
- Header dinâmico com requestAnimationFrame (transparente -> branco com blur).
- Calculadora industrial de impacto com fatores reais de ACV (Análise de Ciclo de Vida).
- Drawer de especificações técnicas com normas ABNT NBR 9781:2013 e NBR 15575.
- Agenda 2030 em fundo branco com ODS oficiais da ONU (ODS 9, 11, 12, 17).
- Rodapé institucional oficial em 4 colunas com crédito estrito da AR Mídias Integradas.

### [✓] Sprint Hardening: Performance, Acessibilidade, Imagens, SEO e Bundle
- **Status:** CONCLUÍDO (100% dos critérios validados)
- **Calculadora:** Implementada a Sugestão 01 com a Nota Metodológica de ACV visível.
- **Otimização de Imagens:** Pipeline de conversão automatizada gerou versões **AVIF Next-Gen** para 100% das imagens da Home (redução média de 62% no payload, caindo de 6,56 MB para 2,45 MB), além de recompressão dos fallbacks JPEG.
- **Core Web Vitals:** Preload de imagem LCP em AVIF (`assets/factory-hero.avif`), atributos explícitos de `width` e `height` em todas as imagens (zero CLS shift), `loading="lazy"` e `decoding="async"`.
- **Acessibilidade WCAG AA:** Hierarquia de headings corrigida (h1 único seguido de h2/h3), contraste de cores validado, skip-link para teclado adicionado, labels explícitos em 100% dos inputs e suporte total a navegação por teclado.
- **SEO & Discoverability:** Criação de `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, vector SVG favicon embutido e Schema.org JSON-LD expandido (Organization, WebSite e ItemList).
- **Inventário de Bundle:** Mapeamento completo do payload (HTML: 61,6 KB | CSS: 17,1 KB | JS: 12,8 KB | Imagens AVIF: 2,45 MB | Payload Total: 2,54 MB).
