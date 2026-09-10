import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const css = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');
const logoUrl = new URL('../assets/ods-logo-anexo.svg', import.meta.url);

test('Agenda 2030 substitui a marca antiga pela marca horizontal do anexo', () => {
  assert.equal(existsSync(logoUrl), true);
  assert.match(css, /\.ods-panel>header>img\{[^}]*display:none/);
  assert.match(css, /\.ods-panel>header::after\{[^}]*ods-logo-anexo\.svg/);
  assert.match(css, /aspect-ratio:787\/65/);
});
