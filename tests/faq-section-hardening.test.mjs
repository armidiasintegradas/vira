import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção Perguntas Técnicas possui estrutura editorial, kicker, headline e ancoragem #faq', () => {
  assert.match(indexHtml, /id="faq"/, 'ID #faq deve existir');
  assert.match(indexHtml, /class="tech-qa section"/, 'Classe .tech-qa deve existir');
  assert.match(indexHtml, /class="tech-qa-kicker"[^>]*>[\s\S]*?PERGUNTAS TÉCNICAS/);
  assert.match(indexHtml, /<h2 id="faq-title" class="tech-qa-headline"[^>]*>\s*O que<br>\s*normalmente<br>\s*perguntam<br>\s*antes de<br>\s*especificar<br>\s*o material\.\s*<\/h2>/);
  assert.match(indexHtml, /Respostas objetivas elaboradas<br>\s*pela equipe técnica da VIRA\./);
  assert.match(indexHtml, /class="tech-qa-editorial-callout"[\s\S]*?ENGENHARIA<br>\s*PARA CIDADES<br>\s*MELHORES\./);
  assert.match(indexHtml, /class="tech-qa-manifesto-header"[\s\S]*?RESÍDUOS<br>\s*HOJE\.<br>\s*CIDADES<br>\s*AMANHÃ\./);
});

test('as cinco perguntas técnicas estão configuradas permanentemente abertas (zero accordion) com numeração e links de ação', () => {
  assert.doesNotMatch(indexHtml, /<details[^>]*class="[^"]*faq/, 'Não devem existir accordions/details');
  assert.match(indexHtml, /<div class="tech-qa-num"[^>]*>01<\/div>[\s\S]*?<h3 class="tech-qa-q">Onde os blocos e pavers da VIRA podem ser utilizados\?<\/h3>[\s\S]*?VER APLICAÇÕES/);
  assert.match(indexHtml, /<div class="tech-qa-num"[^>]*>02<\/div>[\s\S]*?<h3 class="tech-qa-q">Como ocorre o controle de origem e a rastreabilidade dos resíduos\?<\/h3>[\s\S]*?CONHECER O PROCESSO/);
  assert.match(indexHtml, /<div class="tech-qa-num"[^>]*>03<\/div>[\s\S]*?<h3 class="tech-qa-q">Como a composição de cada lote é definida\?<\/h3>[\s\S]*?VER BASE TÉCNICA/);
  assert.match(indexHtml, /<div class="tech-qa-num"[^>]*>04<\/div>[\s\S]*?<h3 class="tech-qa-q">Os materiais passam por ensaios em laboratórios independentes\?<\/h3>[\s\S]*?CONHECER METODOLOGIA/);
  assert.match(indexHtml, /<div class="tech-qa-num"[^>]*>05<\/div>[\s\S]*?<h3 class="tech-qa-q">Como iniciar a especificação da VIRA em um projeto\?<\/h3>[\s\S]*?FALAR COM A ENGENHARIA/);

  const itemMatches = indexHtml.match(/class="tech-qa-item"/g) || [];
  assert.equal(itemMatches.length, 5, 'Devem existir exatamente 5 perguntas técnicas');
});

test('watermark decorativa V e rodapé da seção com lockup oficial e economia circular', () => {
  assert.match(indexHtml, /class="tech-qa-watermark"/);
  assert.match(indexHtml, /ECONOMIA CIRCULAR EM MOVIMENTO\./);
  assert.match(indexHtml, /<img[^>]*src="assets\/marca-logo-final\.png"[^>]*class="tech-qa-foot-logo"/);
  assert.match(indexHtml, /SOLUÇÕES<br>\s*PARA CIDADES<br>\s*MELHORES\./);
});

test('estilos CSS de alta fidelidade para Perguntas Técnicas estão configurados', () => {
  assert.match(homeCss, /\.tech-qa\.section#faq\s*\{[^}]*background-color:\s*#F1EFEA/);
  assert.match(homeCss, /\.tech-qa-grid\s*\{[^}]*grid-template-columns:\s*minmax\(320px,\s*420px\)\s*1fr/);
  assert.match(homeCss, /\.tech-qa-headline\s*\{[^}]*font-weight:\s*800/);
  assert.match(homeCss, /\.tech-qa-num\s*\{[^}]*font-weight:\s*200/);
  assert.match(homeCss, /\.tech-qa-link:hover\s*\.tech-qa-arrow\s*\{[^}]*transform:\s*translateX\(5px\)/);
  assert.match(homeCss, /@media\s*\(max-width:\s*960px\)[\s\S]*?\.tech-qa-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
});
