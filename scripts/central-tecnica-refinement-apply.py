from pathlib import Path
import re

html_path = Path('central-tecnica.html')
css_path = Path('internal-pages.css')

html = html_path.read_text(encoding='utf-8')

sections = [
    ('HeroSection', 'central-hero'),
    ('TransparencyPrinciples', 'transparency-principles'),
    ('DocumentLibrary', 'document-library'),
    ('DPPSection', 'dpp-section'),
    ('RegulatoryMatrix', 'regulatory-matrix'),
    ('FAQSection', 'faq-section'),
    ('FormB2BSection', 'specification-request'),
]

for marker, purpose in sections:
    if f'data-purpose="{purpose}"' in html:
        continue
    pattern = rf'(<!-- BEGIN: {re.escape(marker)} -->.*?<section)(?![^>]*data-purpose=)'
    html, count = re.subn(
        pattern,
        rf'\1 data-purpose="{purpose}"',
        html,
        count=1,
        flags=re.S,
    )
    if count != 1:
        raise SystemExit(f'Could not annotate section {marker} as {purpose}')

html_path.write_text(html, encoding='utf-8')

css = css_path.read_text(encoding='utf-8')
marker = '/* Central Tecnica refinement — Paver golden master */'
if marker not in css:
    css += r'''

/* Central Tecnica refinement — Paver golden master */
[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] {
  background:var(--vira-dark)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] canvas {
  opacity:.32!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"]::before {
  content:"";
  position:absolute;
  z-index:1;
  inset:0;
  background:linear-gradient(to top,rgba(8,17,13,1),rgba(8,17,13,.82),rgba(8,17,13,.08));
  pointer-events:none;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"]::after {
  content:"";
  position:absolute;
  z-index:1;
  top:-160px;
  right:-160px;
  width:384px;
  height:384px;
  border-radius:999px;
  background:rgba(16,185,129,.08);
  filter:blur(54px);
  pointer-events:none;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] .vira-hero-heading span {
  background-image:linear-gradient(90deg,var(--vira-gold),#fef3c7,#34d399)!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  color:transparent!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] a[href="#biblioteca"] {
  border:1px solid var(--vira-gold)!important;
  border-radius:999px!important;
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  font-family:"Manrope",sans-serif!important;
  font-size:14px!important;
  font-weight:800!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] a[href="#solicitar"] {
  border:1px solid #52525b!important;
  border-radius:999px!important;
  background:rgba(23,23,23,.5)!important;
  color:#fff!important;
  font-family:"Manrope",sans-serif!important;
  font-size:14px!important;
  font-weight:500!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child {
  width:100%!important;
  margin-top:48px!important;
  padding-top:32px!important;
  border-top:1px solid #262626!important;
  display:grid!important;
  grid-template-columns:repeat(4,minmax(0,1fr))!important;
  gap:16px!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child > div {
  min-width:0;
  padding:16px!important;
  border:1px solid var(--vira-border)!important;
  border-radius:16px!important;
  background:rgba(16,28,21,.82)!important;
  box-shadow:none!important;
  backdrop-filter:blur(8px);
}

[data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child > div > span:first-child {
  color:var(--vira-gold)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="transparency-principles"],
[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"] {
  padding-block:80px!important;
  background:var(--vira-surface)!important;
  color:var(--vira-dark)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="transparency-principles"] > div,
[data-vira-internal="central-tecnica"] [data-purpose="document-library"] > div,
[data-vira-internal="central-tecnica"] [data-purpose="dpp-section"] > div,
[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"] > div {
  width:min(100%,var(--vira-shell-max))!important;
  max-width:var(--vira-shell-max)!important;
  margin-inline:auto!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="transparency-principles"] .grid > .rounded-2xl {
  border-color:#e4e4e7!important;
  background:#fff!important;
  box-shadow:0 16px 36px rgba(8,17,13,.08)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="document-library"] {
  padding-block:80px!important;
  background:var(--vira-dark)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="document-library"] > div > .grid > div,
[data-vira-internal="central-tecnica"] [data-purpose="document-library"] .doc-card {
  border-color:var(--vira-border-subtle)!important;
  background:var(--vira-card)!important;
  box-shadow:0 16px 36px rgba(0,0,0,.12)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="document-library"] .doc-card {
  border-radius:16px!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="document-library"] > div > .grid > div:hover,
[data-vira-internal="central-tecnica"] [data-purpose="document-library"] .doc-card:hover {
  border-color:rgba(241,197,70,.5)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="dpp-section"] {
  padding-block:80px!important;
  background:var(--vira-forest)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="dpp-section"] > div > div:last-child {
  border-color:var(--vira-border-subtle)!important;
  border-radius:24px!important;
  background:rgba(4,10,7,.78)!important;
  box-shadow:0 20px 50px rgba(0,0,0,.18)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"] .overflow-x-auto {
  border-color:#e4e4e7!important;
  border-radius:24px!important;
  box-shadow:0 18px 42px rgba(8,17,13,.09)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="faq-section"] {
  padding-block:80px!important;
  background:var(--vira-dark)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="faq-section"] details {
  border-color:var(--vira-border-subtle)!important;
  border-radius:16px!important;
  background:var(--vira-card)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="faq-section"] details[open] {
  border-color:rgba(241,197,70,.5)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="specification-request"] {
  background:var(--vira-dark)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="specification-request"] > div > div {
  border-color:rgba(241,197,70,.3)!important;
  border-radius:24px!important;
  background:linear-gradient(135deg,var(--vira-forest),var(--vira-dark))!important;
  box-shadow:0 20px 50px rgba(0,0,0,.18)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="specification-request"] :where(input,select,textarea) {
  border-color:var(--vira-border-subtle)!important;
  border-radius:12px!important;
  background:var(--vira-dark)!important;
}

[data-vira-internal="central-tecnica"] [data-purpose="specification-request"] button[type="submit"] {
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  font-family:"Manrope",sans-serif!important;
  font-weight:800!important;
}

@media (max-width:1023px) {
  [data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child {
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
  }
}

@media (max-width:639px) {
  [data-vira-internal="central-tecnica"] [data-purpose="central-hero"] > div.relative > div.grid:last-child {
    grid-template-columns:minmax(0,1fr)!important;
    margin-top:40px!important;
    padding-top:24px!important;
  }
  [data-vira-internal="central-tecnica"] [data-purpose="transparency-principles"],
  [data-vira-internal="central-tecnica"] [data-purpose="document-library"],
  [data-vira-internal="central-tecnica"] [data-purpose="dpp-section"],
  [data-vira-internal="central-tecnica"] [data-purpose="regulatory-matrix"],
  [data-vira-internal="central-tecnica"] [data-purpose="faq-section"] {
    padding-block:64px!important;
  }
}
'''

css_path.write_text(css, encoding='utf-8')
