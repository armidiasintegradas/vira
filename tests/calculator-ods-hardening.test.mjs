import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');
const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('cartão de plástico usa fundo claro com tipografia verde legível', () => {
  assert.match(homeCss, /\.calc-result\.plastic\{[^}]*background:#eef0e8[^}]*color:#315330/);
  assert.match(homeCss, /\.calc-result\.plastic strong\{[^}]*color:#315330/);
  assert.match(homeCss, /\.calc-result\.plastic>span\{[^}]*color:#315330/);
  assert.match(homeCss, /\.calc-result\.plastic>p\{[^}]*color:#3f5940/);
});

test('Agenda 2030 é um painel verde com grade editorial 3x2', () => {
  assert.match(homeCss, /\.calculator \.ods-panel\{[^}]*background:#315330/);
  assert.match(homeCss, /\.ods-grid\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(homeCss, /@media\(max-width:900px\)\{[^}]*\.ods-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(homeCss, /@media\(max-width:520px\)\{[^}]*\.ods-grid\{grid-template-columns:1fr/);
});

test('marca ODS cresce 50% e imagens preservam proporção', () => {
  assert.match(homeCss, /\.ods-panel>header>img\{[^}]*width:150px[^}]*height:auto/);
  assert.match(homeCss, /\.ods-grid img\{[^}]*width:clamp\(140px,12vw,180px\)[^}]*height:auto/);
  for (const id of ['08','09','11','12','13','17']) {
    assert.match(indexHtml, new RegExp(`assets/ods-${id}-onu\\.png`));
  }
  assert.match(indexHtml, /assets\/ods-marca-onu\.png/);
});
