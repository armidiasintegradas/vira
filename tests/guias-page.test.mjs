import fs from 'node:fs';
import assert from 'node:assert/strict';

const pagePath = new URL('../guias.html', import.meta.url);
assert(fs.existsSync(pagePath), 'guias.html ainda não existe');

const html = fs.readFileSync(pagePath, 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const sharedCss = fs.readFileSync(new URL('../internal-pages.css', import.meta.url), 'utf8');

// Validação da Identidade e Título 2026
assert(html.includes('03 // GUIAS') || html.includes('Guias &amp; Meio-Fio NBR 14890') || html.includes('Guias & Meio-Fio NBR 14890'), 'title não identifica Guias VIRA');
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Página deve ter exatamente um h1');
assert(html.includes('A geometria das vias moldada pela') && html.includes('economia circular.'), 'hero h1 ausente ou incorreto');

// Validação Técnica e Normas NBR
assert(html.includes('NBR 14890'), 'referência à norma NBR 14890 ausente');
assert(html.includes('50% de polímeros pós-consumo reciclados') && html.includes('50% de coproduto mineral siderúrgico'), 'composição 50/50 não está documentada');
assert(html.includes('30 kN'), 'resistência ao impacto NBR 14890 ausente');
assert(html.includes('0,2%') && html.includes('0,3%'), 'taxa de absorção hídrica ausente');

// Rastreabilidade DPP e Interatividade
assert(html.includes('VIRA-GUA-0482'), 'passaporte DPP com ID VIRA-GUA-0482 ausente');
assert(html.includes('heroParticles'), 'canvas de partículas interativo ausente');
assert(html.includes('updateCalculator'), 'lógica da calculadora viária ausente');
assert(html.includes('Desenvolvido por AR Mídias Integradas'), 'créditos do rodapé oficial ausentes');

// Refinamento visual — Guias deve herdar a gramática do golden master Paver sem contaminar outras rotas
assert(sharedCss.includes('/* Guias refinement — Paver golden master */'), 'Guias: refinamento Paver-derived não está documentado no CSS compartilhado');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-internal-hero="true"] canvas'), 'Guias: canvas do hero não possui tratamento visual específico');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-internal-hero="true"] .vira-hero-heading span'), 'Guias: destaque do headline não segue o gradiente canônico');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-internal-hero="true"] a[href="#especificar"]'), 'Guias: CTA primário do hero não está normalizado');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-internal-hero="true"] a[href="#passaporte-dpp"]'), 'Guias: CTA secundário do hero não está normalizado');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="case-study"]'), 'Guias: caso real não possui ritmo editorial Paver-derived');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="material-science"]'), 'Guias: engenharia de materiais não possui superfície canônica');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="technical-anatomy"]'), 'Guias: tabela/anatomia técnica não possui acabamento canônico');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="calculator"]'), 'Guias: calculadora não possui acabamento canônico');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="specification-form"]'), 'Guias: formulário de especificação não possui acabamento canônico');
assert(sharedCss.includes('@media (max-width:1023px)') && sharedCss.includes('@media (max-width:639px)'), 'Guias: refinamento responsivo tablet/mobile ausente');

// Refinamento mobile aprovado na revisão visual
assert(sharedCss.includes('/* Guias mobile visual review refinement */'), 'Guias: refinamento mobile da revisão visual não está documentado');
assert(sharedCss.includes('@media (min-width:360px) and (max-width:639px)') && sharedCss.includes('[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14'), 'Guias: hero mobile 2x2 em 360–639px ausente');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="technical-anatomy"] .lg\\:col-span-7.overflow-x-auto::before') && sharedCss.includes('content:"DESLIZE →"'), 'Guias: affordance DESLIZE da tabela técnica ausente');
assert(sharedCss.includes('[data-vira-internal="guias"] [data-purpose="technical-anatomy"] .lg\\:col-span-7.overflow-x-auto::after') && sharedCss.includes('linear-gradient(to left,rgba(8,17,13,.96),rgba(8,17,13,0))'), 'Guias: fade lateral da tabela técnica ausente');

// Integração com Card da Home
assert(app.includes('button.dataset.product==="guia-meio-fio"') && app.includes('location.href="guias.html"'), 'home não direciona Guias para guias.html');

console.log('guias-page: ok');
