import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const indexHtml = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const stylesCss = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

test("seção #colecao possui arquitetura aprovada da referência (media_1789257841342)", () => {
  assert.match(indexHtml, /<section class="products-territory section" id="colecao" data-nav-id="solucoes">/);
  assert.match(indexHtml, /class="territory-topo-lines"/);
  assert.match(indexHtml, /class="territory-shell"/);
  assert.match(indexHtml, /class="territory-copy-col"/);
  assert.match(indexHtml, /class="territory-showcase"/);
});

test("coluna editorial esquerda reproduz fielmente a referência media_1789257841342", () => {
  assert.match(indexHtml, /<span class="territory-eyebrow-text">NOSSOS PRODUTOS<\/span>/);
  assert.match(indexHtml, /<h2 class="territory-headline">\s*Engenharia<br>\s*aplicada<br>\s*ao território\.\s*<\/h2>/);
  assert.match(
    indexHtml,
    /Paver, blocos e guias produzidos com plástico reciclado e coprodutos minerais, para uma infraestrutura mais durável e de menor impacto\./
  );
  assert.match(indexHtml, /<a class="territory-btn" href="#produtos-vitrine">\s*<span>CONHECER PRODUTOS<\/span>\s*<i aria-hidden="true">→<\/i>\s*<\/a>/);
  assert.match(indexHtml, /<strong class="territory-brand-vira">VIRA<\/strong>/);
  assert.match(indexHtml, /<span class="territory-brand-tag">\s*CIDADES<br>\s*EM CIRCULAÇÃO\s*<\/span>/);
});

test("vitrine vertical apresenta PAVER, BLOCOS e GUIAS com fotografia e tipografia de media_1789257841342", () => {
  // Coluna 01: PAVER
  assert.match(indexHtml, /<span class="territory-card-index">01<\/span>/);
  assert.match(indexHtml, /<h3 class="territory-card-title">PAVER<\/h3>/);
  assert.match(indexHtml, /<span class="territory-card-tagline">URBANISMO<br>QUE RESISTE\.<\/span>/);
  assert.match(indexHtml, /<span class="territory-card-arrow"[^>]*>—→<\/span>/);
  assert.match(indexHtml, /shade-paver/);
  assert.match(indexHtml, /href="paver\.html"/);
  assert.match(indexHtml, /assets\/produto-paver-brasil-v1\.webp/);

  // Coluna 02: BLOCOS
  assert.match(indexHtml, /<span class="territory-card-index">02<\/span>/);
  assert.match(indexHtml, /<h3 class="territory-card-title">BLOCOS<\/h3>/);
  assert.match(indexHtml, /<span class="territory-card-tagline">CONSTRUÇÃO<br>MAIS EFICIENTE\.<\/span>/);
  assert.match(indexHtml, /<span class="territory-card-arrow"[^>]*>—→<\/span>/);
  assert.match(indexHtml, /shade-blocos/);
  assert.match(indexHtml, /href="blocos\.html"/);
  assert.match(indexHtml, /assets\/produto-blocos-concreto-brasil-v1\.webp/);

  // Coluna 03: GUIAS
  assert.match(indexHtml, /<span class="territory-card-index">03<\/span>/);
  assert.match(indexHtml, /<h3 class="territory-card-title">GUIAS<\/h3>/);
  assert.match(indexHtml, /<span class="territory-card-tagline">MOBILIDADE<br>MAIS SEGURA\.<\/span>/);
  assert.match(indexHtml, /<span class="territory-card-arrow"[^>]*>—→<\/span>/);
  assert.match(indexHtml, /shade-guias/);
  assert.match(indexHtml, /href="guias\.html"/);
  assert.match(indexHtml, /assets\/produto-guias-meio-fio-brasil-v1\.webp/);
});

test("Estilos CSS de alta fidelidade para media_1789257841342 estão configurados em styles.css", () => {
  assert.match(stylesCss, /\.products-territory\s*\{/);
  assert.match(stylesCss, /\.territory-topo-lines\s*\{/);
  assert.match(stylesCss, /\.territory-shell\s*\{/);
  assert.match(stylesCss, /\.territory-copy-col\s*\{/);
  assert.match(stylesCss, /\.territory-headline\s*\{/);
  assert.match(stylesCss, /\.territory-btn\s*\{/);
  assert.match(stylesCss, /\.territory-showcase\s*\{/);
  assert.match(stylesCss, /\.territory-card\s*\{/);
  assert.match(stylesCss, /\.shade-paver\s*\{/);
  assert.match(stylesCss, /\.shade-blocos\s*\{/);
  assert.match(stylesCss, /\.shade-guias\s*\{/);
});

test("Arquivos de imagem dos produtos existem no diretório de assets", () => {
  const images = [
    "../assets/produto-paver-brasil-v1.webp",
    "../assets/produto-blocos-concreto-brasil-v1.webp",
    "../assets/produto-guias-meio-fio-brasil-v1.webp"
  ];

  for (const img of images) {
    const url = new URL(img, import.meta.url);
    assert.equal(existsSync(url), true, "Asset " + img + " deve existir");
  }
});
