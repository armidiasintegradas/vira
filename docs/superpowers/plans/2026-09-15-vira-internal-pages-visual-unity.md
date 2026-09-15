# VIRA Internal Pages Visual Unity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the six VIRA internal pages use one Paver-derived visual shell, hero grammar, brand application and footer while preserving each page's technical content and leaving `index.html` untouched.

**Architecture:** Add a small shared runtime layer (`internal-pages.css` + `internal-pages.js`) that owns the canonical telemetry/header/navigation/footer and normalizes the first hero without taking over page-specific diagrams, canvases or calculators. Integrate that layer into the six existing HTML files with a deterministic migration script, then remove the one-shot migration tooling after it has rewritten the pages. Existing route-specific inline code remains in place.

**Tech Stack:** Static HTML, Tailwind CSS CDN already used by the pages, vanilla CSS, vanilla JavaScript, Node.js built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-15-vira-internal-pages-visual-unity-design.md`

## Global Constraints

- `paver.html` is the visual golden master.
- In scope: `paver.html`, `blocos.html`, `guias.html`, `central-tecnica.html`, `passaporte.html`, `brandbook.html`.
- `index.html` must remain byte-for-byte unchanged from Git blob `47919a654cb923c0f32c9c1a4f29d89419af0f3c`.
- Use Manrope for editorial/display typography and IBM Plex Mono for technical/telemetry typography.
- Canonical colors: `#040A07`, `#08110D`, `#0D1A12`, `#142519`, `#F1C546`, `#D9AD34`, `#FAF9F6`, `#7E8B83`, `#101C15`, `#1C2E22`.
- Use one local official VIRA logo asset: `assets/marca-site-menu.webp`.
- Do not remove page-specific canvases, diagrams, calculators, DPP content, downloads or technical claims.
- Shared assets must not be loaded by `index.html`.

---

### Task 1: Add the visual-unity contract test

**Files:**
- Create: `tests/internal-pages-visual-unity.test.mjs`
- Read only: `index.html`

**Interfaces:**
- Consumes: the six current HTML pages and the frozen home blob.
- Produces: a static acceptance contract that later tasks must satisfy.

- [ ] **Step 1: Write the failing test**

The test must assert that every internal page contains:

```js
const targets = [
  ['paver.html', 'paver'],
  ['blocos.html', 'blocos'],
  ['guias.html', 'guias'],
  ['central-tecnica.html', 'central-tecnica'],
  ['passaporte.html', 'passaporte'],
  ['brandbook.html', 'brandbook'],
];

for (const [file, key] of targets) {
  const html = fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  assert(html.includes('href="internal-pages.css"'));
  assert(html.includes('src="internal-pages.js"'));
  assert(html.includes(`data-vira-internal="${key}"`));
  assert(html.includes('data-purpose="internal-hero"'));
  assert(!html.includes('lh3.googleusercontent.com/aida-public/'));
}
```

It must also assert that `internal-pages.js` uses `assets/marca-site-menu.webp`, contains all six navigation routes and the AR Mídias footer credit; that `internal-pages.css` contains the canonical design tokens and common header/hero selectors; and that `index.html` still has the exact Git blob SHA above and does not reference either shared file.

- [ ] **Step 2: Run the new test and verify RED**

Run:

```bash
node --test tests/internal-pages-visual-unity.test.mjs
```

Expected: FAIL because `internal-pages.css`, `internal-pages.js` and the integration markers do not exist yet.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/internal-pages-visual-unity.test.mjs
git commit -m "test: define internal pages visual unity contract"
```

---

### Task 2: Build the shared Paver-derived shell

**Files:**
- Create: `internal-pages.css`
- Create: `internal-pages.js`
- Test: `tests/internal-pages-visual-unity.test.mjs`

**Interfaces:**
- Consumes: `body[data-vira-internal]`, existing `data-purpose="telemetry-bar"`, `data-purpose="primary-navigation"`, first internal hero and existing `<footer>`.
- Produces: `window.VIRAInternalPages`, canonical telemetry/header/mobile navigation/footer and the common visual tokens.

- [ ] **Step 1: Implement canonical CSS tokens and geometry**

`internal-pages.css` must define:

```css
:root {
  --vira-obsidian:#040A07;
  --vira-dark:#08110D;
  --vira-forest:#0D1A12;
  --vira-border:#142519;
  --vira-gold:#F1C546;
  --vira-gold-hover:#D9AD34;
  --vira-surface:#FAF9F6;
  --vira-muted:#7E8B83;
  --vira-card:#101C15;
  --vira-border-subtle:#1C2E22;
}
```

The shared shell must use the Paver geometry: telemetry at the top, 80px sticky header at a 33px desktop offset, `max-width:1280px`, gold active pill, dark technical surfaces, Manrope/IBM Plex Mono typography and a responsive drawer below 1280px.

- [ ] **Step 2: Implement page metadata and shell renderer**

`internal-pages.js` must map the six page keys to index, descriptor, normative line and CTA target. It replaces the existing telemetry/header with one canonical shell, marks the correct route with `aria-current="page"`, uses `assets/marca-site-menu.webp`, wires the mobile drawer and applies one canonical footer.

The runtime must not replace `<main>` and must not remove any page-specific script or canvas.

- [ ] **Step 3: Implement canonical footer**

Use verified Paver footer information only: VIRA identity, the six-route technical navigation, Recife & Caruaru/PE, `contato@vira.eco`, 2026 copyright, `Desenvolvido por AR Mídias Integradas.` and `ECONOMIA CIRCULAR EM MOVIMENTO.`. Do not introduce new metrics or claims.

- [ ] **Step 4: Keep motion accessible**

Add a `prefers-reduced-motion: reduce` branch in `internal-pages.css` that disables shell transitions/animations without touching route-specific functional calculations.

---

### Task 3: Integrate the six pages without rewriting their content

**Files:**
- Modify: `paver.html`
- Modify: `blocos.html`
- Modify: `guias.html`
- Modify: `central-tecnica.html`
- Modify: `passaporte.html`
- Modify: `brandbook.html`
- Temporary: `scripts/apply-internal-pages-unity.mjs`

**Interfaces:**
- Consumes: the shared CSS/JS from Task 2.
- Produces: six static pages that opt into the shared layer while retaining all current technical content and route-specific inline scripts.

- [ ] **Step 1: Apply deterministic integration markers**

For each page, the migration script must:

```js
html = html.replace('</head>', '<link rel="stylesheet" href="internal-pages.css">\n</head>');
html = html.replace(/<body([^>]*)>/, `<body$1 data-vira-internal="${key}">`);
html = html.replace(/<main>([\s\S]*?)<section([^>]*)>/, '<main>$1<section$2 data-purpose="internal-hero">');
html = html.replace('</body>', '<script defer src="internal-pages.js"></script>\n</body>');
html = html.replaceAll(/https:\/\/lh3\.googleusercontent\.com\/aida-public\/[^"']+/g, 'assets/marca-site-menu.webp');
```

The implementation must be idempotent and must not add duplicate attributes/includes when re-run.

- [ ] **Step 2: Verify route-specific content remains present**

Run the existing focused tests for Paver/Blocos/Guias/Central/Passaporte/Brandbook that are present in `tests/`. Any failure caused by removed content is a blocker; fix the integration rather than weakening the test.

- [ ] **Step 3: Run the visual-unity contract and verify GREEN**

Run:

```bash
node --test tests/internal-pages-visual-unity.test.mjs
```

Expected: PASS.

---

### Task 4: Regression and home-freeze verification

**Files:**
- Test only: `tests/*.test.mjs`
- Verify: `index.html`

**Interfaces:**
- Consumes: completed shared layer and integrated pages.
- Produces: evidence that the internal-page work did not change the home or break the existing static contracts.

- [ ] **Step 1: Run all Node tests**

```bash
node --test tests/*.test.mjs
```

Expected: PASS for all tests that pass on the branch baseline; any failure caused by this work must be fixed before completion.

- [ ] **Step 2: Verify the home blob is unchanged**

Compute the Git blob hash of `index.html` and require:

```text
47919a654cb923c0f32c9c1a4f29d89419af0f3c
```

- [ ] **Step 3: Inspect the final diff**

The final change set may include only the design/plan docs, the shared internal-page CSS/JS, the six internal HTML pages and the visual-unity test. Temporary migration/workflow files must not remain.

- [ ] **Step 4: Commit final implementation**

```bash
git add internal-pages.css internal-pages.js paver.html blocos.html guias.html central-tecnica.html passaporte.html brandbook.html tests/internal-pages-visual-unity.test.mjs
git commit -m "feat: unify VIRA internal pages visual system"
```
