import fs from 'node:fs';
import assert from 'node:assert/strict';

const pagePath = new URL('../guias.html', import.meta.url);
assert(fs.existsSync(pagePath), 'guias.html ainda não existe');

const html = fs.readFileSync(pagePath, 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

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

// Integração com Card da Home
assert(app.includes('button.dataset.product==="guia-meio-fio"') && app.includes('location.href="guias.html"'), 'home não direciona Guias para guias.html');

console.log('guias-page: ok');
