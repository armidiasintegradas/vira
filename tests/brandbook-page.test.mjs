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
  assert.match(html, /#F6F5F2|#FAF9F6/i, "deve conter Papel Off-White #F6F5F2 ou #FAF9F6");
});

test("brandbook.html utiliza o logotipo oficial e elimina imagens base64 obsoletas", () => {
  const html = read("brandbook.html");
  assert.match(html, /alt="VIRA (Engenharia Circular|- Marca Oficial)"/, "deve conter a marca oficial no header e footer");
  assert.match(html, /alt="(Logotipo )?VIRA (— Aplicação Primária Oficial|Policromático Oficial)"/, "deve conter aplicação primária oficial");
  assert.doesNotMatch(html, /data:image\/png;base64/, "não deve conter imagens base64 gigantes embutidas");
  assert.doesNotMatch(html, /data:image\/jpeg;base64/, "não deve conter imagens base64 gigantes embutidas");
});

test("brandbook.html documenta Manrope e IBM Plex Mono no sistema tipográfico", () => {
  const html = read("brandbook.html");
  assert.match(html, /Manrope/, "deve documentar Manrope");
  assert.match(html, /IBM Plex Mono/, "deve documentar IBM Plex Mono");
  assert.match(html, /FAMÍLIA PRINCIPAL|FAMÍLIA PRIMÁRIA/, "deve categorizar Manrope como Família Principal/Primária");
  assert.match(html, /FAMÍLIA TÉCNICA/, "deve categorizar IBM Plex Mono como Família Técnica");
});

test("brandbook.html disponibiliza downloads dos pacotes oficiais da marca", () => {
  const html = read("brandbook.html");
  assert.match(html, /VIRA_Brand_Master_Pack_2026\.zip|VIRA_Brand_Assets_Pack\.zip/, "deve disponibilizar Master Pack");
  assert.match(html, /VIRA_Manual_Executivo_2026\.pdf|VIRA-Manual-de-Identidade-Visual-2026\.pdf/, "deve disponibilizar Manual em PDF");
});

test("brandbook.html possui rodapé institucional escuro (#08110D) com créditos da AR Mídias", () => {
  const html = read("brandbook.html");
  assert.match(html, /Desenvolvido por.*AR Mídias Integradas/i, "deve conter créditos da AR Mídias Integradas");
  assert.match(html, /2026 VIRA/i, "deve conter copyright 2026 VIRA");
  assert.match(html, /SOLUÇÕES PARA CIDADES MELHORES/i, "deve conter lema institucional");
});

test("brandbook.html e uniformes.html implementam as 5 categorias operacionais de vestuário fabril", () => {
  const brandbookHtml = read("brandbook.html");
  assert.match(brandbookHtml, /Operacional/i, "brandbook deve conter Operacional");
  assert.match(brandbookHtml, /Produção/i, "brandbook deve conter Produção");
  assert.match(brandbookHtml, /Técnico/i, "brandbook deve conter Técnico");
  assert.match(brandbookHtml, /Administrativo/i, "brandbook deve conter Administrativo");
  assert.match(brandbookHtml, /Cooperativa/i, "brandbook deve conter Cooperativa");

  const uniformesHtml = read("uniformes.html");
  assert.match(uniformesHtml, /01\s*\/\/\s*OPERACIONAL/i, "uniformes deve conter Categoria 01 Operacional");
  assert.match(uniformesHtml, /02\s*\/\/\s*PRODUÇÃO/i, "uniformes deve conter Categoria 02 Produção");
  assert.match(uniformesHtml, /03\s*\/\/\s*TÉCNICO/i, "uniformes deve conter Categoria 03 Técnico");
  assert.match(uniformesHtml, /04\s*\/\/\s*ADMINISTRATIVO/i, "uniformes deve conter Categoria 04 Administrativo");
  assert.match(uniformesHtml, /05\s*\/\/\s*COOPERATIVA/i, "uniformes deve conter Categoria 05 Cooperativa");
});

test("uniformes.html referencia os novos ativos fotográficos de uniformes e EPIs", () => {
  const html = read("uniformes.html");
  assert.match(html, /assets\/uniforme-painel-geral-5-categorias\.jpg/, "deve referenciar o painel panorâmico geral");
  assert.match(html, /assets\/uniforme-01-operacional-masculino\.jpg/, "deve referenciar operacional masculino");
  assert.match(html, /assets\/uniforme-01-operacional-feminino\.jpg/, "deve referenciar operacional feminino");
  assert.match(html, /assets\/uniforme-02-producao-masculino\.jpg/, "deve referenciar produção masculino");
  assert.match(html, /assets\/uniforme-02-producao-feminino\.jpg/, "deve referenciar produção feminino");
  assert.match(html, /assets\/uniforme-03-epi-colete-amarelo-patio\.jpg/, "deve referenciar colete amarelo no pátio");
  assert.match(html, /assets\/uniforme-03-epi-colete-amarelo-cracha\.jpg/, "deve referenciar crachá DPP com QR Code");
  assert.match(html, /assets\/uniforme-04-administrativo-masculino\.jpg/, "deve referenciar administrativo masculino");
  assert.match(html, /assets\/uniforme-04-administrativo-feminino\.jpg/, "deve referenciar administrativo feminino");
  assert.match(html, /assets\/uniforme-05-cooperativa-laranja\.jpg/, "deve referenciar cooperativa laranja");
});

test("brandbook.html e uniformes.html implementam a matriz de EPIs e conformidade com normas", () => {
  const brandbookHtml = read("brandbook.html");
  assert.match(brandbookHtml, /Colete Amarelo Flúor/i, "brandbook deve detalhar colete amarelo");
  assert.match(brandbookHtml, /Capacete de Polímero Circular/i, "brandbook deve detalhar capacete circular");
  assert.match(brandbookHtml, /Luvas Táticas Antiderrapantes/i, "brandbook deve detalhar luvas táticas");
  assert.match(brandbookHtml, /NR-6/i, "brandbook deve referenciar norma NR-6");

  const uniformesHtml = read("uniformes.html");
  assert.match(uniformesHtml, /Passaporte Digital.*DPP/i, "uniformes deve mencionar Passaporte Digital DPP");
  assert.match(uniformesHtml, /QR Code/i, "uniformes deve mencionar QR Code");
  assert.match(uniformesHtml, /Capacete de Segurança VIRA/i, "uniformes deve detalhar o Capacete VIRA");
  assert.match(uniformesHtml, /Luvas Táticas Antiderrapantes/i, "uniformes deve detalhar as Luvas VIRA");
  assert.match(uniformesHtml, /Óculos Balísticos/i, "uniformes deve detalhar os Óculos Balísticos");
});

test("brandbook.html aplica o contrato visual Paver sem perder a navegação capitular", () => {
  const html = read("brandbook.html");
  const css = read("internal-pages.css");

  for (const purpose of [
    "brandbook-chapter-nav",
    "brandbook-hero",
    "brand-overview",
    "brand-logo-system",
    "brand-colors",
    "brand-typography",
    "brand-signage",
    "brand-uniforms",
    "brand-downloads",
  ]) {
    assert.match(html, new RegExp(`data-purpose="${purpose}"`), `deve marcar semanticamente ${purpose}`);
  }

  assert.match(html, /data-purpose="brandbook-hero-metrics"/, "hero deve expor faixa técnica de indicadores");
  assert.match(css, /\/\* Brandbook refinement — Paver golden master \*\//, "CSS deve documentar o refinamento do Brandbook");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brandbook-chapter-nav"\]/, "subnavegação capitular deve ser escopada");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brandbook-hero"\]/, "hero do Brandbook deve usar gramática escopada");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brandbook-hero"\] canvas/, "canvas do hero deve ter tratamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-overview"\]/, "Visão Geral deve receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-logo-system"\]/, "Logotipo deve receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-colors"\]/, "Cores devem receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-typography"\]/, "Tipografia deve receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-signage"\]/, "Sinalização deve receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-uniforms"\]/, "Uniformes devem receber acabamento canônico");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-downloads"\]/, "Downloads devem receber acabamento canônico");
  assert.match(css, /\/\* Brandbook mobile refinement — visual review \*\//, "CSS deve documentar o refinamento mobile final do Brandbook");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brandbook-chapter-nav"\]::after[\s\S]*?content:"→"/, "navegação capitular mobile deve indicar conteúdo horizontal à direita");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-typography"\] \.overflow-x-auto::before[\s\S]*?content:"DESLIZE →"/, "tabela tipográfica mobile deve indicar rolagem horizontal");
  assert.match(css, /\[data-vira-internal="brandbook"\] \[data-purpose="brand-typography"\] \.overflow-x-auto::after[\s\S]*?linear-gradient/, "tabela tipográfica mobile deve ter fade lateral");
});
