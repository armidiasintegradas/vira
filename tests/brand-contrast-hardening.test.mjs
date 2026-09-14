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

test('sistema de seções com títulos limpos sem prefixo CAP e scroll-cue sem clipping (FASE 32)', () => {
  // Garante que nenhum título ou kicker mantenha o prefixo "CAP."
  assert.doesNotMatch(indexHtml, /CAP\.\s*\d+/i, 'index.html não deve conter prefixo CAP.');

  // Garante que cada seção exibe seu nome limpo e autêntico
  const sectionNames = [
    'O PROBLEMA',
    'Jornada do material',
    'Base técnica',
    'NOSSOS PRODUTOS',
    'EXPERTISE INDUSTRIAL',
    'INTERLÚDIO',
    'Calculadora de matéria',
    'PROCESSO',
    'PERGUNTAS TÉCNICAS',
    'VAMOS JUNTOS'
  ];
  for (const name of sectionNames) {
    assert.ok(indexHtml.includes(name), `index.html deve conter o nome da seção "${name}"`);
  }

  // Garante elevação segura do .scroll-cue no Hero acima do -24px do #manifesto
  assert.match(homeCss, /\.hero\s+\.scroll-cue\s*\{[^}]*bottom:\s*clamp/);
  assert.match(homeCss, /\.hero\s+\.scroll-cue\s*\{[^}]*z-index:\s*3/);
});

test('interlúdio editorial de respiração conecta Expertise e Calculadora com silêncio', () => {
  assert.match(indexHtml, /class="editorial-interlude"/);
  assert.match(indexHtml, /class="interlude-num">INTERLÚDIO<\/span>/);
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

test('resolução do gap na rolagem da página e ocultação segura do Hero (FASE 33)', () => {
  // Garante que todas as seções e interlúdios fiquem firmemente acima do Hero
  assert.match(homeCss, /main\s*>\s*\*:not\(\.hero\)[\s\S]*?z-index:\s*10/);
  assert.match(homeCss, /\.editorial-interlude\s*\{[^}]*z-index:\s*10/);
  assert.match(homeCss, /body\.past-hero\s+\.hero\s*\{[^}]*visibility:\s*hidden/);
  assert.match(appJs, /document\.body\.classList\.toggle\(['"]past-hero['"]/);
});

test('watermark da marca oficial VIRA com 50% de transparência (FASE 33)', () => {
  assert.ok(existsSync(new URL('../assets/marca-icone-v.png', import.meta.url)), 'assets/marca-icone-v.png deve existir');
  assert.match(indexHtml, /class="tech-qa-watermark"[\s\S]*?assets\/marca-icone-v\.png/);
  assert.match(indexHtml, /class="closing-watermark"[\s\S]*?assets\/marca-icone-v\.png/);
  assert.match(homeCss, /\.tech-qa-watermark\s*\{[^}]*opacity:\s*0\.5/);
  assert.match(homeCss, /\.closing-watermark\s*\{[^}]*opacity:\s*0\.5/);
});



