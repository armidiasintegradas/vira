import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("todas as páginas principais importam a fonte Plus Jakarta Sans", () => {
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
    assert.match(html, /Plus\+Jakarta\+Sans/, page + " deve importar Plus Jakarta Sans do Google Fonts");
  }
});

test("estilos globais e componentes aplicam Plus Jakarta Sans em todos os títulos", () => {
  const styles = read("styles.css");
  const homeHardening = read("home-hardening.css");
  const paverCss = read("paver.css");
  const platformCss = read("platform.css");
  const subpagesCss = read("subpages.css");

  assert.match(styles, /h1,h2,h3[^{]*\{[^}]*font-family:[^;]*Plus Jakarta Sans/i);
  assert.match(homeHardening, /#ods-title[\s\S]*?font-family:\s*.Plus Jakarta Sans./);
  assert.match(homeHardening, /\.ods-card-content h3[\s\S]*?font-family:\s*.Plus Jakarta Sans./);
  assert.match(paverCss, /h1,h2,h3[^{]*\{[^}]*font-family:[^;]*Plus Jakarta Sans/i);
  assert.match(platformCss, /\.platform-page h1,\.platform-page h2,\.platform-page h3\{font-family:"Plus Jakarta Sans"/);
  assert.match(subpagesCss, /\.resource-page>section:first-of-type h1\{[^}]*font-family:"Plus Jakarta Sans"/);
  assert.match(subpagesCss, /\.resource-page main h2[^{]*\{[^}]*font-family:"Plus Jakarta Sans"/);
});
