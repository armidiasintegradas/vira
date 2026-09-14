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

test("brandbook.html e uniformes.html implementam as 5 categorias operacionais oficiais de vestuário fabril", () => {
  for (const page of ["brandbook.html", "uniformes.html"]) {
    const html = read(page);
    assert.match(html, /01\s*\/\/\s*OPERACIONAL/i, page + " deve conter Categoria 01 Operacional");
    assert.match(html, /02\s*\/\/\s*PRODUÇÃO/i, page + " deve conter Categoria 02 Produção");
    assert.match(html, /03\s*\/\/\s*TÉCNICO/i, page + " deve conter Categoria 03 Técnico");
    assert.match(html, /04\s*\/\/\s*ADMINISTRATIVO/i, page + " deve conter Categoria 04 Administrativo");
    assert.match(html, /05\s*\/\/\s*COOPERATIVA/i, page + " deve conter Categoria 05 Cooperativa");
  }
});

test("brandbook.html e uniformes.html referenciam os novos ativos fotográficos de uniformes e EPIs", () => {
  for (const page of ["brandbook.html", "uniformes.html"]) {
    const html = read(page);
    assert.match(html, /assets\/uniforme-painel-geral-5-categorias\.jpg/, page + " deve referenciar o painel panorâmico geral");
    assert.match(html, /assets\/uniforme-01-operacional-masculino\.jpg/, page + " deve referenciar operacional masculino");
    assert.match(html, /assets\/uniforme-01-operacional-feminino\.jpg/, page + " deve referenciar operacional feminino");
    assert.match(html, /assets\/uniforme-02-producao-masculino\.jpg/, page + " deve referenciar produção masculino");
    assert.match(html, /assets\/uniforme-02-producao-feminino\.jpg/, page + " deve referenciar produção feminino");
    assert.match(html, /assets\/uniforme-03-epi-colete-amarelo-patio\.jpg/, page + " deve referenciar colete amarelo no pátio");
    assert.match(html, /assets\/uniforme-03-epi-colete-amarelo-cracha\.jpg/, page + " deve referenciar crachá DPP com QR Code");
    assert.match(html, /assets\/uniforme-04-administrativo-masculino\.jpg/, page + " deve referenciar administrativo masculino");
    assert.match(html, /assets\/uniforme-04-administrativo-feminino\.jpg/, page + " deve referenciar administrativo feminino");
    assert.match(html, /assets\/uniforme-05-cooperativa-laranja\.jpg/, page + " deve referenciar cooperativa laranja");
  }
});

test("brandbook.html e uniformes.html implementam a vitrine técnica de EPIs com crachá DPP e QR Code", () => {
  for (const page of ["brandbook.html", "uniformes.html"]) {
    const html = read(page);
    assert.match(html, /Passaporte Digital.*DPP/i, page + " deve mencionar Passaporte Digital DPP");
    assert.match(html, /QR Code/i, page + " deve mencionar QR Code");
    assert.match(html, /Capacete de Segurança VIRA/i, page + " deve detalhar o Capacete VIRA");
    assert.match(html, /Luvas Táticas Antiderrapantes/i, page + " deve detalhar as Luvas VIRA");
    assert.match(html, /Óculos Balísticos/i, page + " deve detalhar os Óculos Balísticos");
  }
});
