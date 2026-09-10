# VIRA Fase 2.4 — Consolidação da Plataforma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidar Home, Paver, Blocos e Guias em uma plataforma única, com navegação nativa entre famílias, Central Técnica compartilhada e Passaporte Digital demonstrativo.

**Architecture:** O site continuará estático e progressivamente aprimorado. Links críticos serão HTML nativo; `platform.css` cuidará apenas dos componentes compartilhados da Fase 2.4; `platform.js` cuidará apenas de filtros da Central Técnica e troca de família na demonstração do Passaporte.

**Tech Stack:** HTML5, CSS, JavaScript vanilla, Node.js para testes `.mjs`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-09-vira-platform-consolidation-design.md`

## Global Constraints

- Preservar identidade visual e logos oficiais VIRA sem redesenho.
- Preservar dados e estados técnicos atuais de Paver, Blocos e Guias.
- Não criar métricas, normas, laudos, garantias, downloads ou promessas técnicas novas.
- Não usar status `Disponível` em item documental sem arquivo real validado.
- Estados permitidos: `Disponível`, `Em preparação`, `Em validação`, `Em consolidação`, `Demonstração`.
- IDs demonstrativos fixos: `VIRA-PAVER-DEMO-0001`, `VIRA-BLOCO-DEMO-0001`, `VIRA-GUIA-DEMO-0001`.
- Navegação entre famílias, Central Técnica e Passaporte deve funcionar sem JavaScript.
- Não adicionar login, banco de dados, CRM, QR operacional, busca remota ou cálculo de CO₂.
- Não refatorar amplamente os arquivos existentes.
- Respeitar foco visível, teclado, `prefers-reduced-motion` e mobile.

## File Map

**Create:** `platform.css`, `platform.js`, `central-tecnica.html`, `passaporte.html`, `tests/platform-navigation.test.mjs`, `tests/central-tecnica.test.mjs`, `tests/passaporte.test.mjs`.

**Modify:** `index.html`, `paver.html`, `blocos.html`, `guias.html`, `app.js`.

---

### Task 1: Navegação nativa e seletor compartilhado

**Files:**
- Create: `tests/platform-navigation.test.mjs`
- Create: `platform.css`
- Modify: `index.html`
- Modify: `paver.html`
- Modify: `blocos.html`
- Modify: `guias.html`
- Modify: `app.js`

**Interfaces:**
- Consumes: `paver.html`, `blocos.html`, `guias.html`.
- Produces: `.product-switcher`, links nativos para as três famílias, `central-tecnica.html` e `passaporte.html`.

- [ ] **Step 1: Write the failing navigation test**

Create `tests/platform-navigation.test.mjs`:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=file=>fs.readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
const home=read('index.html');
for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
  assert(home.includes(`href="${href}"`),`Home missing ${href}`);
}
for(const file of ['paver.html','blocos.html','guias.html']){
  const html=read(file);
  assert(html.includes('class="product-switcher"'),`${file} missing product-switcher`);
  assert(html.includes('platform.css'),`${file} missing platform.css`);
  for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
    assert(html.includes(`href="${href}"`),`${file} missing ${href}`);
  }
}
console.log('platform-navigation: ok');
```

- [ ] **Step 2: Run and verify RED**

```bash
node tests/platform-navigation.test.mjs
```

Expected: FAIL because shared navigation and the two central routes are absent.

- [ ] **Step 3: Create the shared navigation CSS**

Create `platform.css`:

```css
.product-switcher{display:flex;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:none;padding:12px clamp(18px,4vw,56px);border-bottom:1px solid rgba(20,26,20,.12);background:#f4f4ee;position:relative;z-index:15}
.product-switcher::-webkit-scrollbar{display:none}
.product-switcher a{flex:0 0 auto;padding:10px 14px;border-radius:999px;text-decoration:none;color:inherit;font:500 12px/1 "JetBrains Mono",monospace;border:1px solid rgba(20,26,20,.16)}
.product-switcher a[aria-current="page"]{background:#152016;color:#fff;border-color:#152016}
.product-switcher a:focus-visible,.platform-gateway a:focus-visible{outline:2px solid currentColor;outline-offset:3px}
.platform-gateways{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:28px}
.platform-gateway{border:1px solid rgba(20,26,20,.16);padding:24px;display:flex;flex-direction:column;gap:18px}
.platform-gateway a{align-self:flex-start;color:inherit;font-weight:600}
@media(max-width:700px){.product-switcher{padding-inline:16px}.platform-gateways{grid-template-columns:1fr}}
```

- [ ] **Step 4: Convert Guias and Blocos product actions on Home to native links**

In `index.html`, preserve existing image markup inside each wrapper and change only the wrapper/control type. Final opening/closing tags must be:

```html
<a class="product-image" href="guias.html" aria-label="Conhecer Guias e Meio-fio VIRA">
</a>
<a class="product-page-link" href="guias.html" aria-label="Conhecer página técnica de Guias e Meio-fio VIRA">↗</a>
<a class="product-image" href="blocos.html" aria-label="Conhecer Blocos VIRA">
</a>
<a class="product-page-link" href="blocos.html" aria-label="Conhecer página técnica de Blocos VIRA">↗</a>
```

Keep the existing `<img>` and `<span>` elements between each product-image anchor pair. Do not add `data-product` to those anchors.

Add after the product grid:

```html
<div class="platform-gateways" aria-label="Recursos técnicos VIRA">
  <article class="platform-gateway"><p class="eyebrow">Documentação</p><h3>Central Técnica VIRA</h3><p>Estados documentais organizados por família, sem downloads simulados.</p><a href="central-tecnica.html">Abrir Central Técnica →</a></article>
  <article class="platform-gateway"><p class="eyebrow">Rastreabilidade</p><h3>Passaporte Digital VIRA</h3><p>Veja como lote, composição, configuração e documentos poderão permanecer conectados.</p><a href="passaporte.html">Conhecer Passaporte →</a></article>
</div>
```

Load `platform.css` after `home-hardening.css`.

- [ ] **Step 5: Add the same native switcher to each product page**

Insert immediately after the header in all three pages:

```html
<nav class="product-switcher" aria-label="Famílias e recursos VIRA">
  <a href="paver.html">Paver</a>
  <a href="blocos.html">Blocos</a>
  <a href="guias.html">Guias e Meio-fio</a>
  <a href="central-tecnica.html">Central Técnica</a>
  <a href="passaporte.html">Passaporte</a>
</nav>
```

Set `aria-current="page"` only on the current family link. Load `platform.css` after each page's existing CSS files.

- [ ] **Step 6: Remove obsolete JS redirects**

In `app.js`, make the remaining drawer handler exactly:

```js
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>openDrawer(button.dataset.product)));
```

- [ ] **Step 7: Verify GREEN**

```bash
node tests/platform-navigation.test.mjs
node --check app.js
```

Expected: both commands exit 0.

- [ ] **Step 8: Commit**

```bash
git add index.html paver.html blocos.html guias.html app.js platform.css tests/platform-navigation.test.mjs
git commit -m "feat: connect VIRA product platform"
```

---

### Task 2: Central Técnica VIRA

**Files:**
- Create: `tests/central-tecnica.test.mjs`
- Create: `central-tecnica.html`
- Create: `platform.js`
- Modify: `platform.css`

**Interfaces:**
- Produces: `[data-tech-item]`, `.tech-filter`, `initTechnicalLibrary()`.

- [ ] **Step 1: Write the failing Central Técnica test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../central-tecnica.html',import.meta.url),'utf8');
for(const family of ['paver','blocos','guias'])assert(html.includes(`data-family="${family}"`),`missing ${family}`);
for(const status of ['Em consolidação','Em validação','Em preparação','Demonstração'])assert(html.includes(status),`missing ${status}`);
assert((html.match(/data-tech-item/g)||[]).length===15,'must expose 15 catalog items');
assert(!/href=("|')#\1/.test(html),'must not contain fake hash downloads');
assert(!html.includes('download=""'),'must not contain empty downloads');
assert(!html.includes('status-disponivel'),'no catalog asset is confirmed available');
assert(html.includes('platform.js'),'must load platform.js');
console.log('central-tecnica: ok');
```

Save as `tests/central-tecnica.test.mjs`.

- [ ] **Step 2: Run and verify RED**

```bash
node tests/central-tecnica.test.mjs
```

Expected: FAIL because `central-tecnica.html` does not exist.

- [ ] **Step 3: Create Central Técnica page shell**

Create `central-tecnica.html` with its own `<title>Central Técnica VIRA — Documentação por família</title>`, meta description, logo `assets/marca-logo-final.png`, shared switcher and one `<h1>Central Técnica VIRA</h1>`.

Use this filter markup:

```html
<div class="tech-filters" aria-label="Filtrar por família">
  <button class="tech-filter" type="button" data-filter="all" aria-pressed="true">Todas</button>
  <button class="tech-filter" type="button" data-filter="paver" aria-pressed="false">Paver</button>
  <button class="tech-filter" type="button" data-filter="blocos" aria-pressed="false">Blocos</button>
  <button class="tech-filter" type="button" data-filter="guias" aria-pressed="false">Guias e Meio-fio</button>
</div>
<p class="sr-status" id="tech-filter-status" aria-live="polite">Exibindo todas as famílias.</p>
```

- [ ] **Step 4: Add the exact 15 catalog items**

Use five cards per family with this structure:

```html
<article class="tech-item" data-tech-item data-family="paver"><small>Paver</small><h3>Ficha técnica</h3><p>Dados consolidados da configuração comercial.</p><b class="tech-status">Em consolidação</b></article>
<article class="tech-item" data-tech-item data-family="paver"><small>Paver</small><h3>Ensaios e laudos</h3><p>Resultados vinculados à configuração e ao método aplicável.</p><b class="tech-status">Em validação</b></article>
<article class="tech-item" data-tech-item data-family="paver"><small>Paver</small><h3>Manual de instalação</h3><p>Orientações de instalação da configuração homologada.</p><b class="tech-status">Em preparação</b></article>
<article class="tech-item" data-tech-item data-family="paver"><small>Paver</small><h3>DWG, BIM e texturas</h3><p>Arquivos de apoio à especificação e projeto.</p><b class="tech-status">Em preparação</b></article>
<article class="tech-item" data-tech-item data-family="paver"><small>Paver</small><h3>Passaporte Digital</h3><p>Estrutura demonstrativa de rastreabilidade por lote.</p><b class="tech-status">Demonstração</b></article>
```

Repeat the same markup pattern with these exact Blocos items/statuses: `Ficha técnica por geometria / Em consolidação`, `Ensaios e laudos / Em validação`, `Manual de aplicação / Em preparação`, `Arquivos de projeto / Em preparação`, `Passaporte Digital / Demonstração`.

Repeat with these exact Guias items/statuses: `Ficha técnica por configuração / Em consolidação`, `Ensaios e laudos / Em validação`, `Manual de instalação / Em preparação`, `Arquivos de projeto / Em preparação`, `Passaporte Digital / Demonstração`.

Do not place download anchors inside any of the 15 cards.

- [ ] **Step 5: Create platform.js filter behavior**

```js
function initTechnicalLibrary(){
  const buttons=[...document.querySelectorAll('.tech-filter')];
  const items=[...document.querySelectorAll('[data-tech-item]')];
  const status=document.querySelector('#tech-filter-status');
  if(!buttons.length||!items.length)return;
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter||'all';
    buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    let visible=0;
    items.forEach(item=>{const show=filter==='all'||item.dataset.family===filter;item.hidden=!show;if(show)visible+=1});
    if(status)status.textContent=filter==='all'?'Exibindo todas as famílias.':`Exibindo ${visible} itens da família ${button.textContent.trim()}.`;
  }));
}
function initPassportDemo(){}
document.addEventListener('DOMContentLoaded',()=>{initTechnicalLibrary();initPassportDemo()});
```

- [ ] **Step 6: Add Central Técnica styles to platform.css**

```css
.platform-page{background:#f4f4ee;color:#152016;min-height:100vh}.platform-header{height:74px;padding:0 clamp(18px,4vw,56px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(20,26,20,.12)}.platform-header img{width:84px;height:auto}.platform-header a{color:inherit;text-decoration:none}.platform-hero{padding:clamp(70px,10vw,140px) clamp(18px,6vw,88px) 56px}.platform-hero h1{font-size:clamp(52px,9vw,126px);line-height:.86;letter-spacing:-.065em;max-width:10ch;margin:12px 0 28px}.technical-library{padding:20px clamp(18px,6vw,88px) 100px}.tech-filters{display:flex;gap:8px;overflow-x:auto;padding-bottom:18px}.tech-filter{border:1px solid rgba(20,26,20,.2);background:transparent;border-radius:999px;padding:10px 14px;white-space:nowrap}.tech-filter[aria-pressed="true"]{background:#152016;color:#fff}.tech-catalog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.tech-item{border:1px solid rgba(20,26,20,.15);padding:22px;min-height:230px;display:flex;flex-direction:column}.tech-item .tech-status{margin-top:auto}.tech-item[hidden]{display:none}.sr-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}@media(max-width:900px){.tech-catalog{grid-template-columns:1fr 1fr}}@media(max-width:620px){.tech-catalog{grid-template-columns:1fr}}
```

- [ ] **Step 7: Verify GREEN**

```bash
node tests/central-tecnica.test.mjs
node --check platform.js
```

- [ ] **Step 8: Commit**

```bash
git add central-tecnica.html platform.js platform.css tests/central-tecnica.test.mjs
git commit -m "feat: add VIRA technical library"
```

---

### Task 3: Passaporte Digital VIRA

**Files:**
- Create: `tests/passaporte.test.mjs`
- Create: `passaporte.html`
- Modify: `platform.js`
- Modify: `platform.css`

**Interfaces:**
- Produces: `.passport-tab`, `[data-passport-panel]`, `initPassportDemo()`.

- [ ] **Step 1: Write the failing Passaporte test**

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../passaporte.html',import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../platform.js',import.meta.url),'utf8');
assert(html.includes('<h1>Passaporte Digital VIRA</h1>'),'missing Passaporte h1');
assert((html.match(/DEMONSTRAÇÃO/g)||[]).length>=3,'demo label must be repeated');
for(const id of ['VIRA-PAVER-DEMO-0001','VIRA-BLOCO-DEMO-0001','VIRA-GUIA-DEMO-0001'])assert(html.includes(id),`missing ${id}`);
for(const family of ['paver','blocos','guias'])assert(html.includes(`data-passport="${family}"`),`missing ${family} tab`);
assert((html.match(/data-passport-panel=/g)||[]).length===3,'three static panels required');
assert(js.includes('function initPassportDemo()'),'missing passport initializer');
console.log('passaporte: ok');
```

Save as `tests/passaporte.test.mjs`.

- [ ] **Step 2: Run and verify RED**

```bash
node tests/passaporte.test.mjs
```

Expected: FAIL because `passaporte.html` does not exist.

- [ ] **Step 3: Create Passaporte page and three static panels**

Use title `Passaporte Digital VIRA — Rastreabilidade demonstrativa`, one `<h1>Passaporte Digital VIRA</h1>`, logo oficial and shared switcher.

Use these controls:

```html
<div class="passport-tabs" role="group" aria-label="Selecionar família demonstrativa">
  <button class="passport-tab" type="button" data-passport="paver" aria-pressed="true">Paver</button>
  <button class="passport-tab" type="button" data-passport="blocos" aria-pressed="false">Blocos</button>
  <button class="passport-tab" type="button" data-passport="guias" aria-pressed="false">Guias e Meio-fio</button>
</div>
<p id="passport-live" class="sr-status" aria-live="polite">Demonstração Paver selecionada.</p>
```

Create the three panels with this exact field pattern, changing ID and family only:

```html
<article class="passport-panel" data-passport-panel="paver"><small>DEMONSTRAÇÃO</small><h3>VIRA-PAVER-DEMO-0001</h3><p>Este registro demonstra a arquitetura de informação e não representa um lote comercial real.</p><div class="passport-field-grid"><div><small>Família</small><strong>Paver VIRA</strong></div><div><small>Composição</small><strong>50 / 50</strong></div><div><small>Configuração</small><strong>Conforme demonstração</strong></div><div><small>Documentação</small><strong>Conforme estado publicado</strong></div></div></article>
<article class="passport-panel" data-passport-panel="blocos"><small>DEMONSTRAÇÃO</small><h3>VIRA-BLOCO-DEMO-0001</h3><p>Este registro demonstra a arquitetura de informação e não representa um lote comercial real.</p><div class="passport-field-grid"><div><small>Família</small><strong>Blocos VIRA</strong></div><div><small>Composição</small><strong>50 / 50</strong></div><div><small>Configuração</small><strong>Em consolidação</strong></div><div><small>Documentação</small><strong>Conforme estado publicado</strong></div></div></article>
<article class="passport-panel" data-passport-panel="guias"><small>DEMONSTRAÇÃO</small><h3>VIRA-GUIA-DEMO-0001</h3><p>Este registro demonstra a arquitetura de informação e não representa um lote comercial real.</p><div class="passport-field-grid"><div><small>Família</small><strong>Guias e Meio-fio VIRA</strong></div><div><small>Composição</small><strong>50 / 50</strong></div><div><small>Configuração</small><strong>Em consolidação</strong></div><div><small>Documentação</small><strong>Conforme estado publicado</strong></div></div></article>
```

Without JavaScript, all three panels remain visible.

- [ ] **Step 4: Implement progressive switching**

Replace the empty function in `platform.js`:

```js
function initPassportDemo(){
  const tabs=[...document.querySelectorAll('.passport-tab')];
  const panels=[...document.querySelectorAll('[data-passport-panel]')];
  const live=document.querySelector('#passport-live');
  if(!tabs.length||!panels.length)return;
  document.documentElement.classList.add('platform-js');
  const select=family=>{
    tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab.dataset.passport===family)));
    panels.forEach(panel=>{panel.hidden=panel.dataset.passportPanel!==family});
    const active=tabs.find(tab=>tab.dataset.passport===family);
    if(live&&active)live.textContent=`Demonstração ${active.textContent.trim()} selecionada.`;
  };
  tabs.forEach(tab=>tab.addEventListener('click',()=>select(tab.dataset.passport)));
  select(tabs.find(tab=>tab.getAttribute('aria-pressed')==='true')?.dataset.passport||tabs[0].dataset.passport);
}
```

- [ ] **Step 5: Add Passaporte styles**

```css
.demo-warning{margin-top:28px;padding:16px 18px;border:1px solid currentColor;max-width:720px}.passport-demo-section{padding:30px clamp(18px,6vw,88px) 110px}.passport-tabs{display:flex;gap:8px;overflow-x:auto;margin:30px 0 22px}.passport-tab{border:1px solid rgba(20,26,20,.2);background:transparent;border-radius:999px;padding:11px 15px;white-space:nowrap}.passport-tab[aria-pressed="true"]{background:#152016;color:#fff}.passport-panel{border:1px solid rgba(20,26,20,.18);padding:clamp(22px,4vw,48px);margin-bottom:16px}.passport-panel h3{font-size:clamp(34px,5vw,68px);overflow-wrap:anywhere}.passport-field-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(20,26,20,.14)}.passport-field-grid>div{background:#f4f4ee;padding:18px}.passport-field-grid small,.passport-field-grid strong{display:block}.platform-js .passport-panel[hidden]{display:none}@media(max-width:800px){.passport-field-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.passport-field-grid{grid-template-columns:1fr}}
```

- [ ] **Step 6: Verify GREEN**

```bash
node tests/passaporte.test.mjs
node --check platform.js
```

- [ ] **Step 7: Commit**

```bash
git add passaporte.html platform.js platform.css tests/passaporte.test.mjs
git commit -m "feat: add VIRA digital passport hub"
```

---

### Task 4: Contextual cross-links from product pages

**Files:** `paver.html`, `blocos.html`, `guias.html`, `platform.css`, `tests/platform-navigation.test.mjs`.

- [ ] **Step 1: Extend the navigation test**

Inside its product-page loop add:

```js
assert(html.includes('class="shared-tech-link"'),`${file} missing Central Técnica CTA`);
assert(html.includes('class="shared-passport-link"'),`${file} missing Passaporte CTA`);
```

Run `node tests/platform-navigation.test.mjs` and expect FAIL.

- [ ] **Step 2: Add exact contextual links to all three pages**

After each local Central Técnica list:

```html
<p class="shared-resource-link"><a class="shared-tech-link" href="central-tecnica.html">Ver todos os estados documentais na Central Técnica VIRA →</a></p>
```

Near each local Passaporte demonstration:

```html
<p class="shared-resource-link"><a class="shared-passport-link" href="passaporte.html">Conhecer a arquitetura completa do Passaporte Digital VIRA →</a></p>
```

- [ ] **Step 3: Add exact shared link CSS**

```css
.shared-resource-link{margin-top:24px}.shared-resource-link a{display:inline-flex;align-items:center;min-height:44px;color:inherit;font-weight:600;text-underline-offset:4px}.shared-resource-link a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
```

- [ ] **Step 4: Verify GREEN and commit**

```bash
node tests/platform-navigation.test.mjs
git add paver.html blocos.html guias.html platform.css tests/platform-navigation.test.mjs
git commit -m "feat: cross-link VIRA technical resources"
```

---

### Task 5: Accessibility, metadata and no-JS hardening

**Files:** `central-tecnica.html`, `passaporte.html`, `platform.css`, `tests/central-tecnica.test.mjs`, `tests/passaporte.test.mjs`.

- [ ] **Step 1: Add static metadata assertions**

Central test:

```js
assert(html.includes('<title>Central Técnica VIRA — Documentação por família</title>'),'wrong Central title');
assert((html.match(/<h1[ >]/g)||[]).length===1,'Central must have one h1');
```

Passaporte test:

```js
assert(html.includes('<title>Passaporte Digital VIRA — Rastreabilidade demonstrativa</title>'),'wrong Passport title');
assert((html.match(/<h1[ >]/g)||[]).length===1,'Passport must have one h1');
```

- [ ] **Step 2: Run both tests**

```bash
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
```

- [ ] **Step 3: Ensure exact meta descriptions**

Central:

```html
<meta name="description" content="Central Técnica VIRA: acompanhe o estado de fichas, ensaios, manuais, arquivos de projeto e Passaporte Digital de Paver, Blocos e Guias e Meio-fio.">
```

Passaporte:

```html
<meta name="description" content="Conheça a arquitetura demonstrativa do Passaporte Digital VIRA para conectar origem, composição, configuração, produção, controles, aplicação e documentos por lote.">
```

- [ ] **Step 4: Add focus, motion and mobile safeguards**

```css
.tech-filter:focus-visible,.passport-tab:focus-visible{outline:2px solid currentColor;outline-offset:3px}@media(prefers-reduced-motion:reduce){.platform-page *{scroll-behavior:auto!important;transition-duration:.001ms!important;animation-duration:.001ms!important}}@media(max-width:700px){.platform-page{padding-bottom:max(24px,env(safe-area-inset-bottom))}.passport-tabs,.tech-filters{scroll-snap-type:x proximity}.passport-tab,.tech-filter{scroll-snap-align:start}}
```

- [ ] **Step 5: Verify and commit**

```bash
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
node --check platform.js
git add central-tecnica.html passaporte.html platform.css tests/central-tecnica.test.mjs tests/passaporte.test.mjs
git commit -m "fix: harden VIRA platform accessibility and metadata"
```

---

### Task 6: Full regression and scope verification

**Files:** all files changed by Tasks 1–5 and all current tests.

- [ ] **Step 1: Run all known tests**

```bash
node tests/site-content.test.mjs
node tests/paver-hardening.test.mjs
node tests/blocos-page.test.mjs
node tests/guias-page.test.mjs
node tests/platform-navigation.test.mjs
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
```

Expected: all exit 0. If branch files cannot be materialized because of environment DNS restrictions, validate exact GitHub blobs and report that limitation instead of claiming the suite ran.

- [ ] **Step 2: Run all JS syntax checks**

```bash
node --check app.js
node --check paver.js
node --check blocos.js
node --check guias.js
node --check platform.js
```

- [ ] **Step 3: Search forbidden shared claims**

```bash
grep -nE 'Carbono negativo|10 anos' central-tecnica.html passaporte.html || true
grep -nE '0,2–0,3%|N/mm²|MPa' blocos.html guias.html central-tecnica.html passaporte.html || true
grep -nE 'ABNT NBR' blocos.html guias.html central-tecnica.html passaporte.html || true
```

Expected: no output.

- [ ] **Step 4: Verify IDs and status vocabulary**

```bash
grep -nE 'VIRA-(PAVER|BLOCO|GUIA)-DEMO-0001' passaporte.html
grep -nE 'Em preparação|Em validação|Em consolidação|Demonstração' central-tecnica.html
```

Expected: three IDs present and all catalog statuses within approved vocabulary.

- [ ] **Step 5: Review diff scope**

```bash
git diff --stat main...HEAD
git diff main...HEAD -- index.html paver.html blocos.html guias.html app.js platform.css platform.js central-tecnica.html passaporte.html
```

Acceptance checklist: Home only gains native product links, shared CSS and two gateways; product pages only gain shared CSS, switcher and contextual links; `app.js` only loses obsolete redirects; `platform.js` only handles Central filters and Passport switching; product technical claims remain unchanged.

- [ ] **Step 6: Fix any concrete regression with a focused commit**

If a command fails, modify only the files named by that failure, rerun the same command, then stage those exact modified paths and commit with:

```bash
git commit -m "fix: correct VIRA platform regression"
```

Do not create a commit when no file changed.

---

### Task 7: PR, review and merge gate

**Files:** no planned production changes.

- [ ] **Step 1: Compare branch against main**

Record base SHA, head SHA, changed files, additions/deletions and ahead/behind state. Branch must not be behind current `main` before PR creation.

- [ ] **Step 2: Open PR**

Title exactly:

```text
VIRA Fase 2.4 — Consolidação da plataforma
```

Body must state native product navigation, Central Técnica, Passaporte hub, shared CSS/JS, technical-safety constraints, commands actually executed and any environment limitation.

- [ ] **Step 3: Review every changed-file patch**

Reject merge if the diff contains Paver metrics copied into Blocos/Guias/shared pages, fake downloads, generated replacement branding, unrelated refactor or undocumented technical claims.

- [ ] **Step 4: Confirm mergeability and status**

Check PR mergeability and combined commit status. If the repository has no configured status checks, record `no configured statuses`.

- [ ] **Step 5: Merge with reviewed head SHA pinned**

Use merge method `merge` and the exact reviewed head SHA. Do not merge if the head changed after review.

- [ ] **Step 6: Verify main after merge**

Fetch `central-tecnica.html`, `passaporte.html`, `platform.css`, `platform.js`, and navigation snippets from `index.html`, `paver.html`, `blocos.html`, `guias.html`. Confirm reviewed content is present on `main`.

- [ ] **Step 7: Verify GitHub Pages separately**

Check public Home, Central Técnica and Passaporte URLs. If Pages/crawler returns stale content, report propagation as pending without treating the merge as failed.
