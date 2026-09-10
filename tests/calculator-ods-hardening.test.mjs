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

test('Agenda 2030 é uma seção independente com fundo branco e matriz editorial 3x2', () => {
  assert.match(homeCss, /\.ods-section[^{]*\{[^}]*background:\s*#ffffff/);
  assert.match(homeCss, /\.ods-grid[^{]*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(homeCss, /@media\(max-width:900px\)[\s\S]*?\.ods-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(homeCss, /@media\(max-width:580px\)[\s\S]*?\.ods-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
  assert.match(homeCss, /\.ods-card[^{]*\{[^}]*flex-direction:\s*row/);
});

test('marca oficial ONU e azulejos ODS estão presentes sem molduras ou contornos', () => {
  assert.match(homeCss, /\.ods-brand-logo[^{]*\{[^}]*background:\s*transparent/);
  assert.match(homeCss, /\.ods-tile[^{]*\{[^}]*border-radius:\s*6px/);
  for (const id of ['08','09','11','12','13','17']) {
    assert.match(indexHtml, new RegExp(`assets/ods-${id}-onu\\.png`));
  }
  assert.match(indexHtml, /assets\/ods-marca-onu\.png/);
});

