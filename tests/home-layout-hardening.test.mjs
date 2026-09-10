import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');
const platformCss = readFileSync(new URL('../platform.css', import.meta.url), 'utf8');

test('Expertise limita conteúdo e título ao painel editorial', () => {
  assert.match(homeCss, /\.expertise-chapter\{[^}]*min-width:0/);
  assert.match(homeCss, /\.expertise-chapter h3\{[^}]*max-width:min\(100%,/);
  assert.match(homeCss, /\.expertise-chapter h3\{[^}]*overflow-wrap:break-word/);
});

test('Calculadora elimina vazio excessivo e define contraste legível', () => {
  assert.match(homeCss, /\.calculator\{[^}]*align-items:start/);
  assert.match(homeCss, /\.calc-workspace\{[^}]*display:grid/);
  assert.match(homeCss, /\.calc-workspace\{[^}]*align-content:start/);
  assert.match(homeCss, /\.calc-footer\{[^}]*height:auto/);
  assert.match(homeCss, /\.calc-result\{[^}]*min-height:clamp\(/);
  assert.match(homeCss, /\.calc-result\.carbon\{[^}]*background:#eef0e8/);
  assert.match(homeCss, /\.calc-result\.carbon strong\{[^}]*color:#315330/);
  assert.match(homeCss, /\.calc-result\.carbon>span/);
});

test('Crédito global do rodapé aumenta 35% mantendo o texto aprovado', () => {
  assert.match(platformCss, /font-size:14\.85px/);
  assert.match(platformCss, /© 2026 Vira\. Todos os direitos reservados\. · Design & Tecnologia por AR Mídias Integradas/);
});
