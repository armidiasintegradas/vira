import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const stylesCss = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const appJs = readFileSync(new URL('../app.js', import.meta.url), 'utf8');

test('seção #indicadores possui cabeçalho técnico exato e zero marketing', () => {
  assert.match(indexHtml, /<section class="stats section" id="indicadores">/, 'seção #indicadores deve existir');
  assert.match(indexHtml, /<p class="eyebrow">Base técnica<\/p>/, 'eyebrow Base técnica deve estar presente');
  assert.match(indexHtml, /<h2>Engenharia<br>que pode ser<br>documentada\.<\/h2>/, 'headline deve ser atualizada para o formato de 3 linhas aprovado');
  assert.match(
    indexHtml,
    /<p>Cada dado apresentado possui origem técnica identificável e pode ser associado ao respectivo ensaio\.<\/p>/,
    'texto de apoio editorial deve ser exato'
  );
  assert.doesNotMatch(
    indexHtml,
    /Publicamos números técnicos somente quando associados/,
    'texto de apoio antigo deve ser removido'
  );
});

test('Evidence 01 (Composição) é o item de destaque com 50/50 e detalhamento exato', () => {
  assert.match(indexHtml, /<article class="metric metric-featured">/, 'Evidence 01 deve ter classe metric-featured');
  assert.match(indexHtml, /<span class="metric-index">01<\/span>[\s\S]*?50<small>\/50<\/small>/);
  assert.match(indexHtml, /<h3 class="metric-title">COMPOSIÇÃO<\/h3>/);
  assert.match(indexHtml, /50% plástico reciclado · 50% coproduto mineral/);
  assert.match(indexHtml, /Composição-base validada\./);
});

test('Evidence 02 (Rastreabilidade) substitui LOTE e elimina qualquer referência a em desenvolvimento', () => {
  assert.match(indexHtml, /<span class="metric-index">02<\/span>[\s\S]*?RASTREABILIDADE/);
  assert.match(indexHtml, /<h3 class="metric-title">IDENTIFICAÇÃO DE LOTE<\/h3>/);
  assert.match(indexHtml, /Cada produção possui identificação única\./);
  
  const start = indexHtml.indexOf('id="indicadores"');
  const end = indexHtml.indexOf('</section>', start);
  const sectionHtml = indexHtml.substring(start, end);
  assert.doesNotMatch(sectionHtml, /em desenvolvimento/i, 'nenhuma referência a em desenvolvimento pode permanecer');
  assert.doesNotMatch(sectionHtml, />LOTE</, 'LOTE deve ser substituído por RASTREABILIDADE');
});

test('Evidence 03 (Energia Solar) e Evidence 04 (Ensaio) cumprem a nova diretriz editorial', () => {
  // Evidence 03
  assert.match(indexHtml, /<span class="metric-index">03<\/span>[\s\S]*?ENERGIA SOLAR/);
  assert.match(indexHtml, /<h3 class="metric-title">MATRIZ ENERGÉTICA<\/h3>/);
  assert.match(indexHtml, /Operação apoiada por geração fotovoltaica\./);

  // Evidence 04
  assert.match(indexHtml, /<span class="metric-index">04<\/span>[\s\S]*?ENSAIO/);
  assert.match(indexHtml, /<h3 class="metric-title">DOCUMENTAÇÃO<\/h3>/);
  assert.match(indexHtml, /Resultados publicados somente após validação técnica\./);
});

test('hierarquia obrigatória Número/Dado -> Título -> Descrição é respeitada em todos os items', () => {
  const start = indexHtml.indexOf('id="indicadores"');
  const end = indexHtml.indexOf('</section>', start);
  const sectionHtml = indexHtml.substring(start, end);

  const metricArticles = sectionHtml.match(/<article class="metric[\s\S]*?<\/article>/g);
  assert.equal(metricArticles?.length, 4, 'devem existir 4 evidence items');

  metricArticles.forEach((card, idx) => {
    const topIdx = card.indexOf('metric-top');
    const bottomIdx = card.indexOf('metric-bottom');
    const titleIdx = card.indexOf('metric-title');
    const descIdx = card.indexOf('metric-desc');
    assert.ok(topIdx < bottomIdx, `Card ${idx + 1}: metric-top deve preceder metric-bottom`);
    assert.ok(titleIdx < descIdx, `Card ${idx + 1}: título deve preceder descrição`);
  });
});

test('CSS implementa coreografia editorial, linhas organizadoras e microinterações silenciosas', () => {
  assert.match(stylesCss, /\.stats\.metrics-visible \.stats-intro \.eyebrow\s*\{[^}]*opacity:\s*1/);
  assert.match(stylesCss, /\.stats\.metrics-visible \.metric:nth-child\(4\)\s*\{[^}]*opacity:\s*1/);
  assert.match(stylesCss, /\.metric-line\s*\{[^}]*height:\s*1px/);
  assert.match(stylesCss, /\.metric:hover \.metric-line\s*\{[^}]*width:\s*48px/);
  assert.doesNotMatch(stylesCss, /\.metric:hover\s*\{[^}]*transform:\s*scale/);
});

test('app.js aciona a coreografia uma única vez com unobserve', () => {
  assert.match(appJs, /statsObserver\.unobserve\(stats\)/, 'observer deve ser desconectado após a primeira execução');
});
