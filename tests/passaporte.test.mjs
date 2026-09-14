import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../passaporte.html', import.meta.url), 'utf8');

assert(html.includes('PAVER INTERTRAVADO'), 'missing Paver Intertravado title in h1');
assert(html.includes('CIRCULAR VIRA.'), 'missing Circular VIRA in h1');
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Page must have exactly one h1');

assert(html.includes('PASSAPORTE DIGITAL DO PRODUTO'), 'missing Passaporte Digital do Produto');
assert(html.includes('VIRA-DEMO-0001'), 'missing DPP Demo ID VIRA-DEMO-0001');
assert(html.includes('NBR 9781'), 'missing NBR 9781 reference');
assert(html.includes('updateCalculator'), 'missing calculator logic');
assert(html.includes('Desenvolvido por AR Mídias Integradas'), 'missing footer credits');

console.log('passaporte: ok');
