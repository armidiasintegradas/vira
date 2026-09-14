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

test('seção Perguntas Técnicas adota papel off-white e rodapé institucional escuro adota #08110D', () => {
  assert.match(homeCss, /\.tech-qa\.section#faq\s*\{[^}]*background-color:\s*#F1EFEA/);
  assert.match(homeCss, /footer#rodape\.site-footer\s*\{[^}]*background-color:\s*#08110D/);
});

test('sistema de 9 capítulos documentais cinematográficos está indexado no index.html', () => {
  const chapters = [
    'CAP. 01[\\s\\S]*?O PROBLEMA',
    'CAP. 02[\\s\\S]*?A MATÉRIA-PRIMA',
    'CAP. 03[\\s\\S]*?A ENGENHARIA',
    'CAP. 04[\\s\\S]*?AS APLICAÇÕES',
    'CAP. 05[\\s\\S]*?A INDÚSTRIA',
    'CAP. 06[\\s\\S]*?A DECISÃO',
    'CAP. 07[\\s\\S]*?A TRANSFORMAÇÃO',
    'CAP. 08[\\s\\S]*?O CONHECIMENTO',
    'CAP. 09[\\s\\S]*?O CONVITE'
  ];
  for (const ch of chapters) {
    assert.match(indexHtml, new RegExp(ch));
  }
  assert.match(homeCss, /\.chapter-marker\s*\{[^}]*font-family:\s*['"]IBM Plex Mono['"]/);
});

test('interlúdio editorial de respiração (Fase 29) conecta Expertise e Calculadora com silêncio', () => {
  assert.match(indexHtml, /class="editorial-interlude"/);
  assert.match(indexHtml, /CAP\. 05\.B \/\/ INTERLÚDIO/);
  assert.match(indexHtml, /Produzir em escala real\./);
  assert.match(indexHtml, /A engenharia que transforma resíduos em infraestrutura para cidades\./);
  assert.match(homeCss, /\.editorial-interlude\s*\{[^}]*background-color:\s*#070c09/);
});

test('sistema de botões em formato cápsula (FASE 31) unifica dinâmica, tipografia mono e expansão de gap no hover', () => {
  const buttonSelectors = [
    /\.hero-btn[^{]*\{[^}]*border-radius:\s*9999px/,
    /\.hero-btn[^{]*\{[^}]*font-family:\s*var\(--font-mono/,
    /\.impact-button\s*\{[^}]*border-radius:\s*9999px/,
    /\.process-button\s*\{[^}]*border-radius:\s*9999px/,
    /\.contact-btn-submit\s*\{[^}]*border-radius:\s*9999px/,
    /\.contact-btn-tech\s*\{[^}]*border-radius:\s*9999px/,
    /\.contact-btn-quote\s*\{[^}]*border-radius:\s*9999px/,
    /\.closing-btn-primary\s*\{[^}]*border-radius:\s*999px/,
    /\.closing-btn-secondary\s*\{[^}]*border-radius:\s*999px/,
    /\.calc-pill-btn\s*\{[^}]*border-radius:\s*9999px/,
    /\.expertise-pill-btn\s*\{[^}]*border-radius:\s*9999px/,
    /\.expertise-final-btn\s*\{[^}]*border-radius:\s*9999px/
  ];

  for (const sel of buttonSelectors) {
    assert.match(homeCss, sel);
  }

  // Verificação da dinâmica de expansão no hover (gap de 18px ou translação da seta)
  assert.match(homeCss, /\.hero-btn:hover[^{]*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.process-button:hover\s*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.calc-pill-btn:hover\s*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.expertise-pill-btn:hover\s*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.expertise-final-btn:hover\s*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.closing-btn-primary:hover\s*\{[^}]*gap:\s*18px/);
  assert.match(homeCss, /\.contact-btn-submit:hover\s*\{[^}]*gap:\s*18px/);
});



