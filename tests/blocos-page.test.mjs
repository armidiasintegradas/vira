import fs from 'node:fs';
import assert from 'node:assert/strict';

const pagePath = new URL('../blocos.html', import.meta.url);
assert(fs.existsSync(pagePath), 'blocos.html ainda não existe');

const html = fs.readFileSync(pagePath, 'utf8');
const js = fs.readFileSync(new URL('../blocos.js', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');

assert(html.includes('<h1>Blocos VIRA</h1>'), 'hero não identifica Blocos VIRA');
assert(html.includes('50% plástico') && html.includes('50% escória'), 'composição 50/50 não está documentada');
assert(html.includes('Desempenho em validação'), 'estado técnico seguro não está explícito');
assert(html.includes('Geometria em consolidação'), 'anatomia não sinaliza consolidação técnica');
assert(html.includes('DEMONSTRAÇÃO') && html.includes('VIRA-BLOCO-DEMO-0001'), 'passaporte demonstrativo não está claramente identificado');
assert(html.includes('Central Técnica'), 'Central Técnica ausente');
assert(html.includes('Especifique Blocos VIRA'), 'fluxo de especificação ausente');
assert(!/\b\d+(?:[.,]\d+)?\s*(?:MPa|N\/mm²)\b/.test(html), 'página publica resistência numérica não aprovada');
assert(!html.includes('0,2–0,3%'), 'página herdou absorção do Paver indevidamente');
assert(!html.includes('10 anos') && !html.includes('Carbono negativo'), 'página contém claims não documentados');
assert(js.includes('mailto:contato@projetovira.com.br'), 'formulário não prepara contato com a VIRA');
assert(app.includes('button.dataset.product==="bloco-concreto"') && app.includes('location.href="blocos.html"'), 'card Blocos VIRA não direciona para a nova página');

console.log('blocos-page: ok');
