import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("todas as páginas principais importam as fontes Manrope e IBM Plex Mono", () => {
  const pages = [
    "index.html",
    "paver.html",
    "guias.html",
    "blocos.html",
    "central-tecnica.html",
    "passaporte.html",
    "uniformes.html"
  ];

  for (const page of pages) {
    const html = read(page);
    assert.match(html, /family=IBM\+Plex\+Mono/, page + " deve importar IBM Plex Mono do Google Fonts");
    assert.match(html, /family=Manrope/, page + " deve importar Manrope do Google Fonts");
  }
});

test("estilos globais e componentes aplicam Manrope (principal) e IBM Plex Mono (técnica)", () => {
  const styles = read("styles.css");
  const homeHardening = read("home-hardening.css");
  const paverCss = read("paver.css");
  const platformCss = read("platform.css");
  const subpagesCss = read("subpages.css");

  // styles.css define Manrope para body, h1-h6 e IBM Plex Mono para técnico
  assert.match(styles, /--font-main:\s*"Manrope"/);
  assert.match(styles, /--font-mono:\s*"IBM Plex Mono"/);
  assert.match(styles, /body\{[^}]*font-family:var\(--font-main\)/);
  assert.match(styles, /h1,h2,h3[^{]*\{[^}]*font-family:var\(--font-main\)/);

  // home-hardening.css define Manrope no título e cards, e IBM Plex Mono no eyebrow
  assert.match(homeHardening, /#ods-title[\s\S]*?font-family:\s*'Manrope'/);
  assert.match(homeHardening, /\.ods-card-content h3[\s\S]*?font-family:\s*'Manrope'/);
  assert.match(homeHardening, /\.ods-eyebrow[\s\S]*?font-family:\s*'IBM Plex Mono'/);

  // paver.css define Manrope para body, títulos e IBM Plex Mono para técnico
  assert.match(paverCss, /--font-main:"Manrope"/);
  assert.match(paverCss, /--font-mono:"IBM Plex Mono"/);
  assert.match(paverCss, /body\{[^}]*font-family:var\(--font-main\)/);

  // platform.css define Manrope para plataforma e IBM Plex Mono para técnico
  assert.match(platformCss, /\.platform-page\{[^}]*font-family:"Manrope"/);
  assert.match(platformCss, /\.platform-page h1,\.platform-page h2,\.platform-page h3\{font-family:"Manrope"/);

  // subpages.css define Manrope para títulos/conteúdo e IBM Plex Mono para técnico
  assert.match(subpagesCss, /\.resource-page\{[^}]*font-family:"Manrope"/);
  assert.match(subpagesCss, /\.resource-page>section:first-of-type h1\{[^}]*font-family:"Manrope"/);
  assert.match(subpagesCss, /:where\(\.resource-header \.back-home[\s\S]*?font-family:"IBM Plex Mono"/);
});
