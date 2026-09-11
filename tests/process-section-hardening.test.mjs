import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção de processo possui estrutura editorial completa e ancoragem #processo', () => {
  assert.match(indexHtml, /id="processo"/, 'ID #processo deve existir');
  assert.match(indexHtml, /class="process-eyebrow"[^>]*><span>—<\/span>\s*PROCESSO<\/p>/);
  assert.match(indexHtml, /<h2 class="process-title"[^>]*>Da operação<br>ao projeto<\/h2>/);
  assert.match(indexHtml, /Transformamos resíduos em soluções reais para cidades mais justas/);
  assert.match(indexHtml, /ECONOMIA CIRCULAR EM MOVIMENTO\./);
});

test('as cinco etapas do processo estão documentadas com numeração, ícones e setas', () => {
  assert.match(indexHtml, /<span class="process-step-num">01<\/span>[\s\S]*?<h3 class="process-step-title">COLETA<\/h3>/);
  assert.match(indexHtml, /Trabalhamos com cooperativas e catadores/);

  assert.match(indexHtml, /<span class="process-step-num">02<\/span>[\s\S]*?<h3 class="process-step-title">TRIAGEM<\/h3>/);
  assert.match(indexHtml, /Os materiais são separados e preparados/);

  assert.match(indexHtml, /<span class="process-step-num">03<\/span>[\s\S]*?<h3 class="process-step-title">PROCESSAMENTO<\/h3>/);
  assert.match(indexHtml, /Transformamos plásticos e escória em novos materiais/);

  assert.match(indexHtml, /<span class="process-step-num">04<\/span>[\s\S]*?<h3 class="process-step-title">PRODUTOS<\/h3>/);
  assert.match(indexHtml, /Pavers, blocos e guias com qualidade/);

  assert.match(indexHtml, /<span class="process-step-num">05<\/span>[\s\S]*?<h3 class="process-step-title">CIDADES MAIS JUSTAS<\/h3>/);
  assert.match(indexHtml, /Infraestrutura sustentável para um futuro melhor/);
});

test('botão CTA e rodapé com marca estão presentes', () => {
  assert.match(indexHtml, /class="button process-button"[^>]*>[\s\S]*?Conheça o processo →/);
  assert.match(indexHtml, /class="process-foot-logo"/);
});

test('estilos de alta fidelidade para o palco de processo dourado ocre estão configurados', () => {
  assert.match(homeCss, /\.process-section#processo\s*\{[^}]*background-color:\s*#ECC24E/);
  assert.match(homeCss, /\.process-section#processo\s*\{[^}]*background-image:\s*url\(['"]assets\/processo-operacao-hero\.png['"]\)/);
  assert.match(homeCss, /\.process-steps-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*1fr\)/);
  assert.match(homeCss, /\.process-button\s*\{[^}]*background:\s*#142519/);
  assert.match(homeCss, /@media\s*\(max-width:\s*720px\)[\s\S]*?\.process-steps-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
});

test('arquivo de imagem da hero de processo existe em assets', () => {
  assert.ok(existsSync(new URL('../assets/processo-operacao-hero.png', import.meta.url)), 'assets/processo-operacao-hero.png deve existir');
});
