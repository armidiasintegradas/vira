import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const PORT = 4173;
const routes = [
  ['paver.html', 'paver'],
  ['blocos.html', 'blocos'],
  ['guias.html', 'guias'],
  ['central-tecnica.html', 'central-tecnica'],
  ['passaporte.html', 'passaporte'],
  ['brandbook.html', 'brandbook'],
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip',
  '.pdf': 'application/pdf',
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const full = path.resolve(ROOT, relative);
  if (!full.startsWith(ROOT + path.sep) && full !== ROOT) return null;
  return full;
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url || '/');
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'content-type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const geometries = [];

    for (const [file, key] of routes) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const pageErrors = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));

      await page.goto(`http://127.0.0.1:${PORT}/${file}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.waitForFunction(() => document.documentElement.dataset.viraShellReady === 'true', null, { timeout: 10_000 });
      await page.waitForTimeout(350);

      const result = await page.evaluate(({ expectedKey, viewportWidth }) => {
        const rect = (el) => el ? el.getBoundingClientRect() : null;
        const telemetry = document.querySelector('[data-purpose="telemetry-bar"]');
        const header = document.querySelector('[data-purpose="primary-navigation"]');
        const hero = document.querySelector('[data-internal-hero="true"]');
        const footer = document.querySelector('[data-purpose="internal-footer"]');
        const active = header?.querySelectorAll('[aria-current="page"]') ?? [];
        const logo = header?.querySelector('img.vira-brand__logo');
        const overflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - viewportWidth;
        return {
          key: document.body.dataset.viraInternal,
          telemetry: rect(telemetry),
          header: rect(header),
          hero: rect(hero),
          footerPresent: Boolean(footer),
          activeCount: active.length,
          logoSrc: logo?.getAttribute('src') || '',
          overflow,
          ready: document.documentElement.dataset.viraShellReady,
          expectedKey,
        };
      }, { expectedKey: key, viewportWidth: viewport.width });

      const failures = [];
      if (result.ready !== 'true') failures.push('shared shell not ready');
      if (result.key !== key) failures.push(`page key ${result.key} != ${key}`);
      if (!result.telemetry || Math.abs(result.telemetry.top) > 1.5) failures.push('telemetry is not pinned at top');
      if (!result.header) failures.push('header missing');
      if (!result.hero || result.hero.height < 240) failures.push('hero missing or collapsed');
      if (!result.footerPresent) failures.push('canonical footer missing');
      if (result.activeCount < 1) failures.push('active nav state missing');
      if (!result.logoSrc.includes('assets/marca-site-menu.webp')) failures.push('header does not use canonical local logo');
      if (result.overflow > 2) failures.push(`horizontal overflow ${result.overflow}px`);
      if (pageErrors.length) failures.push(`page errors: ${pageErrors.join(' | ')}`);

      if (result.telemetry && result.header) {
        const expectedHeaderTop = result.telemetry.height;
        if (Math.abs(result.header.top - expectedHeaderTop) > 2) {
          failures.push(`header top ${result.header.top.toFixed(1)} != telemetry height ${expectedHeaderTop.toFixed(1)}`);
        }
        geometries.push({ file, headerHeight: result.header.height, headerTop: result.header.top, heroTop: result.hero?.top ?? -1 });
      }

      if (failures.length) {
        throw new Error(`${viewport.name}/${file}: ${failures.join('; ')}`);
      }
      console.log(`visual-smoke ${viewport.name}/${file}: ok`);
      await page.close();
    }

    const baseline = geometries[0];
    for (const geometry of geometries.slice(1)) {
      if (Math.abs(geometry.headerHeight - baseline.headerHeight) > 1 || Math.abs(geometry.headerTop - baseline.headerTop) > 1) {
        throw new Error(`${viewport.name}: header geometry jump between ${baseline.file} and ${geometry.file}`);
      }
    }
    console.log(`visual-smoke ${viewport.name}: shared header geometry consistent`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log('internal-pages responsive visual smoke: ok');
