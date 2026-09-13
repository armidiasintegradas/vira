import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('bloco 01 (encerramento editorial #encerramento) possui estrutura e conteúdo aprovados da FASE 11', () => {
  assert.match(indexHtml, /<section[^>]*id="encerramento"[^>]*>/);
  assert.match(indexHtml, /<section[^>]*class="[^"]*closing[^"]*"[^>]*>/);
  assert.match(indexHtml, /class="closing-watermark"/, 'Marca d\'água angular deve existir');
  assert.match(indexHtml, /class="closing-kicker"[\s\S]*?VAMOS JUNTOS/);
  assert.match(indexHtml, /<h2[^>]*id="closing-title"[^>]*>[\s\S]*?Vamos construir<br>\s*cidades melhores<br>\s*<span class="closing-title-highlight">juntos\.<\/span>/);
  assert.match(indexHtml, /A VIRA transforma resíduos em infraestrutura para cidades mais resilientes através de engenharia, tecnologia e economia circular\./);
  
  // CTAs
  assert.match(indexHtml, /<a[^>]*href="#contato"[^>]*class="[^"]*closing-btn-primary[^"]*"[\s\S]*?SOLICITAR UMA ANÁLISE TÉCNICA[\s\S]*?→/);
  assert.match(indexHtml, /<a[^>]*href="central-tecnica\.html"[^>]*class="[^"]*closing-btn-secondary[^"]*"[\s\S]*?BAIXAR CATÁLOGO[\s\S]*?→/);

  // Blocos laterais conceituais
  assert.match(indexHtml, /class="closing-lateral-text"[\s\S]*?RESÍDUOS[\s\S]*?HOJE\.[\s\S]*?CIDADES[\s\S]*?AMANHÃ\./);
  assert.match(indexHtml, /class="closing-lateral-text"[\s\S]*?ENGENHARIA[\s\S]*?PARA CIDADES[\s\S]*?MELHORES\./);
});

test('bloco 02 (footer institucional escuro #rodape) possui identidade, 4 colunas e dados institucionais', () => {
  assert.match(indexHtml, /<footer[^>]*id="rodape"[^>]*class="[^"]*site-footer[^"]*"/);
  assert.match(indexHtml, /class="footer-texture"/, 'Textura mineral de escória deve estar presente');
  assert.match(indexHtml, /<img[^>]*src="assets\/marca-site-menu\.webp"[^>]*class="footer-brand-img"/);
  assert.match(indexHtml, /class="footer-brand-motto">SOLUÇÕES PARA CIDADES MELHORES\.<\/p>/);
  assert.match(indexHtml, /Engenharia, tecnologia e impacto real para transformar resíduos em infraestrutura urbana\./);

  // Redes sociais
  assert.match(indexHtml, /href="https:\/\/linkedin\.com"[^>]*aria-label="LinkedIn da VIRA"/);
  assert.match(indexHtml, /href="https:\/\/instagram\.com"[^>]*aria-label="Instagram da VIRA"/);
  assert.match(indexHtml, /href="https:\/\/youtube\.com"[^>]*aria-label="YouTube da VIRA"/);

  // 4 Colunas de navegação
  assert.match(indexHtml, /<h3 class="footer-col-title">PRODUTOS<\/h3>/);
  assert.match(indexHtml, /href="paver\.html"[^>]*>Pavers<\/a>/);
  assert.match(indexHtml, /href="blocos\.html"[^>]*>Blocos<\/a>/);
  assert.match(indexHtml, /href="guias\.html"[^>]*>Guias<\/a>/);
  assert.match(indexHtml, /href="#colecao"[^>]*>Aplicações<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">ENGENHARIA<\/h3>/);
  assert.match(indexHtml, /href="#indicadores"[^>]*>Base Técnica<\/a>/);
  assert.match(indexHtml, /href="#processo"[^>]*>Processo<\/a>/);
  assert.match(indexHtml, /href="passaporte\.html"[^>]*>Rastreabilidade<\/a>/);
  assert.match(indexHtml, /href="#expertise"[^>]*>Qualidade<\/a>/);
  assert.match(indexHtml, /href="#colaboracao"[^>]*>Impacto<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">A VIRA<\/h3>/);
  assert.match(indexHtml, /href="#manifesto"[^>]*>Manifesto<\/a>/);
  assert.match(indexHtml, /href="#jornada"[^>]*>Nossa História<\/a>/);
  assert.match(indexHtml, /href="#agenda-2030"[^>]*>ESG<\/a>/);
  assert.match(indexHtml, /href="#faq"[^>]*>Perguntas Técnicas<\/a>/);
  assert.match(indexHtml, /href="#contato"[^>]*>Trabalhe Conosco<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">CONTATO<\/h3>/);
  assert.match(indexHtml, /Recife,\s*PE/);
  assert.match(indexHtml, /Atuação em todo o Brasil/);
  assert.match(indexHtml, /href="mailto:contato@vira\.eco"[^>]*>contato@vira\.eco<\/a>/);
  assert.match(indexHtml, /href="tel:\+5581999999999"[^>]*>\+55 81 99999\.9999<\/a>/);
});

test('barra inferior de copyright exibe créditos atualizados da AR Mídias e lema institucional', () => {
  assert.match(indexHtml, /© 2026 VIRA\. Todos os direitos reservados\./);
  assert.match(indexHtml, /Desenvolvido por AR Mídias Integradas\./);
  assert.match(indexHtml, /ECONOMIA CIRCULAR EM MOVIMENTO\./);
});

test('estilos de alta fidelidade para encerramento e rodapé estão ativos em home-hardening.css', () => {
  // Bloco 01 - Encerramento
  assert.match(homeCss, /\.closing\.section#encerramento\s*\{[^}]*background-color:\s*#F1EFEA/);
  assert.match(homeCss, /\.closing-title\s*\{[^}]*font-weight:\s*800/);
  assert.match(homeCss, /\.closing-title-highlight\s*\{[^}]*color:\s*#FCC929/);
  assert.match(homeCss, /\.closing-btn-primary\s*\{[^}]*background:\s*#FCC929/);
  assert.match(homeCss, /\.closing-btn-primary:hover\s*\.closing-btn-arrow[\s\S]*?transform:\s*translateX\(6px\)/);
  assert.match(homeCss, /\.closing-lateral-dash\s*\{[^}]*background:\s*#FCC929/);

  // Bloco 02 - Footer
  assert.match(homeCss, /footer#rodape\.site-footer\s*\{[^}]*background-color:\s*#08110D/);
  assert.match(homeCss, /\.footer-texture\s*\{[^}]*background-image:\s*url\(['"]assets\/jornada-escoria-v1\.webp['"]\)/);
  assert.match(homeCss, /\.footer-brand-dash\s*\{[^}]*background:\s*#FCC929/);
  assert.match(homeCss, /\.footer-matrix\s*\{[^}]*grid-template-columns:\s*1\.45fr\s+1fr\s+1fr\s+1fr\s+1\.35fr/);
  assert.match(homeCss, /@media\s*\(max-width:\s*768px\)[\s\S]*?footer#rodape\.site-footer/);
});

test('arquivos de imagem de logo e textura do rodapé existem em assets', () => {
  assert.ok(existsSync(new URL('../assets/marca-site-menu.webp', import.meta.url)), 'assets/marca-site-menu.webp deve existir');
  assert.ok(existsSync(new URL('../assets/jornada-escoria-v1.webp', import.meta.url)), 'assets/jornada-escoria-v1.webp deve existir');
});
