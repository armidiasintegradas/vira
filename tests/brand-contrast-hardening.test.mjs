import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf-8');
const subpagesCss = readFileSync(new URL('../subpages.css', import.meta.url), 'utf-8');
const paverCss = readFileSync(new URL('../paver.css', import.meta.url), 'utf-8');
const appJs = readFileSync(new URL('../app.js', import.meta.url), 'utf-8');
const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');

test('menu flutuante scrolled no modo escuro aplica fundo escuro e logo negativo oficial', () => {
  assert.match(homeCss, /body:not\(\.header-on-light\)\s+\.site-header\.scrolled\s*\{[^}]*background:\s*rgba\(14,\s*18,\s*15,\s*0\.94\)/);
  assert.match(homeCss, /body:not\(\.header-on-light\)\s+\.site-header\s+\.brand\s+img\s*\{[^}]*content:\s*url\(['"]assets\/marca-site-menu\.webp['"]\)/);
  assert.match(homeCss, /body:not\(\.header-on-light\)\s+\.site-header\s+\.menu-toggle\s+span\s*\{[^}]*background:\s*#ffffff/);
});

test('menu flutuante scrolled no modo claro aplica fundo claro e logo policromático oficial', () => {
  assert.match(homeCss, /body\.header-on-light\s+\.site-header\.scrolled\s*\{[^}]*background:\s*rgba\(248,\s*248,\s*244,\s*0\.94\)/);
  assert.match(homeCss, /body\.header-on-light\s+\.site-header\s+\.brand\s+img\s*\{[^}]*content:\s*url\(['"]assets\/marca-logo-final\.png['"]\)/);
  assert.match(homeCss, /body\.header-on-light\s+\.site-header\s+\.menu-toggle\s+span\s*\{[^}]*background:\s*#151814/);
});

test('classificação de seções em app.js exclui contato da lista clara e monitora seções relevantes', () => {
  assert.doesNotMatch(appJs, /lightSections\s*=\s*['"][^'"]*\.contact/);
  assert.match(appJs, /lightSections\s*=\s*['"][^'"]*#manifesto/);
  assert.match(appJs, /lightSections\s*=\s*['"][^'"]*#agenda-2030/);
  assert.match(appJs, /lightSections\s*=\s*['"][^'"]*#processo/);
  assert.match(appJs, /lightSections\s*=\s*['"][^'"]*#faq/);
});

test('subpáginas e cabeçalhos escuros aplicam marca oficial sem filtros destrutivos de descoloração', () => {
  assert.match(subpagesCss, /\.resource-header\s+img\s*\{[^}]*content:\s*url\(['"]assets\/marca-site-menu\.webp['"]\)/);
  assert.match(paverCss, /\.paver-brand\s+img\s*\{[^}]*content:\s*url\(['"]assets\/marca-site-menu\.webp['"]\)/);
  assert.match(indexHtml, /<header\s+class="site-header"[^>]*>[\s\S]*?src="assets\/marca-site-menu\.webp"/);
});

test('assets oficiais da marca VIRA existem no diretório de assets', () => {
  assert.ok(existsSync(new URL('../assets/marca-site-menu.webp', import.meta.url)), 'assets/marca-site-menu.webp deve existir');
  assert.ok(existsSync(new URL('../assets/marca-logo-final.png', import.meta.url)), 'assets/marca-logo-final.png deve existir');
  assert.ok(existsSync(new URL('../assets/logo.png', import.meta.url)), 'assets/logo.png deve existir');
  assert.ok(existsSync(new URL('../assets/marca.png', import.meta.url)), 'assets/marca.png deve existir');
  assert.ok(existsSync(new URL('../assets/marca-branca-verde.svg', import.meta.url)), 'assets/marca-branca-verde.svg deve existir');
});

test('seções de dúvidas e rodapé possuem escurecimento ativo (FAQ 50% e rodapé 65%)', () => {
  assert.match(homeCss, /\.faq\.section#faq::before\s*\{[^}]*background:\s*rgba\(14,\s*18,\s*15,\s*0\.50\)/);
  assert.match(homeCss, /footer#rodape\.site-footer\s*\{[^}]*rgba\(7,\s*10,\s*8,\s*0\.80\)/);
});

