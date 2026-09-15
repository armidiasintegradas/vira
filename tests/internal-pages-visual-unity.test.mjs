import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const ROOT = new URL('../', import.meta.url);
const targets = [
  ['paver.html', 'paver'],
  ['blocos.html', 'blocos'],
  ['guias.html', 'guias'],
  ['central-tecnica.html', 'central-tecnica'],
  ['passaporte.html', 'passaporte'],
  ['brandbook.html', 'brandbook'],
];

function read(path) {
  return fs.readFileSync(new URL(path, ROOT), 'utf8');
}

function gitBlobSha(content) {
  const body = Buffer.from(content, 'utf8');
  const header = Buffer.from(`blob ${body.length}\0`, 'utf8');
  return crypto.createHash('sha1').update(header).update(body).digest('hex');
}

function primaryHeader(html) {
  const start = html.indexOf('<header');
  const end = start >= 0 ? html.indexOf('</header>', start) : -1;
  return start >= 0 && end >= 0 ? html.slice(start, end + '</header>'.length) : '';
}

for (const [file, key] of targets) {
  const html = read(file);
  assert(html.includes('href="internal-pages.css"'), `${file}: shared CSS ausente`);
  assert(html.includes('src="internal-pages.js"'), `${file}: shared JS ausente`);
  assert(html.includes(`data-vira-internal="${key}"`), `${file}: page key ausente`);
  assert(html.includes('data-internal-hero="true"'), `${file}: hero compartilhado não marcado`);
  const header = primaryHeader(html);
  assert(header, `${file}: header primário ausente`);
  assert(!header.includes('lh3.googleusercontent.com/aida-public/'), `${file}: header ainda depende de logo externa temporária`);
  assert(header.includes('assets/marca-site-menu.webp'), `${file}: header não usa a marca local oficial`);
}

const sharedJs = read('internal-pages.js');
for (const [, key] of targets) {
  assert(sharedJs.includes(`'${key}'`) || sharedJs.includes(`"${key}"`), `internal-pages.js: config ${key} ausente`);
}
for (const route of targets.map(([file]) => file)) {
  assert(sharedJs.includes(route), `internal-pages.js: rota ${route} ausente`);
}
assert(sharedJs.includes('assets/marca-site-menu.webp'), 'internal-pages.js: marca local oficial ausente');
assert(sharedJs.includes('Desenvolvido por AR Mídias Integradas.'), 'internal-pages.js: crédito institucional ausente');
assert(sharedJs.includes('aria-current'), 'internal-pages.js: estado acessível da navegação ausente');

const sharedCss = read('internal-pages.css');
for (const token of ['#040A07', '#08110D', '#0D1A12', '#142519', '#F1C546', '#D9AD34', '#FAF9F6', '#7E8B83', '#101C15', '#1C2E22']) {
  assert(sharedCss.toUpperCase().includes(token.toUpperCase()), `internal-pages.css: token ${token} ausente`);
}
assert(sharedCss.includes('[data-vira-internal]'), 'internal-pages.css: escopo interno ausente');
assert(sharedCss.includes('[data-purpose="telemetry-bar"]'), 'internal-pages.css: regra de telemetria ausente');
assert(sharedCss.includes('[data-purpose="primary-navigation"]'), 'internal-pages.css: regra de header ausente');
assert(sharedCss.includes('[data-internal-hero="true"]'), 'internal-pages.css: regra de hero ausente');
assert(sharedCss.includes('prefers-reduced-motion'), 'internal-pages.css: redução de movimento ausente');

const home = read('index.html');
assert.equal(gitBlobSha(home), '47919a654cb923c0f32c9c1a4f29d89419af0f3c', 'index.html foi alterado nesta fase');
assert(!home.includes('internal-pages.css'), 'index.html não deve carregar internal-pages.css');
assert(!home.includes('internal-pages.js'), 'index.html não deve carregar internal-pages.js');

console.log('internal-pages-visual-unity: ok');
