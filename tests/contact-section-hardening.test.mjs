import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf-8');
const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');
const appJs = readFileSync(new URL('../app.js', import.meta.url), 'utf-8');

test('seção de contato possui estrutura editorial completa, palco urbano e ancoragem #contato', () => {
  assert.match(indexHtml, /<section[^>]*class="[^"]*contact[^"]*section[^"]*"[^>]*id="contato"/);
  assert.match(indexHtml, /class="contact-top-banner"/);
  assert.match(indexHtml, /— CONTATO/);
  assert.match(indexHtml, /VIRA — ECONOMIA CIRCULAR EM MOVIMENTO/);
});

test('coluna esquerda de contato possui título em destaque verde, parágrafo, trio de canais e manifesto vertical', () => {
  assert.match(indexHtml, /Vamos<br>\s*construir<br>\s*juntos cidades<br>\s*<span class="contact-title-highlight">mais justas\.<\/span>/);
  assert.match(indexHtml, /Fale com o nosso time e descubra como o VIRA pode fazer parte do seu projeto/);
  assert.match(indexHtml, /class="contact-channels-grid"/);
  assert.match(indexHtml, /<strong>Telefone<\/strong>\s*<span>\+55 81 3031-XXXX<\/span>/);
  assert.match(indexHtml, /<strong>WhatsApp<\/strong>\s*<span>Fale agora<\/span>/);
  assert.match(indexHtml, /<strong>E-mail<\/strong>\s*<span>contato@vira\.eco\.br<\/span>/);
  assert.match(indexHtml, /class="contact-vertical-manifesto"[^>]*>[\s\S]*?INFRAESTRUTURA[\s\S]*?SUSTENTÁVEL[\s\S]*?PARA PESSOAS[\s\S]*?E TERRITÓRIOS[\s\S]*?REAIS\.[\s\S]*?—/);
});

test('cartão Fale Conosco possui todos os campos de formulário, contador de caracteres e consentimento', () => {
  assert.match(indexHtml, /class="contact-card contact-form-card"/);
  assert.match(indexHtml, /ENVIE SUA MENSAGEM/);
  assert.match(indexHtml, /<h3 class="contact-card-title">Fale conosco<\/h3>/);
  assert.match(indexHtml, /— RESPOSTA EM ATÉ 24H/);
  assert.match(indexHtml, /<form id="vira-contact-form"/);
  assert.match(indexHtml, /name="nome"[^>]*placeholder="Nome completo \*"/);
  assert.match(indexHtml, /name="empresa"[^>]*placeholder="Empresa \/ Instituição \*"/);
  assert.match(indexHtml, /name="email"[^>]*placeholder="E-mail \*"/);
  assert.match(indexHtml, /name="telefone"[^>]*placeholder="Telefone \/ WhatsApp \*"/);
  assert.match(indexHtml, /name="tipo_interesse"/);
  assert.match(indexHtml, /name="mensagem"[^>]*placeholder="Mensagem \*"/);
  assert.match(indexHtml, /id="contact-char-counter"[^>]*>0\/500<\/span>/);
  assert.match(indexHtml, /name="consentimento"/);
  assert.match(indexHtml, /Concordo em receber informações sobre os produtos e soluções do VIRA\./);
  assert.match(indexHtml, /ENVIAR MENSAGEM →/);
  assert.match(indexHtml, /id="contact-alert"/);
});

test('cartão de especificação técnica possui vitrine dos 3 produtos com medidas, CTAs e 5 bullets de desempenho', () => {
  assert.match(indexHtml, /class="contact-card contact-spec-card"/);
  assert.match(indexHtml, /ESPECIFICAÇÃO TÉCNICA/);
  assert.match(indexHtml, /Produto para<br>\s*cidades reais\./);
  assert.match(indexHtml, /— DESEMPENHO COMPROVADO/);
  assert.match(indexHtml, /src="assets\/produto-contato-paver\.png"/);
  assert.match(indexHtml, /Paver Intertravado[\s\S]*?20 × 10 × 6 cm/);
  assert.match(indexHtml, /src="assets\/produto-contato-bloco\.png"/);
  assert.match(indexHtml, /Bloco[\s\S]*?39 × 19 × 14 cm/);
  assert.match(indexHtml, /src="assets\/produto-contato-guia\.png"/);
  assert.match(indexHtml, /Guia \/ Meio-fio[\s\S]*?100 × 15 × 30 cm/);
  assert.match(indexHtml, /BAIXAR FICHA TÉCNICA/);
  assert.match(indexHtml, /SOLICITAR ORÇAMENTO →/);
  assert.match(indexHtml, /50% plástico reciclado[\s\S]*?\+ 50% escória/);
  assert.match(indexHtml, /Absorção de água[\s\S]*?0,2% – 0,3%/);
  assert.match(indexHtml, /Resistência à compressão[\s\S]*?20 – 30 N\/mm²/);
  assert.match(indexHtml, /Alta durabilidade[\s\S]*?e baixo impacto ambiental/);
  assert.match(indexHtml, /Aplicações urbanas[\s\S]*?e de infraestrutura/);
  assert.match(indexHtml, /class="contact-bottom-brand"[\s\S]*?src="assets\/marca-logo-final\.png"/);
});

test('estilos CSS de alta fidelidade para o palco de contato estão configurados', () => {
  assert.match(homeCss, /\.contact\.section#contato\s*\{[^}]*background-image:\s*url\(['"]assets\/contato-parque-hero\.jpg['"]\)/);
  assert.match(homeCss, /\.contact\.section#contato::before\s*\{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.40\)/);
  assert.match(homeCss, /\.contact-title-highlight\s*\{[^}]*color:\s*#467A32/);
  assert.match(homeCss, /\.contact-channel-badge\s*\{[^}]*background:\s*#467A32/);
  assert.match(homeCss, /\.contact-btn-submit\s*\{[^}]*background:\s*#142519/);
  assert.match(homeCss, /\.contact-card\s*\{[^}]*background:\s*#ffffff/);
  assert.match(homeCss, /@media\s*\(max-width:\s*1040px\)/);
  assert.match(homeCss, /@media\s*\(max-width:\s*680px\)/);
});

test('arquivos de imagem de hero, referência e produtos da seção de contato existem em assets', () => {
  assert.ok(existsSync(new URL('../assets/contato-parque-hero.jpg', import.meta.url)));
  assert.ok(existsSync(new URL('../assets/contato-praca-pavers-mockup-referencia.jpg', import.meta.url)));
  assert.ok(existsSync(new URL('../assets/produto-contato-paver.png', import.meta.url)));
  assert.ok(existsSync(new URL('../assets/produto-contato-bloco.png', import.meta.url)));
  assert.ok(existsSync(new URL('../assets/produto-contato-guia.png', import.meta.url)));
});
