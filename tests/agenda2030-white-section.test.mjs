import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');
const platformCss = readFileSync(new URL('../platform.css', import.meta.url), 'utf8');
const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Agenda 2030 vira seção visual independente branca com texto preto', () => {
  assert.match(homeCss, /\.calculator \.ods-panel\{[^}]*grid-column:1\/-1[^}]*width:100vw[^}]*background:#fff[^}]*color:#111/);
  assert.match(homeCss, /\.ods-summary\{[^}]*color:#222/);
  assert.match(homeCss, /\.ods-grid article\{[^}]*border:0[^}]*background:transparent/);
  assert.match(homeCss, /\.ods-grid p\{[^}]*color:#111/);
});

test('Marca e ícones ODS usam os anexos em proporção natural sem contorno', () => {
  assert.match(homeCss, /\.ods-panel>header>img\{[^}]*width:min\(787px,100%\)[^}]*height:auto/);
  assert.match(homeCss, /\.ods-grid img\{[^}]*width:min\(186px,100%\)[^}]*height:auto/);
  for (const id of ['08','09','11','12','13','17']) {
    assert.match(indexHtml, new RegExp(`assets/ods-${id}-onu\\.png`));
  }
  assert.match(indexHtml, /assets\/ods-marca-onu\.png/);
});

test('rodapé reduz 35% a partir de 14,85 px', () => {
  assert.match(platformCss, /font-size:9\.65px/);
});
