import fs from 'node:fs';
import assert from 'node:assert/strict';

const pagePath = new URL('../guias.html', import.meta.url);
assert(fs.existsSync(pagePath), 'guias.html ainda não existe');

const html = fs.readFileSync(pagePath, 'utf8');
const js = fs.readFileSync(new URL('../guias.js', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

assert(html.includes('<h1>Guias e Meio-fio VIRA</h1>'), 'hero não identifica Guias e Meio-fio VIRA');
assert(html.includes('50% plástico') && html.includes('50% escória'), 'composição 50/50 não está documentada');
assert(html.includes('Desempenho em validação'), 'estado técnico seguro não está explícito');
assert(html.includes('Geometria em consolidação'), 'geometria não sinaliza consolidação técnica');
assert(html.includes('DEMONSTRAÇÃO') && html.includes('VIRA-GUIA-DEMO-0001'), 'passaporte demonstrativo não está claramente identificado');
assert(html.includes('Central Técnica'), 'Central Técnica ausente');
assert(html.includes('Especifique Guias VIRA'), 'fluxo de especificação ausente');
assert(!/\b\d+(?:[.,]\d+)?\s*(?:MPa|N\/mm²)\b/.test(html), 'página publica resistência numérica não aprovada');
assert(!html.includes('0,2–0,3%'), 'página herdou absorção do Paver indevidamente');
assert(!html.includes('10 anos') && !html.includes('Carbono negativo'), 'página contém claims não documentados');
assert(!html.includes('ABNT NBR'), 'página declara norma específica sem documentação homologada');
assert(js.includes('mailto:contato@projetovira.com.br'), 'formulário não prepara contato com a VIRA');
assert(app.includes('button.dataset.product==="guia-meio-fio"') && app.includes('location.href="guias.html"'), 'home não direciona Guias para guias.html');

console.log('guias-page: ok');
