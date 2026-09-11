import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const homeCss = readFileSync(new URL('../home-hardening.css', import.meta.url), 'utf8');

test('seção de rodapé possui estrutura editorial, logo de alta fidelidade e ancoragem #rodape', () => {
  assert.match(indexHtml, /id="rodape"/, 'ID #rodape deve existir');
  assert.match(indexHtml, /class="footer-hero-brand"[\s\S]*?src="assets\/marca-site-menu\.webp"/);
  assert.match(indexHtml, /<h2 class="footer-hero-title"[^>]*>[\s\S]*?Cidades<br>\s*melhores<br>\s*<span class="footer-hero-highlight">começam<br>com novas<br>escolhas\.<\/span>/);
  assert.match(indexHtml, /Infraestrutura sustentável para um futuro real\./);
  assert.match(indexHtml, /class="footer-pill-btn"[^>]*>[\s\S]*?FALE CONOSCO[\s\S]*?→/);
  assert.match(indexHtml, /class="footer-vertical-manifesto"[\s\S]*?MENOS[\s\S]*?RESÍDUOS\.[\s\S]*?MAIS[\s\S]*?CIDADES[\s\S]*?PARA[\s\S]*?TODOS\./);
});

test('matriz de navegação contém as cinco colunas completas e links funcionais', () => {
  assert.match(indexHtml, /<h3 class="footer-col-title">INSTITUCIONAL<\/h3>/);
  assert.match(indexHtml, /href="#manifesto">Sobre o VIRA<\/a>/);
  assert.match(indexHtml, /href="#expertise">Nossa tecnologia<\/a>/);
  assert.match(indexHtml, /href="#colaboracao">Impacto<\/a>/);
  assert.match(indexHtml, /href="#agenda-2030">Agenda 2030<\/a>/);
  assert.match(indexHtml, /href="#colecao">Projetos<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">PRODUTOS<\/h3>/);
  assert.match(indexHtml, /href="paver\.html">Paver intertravado<\/a>/);
  assert.match(indexHtml, /href="blocos\.html">Blocos<\/a>/);
  assert.match(indexHtml, /href="guias\.html">Guias \/ Meio-fio<\/a>/);
  assert.match(indexHtml, /href="central-tecnica\.html">Especificação técnica<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">SUPORTE<\/h3>/);
  assert.match(indexHtml, /href="#faq">Perguntas frequentes<\/a>/);
  assert.match(indexHtml, /href="#contato">Fale conosco<\/a>/);
  assert.match(indexHtml, /href="#contato">Solicitar orçamento<\/a>/);

  assert.match(indexHtml, /<h3 class="footer-col-title">CONTATO<\/h3>/);
  assert.match(indexHtml, /\+55 81 3031-XXXX/);
  assert.match(indexHtml, /Fale pelo WhatsApp/);
  assert.match(indexHtml, /contato@vira\.eco\.br/);
  assert.match(indexHtml, /Recife\/PE[\s\S]*?Caruaru\/PE[\s\S]*?Brasil/);

  assert.match(indexHtml, /<h3 class="footer-col-title">SIGA O VIRA<\/h3>/);
  assert.match(indexHtml, /class="footer-sub-manifesto"[\s\S]*?INFRAESTRUTURA[\s\S]*?QUE TRANSFORMA[\s\S]*?REALIDADES\./);
});

test('barra inferior de copyright exibe créditos e equação técnica da circularidade', () => {
  assert.match(indexHtml, /class="footer-bottom-brand"[\s\S]*?src="assets\/marca-branca-verde\.svg"/);
  assert.match(indexHtml, /© 2026 VIRA\. Todos os direitos reservados\.[\s\S]*?Design &amp; Tecnologia por AR Mídias Integradas/);
  assert.match(indexHtml, /class="footer-equation"[\s\S]*?PLÁSTICO[\s\S]*?\+[\s\S]*?ESCÓRIA[\s\S]*?=[\s\S]*?CIDADES MAIS JUSTAS/);
});

test('estilos de alta fidelidade para o palco de rodapé estão configurados', () => {
  assert.match(homeCss, /footer#rodape\.site-footer\s*\{[^}]*background-color:\s*#0b0f0c/);
  assert.match(homeCss, /footer#rodape\.site-footer\s*\{[^}]*background-image:[^;]*assets\/rodape-cidades-melhores-hero\.jpg/);
  assert.match(homeCss, /\.footer-hero-title\s*\{[^}]*font-weight:\s*800/);
  assert.match(homeCss, /\.footer-hero-highlight\s*\{[^}]*color:\s*#74b85c/);
  assert.match(homeCss, /\.footer-pill-btn\s*\{[^}]*border-radius:\s*999px/);
  assert.match(homeCss, /\.footer-nav-grid\s*\{[^}]*grid-template-columns:\s*1fr\s+1fr\s+1fr\s+1\.3fr\s+1fr/);
  assert.match(homeCss, /@media\s*\(max-width:\s*768px\)[\s\S]*?\.footer-hero-top\s*\{[^}]*flex-direction:\s*column/);
});

test('arquivos de imagem de hero, referência e logo do rodapé existem em assets', () => {
  assert.ok(existsSync(new URL('../assets/rodape-cidades-melhores-hero.jpg', import.meta.url)), 'assets/rodape-cidades-melhores-hero.jpg deve existir');
  assert.ok(existsSync(new URL('../assets/rodape-mockup-referencia.jpg', import.meta.url)), 'assets/rodape-mockup-referencia.jpg deve existir');
  assert.ok(existsSync(new URL('../assets/marca-branca-verde.svg', import.meta.url)), 'assets/marca-branca-verde.svg deve existir');
});
