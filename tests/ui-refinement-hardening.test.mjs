import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const stylesCss = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('os cinco assets fotográficos e gráficos oficiais de alta resolução existem e possuem dimensões válidas', () => {
  const assets = [
    'assets/hero-paver-orla-menina-v10.jpg',
    'assets/impacto-cooperativas-hero.jpg',
    'assets/processo-operacao-hero.png',
    'assets/faq-praca-pavers-hero.jpg',
    'assets/rodape-cidades-melhores-hero.jpg'
  ];

  for (const asset of assets) {
    const assetUrl = new URL('../' + asset, import.meta.url);
    assert.ok(existsSync(assetUrl), asset + ' deve existir');
    const stats = statSync(assetUrl);
    assert.ok(stats.size > 100000, asset + ' deve ser asset de alta resolução (>100KB), encontrado: ' + stats.size);
  }
});

test('sistema tipográfico unificado não possui referências residuais legadas a JetBrains Mono', () => {
  assert.equal(stylesCss.includes('"JetBrains Mono"'), false, 'styles.css não deve conter "JetBrains Mono" residual');
  assert.match(stylesCss, /--font-main:\s*"Manrope"/);
  assert.match(stylesCss, /--font-mono:\s*"IBM Plex Mono"/);
});

test('harmonização de UI, espaçamentos, containers e refinamento de diagramação estão ativos', () => {
  assert.match(homeCss, /--site-max-w:\s*1400px/);
  assert.match(homeCss, /\.hero-media img\s*\{[^}]*object-position:\s*center 36%/);
  assert.match(homeCss, /\.site-header\.scrolled\s*\{[^}]*backdrop-filter:\s*blur\(20px\)/);
  assert.match(homeCss, /\.manifesto-copy\s*\{[^}]*letter-spacing:\s*-0\.035em/);
  assert.match(homeCss, /\.hero-proof\s*\{[^}]*backdrop-filter:\s*blur\(12px\)/);
});
