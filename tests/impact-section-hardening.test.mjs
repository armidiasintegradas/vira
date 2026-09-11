import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção de impacto possui estrutura editorial completa e ancoragem intacta', () => {
  assert.match(indexHtml, /id="colaboracao"/, 'ID #colaboracao deve ser preservado para navegação');
  assert.match(indexHtml, /class="impact-eyebrow"[^>]*><span>—<\/span>\s*IMPACTO<\/p>/);
  assert.match(indexHtml, /<h2 class="impact-title"[^>]*>Impacto real<br><span class="impact-title-highlight">e cooperativas<\/span><\/h2>/);
  assert.match(indexHtml, /Mais que materiais, geramos oportunidades/);
  assert.match(indexHtml, /RECICLAGEM QUE INCLUI\.\s*CIDADES QUE AVANÇAM\./);
});

test('quatro métricas de impacto e cooperativas estão documentadas com ícones', () => {
  assert.match(indexHtml, /1\.257\+/, '1.257+ catadores');
  assert.match(indexHtml, /CATADORES<br>BENEFICIADOS/);

  assert.match(indexHtml, /12\.436\+/, '12.436+ toneladas');
  assert.match(indexHtml, /TONELADAS<br>PROCESSADAS/);

  assert.match(indexHtml, /7\.691\+/, '7.691+ resíduos');
  assert.match(indexHtml, /TONELADAS DE<br>RESÍDUOS EVITADAS/);

  assert.match(indexHtml, /42\+/, '42+ cooperativas');
  assert.match(indexHtml, /COOPERATIVAS<br>PARCEIRAS/);
});

test('botão CTA, manifesto vertical e créditos de tecnologia estão presentes', () => {
  assert.match(indexHtml, /class="button impact-button"[^>]*>[\s\S]*?Conheça nosso impacto →/);
  assert.match(indexHtml, /PESSOAS[\s\S]*?RESÍDUOS[\s\S]*?OPORTUNIDADES[\s\S]*?CIDADES[\s\S]*?MAIS JUSTAS/);
  assert.match(indexHtml, /AR Mídias Integradas/);
});

test('estilos de alta fidelidade para o palco de impacto estão configurados', () => {
  assert.match(homeCss, /\.collaboration#colaboracao\s*\{[^}]*background-image:\s*url\(['"]assets\/impacto-cooperativas-hero\.jpg['"]\)/);
  assert.match(homeCss, /\.impact-title-highlight\s*\{[^}]*color:\s*#88ca66/);
  assert.match(homeCss, /\.impact-metrics-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*1fr\)/);
  assert.match(homeCss, /\.impact-button\s*\{[^}]*background:\s*#5E9B44/);
  assert.match(homeCss, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.impact-metrics-grid\s*\{[^}]*grid-template-columns:\s*1fr 1fr/);
});

test('arquivo de imagem da hero de impacto existe em assets', () => {
  assert.ok(existsSync(new URL('../assets/impacto-cooperativas-hero.jpg', import.meta.url)), 'assets/impacto-cooperativas-hero.jpg deve existir');
});
