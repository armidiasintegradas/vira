import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = file => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("brandbook.html importa as fontes oficiais Manrope e IBM Plex Mono", () => {
  const html = read("brandbook.html");
  assert.match(html, /family=IBM\+Plex\+Mono/, "deve importar IBM Plex Mono");
  assert.match(html, /family=Manrope/, "deve importar Manrope");
  assert.doesNotMatch(html, /Instrument\+Serif/, "não deve conter Instrument Serif");
  assert.doesNotMatch(html, /Plus\+Jakarta\+Sans/, "não deve conter Plus Jakarta Sans");
  assert.doesNotMatch(html, /Barlow/, "não deve conter Barlow");
});

test("brandbook.html documenta as cores oficiais da VIRA (#f1c546, #142519, #08110D, #F6F5F2)", () => {
  const html = read("brandbook.html");
  assert.match(html, /#f1c546/i, "deve conter Ocre Dourado #f1c546");
  assert.match(html, /#142519/i, "deve conter Verde Floresta #142519");
  assert.match(html, /#08110D/i, "deve conter Grafite Mineral #08110D");
  assert.match(html, /#F6F5F2/i, "deve conter Papel Off-White #F6F5F2");
});

test("brandbook.html utiliza o logotipo oficial e elimina máscaras base64 obsoletas", () => {
  const html = read("brandbook.html");
  assert.match(html, /assets\/marca-logo-final\.png/, "deve utilizar assets/marca-logo-final.png");
  assert.match(html, /assets\/marca-icone-v\.png/, "deve utilizar assets/marca-icone-v.png");
  assert.doesNotMatch(html, /TUDO PODE SE TRANSFORMAR/, "não deve conter o slogan antigo aposentado");
  assert.doesNotMatch(html, /data:image\/png;base64/, "não deve conter imagens base64 gigantes embutidas");
});

test("brandbook.html aplica botões em formato cápsula com microinteração de seta (FASE 31)", () => {
  const html = read("brandbook.html");
  assert.match(html, /capsule-btn/, "deve utilizar a classe capsule-btn");
  assert.match(html, /border-radius:\s*9999px/, "deve definir formato cápsula com border-radius 9999px");
  assert.match(html, /gap:\s*18px/, "deve definir expansão de gap no hover");
});

test("brandbook.html documenta Manrope e IBM Plex Mono no sistema tipográfico", () => {
  const html = read("brandbook.html");
  assert.match(html, /Manrope/, "deve documentar Manrope");
  assert.match(html, /IBM Plex Mono/, "deve documentar IBM Plex Mono");
  assert.match(html, /Display & Editorial/, "deve categorizar Manrope como Display & Editorial");
  assert.match(html, /Metadados & Código/, "deve categorizar IBM Plex Mono como Metadados");
});

test("brandbook.html disponibiliza links reais para a central de downloads", () => {
  const html = read("brandbook.html");
  assert.match(html, /assets\/downloads\/VIRA_Brand_Assets_Pack\.zip/, "deve apontar para o Master Pack");
  assert.match(html, /assets\/downloads\/VIRA-Manual-de-Identidade-Visual-2026\.pdf/, "deve apontar para o Manual em PDF");
});

test("brandbook.html possui rodapé institucional escuro (#08110D) com créditos da AR Mídias", () => {
  const html = read("brandbook.html");
  assert.match(html, /brandbook-footer/, "deve ter rodapé institucional");
  assert.match(html, /Desenvolvido por AR Mídias/, "deve conter créditos da AR Mídias");
  assert.match(html, /VIRA Engenharia Circular/, "deve conter razão VIRA Engenharia Circular");
});
