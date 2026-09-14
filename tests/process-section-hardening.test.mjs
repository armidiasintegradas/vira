import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção de processo possui estrutura editorial completa e ancoragem #processo', () => {
  assert.match(indexHtml, /id="processo"/, 'ID #processo deve existir');
  assert.match(indexHtml, /class="process-eyebrow"[^>]*><span>—<\/span>\s*PROCESSO/);
  assert.match(indexHtml, /<h2 class="process-title"[^>]*>Da operação<br>ao projeto<\/h2>/);
  assert.match(indexHtml, /Transformamos resíduos em soluções reais[\s\S]*?para cidades mais justas/);
  assert.match(indexHtml, /ECONOMIA CIRCULAR EM MOVIMENTO\./);
});

test('as cinco etapas do processo estão documentadas em cards arquitetônicos com numeração e tags', () => {
  assert.match(indexHtml, /<span class="process-step-num">01<\/span>[\s\S]*?ORIGEM[\s\S]*?<h3 class="process-step-title">COLETA<\/h3>/);
  assert.match(indexHtml, /Trabalhamos com cooperativas e catadores/);

  assert.match(indexHtml, /<span class="process-step-num">02<\/span>[\s\S]*?SELEÇÃO[\s\S]*?<h3 class="process-step-title">TRIAGEM<\/h3>/);
  assert.match(indexHtml, /Os materiais são separados e preparados/);

  assert.match(indexHtml, /<span class="process-step-num">03<\/span>[\s\S]*?ENGENHARIA[\s\S]*?<h3 class="process-step-title">PROCESSAMENTO<\/h3>/);
  assert.match(indexHtml, /Transformamos plásticos e escória em novos materiais/);

  assert.match(indexHtml, /<span class="process-step-num">04<\/span>[\s\S]*?APLICAÇÃO[\s\S]*?<h3 class="process-step-title">PRODUTOS<\/h3>/);
  assert.match(indexHtml, /Pavers, blocos e guias com qualidade/);

  assert.match(indexHtml, /<span class="process-step-num">05<\/span>[\s\S]*?DESTINO[\s\S]*?<h3 class="process-step-title">CIDADES MAIS JUSTAS<\/h3>/);
  assert.match(indexHtml, /Infraestrutura sustentável para um futuro melhor/);
});

test('botão CTA, palco fotográfico panorâmico e manifesto vertical estão presentes', () => {
  assert.match(indexHtml, /class="button process-button"[^>]*>[\s\S]*?Conheça o processo[\s\S]*?→/);
  assert.match(indexHtml, /class="process-button-arrow"/);
  assert.match(indexHtml, /class="process-foot-logo"/);
  assert.match(indexHtml, /class="process-vertical-manifesto"[\s\S]*?RESÍDUOS[\s\S]*?HOJE\.[\s\S]*?CIDADES[\s\S]*?AMANHÃ\./);
  assert.match(indexHtml, /class="process-stage-panoramic"/);
  assert.match(indexHtml, /assets\/processo-operacao-master-raw\.jpg/);
  assert.match(indexHtml, /COLETIVOS &amp; COOPERATIVAS/);
  assert.match(indexHtml, /TERMOCOMPRESSÃO &amp; ENGENHARIA/);
  assert.match(indexHtml, /INFRAESTRUTURA URBANA APLICADA/);
});

test('estilos de alta fidelidade para o palco de processo dourado ocre estão configurados', () => {
  assert.match(homeCss, /\.process-section#processo\s*\{[^}]*background-color:\s*#f1c546/i);
  assert.match(homeCss, /\.process-section#processo::before\s*\{[^}]*background-size:\s*60px\s*60px/);
  assert.match(homeCss, /\.process-steps-grid\s*\{[^}]*grid-template-columns:\s*repeat\(5,\s*1fr\)/);
  assert.match(homeCss, /\.process-button\s*\{[^}]*background:\s*#142519/);
  assert.match(homeCss, /\.process-button:hover\s*\.process-button-arrow\s*\{[^}]*transform:\s*translateX\(4px\)/);
  assert.match(homeCss, /\.process-button\s*\{[^}]*border-radius:\s*9999px/);
  assert.match(homeCss, /\.process-stage-panoramic\s*\{[^}]*position:\s*relative/);
  assert.match(homeCss, /@media\s*\(max-width:\s*720px\)[\s\S]*?\.process-steps-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
});

test('arquivo de imagem master de processo existe em assets', () => {
  assert.ok(existsSync(new URL('../assets/processo-operacao-master-raw.jpg', import.meta.url)), 'assets/processo-operacao-master-raw.jpg deve existir');
});

test('marcadores semânticos da composição e georreferenciamento estão implementados', () => {
  assert.match(indexHtml, /PESSOAS[\s\S]*?QUE MOVEM[\s\S]*?MUDANÇAS/);
  assert.match(indexHtml, /TECNOLOGIA[\s\S]*?A SERVIÇO[\s\S]*?DO IMPACTO/);
  assert.match(indexHtml, /RESÍDUOS[\s\S]*?HOJE\.[\s\S]*?CIDADES[\s\S]*?AMANHÃ\./);
  assert.match(indexHtml, /SOLUÇÕES[\s\S]*?PARA CIDADES[\s\S]*?MELHORES/);
  assert.match(indexHtml, /CARUARU-PE/);
  assert.match(indexHtml, /class="process-mobile-media"/);
  assert.match(indexHtml, /class="process-mobile-cta"/);
});


