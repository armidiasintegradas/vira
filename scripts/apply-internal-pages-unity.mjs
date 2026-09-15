import fs from 'node:fs';
import crypto from 'node:crypto';

const targets = [
  ['paver.html', 'paver'],
  ['blocos.html', 'blocos'],
  ['guias.html', 'guias'],
  ['central-tecnica.html', 'central-tecnica'],
  ['passaporte.html', 'passaporte'],
  ['brandbook.html', 'brandbook'],
];

const CSS_LINK = '<link rel="stylesheet" href="internal-pages.css">';
const JS_LINK = '<script defer src="internal-pages.js"></script>';
const LOCAL_LOGO = 'assets/marca-site-menu.webp';
const HOME_BLOB = '47919a654cb923c0f32c9c1a4f29d89419af0f3c';

function gitBlobSha(content) {
  const body = Buffer.from(content, 'utf8');
  const header = Buffer.from(`blob ${body.length}\0`, 'utf8');
  return crypto.createHash('sha1').update(header).update(body).digest('hex');
}

function assertHomeFrozen() {
  const home = fs.readFileSync('index.html', 'utf8');
  const sha = gitBlobSha(home);
  if (sha !== HOME_BLOB) {
    throw new Error(`index.html divergiu do baseline congelado: ${sha}`);
  }
}

function addSharedCss(html) {
  if (html.includes('href="internal-pages.css"')) return html;
  if (!html.includes('</head>')) throw new Error('Documento sem </head>');
  return html.replace('</head>', `${CSS_LINK}\n</head>`);
}

function addPageKey(html, key) {
  const bodyMatch = html.match(/<body\b[^>]*>/i);
  if (!bodyMatch) throw new Error('Documento sem <body>');
  let tag = bodyMatch[0];
  if (/\bdata-vira-internal="[^"]*"/i.test(tag)) {
    tag = tag.replace(/\bdata-vira-internal="[^"]*"/i, `data-vira-internal="${key}"`);
  } else {
    tag = tag.replace(/>$/, ` data-vira-internal="${key}">`);
  }
  return html.replace(bodyMatch[0], tag);
}

function contentStartAfterPrimaryHeader(html) {
  const purposeIndex = html.indexOf('data-purpose="primary-navigation"');
  if (purposeIndex < 0) throw new Error('Header primário não encontrado');
  const headerEnd = html.indexOf('</header>', purposeIndex);
  if (headerEnd < 0) throw new Error('Fim do header primário não encontrado');
  return headerEnd + '</header>'.length;
}

function markHero(html) {
  if (html.includes('data-internal-hero="true"')) return html;

  const mainStart = html.search(/<main\b/i);
  const searchFrom = mainStart >= 0 ? mainStart : contentStartAfterPrimaryHeader(html);
  const sectionStart = html.indexOf('<section', searchFrom);
  if (sectionStart < 0) {
    throw new Error(mainStart >= 0
      ? 'Documento sem hero <section> após <main>'
      : 'Documento sem hero <section> após o header primário');
  }

  const sectionEnd = html.indexOf('>', sectionStart);
  if (sectionEnd < 0) throw new Error('Tag de hero inválida');
  const originalTag = html.slice(sectionStart, sectionEnd + 1);
  const markedTag = originalTag.replace(/^<section/i, '<section data-internal-hero="true"');
  return html.slice(0, sectionStart) + markedTag + html.slice(sectionEnd + 1);
}

function replaceHeaderLogo(html) {
  const purposeIndex = html.indexOf('data-purpose="primary-navigation"');
  if (purposeIndex < 0) throw new Error('Header primário não encontrado');
  const headerStart = html.lastIndexOf('<header', purposeIndex);
  const headerEndOpen = html.indexOf('</header>', purposeIndex);
  if (headerStart < 0 || headerEndOpen < 0) throw new Error('Limites do header primário inválidos');
  const headerEnd = headerEndOpen + '</header>'.length;
  let header = html.slice(headerStart, headerEnd);
  header = header.replace(/src=(['"])https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^'\"]+\1/g, `src="${LOCAL_LOGO}"`);
  if (!header.includes(`src="${LOCAL_LOGO}"`) && !header.includes(`src='${LOCAL_LOGO}'`)) {
    const firstImg = header.match(/<img\b[^>]*>/i);
    if (!firstImg) throw new Error('Logo do header não encontrado');
    const updated = /\bsrc=(['"])[^'"]*\1/i.test(firstImg[0])
      ? firstImg[0].replace(/\bsrc=(['"])[^'"]*\1/i, `src="${LOCAL_LOGO}"`)
      : firstImg[0].replace(/>$/, ` src="${LOCAL_LOGO}">`);
    header = header.replace(firstImg[0], updated);
  }
  return html.slice(0, headerStart) + header + html.slice(headerEnd);
}

function addSharedJs(html) {
  if (html.includes('src="internal-pages.js"')) return html;
  if (!html.includes('</body>')) throw new Error('Documento sem </body>');
  return html.replace('</body>', `${JS_LINK}\n</body>`);
}

function integrate(file, key) {
  const before = fs.readFileSync(file, 'utf8');
  let html = before;
  html = addSharedCss(html);
  html = addPageKey(html, key);
  html = markHero(html);
  html = replaceHeaderLogo(html);
  html = addSharedJs(html);

  if (html === before) {
    console.log(`${file}: já integrado`);
    return;
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`${file}: integrado (${before.length} → ${html.length} chars)`);
}

assertHomeFrozen();
for (const [file, key] of targets) integrate(file, key);
assertHomeFrozen();
console.log('VIRA internal pages unity migration: ok');
