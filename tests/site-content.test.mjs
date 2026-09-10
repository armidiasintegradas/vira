import fs from 'node:fs';
import assert from 'node:assert/strict';

const index = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert(!index.includes('Carbono<br>negativo'), 'index.html ainda contém claim "Carbono negativo"');
assert(!index.includes('CO₂e evitado'), 'index.html ainda contém rótulo climático não documentado');
assert(!index.includes('19.888 kg'), 'index.html ainda contém valor climático estático não documentado');
assert(!index.includes('10<small> anos</small>'), 'index.html ainda publica garantia de 10 anos sem documentação vinculada');
assert(!index.includes('100<small>%</small>'), 'index.html ainda publica matriz energética de 100% sem documentação vinculada');
assert(index.includes('Transformamos plástico pós-consumo e coprodutos minerais'), 'hero não comunica os dois fluxos de matéria na fonte HTML');
assert(index.includes('href="paver.html"'), 'card do Paver ainda não possui link HTML explícito para a página técnica');
assert(index.includes('Impacto climático<br>em validação'), 'estado seguro do indicador climático não está no HTML fonte');

console.log('site-content: ok');
