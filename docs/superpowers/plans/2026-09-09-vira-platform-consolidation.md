# VIRA Fase 2.4 — Consolidação da Plataforma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidar Home, Paver, Blocos e Guias em uma plataforma navegável, com Central Técnica e Passaporte Digital compartilhados, sem alterar os dados técnicos homologados de cada família.

**Architecture:** A implementação será aditiva sobre o site estático existente. `platform.css` concentrará somente componentes compartilhados da Fase 2.4 e `platform.js` fornecerá melhorias progressivas para filtros e demonstração; toda navegação crítica continuará baseada em links HTML nativos e funcionará sem JavaScript.

**Tech Stack:** HTML5 estático, CSS responsivo existente + `platform.css`, JavaScript vanilla, Node.js para testes `.mjs`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-09-vira-platform-consolidation-design.md`

## Global Constraints

- Preservar a identidade visual e os logos oficiais VIRA sem qualquer redesenho ou alteração.
- Preservar os dados e estados técnicos atuais de Paver, Blocos e Guias.
- Não criar novas métricas, normas, laudos, downloads, garantias ou promessas técnicas.
- Nenhum item documental pode usar status `Disponível` sem arquivo real e validado no repositório.
- Central Técnica deve usar somente os estados `Disponível`, `Em preparação`, `Em validação`, `Em consolidação` e `Demonstração`.
- Passaporte deve ser inequivocamente demonstrativo; IDs `VIRA-PAVER-DEMO-0001`, `VIRA-BLOCO-DEMO-0001` e `VIRA-GUIA-DEMO-0001` nunca podem ser descritos como lotes comerciais.
- A navegação principal entre famílias, Central Técnica e Passaporte deve funcionar sem JavaScript.
- Não adicionar autenticação, banco de dados, CRM, QR operacional, cálculo de CO₂ ou busca remota nesta fase.
- Evitar refatoração ampla de `paver.css`, `blocos.css`, `guias.css`, `paver.js`, `blocos.js`, `guias.js` e `app.js`.
- Respeitar `prefers-reduced-motion`, foco visível, navegação por teclado e layouts mobile atuais.

---

## File Map

### Novos arquivos

- `platform.css` — seletor de famílias, gateways da plataforma, estados documentais, filtros, Passaporte e responsividade compartilhada.
- `platform.js` — filtros locais da Central Técnica e troca acessível da família na demonstração do Passaporte.
- `central-tecnica.html` — catálogo central dos estados documentais das três famílias.
- `passaporte.html` — explicação transversal e demonstração estática do Passaporte Digital.
- `tests/platform-navigation.test.mjs` — contrato de links nativos, seletor compartilhado e gateways da Home.
- `tests/central-tecnica.test.mjs` — contrato documental e ausência de downloads fictícios.
- `tests/passaporte.test.mjs` — contrato demonstrativo dos três IDs e estrutura segura.

### Arquivos modificados

- `index.html` — converter Guias e Blocos para links HTML nativos e adicionar entradas para Central Técnica e Passaporte.
- `paver.html` — carregar `platform.css`, adicionar `product-switcher` e links centrais.
- `blocos.html` — carregar `platform.css`, adicionar `product-switcher` e links centrais.
- `guias.html` — carregar `platform.css`, adicionar `product-switcher` e links centrais.
- `app.js` — remover os redirects JS de `bloco-concreto` e `guia-meio-fio` somente depois que os cards forem links HTML reais.

---

### Task 1: Navegação nativa da plataforma

**Files:**
- Create: `tests/platform-navigation.test.mjs`
- Create: `platform.css`
- Modify: `index.html`
- Modify: `paver.html`
- Modify: `blocos.html`
- Modify: `guias.html`
- Modify: `app.js`

**Interfaces:**
- Consumes: rotas existentes `paver.html`, `blocos.html`, `guias.html`.
- Produces: componente HTML `.product-switcher`, links nativos para todas as famílias e links institucionais para `central-tecnica.html` e `passaporte.html`.

- [ ] **Step 1: Write the failing navigation contract**

Create `tests/platform-navigation.test.mjs`:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const home = read('index.html');

assert(home.includes('href="paver.html"'), 'Home must link natively to Paver');
assert(home.includes('href="blocos.html"'), 'Home must link natively to Blocos');
assert(home.includes('href="guias.html"'), 'Home must link natively to Guias');
assert(home.includes('href="central-tecnica.html"'), 'Home must link to Central Técnica');
assert(home.includes('href="passaporte.html"'), 'Home must link to Passaporte Digital');

for (const file of ['paver.html', 'blocos.html', 'guias.html']) {
  const html = read(file);
  assert(html.includes('class="product-switcher"'), `${file} must expose product-switcher`);
  for (const href of ['paver.html', 'blocos.html', 'guias.html', 'central-tecnica.html', 'passaporte.html']) {
    assert(html.includes(`href="${href}"`), `${file} missing native link to ${href}`);
  }
  assert(html.includes('platform.css'), `${file} must load platform.css`);
}

console.log('platform-navigation: ok');
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
node tests/platform-navigation.test.mjs
```

Expected: FAIL because `central-tecnica.html`, `passaporte.html`, `product-switcher` and the native Guias/Blocos links are not yet present everywhere.

- [ ] **Step 3: Add shared platform navigation styles**

Create `platform.css` with the shared component contract:

```css
.product-switcher{display:flex;align-items:center;gap:8px;overflow-x:auto;scrollbar-width:none;padding:12px clamp(18px,4vw,56px);border-bottom:1px solid rgba(20,26,20,.12);background:#f4f4ee;position:relative;z-index:15}
.product-switcher::-webkit-scrollbar{display:none}
.product-switcher a{flex:0 0 auto;padding:10px 14px;border-radius:999px;text-decoration:none;color:inherit;font:500 12px/1 "JetBrains Mono",monospace;letter-spacing:.01em;border:1px solid rgba(20,26,20,.16)}
.product-switcher a[aria-current="page"]{background:#152016;color:#fff;border-color:#152016}
.product-switcher a:focus-visible,.platform-gateway a:focus-visible,.tech-filter:focus-visible,.passport-tab:focus-visible{outline:2px solid currentColor;outline-offset:3px}
.platform-gateways{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:28px}
.platform-gateway{border:1px solid rgba(20,26,20,.16);padding:24px;display:flex;flex-direction:column;gap:18px}
.platform-gateway a{align-self:flex-start;color:inherit;font-weight:600}
@media(max-width:700px){.product-switcher{padding-inline:16px}.platform-gateways{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.product-switcher{scroll-behavior:auto}}
```

- [ ] **Step 4: Convert Home product actions to native anchors**

In `index.html`, keep the existing images/copy but change the Guias and Blocos primary product wrappers and arrow CTAs from buttons to anchors:

```html
<a class="product-image" href="guias.html" aria-label="Conhecer Guias e Meio-fio VIRA">...</a>
<a class="product-page-link" href="guias.html" aria-label="Conhecer página técnica de Guias e Meio-fio VIRA">↗</a>

<a class="product-image" href="blocos.html" aria-label="Conhecer Blocos VIRA">...</a>
<a class="product-page-link" href="blocos.html" aria-label="Conhecer página técnica de Blocos VIRA">↗</a>
```

Add two native gateway links after the product collection content:

```html
<div class="platform-gateways" aria-label="Recursos técnicos VIRA">
  <article class="platform-gateway"><p class="eyebrow">Documentação</p><h3>Central Técnica VIRA</h3><p>Estados documentais organizados por família, sem downloads simulados.</p><a href="central-tecnica.html">Abrir Central Técnica →</a></article>
  <article class="platform-gateway"><p class="eyebrow">Rastreabilidade</p><h3>Passaporte Digital VIRA</h3><p>Veja como lote, composição, configuração e documentos poderão permanecer conectados.</p><a href="passaporte.html">Conhecer Passaporte →</a></article>
</div>
```

Load `platform.css` after the existing Home CSS.

- [ ] **Step 5: Add the product switcher to all three product pages**

Immediately after the existing header of each product page, insert the same native structure, changing only `aria-current="page"`:

```html
<nav class="product-switcher" aria-label="Famílias e recursos VIRA">
  <a href="paver.html">Paver</a>
  <a href="blocos.html">Blocos</a>
  <a href="guias.html">Guias e Meio-fio</a>
  <a href="central-tecnica.html">Central Técnica</a>
  <a href="passaporte.html">Passaporte</a>
</nav>
```

On `paver.html`, set `aria-current="page"` on Paver; on `blocos.html`, on Blocos; on `guias.html`, on Guias e Meio-fio. Load `platform.css` after each page's current stylesheets.

- [ ] **Step 6: Remove JS-only redirects after native links exist**

In `app.js`, replace the current special-case handler:

```js
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>{
  if(button.dataset.product==="bloco-concreto"){location.href="blocos.html";return}
  if(button.dataset.product==="guia-meio-fio"){location.href="guias.html";return}
  openDrawer(button.dataset.product)
}));
```

with the drawer-only behavior for any remaining `data-product` controls:

```js
document.querySelectorAll("[data-product]").forEach(button=>button.addEventListener("click",()=>openDrawer(button.dataset.product)));
```

Do not add `data-product` to the new anchors.

- [ ] **Step 7: Run the navigation test and regression syntax check**

Run:

```bash
node tests/platform-navigation.test.mjs
node --check app.js
```

Expected: both commands exit 0.

- [ ] **Step 8: Commit Task 1**

```bash
git add index.html paver.html blocos.html guias.html platform.css app.js tests/platform-navigation.test.mjs
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
- Consumes: `.product-switcher` and shared `platform.css` from Task 1.
- Produces: `[data-tech-item]` catalog, `.tech-filter` controls and `initTechnicalLibrary()` in `platform.js`.

- [ ] **Step 1: Write the failing Central Técnica contract**

Create `tests/central-tecnica.test.mjs`:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../central-tecnica.html', import.meta.url), 'utf8');

for (const family of ['paver', 'blocos', 'guias']) assert(html.includes(`data-family="${family}"`), `missing ${family} catalog items`);
for (const status of ['Em consolidação', 'Em validação', 'Em preparação', 'Demonstração']) assert(html.includes(status), `missing status ${status}`);
assert(!/href=("|')#\1/.test(html), 'Central Técnica must not contain fake # downloads');
assert(!html.includes('download=""'), 'Central Técnica must not contain empty downloads');
assert(!html.includes('status-disponivel'), 'No asset is confirmed as available in this phase');
assert(html.includes('platform.js'), 'Central Técnica must load platform.js');

console.log('central-tecnica: ok');
```

- [ ] **Step 2: Verify RED**

Run:

```bash
node tests/central-tecnica.test.mjs
```

Expected: FAIL because `central-tecnica.html` does not exist.

- [ ] **Step 3: Build static Central Técnica HTML**

Create `central-tecnica.html` with:

```html
<header class="platform-header">
  <a href="index.html"><img src="assets/marca-logo-final.png" alt="VIRA"></a>
  <a href="index.html#colecao">Produtos</a>
</header>
<nav class="product-switcher" aria-label="Famílias e recursos VIRA">...</nav>
<main class="platform-page">
  <section class="platform-hero">
    <p class="kicker">VIRA / Documentação</p>
    <h1>Central Técnica VIRA</h1>
    <p>Uma visão única do estado documental de Paver, Blocos e Guias e Meio-fio. Itens ainda não disponíveis aparecem com seu estado real e nunca geram downloads simulados.</p>
  </section>
  <section class="technical-library" id="biblioteca">
    <div class="tech-filters" aria-label="Filtrar por família">
      <button class="tech-filter" type="button" data-filter="all" aria-pressed="true">Todas</button>
      <button class="tech-filter" type="button" data-filter="paver" aria-pressed="false">Paver</button>
      <button class="tech-filter" type="button" data-filter="blocos" aria-pressed="false">Blocos</button>
      <button class="tech-filter" type="button" data-filter="guias" aria-pressed="false">Guias e Meio-fio</button>
    </div>
    <p class="sr-status" id="tech-filter-status" aria-live="polite">Exibindo todas as famílias.</p>
    <div class="tech-catalog">...</div>
  </section>
</main>
<script src="platform.js?v=20260909-fase2-4"></script>
```

Populate exactly 15 catalog cards from the approved spec: 5 Paver, 5 Blocos, 5 Guias. Each item must use `data-tech-item data-family="..."`, visible family/name/purpose/status text and no anchor unless a real validated file exists. In this phase, all 15 items render status only.

- [ ] **Step 4: Write minimal filter behavior in platform.js**

Create:

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
    items.forEach(item=>{
      const show=filter==='all'||item.dataset.family===filter;
      item.hidden=!show;
      if(show)visible+=1;
    });
    if(status)status.textContent=filter==='all'?'Exibindo todas as famílias.':`Exibindo ${visible} itens da família ${button.textContent.trim()}.`;
  }));
}

document.addEventListener('DOMContentLoaded',()=>{
  initTechnicalLibrary();
  initPassportDemo();
});

function initPassportDemo(){}
```

- [ ] **Step 5: Add Central Técnica shared styles**

Append to `platform.css`:

```css
.platform-page{background:#f4f4ee;color:#152016;min-height:100vh}.platform-header{height:74px;padding:0 clamp(18px,4vw,56px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(20,26,20,.12)}.platform-header img{width:84px;height:auto}.platform-header a{color:inherit;text-decoration:none}
.platform-hero{padding:clamp(70px,10vw,140px) clamp(18px,6vw,88px) 56px}.platform-hero h1{font-size:clamp(52px,9vw,126px);line-height:.86;letter-spacing:-.065em;max-width:10ch;margin:12px 0 28px}.platform-hero>p:last-child{max-width:720px;font-size:clamp(18px,2vw,26px);line-height:1.35}
.technical-library{padding:20px clamp(18px,6vw,88px) 100px}.tech-filters{display:flex;gap:8px;overflow-x:auto;padding-bottom:18px}.tech-filter{border:1px solid rgba(20,26,20,.2);background:transparent;border-radius:999px;padding:10px 14px;white-space:nowrap}.tech-filter[aria-pressed="true"]{background:#152016;color:#fff}.tech-catalog{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.tech-item{border:1px solid rgba(20,26,20,.15);padding:22px;min-height:230px;display:flex;flex-direction:column}.tech-item .tech-status{margin-top:auto;font:500 12px/1 "JetBrains Mono",monospace;text-transform:uppercase}.tech-item[hidden]{display:none}.sr-status{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
@media(max-width:900px){.tech-catalog{grid-template-columns:1fr 1fr}}@media(max-width:620px){.tech-catalog{grid-template-columns:1fr}}
```

- [ ] **Step 6: Run tests and syntax check**

```bash
node tests/central-tecnica.test.mjs
node --check platform.js
```

Expected: exit 0.

- [ ] **Step 7: Commit Task 2**

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
- Consumes: shared navigation and `platform.js` bootstrap from Tasks 1–2.
- Produces: `.passport-tab` controls, `[data-passport-panel]` panels and `initPassportDemo()` behavior.

- [ ] **Step 1: Write the failing Passaporte contract**

Create `tests/passaporte.test.mjs`:

```js
import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../passaporte.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../platform.js', import.meta.url), 'utf8');

assert(html.includes('<h1>Passaporte Digital VIRA</h1>'), 'missing Passaporte h1');
assert((html.match(/DEMONSTRAÇÃO/g)||[]).length>=3, 'demonstration labeling must be repeated visibly');
for (const id of ['VIRA-PAVER-DEMO-0001','VIRA-BLOCO-DEMO-0001','VIRA-GUIA-DEMO-0001']) assert(html.includes(id), `missing demo id ${id}`);
assert(!/lote comercial real/i.test(html.replace(/não representa um lote comercial real/gi,'')), 'demo IDs must not be presented as commercial lots');
for (const family of ['paver','blocos','guias']) assert(html.includes(`data-passport="${family}"`), `missing ${family} tab`);
assert(js.includes('function initPassportDemo()'), 'platform.js must expose passport initialization');

console.log('passaporte: ok');
```

- [ ] **Step 2: Verify RED**

```bash
node tests/passaporte.test.mjs
```

Expected: FAIL because `passaporte.html` does not exist.

- [ ] **Step 3: Build the static Passaporte page**

Create `passaporte.html` with the standard platform header/switcher and:

```html
<section class="platform-hero">
  <p class="kicker">VIRA / Rastreabilidade</p>
  <h1>Passaporte Digital VIRA</h1>
  <p>Uma arquitetura para conectar origem, composição, configuração, produção, controles, aplicação e documentos ao longo da vida de cada lote.</p>
  <p class="demo-warning"><strong>DEMONSTRAÇÃO</strong> — esta página não consulta lotes comerciais reais.</p>
</section>
<section class="passport-demo-section" aria-labelledby="passport-demo-title">
  <h2 id="passport-demo-title">Explore a estrutura demonstrativa</h2>
  <div class="passport-tabs" role="group" aria-label="Selecionar família demonstrativa">
    <button class="passport-tab" type="button" data-passport="paver" aria-pressed="true">Paver</button>
    <button class="passport-tab" type="button" data-passport="blocos" aria-pressed="false">Blocos</button>
    <button class="passport-tab" type="button" data-passport="guias" aria-pressed="false">Guias e Meio-fio</button>
  </div>
  <p id="passport-live" class="sr-status" aria-live="polite">Demonstração Paver selecionada.</p>
  <article class="passport-panel" data-passport-panel="paver">...</article>
  <article class="passport-panel" data-passport-panel="blocos">...</article>
  <article class="passport-panel" data-passport-panel="guias">...</article>
</section>
```

All three panels must exist in HTML so essential content remains available without JS. Each panel shows `DEMONSTRAÇÃO`, its fixed demo ID, composition `50 / 50`, configuration state, documentation state and a sentence stating that it does not represent a commercial lot.

- [ ] **Step 4: Implement progressive Passport switching**

Replace the empty `initPassportDemo()` in `platform.js` with:

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

The `hidden` behavior only activates after `platform-js` is added by JS; without JS all panels remain visible.

- [ ] **Step 5: Add Passport styles**

Append to `platform.css`:

```css
.demo-warning{margin-top:28px;padding:16px 18px;border:1px solid currentColor;max-width:720px;font:500 13px/1.45 "JetBrains Mono",monospace}.passport-demo-section{padding:30px clamp(18px,6vw,88px) 110px}.passport-demo-section h2{font-size:clamp(36px,5vw,72px);line-height:.95;letter-spacing:-.045em;max-width:12ch}.passport-tabs{display:flex;gap:8px;overflow-x:auto;margin:30px 0 22px}.passport-tab{border:1px solid rgba(20,26,20,.2);background:transparent;border-radius:999px;padding:11px 15px;white-space:nowrap}.passport-tab[aria-pressed="true"]{background:#152016;color:#fff}.passport-panel{border:1px solid rgba(20,26,20,.18);padding:clamp(22px,4vw,48px);margin-bottom:16px}.passport-panel h3{font-size:clamp(34px,5vw,68px);margin:8px 0 26px;overflow-wrap:anywhere}.passport-field-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:rgba(20,26,20,.14)}.passport-field-grid>div{background:#f4f4ee;padding:18px}.passport-field-grid small,.passport-field-grid strong{display:block}.platform-js .passport-panel[hidden]{display:none}@media(max-width:800px){.passport-field-grid{grid-template-columns:1fr 1fr}}@media(max-width:520px){.passport-field-grid{grid-template-columns:1fr}}
```

- [ ] **Step 6: Run Passaporte and platform syntax tests**

```bash
node tests/passaporte.test.mjs
node --check platform.js
```

Expected: exit 0.

- [ ] **Step 7: Commit Task 3**

```bash
git add passaporte.html platform.js platform.css tests/passaporte.test.mjs
git commit -m "feat: add VIRA digital passport hub"
```

---

### Task 4: Cross-link product CTAs to shared platform areas

**Files:**
- Modify: `paver.html`
- Modify: `blocos.html`
- Modify: `guias.html`
- Modify: `tests/platform-navigation.test.mjs`

**Interfaces:**
- Consumes: `central-tecnica.html`, `passaporte.html` from Tasks 2–3.
- Produces: contextual native CTAs from each product's local Central Técnica and Passaporte sections to the shared hubs.

- [ ] **Step 1: Extend the failing navigation test**

Add these assertions inside the per-product loop of `tests/platform-navigation.test.mjs`:

```js
assert(html.includes('class="shared-tech-link"'), `${file} missing shared Central Técnica CTA`);
assert(html.includes('class="shared-passport-link"'), `${file} missing shared Passaporte CTA`);
```

Run:

```bash
node tests/platform-navigation.test.mjs
```

Expected: FAIL because these contextual CTAs are not present yet.

- [ ] **Step 2: Add contextual Central Técnica links**

At the end of each existing local `#central-tecnica` section, add:

```html
<p class="shared-resource-link"><a class="shared-tech-link" href="central-tecnica.html">Ver todos os estados documentais na Central Técnica VIRA →</a></p>
```

- [ ] **Step 3: Add contextual Passaporte links**

Near each existing demonstration card/section, add:

```html
<p class="shared-resource-link"><a class="shared-passport-link" href="passaporte.html">Conhecer a arquitetura completa do Passaporte Digital VIRA →</a></p>
```

- [ ] **Step 4: Style contextual links without disturbing current layouts**

Append to `platform.css`:

```css
.shared-resource-link{margin-top:24px}.shared-resource-link a{display:inline-flex;align-items:center;min-height:44px;color:inherit;font-weight:600;text-underline-offset:4px}.shared-resource-link a:focus-visible{outline:2px solid currentColor;outline-offset:4px}
```

- [ ] **Step 5: Run navigation regression**

```bash
node tests/platform-navigation.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit Task 4**

```bash
git add paver.html blocos.html guias.html platform.css tests/platform-navigation.test.mjs
git commit -m "feat: cross-link VIRA technical resources"
```

---

### Task 5: SEO, no-JS behavior and accessibility hardening

**Files:**
- Modify: `central-tecnica.html`
- Modify: `passaporte.html`
- Modify: `platform.css`
- Modify: `tests/central-tecnica.test.mjs`
- Modify: `tests/passaporte.test.mjs`

**Interfaces:**
- Consumes: completed shared pages.
- Produces: unique titles/descriptions/H1s, no-JS readable content and robust focus/motion behavior.

- [ ] **Step 1: Extend tests for unique metadata and no-JS content**

Add to `tests/central-tecnica.test.mjs`:

```js
assert(html.includes('<title>Central Técnica VIRA'), 'Central Técnica needs unique title');
assert((html.match(/<h1[ >]/g)||[]).length===1, 'Central Técnica must have exactly one h1');
assert((html.match(/data-tech-item/g)||[]).length===15, 'Central Técnica must expose all 15 static items');
```

Add to `tests/passaporte.test.mjs`:

```js
assert(html.includes('<title>Passaporte Digital VIRA'), 'Passaporte needs unique title');
assert((html.match(/<h1[ >]/g)||[]).length===1, 'Passaporte must have exactly one h1');
assert((html.match(/data-passport-panel=/g)||[]).length===3, 'all three demo panels must exist statically');
```

- [ ] **Step 2: Run both tests and verify failures if metadata/counts are incomplete**

```bash
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
```

Expected: any missing metadata/count requirement fails explicitly; if both are already satisfied by Tasks 2–3, record that the new assertions pass and continue without production changes for those assertions.

- [ ] **Step 3: Ensure exact metadata and canonical heading structure**

Use these titles and descriptions:

```html
<title>Central Técnica VIRA — Documentação por família</title>
<meta name="description" content="Central Técnica VIRA: acompanhe o estado de fichas, ensaios, manuais, arquivos de projeto e Passaporte Digital de Paver, Blocos e Guias e Meio-fio.">
```

```html
<title>Passaporte Digital VIRA — Rastreabilidade demonstrativa</title>
<meta name="description" content="Conheça a arquitetura demonstrativa do Passaporte Digital VIRA para conectar origem, composição, configuração, produção, controles, aplicação e documentos por lote.">
```

Keep exactly one `<h1>` per page.

- [ ] **Step 4: Add reduced-motion and mobile safeguards**

Ensure `platform.css` includes:

```css
@media(prefers-reduced-motion:reduce){.platform-page *{scroll-behavior:auto!important;transition-duration:.001ms!important;animation-duration:.001ms!important}}
@media(max-width:700px){.platform-page{padding-bottom:max(24px,env(safe-area-inset-bottom))}.passport-tabs,.tech-filters{scroll-snap-type:x proximity}.passport-tab,.tech-filter{scroll-snap-align:start}}
```

- [ ] **Step 5: Run accessibility-oriented static contracts and syntax**

```bash
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
node --check platform.js
```

Expected: exit 0.

- [ ] **Step 6: Commit Task 5**

```bash
git add central-tecnica.html passaporte.html platform.css tests/central-tecnica.test.mjs tests/passaporte.test.mjs
git commit -m "fix: harden VIRA platform accessibility and metadata"
```

---

### Task 6: Full regression and scope verification

**Files:**
- Verify: `tests/*.test.mjs`
- Verify: all changed HTML/CSS/JS files

**Interfaces:**
- Consumes: all previous tasks.
- Produces: fresh evidence that the Fase 2.4 branch is safe to review and merge.

- [ ] **Step 1: Run all static tests that exist in the repository**

Run each known test explicitly so a failure is attributable:

```bash
node tests/site-content.test.mjs
node tests/paver-hardening.test.mjs
node tests/blocos-page.test.mjs
node tests/guias-page.test.mjs
node tests/platform-navigation.test.mjs
node tests/central-tecnica.test.mjs
node tests/passaporte.test.mjs
```

Expected: all commands exit 0. If the execution environment cannot materialize the remote branch, verify the exact GitHub blobs by SHA and document that limitation rather than claiming the suite ran.

- [ ] **Step 2: Run JavaScript syntax checks**

```bash
node --check app.js
node --check paver.js
node --check blocos.js
node --check guias.js
node --check platform.js
```

Expected: exit 0 for all five files.

- [ ] **Step 3: Search for forbidden shared claims**

Run:

```bash
grep -nE 'Carbono negativo|10 anos' central-tecnica.html passaporte.html || true
grep -nE '0,2–0,3%|N/mm²|MPa' blocos.html guias.html central-tecnica.html passaporte.html || true
grep -nE 'ABNT NBR' blocos.html guias.html central-tecnica.html passaporte.html || true
```

Expected: no output. Paver may retain its already-approved Paver-specific reference values and is intentionally not included in the second grep.

- [ ] **Step 4: Verify demo IDs and status vocabulary**

Run:

```bash
grep -nE 'VIRA-(PAVER|BLOCO|GUIA)-DEMO-0001' passaporte.html
grep -nE 'Disponível|Em preparação|Em validação|Em consolidação|Demonstração' central-tecnica.html
```

Expected: all three demo IDs appear; Central Técnica uses only the approved vocabulary. `Disponível` may appear in explanatory copy but must not mark a catalog item until a real asset is validated.

- [ ] **Step 5: Review branch diff against main**

Run:

```bash
git diff --stat main...HEAD
git diff main...HEAD -- index.html paver.html blocos.html guias.html app.js platform.css platform.js central-tecnica.html passaporte.html
```

Reviewer checklist:

- Home changes are limited to native links, shared stylesheet and two platform gateways.
- Product-page changes are limited to shared stylesheet, switcher and contextual shared-resource links.
- No existing product technical copy was rewritten except where strictly required for navigation markup.
- `app.js` only removes special-case redirects made obsolete by native anchors.
- `platform.js` owns only Central Técnica filtering and Passaporte demonstration switching.

- [ ] **Step 6: Commit any verification-only correction separately**

If verification reveals a concrete defect, fix only that defect, rerun its failing command, then create a focused commit such as:

```bash
git add <files-that-were-actually-fixed>
git commit -m "fix: correct VIRA platform regression"
```

Do not create an empty verification commit.

---

### Task 7: Pull request, review and merge gate

**Files:**
- No planned production file changes.

**Interfaces:**
- Consumes: verified implementation branch.
- Produces: reviewed PR suitable for merge into `main`.

- [ ] **Step 1: Compare branch to main and record exact scope**

Use GitHub compare or local git to record changed filenames, additions/deletions, ahead/behind state and base SHA. Expected: branch is ahead of current `main` and not behind before PR creation.

- [ ] **Step 2: Open PR**

Title:

```text
VIRA Fase 2.4 — Consolidação da plataforma
```

PR body must summarize:

- native navigation among the three families;
- new Central Técnica;
- new Passaporte Digital demonstrative hub;
- shared `platform.css`/`platform.js` layer;
- explicit technical-safety constraints;
- exact verification commands that ran successfully;
- any environment limitation that prevented a command from running.

- [ ] **Step 3: Review every changed file patch**

Confirm no product-specific metrics were copied from Paver into Blocos, Guias or shared pages, no fake downloads exist, no official logo path was replaced by generated branding, and no unrelated refactor entered the diff.

- [ ] **Step 4: Confirm mergeability and commit status**

Check PR mergeability and combined commit status. If no CI statuses are configured, state `no configured statuses` rather than claiming CI passed.

- [ ] **Step 5: Merge with expected head SHA pinned**

Use merge method `merge` and provide the exact reviewed head SHA. Abort the merge if GitHub reports the head moved after review.

- [ ] **Step 6: Verify main after merge**

Fetch from `main`:

- `central-tecnica.html`
- `passaporte.html`
- `platform.css`
- `platform.js`
- the navigation snippets of `index.html`, `paver.html`, `blocos.html`, `guias.html`

Confirm their blobs/content match the reviewed implementation.

- [ ] **Step 7: Verify public propagation separately**

Check GitHub Pages URLs for Home, Central Técnica and Passaporte. If the crawler or Pages cache still exposes an older version, report deployment propagation as pending and do not conflate it with successful merge to `main`.
