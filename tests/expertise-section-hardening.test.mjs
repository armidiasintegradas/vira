import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const basePath = new URL('..', import.meta.url).pathname;
const indexHtml = readFileSync(join(basePath, 'index.html'), 'utf8');
const stylesCss = readFileSync(join(basePath, 'styles.css'), 'utf8');

test('seção #expertise possui arquitetura aprovada de 3 blocos (media_1789259311402)', () => {
  assert.match(indexHtml, /<section[^>]*class="[^"]*industrial-expertise[^"]*"[^>]*id="expertise"/);
  assert.match(indexHtml, /class="expertise-hero-split"/);
  assert.match(indexHtml, /class="expertise-evidences-section"[^>]*id="expertise-evidencias"/);
  assert.match(indexHtml, /class="expertise-final-stage"/);
});

test('Bloco 01 (Hero Industrial) implementa painel amarelo institucional e foto operacional', () => {
  assert.match(indexHtml, /class="expertise-yellow-panel"/);
  assert.match(indexHtml, /EXPERTISE INDUSTRIAL/);
  assert.match(indexHtml, /Produzir<br>\s*em escala\./);
  assert.match(indexHtml, /Com engenharia\.<br>\s*Com impacto real\./);
  assert.match(indexHtml, /Uma estrutura industrial preparada para transformar resíduos em materiais de alta performance/);
  assert.match(indexHtml, /class="expertise-pill-btn"[^>]*href="#expertise-evidencias"/);
  assert.match(indexHtml, /CONHEÇA NOSSA ESTRUTURA/);
  assert.match(indexHtml, /class="expertise-hero-manifesto"/);
  assert.match(indexHtml, /DA ECONOMIA CIRCULAR/);
  assert.match(indexHtml, /À INFRAESTRUTURA/);
  assert.match(indexHtml, /EM LARGA ESCALA\./);
  assert.match(indexHtml, /class="expertise-hero-media"/);
  assert.match(indexHtml, /src="assets\/expertise-hero-operacao\.jpg"/);
  assert.match(indexHtml, /TECNOLOGIA<br>\s*CIRCULAR<br>\s*PARA CIDADES<br>\s*REAIS\./);
});

test('Bloco 02 (Quatro Evidências) implementa as 4 colunas editoriais com fotos e regras amarelas', () => {
  assert.match(indexHtml, /class="expertise-evidences-shell"/);
  
  // Coluna 01: Produção
  assert.match(indexHtml, /<span class="evidence-num">01<\/span>/);
  assert.match(indexHtml, /<h3 class="evidence-title">Produção<\/h3>/);
  assert.match(indexHtml, /Capacidade industrial para atender demandas de infraestrutura urbana\./);
  assert.match(indexHtml, /src="assets\/expertise-evid-producao\.jpg"/);
  assert.match(indexHtml, /PROCESSOS EFICIENTES PARA GRANDES RESULTADOS\./);

  // Coluna 02: Energia
  assert.match(indexHtml, /<span class="evidence-num">02<\/span>/);
  assert.match(indexHtml, /<h3 class="evidence-title">Energia<\/h3>/);
  assert.match(indexHtml, /Matriz energética apoiada por geração fotovoltaica e sistemas eficientes\./);
  assert.match(indexHtml, /src="assets\/expertise-evid-energia\.jpg"/);
  assert.match(indexHtml, /ENERGIA LIMPA PARA UM FUTURO MAIOR\./);

  // Coluna 03: Controle
  assert.match(indexHtml, /<span class="evidence-num">03<\/span>/);
  assert.match(indexHtml, /<h3 class="evidence-title">Controle<\/h3>/);
  assert.match(indexHtml, /Cada lote é monitorado com rastreabilidade e documentação técnica\./);
  assert.match(indexHtml, /src="assets\/expertise-evid-controle\.jpg"/);
  assert.match(indexHtml, /RASTREABILIDADE EM TODA A CADEIA\./);

  // Coluna 04: Qualidade
  assert.match(indexHtml, /<span class="evidence-num">04<\/span>/);
  assert.match(indexHtml, /<h3 class="evidence-title">Qualidade<\/h3>/);
  assert.match(indexHtml, /Ensaios e validações garantem desempenho e durabilidade\./);
  assert.match(indexHtml, /src="assets\/expertise-evid-qualidade\.jpg"/);
  assert.match(indexHtml, /MATERIAIS QUE SUPERAM EXPECTATIVAS\./);
});

test('Bloco 03 (Bloco Final) implementa palco escuro, fotografia de pavers e lockup da marca VIRA', () => {
  assert.match(indexHtml, /src="assets\/expertise-final-pavers\.jpg"/);
  assert.match(indexHtml, /class="expertise-final-overlay"/);
  assert.match(indexHtml, /ESCALA COM PROPÓSITO/);
  assert.match(indexHtml, /Infraestrutura<br>\s*urbana exige/);
  assert.match(indexHtml, /class="expertise-yellow-highlight">capacidade<br>\s*industrial\.<\/span>/);
  assert.match(indexHtml, /Na VIRA, unimos tecnologia, energia limpa e engenharia de processos/);
  assert.match(indexHtml, /class="expertise-final-btn"[^>]*href="#contato"/);
  assert.match(indexHtml, /CONHECER A NOSSA INDÚSTRIA/);
  assert.match(indexHtml, /class="expertise-final-brand"/);
  assert.match(indexHtml, /MATERIAIS<br>\s*QUE CONSTROEM<br>\s*O AMANHÃ\./);
  assert.match(indexHtml, /class="expertise-final-right-tag"/);
  assert.match(indexHtml, /MAIS DO QUE<br>\s*PRODUZIR MATERIAIS\.<br>\s*CONSTRUÍMOS<br>\s*POSSIBILIDADES\./);
});

test('Estilos CSS de alta fidelidade para Expertise Industrial estão configurados em styles.css', () => {
  assert.ok(stylesCss.includes('.industrial-expertise'));
  assert.ok(stylesCss.includes('.expertise-hero-split'));
  assert.ok(stylesCss.includes('.expertise-yellow-panel'));
  assert.ok(stylesCss.includes('#f2b705'));
  assert.ok(stylesCss.includes('.expertise-pill-btn'));
  assert.ok(stylesCss.includes('.expertise-evidences-section'));
  assert.ok(stylesCss.includes('.expertise-evidences-shell'));
  assert.ok(stylesCss.includes('.expertise-final-stage'));
  assert.ok(stylesCss.includes('.expertise-yellow-highlight'));
  assert.ok(stylesCss.includes('@media (max-width: 992px)'));
  assert.ok(stylesCss.includes('@media (max-width: 680px)'));
});

test('Os seis assets fotográficos oficiais da seção existem e possuem integridade', () => {
  const assets = [
    'assets/expertise-hero-operacao.jpg',
    'assets/expertise-evid-producao.jpg',
    'assets/expertise-evid-energia.jpg',
    'assets/expertise-evid-controle.jpg',
    'assets/expertise-evid-qualidade.jpg',
    'assets/expertise-final-pavers.jpg'
  ];

  for (const relPath of assets) {
    const fullPath = join(basePath, relPath);
    assert.ok(existsSync(fullPath), `Asset ${relPath} deve existir no disco`);
    const stats = statSync(fullPath);
    assert.ok(stats.size > 1000, `Asset ${relPath} deve ter tamanho de imagem válido`);
  }
});
