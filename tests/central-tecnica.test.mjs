import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../central-tecnica.html', import.meta.url), 'utf8');
const sharedCss = fs.readFileSync(new URL('../internal-pages.css', import.meta.url), 'utf8');

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

// Contrato semântico para refinamento visual escopado
for (const purpose of [
  'central-hero',
  'transparency-principles',
  'document-library',
  'dpp-section',
  'regulatory-matrix',
  'faq-section',
  'specification-request',
]) {
  assert(html.includes(`data-purpose="${purpose}"`), `Central Técnica: seção ${purpose} sem marcador semântico`);
}

// Refinamento visual — Central Técnica deve herdar a gramática do golden master Paver
assert(sharedCss.includes('/* Central Tecnica refinement — Paver golden master */'), 'Central Técnica: refinamento Paver-derived não está documentado no CSS compartilhado');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] canvas'), 'Central Técnica: canvas do hero não possui tratamento canônico');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] .vira-hero-heading span'), 'Central Técnica: headline do hero não possui gradiente canônico');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="document-library"]'), 'Central Técnica: biblioteca documental não possui superfície canônica');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="dpp-section"]'), 'Central Técnica: DPP não possui acabamento canônico');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"]'), 'Central Técnica: matriz regulatória não possui acabamento canônico');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="faq-section"]'), 'Central Técnica: FAQ não possui acabamento canônico');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="specification-request"]'), 'Central Técnica: solicitação técnica não possui acabamento canônico');
assert(sharedCss.includes('@media (max-width:1023px)') && sharedCss.includes('@media (max-width:639px)'), 'Central Técnica: refinamento responsivo tablet/mobile ausente');

// Refinamento mobile aprovado na revisão visual
assert(sharedCss.includes('/* Central Tecnica mobile refinement — visual review */'), 'Central Técnica: refinamento mobile da revisão visual não está documentado');
assert(sharedCss.includes('@media (min-width:360px) and (max-width:639px) {\n  [data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child'), 'Central Técnica: breakpoint 360–639 px para hero 2×2 ausente');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"] .overflow-x-auto::before'), 'Central Técnica: indicador DESLIZE da matriz regulatória ausente');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"] .overflow-x-auto::after'), 'Central Técnica: fade lateral da matriz regulatória ausente');
assert(sharedCss.includes('[data-vira-internal="central-tecnica"] [data-purpose="document-library"] .doc-card > div:last-child'), 'Central Técnica: ações documentais não possuem layout mobile dedicado');

console.log('central-tecnica: ok');
