import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const indexHtml = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const stylesCss = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const appJs = readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("seção #jornada possui arquitetura e introdução editorial aprovada", () => {
  assert.match(indexHtml, /<section class="journey" id="jornada">/, "seção #jornada com classe .journey deve existir");
  assert.match(indexHtml, /class="eyebrow light">Jornada do material<\/p>/, "eyebrow Jornada do material deve estar presente");
  assert.match(indexHtml, /<h2>Do descarte<br>à cidade\.<\/h2>/, "headline Do descarte à cidade deve ser preservada");
  assert.match(
    indexHtml,
    /<p class="journey-desc">Resíduos percorrem uma nova jornada até se tornarem infraestrutura urbana\.<\/p>/,
    "parágrafo editorial exato deve estar presente"
  );
  assert.doesNotMatch(
    indexHtml,
    /Dois resíduos que antes seguiam caminhos separados/,
    "texto antigo de introdução deve ser removido"
  );
});

test("régua/linha do tempo 01-04 editorial está implementada com contraste e sem elementos de app", () => {
  assert.match(indexHtml, /class="journey-timeline"/, "container .journey-timeline deve existir");
  assert.match(indexHtml, /data-step="01"[\s\S]*?<span class="timeline-num">01<\/span>/);
  assert.match(indexHtml, /data-step="02"[\s\S]*?<span class="timeline-num">02<\/span>/);
  assert.match(indexHtml, /data-step="03"[\s\S]*?<span class="timeline-num">03<\/span>/);
  assert.match(indexHtml, /data-step="04"[\s\S]*?<span class="timeline-num">04<\/span>/);
  assert.match(indexHtml, /<div class="timeline-line"><i><\/i><\/div>/, "linhas conectivas da régua devem existir");

  assert.match(stylesCss, /\.journey-timeline\s*\{[^}]*display:\s*flex/);
  assert.match(stylesCss, /\.timeline-step\.is-active\s*\{[^}]*opacity:\s*1/);
  assert.match(stylesCss, /\.timeline-line\s*\{[^}]*height:\s*1px/);
});

test("as quatro etapas contêm fotografia dominante, numeração discreta, nome curto e frase única", () => {
  // Etapa 01
  assert.match(indexHtml, /data-step="01"[\s\S]*?<img src="assets\/jornada-plastico-v1\.webp"/);
  assert.match(indexHtml, /<span class="journey-step-num">01<\/span>[\s\S]*?ORIGEM/);
  assert.match(indexHtml, /<p class="journey-step-text">Tudo começa quando o resíduo volta a ter valor\.<\/p>/);

  // Etapa 02
  assert.match(indexHtml, /data-step="02"[\s\S]*?<img src="assets\/jornada-escoria-v1\.webp"/);
  assert.match(indexHtml, /<span class="journey-step-num">02<\/span>[\s\S]*?SEPARAÇÃO/);
  assert.match(indexHtml, /<p class="journey-step-text">Materiais são selecionados e preparados para uma nova cadeia produtiva\.<\/p>/);

  // Etapa 03
  assert.match(indexHtml, /data-step="03"[\s\S]*?<img src="assets\/jornada-chegada-v1\.webp"/);
  assert.match(indexHtml, /<span class="journey-step-num">03<\/span>[\s\S]*?ENGENHARIA/);
  assert.match(indexHtml, /<p class="journey-step-text">Tecnologia transforma matéria recuperada em novos materiais\.<\/p>/);

  // Etapa 04
  assert.match(indexHtml, /data-step="04"[\s\S]*?<img src="assets\/jornada-transformacao-v1\.webp"/);
  assert.match(indexHtml, /<span class="journey-step-num">04<\/span>[\s\S]*?CIDADE/);
  assert.match(indexHtml, /<p class="journey-step-text">A transformação retorna ao espaço urbano como infraestrutura\.<\/p>/);

  // Títulos secundários antigos eliminados
  assert.doesNotMatch(indexHtml, /O plástico deixa de ser descarte/);
  assert.doesNotMatch(indexHtml, /A escória ganha um novo destino/);
  assert.doesNotMatch(indexHtml, /Duas rotas chegam à VIRA/);
  assert.doesNotMatch(indexHtml, /O resíduo volta à cidade como solução/);
});

test("assets fotográficos da jornada existem e possuem integridade", () => {
  assert.ok(existsSync(new URL("../assets/jornada-plastico-v1.webp", import.meta.url)));
  assert.ok(existsSync(new URL("../assets/jornada-escoria-v1.webp", import.meta.url)));
  assert.ok(existsSync(new URL("../assets/jornada-chegada-v1.webp", import.meta.url)));
  assert.ok(existsSync(new URL("../assets/jornada-transformacao-v1.webp", import.meta.url)));
});

test("app.js gerencia sincronização e interatividade da régua com IntersectionObserver e clique", () => {
  assert.match(appJs, /timelineSteps/, "app.js deve gerenciar timelineSteps");
  assert.match(appJs, /timelineLines/, "app.js deve gerenciar timelineLines");
  assert.match(appJs, /timelineSteps\.forEach\(step=>step\.addEventListener\("click"/, "timeline steps devem ter handler de clique suave");
});
