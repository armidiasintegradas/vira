from pathlib import Path

html_path = Path('brandbook.html')
css_path = Path('internal-pages.css')
html = html_path.read_text(encoding='utf-8')
css = css_path.read_text(encoding='utf-8')

replacements = [
    (
        '<nav class="bg-[#040A07]/90 backdrop-blur-sm border-b border-[#142519] py-2.5 px-4 sm:px-8 overflow-x-auto text-[11px] font-mono sticky top-[73px] z-30">',
        '<nav class="bg-[#040A07]/90 backdrop-blur-sm border-b border-[#142519] py-2.5 px-4 sm:px-8 overflow-x-auto text-[11px] font-mono sticky top-[73px] z-30" data-purpose="brandbook-chapter-nav">'
    ),
    (
        '<section data-internal-hero="true" class="relative bg-vira-dark text-white pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-[#1b2b20]" id="hero-section">',
        '<section data-internal-hero="true" class="relative bg-vira-dark text-white pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-[#1b2b20]" data-purpose="brandbook-hero" id="hero-section">'
    ),
    (
        '<!-- Telemetry Data Card -->\n<div class="lg:col-span-5">',
        '<!-- Telemetry Data Card -->\n<div class="lg:col-span-5" data-purpose="brandbook-hero-metrics">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" id="visao-geral">',
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" data-purpose="brand-overview" id="visao-geral">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" id="logotipo">',
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" data-purpose="brand-logo-system" id="logotipo">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" id="cores">',
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" data-purpose="brand-colors" id="cores">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" id="tipografia">',
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" data-purpose="brand-typography" id="tipografia">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-vira-dark text-white border-b border-[#1b2b20]" id="sinalizacao">',
        '<section class="py-16 sm:py-24 bg-vira-dark text-white border-b border-[#1b2b20]" data-purpose="brand-signage" id="sinalizacao">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" id="uniformes">',
        '<section class="py-16 sm:py-24 bg-vira-surface border-b border-vira-border" data-purpose="brand-uniforms" id="uniformes">'
    ),
    (
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" id="downloads">',
        '<section class="py-16 sm:py-24 bg-white border-b border-vira-border" data-purpose="brand-downloads" id="downloads">'
    ),
]

for old, new in replacements:
    count = html.count(old)
    if count != 1:
        raise SystemExit(f'Expected exactly one Brandbook target, found {count}: {old[:100]}')
    html = html.replace(old, new, 1)

marker = '/* Brandbook refinement — Paver golden master */'
if marker in css:
    raise SystemExit('Brandbook CSS refinement already exists; refusing duplicate append')

css += r'''

/* Brandbook refinement — Paver golden master */
[data-vira-internal="brandbook"] [data-purpose="brandbook-chapter-nav"] {
  position:sticky!important;
  top:var(--vira-page-top)!important;
  z-index:50!important;
  min-height:42px!important;
  padding:0 var(--vira-shell-x)!important;
  border:0!important;
  border-bottom:1px solid var(--vira-border)!important;
  background:rgba(4,10,7,.96)!important;
  color:#a1a1aa!important;
  font-family:"IBM Plex Mono",monospace!important;
  font-size:10px!important;
  letter-spacing:.06em!important;
  backdrop-filter:blur(14px);
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-chapter-nav"] > div {
  width:min(100%,var(--vira-shell-max))!important;
  min-height:42px!important;
  margin-inline:auto!important;
  gap:clamp(14px,2vw,28px)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-chapter-nav"] a {
  min-height:42px;
  display:inline-flex;
  align-items:center;
  color:#a1a1aa!important;
  text-decoration:none;
  transition:color .18s ease;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-chapter-nav"] a:hover {
  color:var(--vira-gold)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] {
  isolation:isolate;
  background:linear-gradient(180deg,var(--vira-dark) 0%,var(--vira-forest) 64%,var(--vira-dark) 100%)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"]::before {
  content:"";
  position:absolute;
  inset:0;
  z-index:1;
  pointer-events:none;
  background:linear-gradient(90deg,rgba(8,17,13,.96) 0%,rgba(8,17,13,.78) 48%,rgba(8,17,13,.38) 100%);
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"]::after {
  content:"";
  position:absolute;
  width:min(48vw,680px);
  height:min(48vw,680px);
  right:-12%;
  top:-24%;
  z-index:1;
  pointer-events:none;
  border-radius:999px;
  background:radial-gradient(circle,rgba(52,211,153,.13),rgba(52,211,153,0) 68%);
  filter:blur(8px);
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] canvas {
  opacity:.4!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] > div.relative {
  z-index:2!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] > div.relative > div.grid {
  display:block!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] > div.relative > div.grid > div:first-child {
  max-width:820px!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] .vira-hero-heading span {
  background-image:linear-gradient(90deg,var(--vira-gold),#fef3c7,#34d399)!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  color:transparent!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] a[href="#downloads"] {
  border:1px solid var(--vira-gold)!important;
  border-radius:999px!important;
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  box-shadow:none!important;
  font-family:"Manrope",sans-serif!important;
  font-weight:800!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero"] a[href="#logotipo"] {
  border:1px solid #52525b!important;
  border-radius:999px!important;
  background:rgba(23,23,23,.5)!important;
  color:#fff!important;
  font-family:"Manrope",sans-serif!important;
  font-weight:700!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] {
  width:100%!important;
  max-width:none!important;
  margin-top:44px!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] > div {
  padding:20px 24px!important;
  border:1px solid var(--vira-border-subtle)!important;
  border-radius:24px!important;
  background:rgba(16,28,21,.84)!important;
  box-shadow:none!important;
  backdrop-filter:blur(12px);
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl {
  display:grid!important;
  grid-template-columns:repeat(5,minmax(0,1fr));
  gap:0!important;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl > div {
  min-width:0;
  padding:6px 18px!important;
  border:0!important;
  border-right:1px solid var(--vira-border-subtle)!important;
  display:flex!important;
  flex-direction:column!important;
  align-items:flex-start!important;
  gap:5px;
}

[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl > div:first-child { padding-left:0!important; }
[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl > div:last-child { border-right:0!important; }
[data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dd { text-align:left!important; }

[data-vira-internal="brandbook"] :where(
  [data-purpose="brand-overview"],
  [data-purpose="brand-logo-system"],
  [data-purpose="brand-colors"],
  [data-purpose="brand-typography"],
  [data-purpose="brand-signage"],
  [data-purpose="brand-uniforms"],
  [data-purpose="brand-downloads"]
) {
  padding-block:80px!important;
  scroll-margin-top:calc(var(--vira-page-top) + 58px)!important;
}

[data-vira-internal="brandbook"] :where(
  [data-purpose="brand-overview"],
  [data-purpose="brand-colors"],
  [data-purpose="brand-uniforms"]
) {
  background:var(--vira-surface)!important;
}

[data-vira-internal="brandbook"] :where(
  [data-purpose="brand-logo-system"],
  [data-purpose="brand-typography"],
  [data-purpose="brand-downloads"]
) {
  background:#fff!important;
}

[data-vira-internal="brandbook"] :where(
  [data-purpose="brand-overview"],
  [data-purpose="brand-logo-system"],
  [data-purpose="brand-colors"],
  [data-purpose="brand-typography"],
  [data-purpose="brand-uniforms"],
  [data-purpose="brand-downloads"]
) .rounded-vira {
  border-radius:24px!important;
}

[data-vira-internal="brandbook"] :where(
  [data-purpose="brand-overview"],
  [data-purpose="brand-logo-system"],
  [data-purpose="brand-typography"],
  [data-purpose="brand-uniforms"],
  [data-purpose="brand-downloads"]
) :where(.bg-white,.bg-vira-surface).rounded-vira {
  border-color:#e4e4e7!important;
  box-shadow:0 12px 30px rgba(8,17,13,.07)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-logo-system"] > div > .bg-vira-surface.rounded-vira {
  box-shadow:0 16px 36px rgba(8,17,13,.08)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-colors"] .grid > .rounded-vira {
  border-radius:24px!important;
  box-shadow:0 12px 28px rgba(8,17,13,.08)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-typography"] table {
  min-width:760px;
}

[data-vira-internal="brandbook"] [data-purpose="brand-signage"] {
  background:var(--vira-dark)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-signage"] [class*="bg-[#0d1812]"] {
  border-color:var(--vira-border-subtle)!important;
  border-radius:24px!important;
  background:var(--vira-card)!important;
  box-shadow:0 16px 34px rgba(0,0,0,.16)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-uniforms"] .grid > .rounded-vira.bg-white {
  border-color:#e4e4e7!important;
  box-shadow:0 10px 26px rgba(8,17,13,.07)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-downloads"] > div > .bg-vira-dark.rounded-vira,
[data-vira-internal="brandbook"] [data-purpose="brand-downloads"] > div > .bg-vira-dark.rounded-vira:last-child {
  border-color:var(--vira-border-subtle)!important;
  background:var(--vira-dark)!important;
  box-shadow:0 16px 36px rgba(0,0,0,.14)!important;
}

[data-vira-internal="brandbook"] [data-purpose="brand-downloads"] a[download] {
  border-radius:999px!important;
}

@media (max-width:1023px) {
  [data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl {
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:12px!important;
  }

  [data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl > div {
    padding:10px 12px!important;
    border-right:0!important;
    border-bottom:1px solid var(--vira-border-subtle)!important;
  }
}

@media (max-width:639px) {
  [data-vira-internal="brandbook"] [data-purpose="brandbook-chapter-nav"] {
    min-height:40px!important;
    padding-inline:16px!important;
  }

  [data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] > div {
    padding:18px!important;
  }

  [data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl {
    grid-template-columns:minmax(0,1fr);
  }

  [data-vira-internal="brandbook"] [data-purpose="brandbook-hero-metrics"] dl > div {
    padding:10px 0!important;
  }

  [data-vira-internal="brandbook"] :where(
    [data-purpose="brand-overview"],
    [data-purpose="brand-logo-system"],
    [data-purpose="brand-colors"],
    [data-purpose="brand-typography"],
    [data-purpose="brand-signage"],
    [data-purpose="brand-uniforms"],
    [data-purpose="brand-downloads"]
  ) {
    padding-block:64px!important;
  }
}
'''

html_path.write_text(html, encoding='utf-8')
css_path.write_text(css, encoding='utf-8')
print('Brandbook refinement applied')
