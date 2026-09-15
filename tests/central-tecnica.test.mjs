import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../central-tecnica.html', import.meta.url), 'utf8');

// Validações estruturais essenciais
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Central Técnica deve conter exatamente um h1');
assert(html.includes('<title>04 // Central Técnica VIRA - Repositório Oficial de Engenharia e Documentação</title>'), 'Título da página deve seguir a especificação 2026');

// Conformidade normativa e famílias
for (const family of ['paver', 'blocos', 'guias']) {
  assert(html.includes(`data-family="${family}"`), `Falta a família documental ${family}`);
}
for (const norma of ['NBR 9781', 'NBR 6136', 'NBR 14890', 'ISO 14021', 'LEI 14.133/2021']) {
  assert(html.includes(norma), `Falta a norma técnica ${norma}`);
}

// Acervo documental com 9 itens catalogados
assert.equal((html.match(/data-tech-item/g) || []).length, 9, 'Deve expor 9 itens no catálogo técnico');

// Passaporte DPP e Rastreabilidade Criptográfica
assert(html.includes('VIRA-ENG-CENTRAL-2026'), 'ID DPP do lote deve estar presente');
assert(html.includes('SHA-256'), 'Deve exibir protocolo de integridade SHA-256');

// Elementos interativos e sem links placeholder
assert(html.includes('id="particlesCanvas"'), 'Canvas de partículas do Hero deve estar presente');
assert(!html.includes('href="#"'), 'Não deve conter links placeholder href="#"');

// Créditos institucionais
assert(html.includes('Desenvolvido por AR Mídias Integradas.'), 'Rodapé deve conter créditos da AR Mídias Integradas');

console.log('central-tecnica: ok');
