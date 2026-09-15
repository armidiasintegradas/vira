from pathlib import Path

HTML = Path('passaporte.html')
CSS = Path('internal-pages.css')

html = HTML.read_text(encoding='utf-8')
css = CSS.read_text(encoding='utf-8')


def replace_after(marker: str, old: str, new: str) -> None:
    global html
    marker_pos = html.find(marker)
    if marker_pos < 0:
        raise SystemExit(f'marker not found: {marker}')
    old_pos = html.find(old, marker_pos)
    if old_pos < 0:
        raise SystemExit(f'target not found after marker: {marker}')
    html = html[:old_pos] + new + html[old_pos + len(old):]


replace_after(
    'NOVA SEÇÃO VISUAL DIDÁTICA DO PROCESSO: O CICLO DA RASTREABILIDADE',
    '<section class="py-20 bg-vira-surface bg-tech-grid border-b border-neutral-200" id="ciclo-rastreabilidade">',
    '<section class="py-20 bg-vira-surface bg-tech-grid border-b border-neutral-200" id="ciclo-rastreabilidade" data-purpose="traceability-cycle">',
)
replace_after(
    'BLOCO 2: ARQUITETURA DO PASSAPORTE DIGITAL',
    '<section class="w-full bg-vira-surface text-vira-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">',
    '<section class="w-full bg-vira-surface text-vira-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-neutral-200" data-purpose="dpp-architecture">',
)
replace_after(
    'BLOCO 3: TERMINAL INTERATIVO DE VALIDAÇÃO DE LOTE',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border relative" id="terminal-auditoria">',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border relative" id="terminal-auditoria" data-purpose="audit-terminal">',
)
replace_after(
    'BLOCO 4: MARCADOR INDELÉVEL NA PEÇA FÍSICA',
    '<section class="py-20 bg-vira-surface border-b border-neutral-200">',
    '<section class="py-20 bg-vira-surface border-b border-neutral-200" data-purpose="physical-marker">',
)
replace_after(
    'BLOCO 5: CALCULADORA DINÂMICA DE IMPACTO ESG',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border relative">',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border relative" data-purpose="impact-calculator">',
)
replace_after(
    'BLOCO 6: MATRIZ DE CONFORMIDADE LEGAL & ESG',
    '<section class="py-20 bg-vira-surface border-b border-neutral-200">',
    '<section class="py-20 bg-vira-surface border-b border-neutral-200" data-purpose="legal-matrix">',
)
replace_after(
    'BLOCO 7: FAQ TÉCNICO DE RASTREABILIDADE',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border">',
    '<section class="py-20 bg-vira-dark text-white border-b border-vira-border" data-purpose="dpp-faq">',
)

if 'data-purpose="specification-form-section"' not in html:
    raise SystemExit('existing specification form semantic hook is missing')

marker = '/* Passaporte DPP refinement — Paver golden master */'
if marker in css:
    raise SystemExit('Passaporte refinement CSS already present')

css += r'''

/* Passaporte DPP refinement — Paver golden master */
[data-vira-internal="passaporte"] [data-purpose="hero-section"] canvas {
  opacity:.4!important;
}

[data-vira-internal="passaporte"] [data-purpose="hero-section"] > div.absolute.inset-0 {
  background:linear-gradient(to top,rgba(8,17,13,1),rgba(8,17,13,.8),rgba(8,17,13,.05))!important;
}

[data-vira-internal="passaporte"] [data-purpose="hero-section"] .vira-hero-heading span {
  background-image:linear-gradient(90deg,var(--vira-gold),#fef3c7,#34d399)!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  color:transparent!important;
}

[data-vira-internal="passaporte"] [data-purpose="hero-section"] a[href="#terminal-auditoria"] {
  border:1px solid var(--vira-gold)!important;
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  box-shadow:none!important;
}

[data-vira-internal="passaporte"] [data-purpose="hero-section"] a[href="#ciclo-rastreabilidade"] {
  border:1px solid #52525b!important;
  background:rgba(23,23,23,.5)!important;
  color:#fff!important;
}

[data-vira-internal="passaporte"] [data-purpose="hero-section"] [data-purpose="compliance-badges"] > div {
  border:1px solid var(--vira-border)!important;
  border-radius:16px!important;
  background:rgba(16,28,21,.8)!important;
  box-shadow:none!important;
  backdrop-filter:blur(8px);
}

[data-vira-internal="passaporte"] [data-purpose="traceability-cycle"],
[data-vira-internal="passaporte"] [data-purpose="dpp-architecture"],
[data-vira-internal="passaporte"] [data-purpose="physical-marker"],
[data-vira-internal="passaporte"] [data-purpose="legal-matrix"] {
  background:var(--vira-surface)!important;
}

[data-vira-internal="passaporte"] [data-purpose="traceability-cycle"] .grid > .rounded-3xl,
[data-vira-internal="passaporte"] [data-purpose="dpp-architecture"] .grid > .rounded-3xl,
[data-vira-internal="passaporte"] [data-purpose="physical-marker"] .rounded-3xl.bg-white {
  border-color:#e4e4e7!important;
  border-radius:24px!important;
  box-shadow:0 14px 32px rgba(8,17,13,.08)!important;
}

[data-vira-internal="passaporte"] [data-purpose="traceability-cycle"] .grid > .rounded-3xl:hover,
[data-vira-internal="passaporte"] [data-purpose="dpp-architecture"] .grid > .rounded-3xl:hover,
[data-vira-internal="passaporte"] [data-purpose="physical-marker"] .rounded-3xl.bg-white:hover {
  border-color:rgba(13,26,18,.38)!important;
  box-shadow:0 18px 38px rgba(8,17,13,.11)!important;
}

[data-vira-internal="passaporte"] [data-purpose="traceability-cycle"] .rounded-2xl,
[data-vira-internal="passaporte"] [data-purpose="physical-marker"] .rounded-2xl {
  border-radius:16px!important;
}

[data-vira-internal="passaporte"] [data-purpose="audit-terminal"],
[data-vira-internal="passaporte"] [data-purpose="impact-calculator"],
[data-vira-internal="passaporte"] [data-purpose="dpp-faq"],
[data-vira-internal="passaporte"] [data-purpose="specification-form-section"] {
  background:var(--vira-dark)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="passaporte"] [data-purpose="audit-terminal"] .bg-vira-card.rounded-3xl,
[data-vira-internal="passaporte"] [data-purpose="impact-calculator"] .rounded-3xl,
[data-vira-internal="passaporte"] [data-purpose="specification-form-section"] [data-purpose="b2b-form"] {
  border:1px solid var(--vira-border-subtle)!important;
  border-radius:24px!important;
  background:rgba(16,28,21,.92)!important;
  box-shadow:0 18px 42px rgba(0,0,0,.16)!important;
}

[data-vira-internal="passaporte"] [data-purpose="audit-terminal"] .rounded-2xl,
[data-vira-internal="passaporte"] [data-purpose="impact-calculator"] .rounded-2xl,
[data-vira-internal="passaporte"] [data-purpose="dpp-faq"] details {
  border-radius:16px!important;
}

[data-vira-internal="passaporte"] [data-purpose="legal-matrix"] .rounded-3xl.bg-white {
  border-color:#e4e4e7!important;
  border-radius:24px!important;
  box-shadow:0 14px 34px rgba(8,17,13,.08)!important;
}

[data-vira-internal="passaporte"] [data-purpose="legal-matrix"] thead tr {
  background:#f4f4f5!important;
}

[data-vira-internal="passaporte"] [data-purpose="legal-matrix"] tbody tr:hover {
  background:#f7f7f5!important;
}

[data-vira-internal="passaporte"] [data-purpose="dpp-faq"] details {
  background:var(--vira-card)!important;
  border-color:var(--vira-border-subtle)!important;
  box-shadow:none!important;
}

[data-vira-internal="passaporte"] [data-purpose="dpp-faq"] details summary:hover {
  background:rgba(13,26,18,.72)!important;
}

[data-vira-internal="passaporte"] [data-purpose="specification-form-section"] [data-purpose="b2b-form"] input,
[data-vira-internal="passaporte"] [data-purpose="specification-form-section"] [data-purpose="b2b-form"] select {
  border-color:var(--vira-border-subtle)!important;
  background:var(--vira-forest)!important;
}

@media (max-width:1023px) {
  [data-vira-internal="passaporte"] [data-purpose="traceability-cycle"] .grid > .rounded-3xl {
    min-width:0;
  }
}

@media (max-width:639px) {
  [data-vira-internal="passaporte"] [data-purpose="traceability-cycle"],
  [data-vira-internal="passaporte"] [data-purpose="dpp-architecture"],
  [data-vira-internal="passaporte"] [data-purpose="audit-terminal"],
  [data-vira-internal="passaporte"] [data-purpose="physical-marker"],
  [data-vira-internal="passaporte"] [data-purpose="impact-calculator"],
  [data-vira-internal="passaporte"] [data-purpose="legal-matrix"],
  [data-vira-internal="passaporte"] [data-purpose="dpp-faq"],
  [data-vira-internal="passaporte"] [data-purpose="specification-form-section"] {
    padding-block:64px!important;
  }

  [data-vira-internal="passaporte"] [data-purpose="audit-terminal"] .bg-vira-card.rounded-3xl,
  [data-vira-internal="passaporte"] [data-purpose="specification-form-section"] [data-purpose="b2b-form"] {
    padding:20px!important;
  }
}
'''

HTML.write_text(html, encoding='utf-8')
CSS.write_text(css, encoding='utf-8')
print('Passaporte DPP refinement applied')
