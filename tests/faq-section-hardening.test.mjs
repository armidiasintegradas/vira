import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção FAQ possui estrutura editorial, banner superior e ancoragem #faq', () => {
  assert.match(indexHtml, /id="faq"/, 'ID #faq deve existir');
  assert.match(indexHtml, /class="faq-top-banner"[\s\S]*?VIRA — ECONOMIA CIRCULAR EM MOVIMENTO/);
  assert.match(indexHtml, /class="faq-eyebrow"[^>]*><span>—<\/span>\s*DÚVIDAS<\/p>/);
  assert.match(indexHtml, /<h2 class="faq-title"[^>]*>Tudo o que<br>você precisa<br><span class="faq-title-highlight">saber\.<\/span><\/h2>/);
  assert.match(indexHtml, /Respostas claras sobre tecnologia, materiais, aplicações, fabricação e impacto ambiental\./);
  assert.match(indexHtml, /class="button faq-button"[^>]*>[\s\S]*?Fale com nosso time →/);
});

test('as sete perguntas frequentes e seus teasers estão configuradas com ícones e expansores', () => {
  assert.match(indexHtml, /<h3>O que é o VIRA\?<\/h3>[\s\S]*?<p class="faq-teaser">Conheça o projeto, sua origem e seu impacto\.<\/p>/);
  assert.match(indexHtml, /<details class="faq-card" open>[\s\S]*?<h3>Como é feito o material\?<\/h3>/);
  assert.match(indexHtml, /<h3>Qual a resistência do material\?<\/h3>/);
  assert.match(indexHtml, /<h3>Quais produtos estão disponíveis\?<\/h3>/);
  assert.match(indexHtml, /<h3>Quais são os benefícios ambientais\?<\/h3>/);
  assert.match(indexHtml, /<h3>Como as cooperativas participam\?<\/h3>/);
  assert.match(indexHtml, /<h3>Onde o VIRA já está sendo utilizado\?<\/h3>/);

  const cardMatches = indexHtml.match(/class="faq-card/g) || [];
  assert.equal(cardMatches.length, 7, 'Devem existir exatamente 7 cards de FAQ');
});

test('card 02 aberto por padrão contém a fórmula visual dos quatro componentes e caixa de destaque', () => {
  assert.match(indexHtml, /class="faq-formula-grid"/);
  assert.match(indexHtml, /PLÁSTICO<br>RECICLADO/);
  assert.match(indexHtml, /ESCÓRIA/);
  assert.match(indexHtml, /PRENSAGEM/);
  assert.match(indexHtml, /PRODUTO FINAL/);
  assert.match(indexHtml, /class="faq-callout-box"/);
  assert.match(indexHtml, /Mais resíduos valorizados\.<br>Mais cidades para as pessoas\./);
  assert.match(indexHtml, /Tecnologia a serviço de um futuro mais justo e sustentável\./);
});

test('linha de suporte inferior possui cartão de contato e logo VIRA', () => {
  assert.match(indexHtml, /class="faq-support-card"/);
  assert.match(indexHtml, /Não encontrou sua resposta\?/);
  assert.match(indexHtml, /Fale com nosso time\. Estamos prontos para ajudar\./);
  assert.match(indexHtml, /class="button faq-support-btn"[^>]*>[\s\S]*?Fale conosco →/);
  assert.match(indexHtml, /<img[^>]*src="assets\/marca\.png"[^>]*class="faq-brand-logo"/);
});

test('estilos CSS de alta fidelidade para FAQ e palco urbano estão definidos', () => {
  assert.match(homeCss, /\.faq\.section#faq\s*\{[^}]*background-color:\s*#F4F5F1/);
  assert.match(homeCss, /\.faq\.section#faq\s*\{[^}]*background-image:\s*url\(['"]assets\/faq-praca-pavers-hero\.jpg['"]\)/);
  assert.match(homeCss, /\.faq-shell\s*\{[^}]*grid-template-columns:\s*minmax\(280px,\s*360px\)\s*1fr/);
  assert.match(homeCss, /\.faq-title-highlight\s*\{[^}]*color:\s*#569d3d/);
  assert.match(homeCss, /\.faq-formula-grid\s*\{/);
  assert.match(homeCss, /\.faq-callout-box\s*\{[^}]*background:\s*#EDF3E9/);
  assert.match(homeCss, /@media\s*\(max-width:\s*960px\)[\s\S]*?\.faq-shell\s*\{[^}]*grid-template-columns:\s*1fr/);
});

test('arquivos de imagem de hero e referência da seção FAQ existem em assets', () => {
  assert.ok(existsSync(new URL('../assets/faq-praca-pavers-hero.jpg', import.meta.url)), 'assets/faq-praca-pavers-hero.jpg deve existir');
  assert.ok(existsSync(new URL('../assets/faq-praca-pavers-mockup-referencia.jpg', import.meta.url)), 'assets/faq-praca-pavers-mockup-referencia.jpg deve existir');
});
