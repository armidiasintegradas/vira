import fs from 'node:fs';
import assert from 'node:assert/strict';

const pagePath = new URL('../blocos.html', import.meta.url);
assert(fs.existsSync(pagePath), 'blocos.html ainda não existe');

const html = fs.readFileSync(pagePath, 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const sharedCss = fs.readFileSync(new URL('../internal-pages.css', import.meta.url), 'utf8');

// Validação da Identidade e Título 2026
assert(html.includes('02 // Blocos de Concreto Estrutural e Vedação VIRA'), 'title não identifica Blocos VIRA');
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Página deve ter exatamente um h1');
assert(html.includes('A solidez das edificações moldada pela') && html.includes('economia circular.'), 'hero h1 ausente ou incorreto');

// Validação Técnica e Normas NBR
assert(html.includes('ABNT NBR 6136'), 'referência à norma NBR 6136 ausente');
assert(html.includes('NBR 15961'), 'referência à norma NBR 15961 ausente');
assert(html.includes('50% de polímeros pós-consumo reciclados') && html.includes('50% de coproduto mineral siderúrgico'), 'composição 50/50 não está documentada');
assert(html.includes('16 MPa'), 'resistência nominal de compressão NBR 6136 Classe A ausente');
assert(html.includes('0,2%') && html.includes('0,4%'), 'taxa de absorção hídrica ausente');

// Rastreabilidade DPP e Interatividade
assert(html.includes('VIRA-BLO-0924'), 'passaporte DPP com ID VIRA-BLO-0924 ausente');
assert(html.includes('hero-structural-canvas'), 'canvas estrutural interativo ausente');
assert(html.includes('updateCalculator'), 'lógica de calculadora de alvenaria ausente');
assert(html.includes('Desenvolvido por AR Mídias Integradas'), 'créditos do rodapé oficial ausentes');

// Refinamento visual do Blocos baseado no golden master Paver
assert(sharedCss.includes('[data-vira-internal="blocos"] [data-internal-hero="true"] canvas'), 'Blocos: canvas do hero não possui tratamento visual específico');
assert(sharedCss.includes('grid-template-columns:repeat(4,minmax(0,1fr));'), 'Blocos: grade técnica do hero não replica a hierarquia desktop do Paver');
assert(sharedCss.includes('[data-vira-internal="blocos"] [data-purpose="case-study"] > div > div:first-child'), 'Blocos: introdução do caso real não segue a composição editorial do Paver');
assert(sharedCss.includes('[data-vira-internal="blocos"] [data-purpose="modulation-diagrams"] .grid > .rounded-3xl'), 'Blocos: cards de modulação ainda não usam a superfície canônica');
assert(sharedCss.includes('[data-vira-internal="blocos"] [data-purpose="calculator"] > div > .bg-gradient-to-br'), 'Blocos: calculadora não possui acabamento alinhado ao sistema Paver');

// Integração com Card da Home
assert(app.includes('button.dataset.product==="bloco-concreto"') && app.includes('location.href="blocos.html"'), 'card Blocos VIRA não direciona para a nova página');

console.log('blocos-page: ok');
