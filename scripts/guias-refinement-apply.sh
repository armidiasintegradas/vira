#!/usr/bin/env bash
set -euo pipefail

if grep -q 'Guias refinement — Paver golden master' internal-pages.css; then
  echo 'Guias refinement already present'
  exit 0
fi

cat >> internal-pages.css <<'CSS'

/* Guias refinement — Paver golden master */
[data-vira-internal="guias"] [data-internal-hero="true"] canvas {
  opacity:.4!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.absolute.inset-0 {
  opacity:.08!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"]::before {
  content:"";
  position:absolute;
  z-index:5;
  inset:0;
  background:linear-gradient(to top,rgba(8,17,13,1),rgba(8,17,13,.8),rgba(8,17,13,.08));
  pointer-events:none;
}

[data-vira-internal="guias"] [data-internal-hero="true"]::after {
  content:"";
  position:absolute;
  z-index:5;
  top:-160px;
  right:-160px;
  width:384px;
  height:384px;
  border-radius:999px;
  background:rgba(16,185,129,.08);
  filter:blur(54px);
  pointer-events:none;
}

[data-vira-internal="guias"] [data-internal-hero="true"] .vira-hero-heading span {
  background-image:linear-gradient(90deg,var(--vira-gold),#fef3c7,#34d399)!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  color:transparent!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] a[href="#especificar"] {
  border:1px solid var(--vira-gold)!important;
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  font-family:"Manrope",sans-serif!important;
  font-size:14px!important;
  font-weight:800!important;
  border-radius:999px!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] a[href="#passaporte-dpp"] {
  border:1px solid #52525b!important;
  background:rgba(23,23,23,.5)!important;
  color:#fff!important;
  font-family:"Manrope",sans-serif!important;
  font-size:14px!important;
  font-weight:500!important;
  border-radius:999px!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 {
  width:100%!important;
  max-width:none!important;
  margin-top:48px!important;
  padding-top:32px!important;
  border-top:1px solid #262626!important;
  display:grid!important;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:16px!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 > div {
  min-width:0;
  padding:16px!important;
  border:1px solid var(--vira-border)!important;
  border-radius:16px!important;
  background:rgba(16,28,21,.8)!important;
  box-shadow:none!important;
  backdrop-filter:blur(8px);
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 > div > div:first-child {
  margin:0 0 4px!important;
  font-family:"IBM Plex Mono",monospace!important;
  font-size:11px!important;
  line-height:1.35!important;
  font-weight:500!important;
  letter-spacing:.08em!important;
  text-transform:uppercase!important;
  color:var(--vira-gold)!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 > div:nth-child(even) > div:first-child {
  color:#34d399!important;
}

[data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 > div > div:nth-child(2) {
  margin-top:0!important;
  font-family:"Manrope",sans-serif!important;
  font-size:20px!important;
  line-height:1.25!important;
  font-weight:700!important;
  letter-spacing:-.02em!important;
  color:#fff!important;
}

[data-vira-internal="guias"] [data-purpose="case-study"] {
  padding-block:80px!important;
  background:var(--vira-surface)!important;
  color:var(--vira-dark)!important;
}

[data-vira-internal="guias"] [data-purpose="case-study"] > div > div:first-child {
  display:block!important;
  max-width:760px!important;
  margin:0 auto 40px!important;
  text-align:center!important;
}

[data-vira-internal="guias"] [data-purpose="case-study"] > div > div:first-child > div,
[data-vira-internal="guias"] [data-purpose="case-study"] > div > div:first-child > p {
  margin-inline:auto!important;
}

[data-vira-internal="guias"] [data-purpose="case-study"] > div > div:first-child > p {
  max-width:680px!important;
  margin-top:12px!important;
  color:#52525b!important;
}

[data-vira-internal="guias"] [data-purpose="case-study"] > div > div:nth-child(2) {
  border-color:#e4e4e7!important;
  border-radius:24px!important;
  box-shadow:0 20px 50px rgba(8,17,13,.12)!important;
}

[data-vira-internal="guias"] [data-purpose="material-science"] {
  background:var(--vira-dark)!important;
  border-color:var(--vira-border)!important;
}

[data-vira-internal="guias"] [data-purpose="material-science"] .grid > .rounded-2xl {
  background:rgba(16,28,21,.88)!important;
  border-color:var(--vira-border-subtle)!important;
}

[data-vira-internal="guias"] [data-purpose="material-science"] .rounded-3xl {
  border-color:var(--vira-border)!important;
}

[data-vira-internal="guias"] [data-purpose="technical-anatomy"] {
  background:var(--vira-surface)!important;
}

[data-vira-internal="guias"] [data-purpose="technical-anatomy"] .rounded-3xl.bg-white,
[data-vira-internal="guias"] [data-purpose="technical-anatomy"] .overflow-hidden.border.rounded-3xl {
  border-color:#e4e4e7!important;
  border-radius:24px!important;
  box-shadow:0 18px 42px rgba(8,17,13,.09)!important;
}

[data-vira-internal="guias"] [data-purpose="modulation-diagrams"] .grid > .rounded-3xl,
[data-vira-internal="guias"] [data-purpose="downloads"] .grid > .rounded-3xl {
  background:var(--vira-card)!important;
  border-color:var(--vira-border-subtle)!important;
  box-shadow:0 18px 40px rgba(0,0,0,.12);
}

[data-vira-internal="guias"] [data-purpose="modulation-diagrams"] .grid > .rounded-3xl:hover,
[data-vira-internal="guias"] [data-purpose="downloads"] .grid > .rounded-3xl:hover {
  border-color:rgba(241,197,70,.5)!important;
}

[data-vira-internal="guias"] [data-purpose="calculator"] > div > .bg-gradient-to-br,
[data-vira-internal="guias"] [data-purpose="specification-form"] > div > div {
  border-color:rgba(241,197,70,.3)!important;
  background:linear-gradient(135deg,var(--vira-forest),var(--vira-dark))!important;
  border-radius:24px!important;
}

[data-vira-internal="guias"] [data-purpose="specification-form"] button[type="submit"] {
  background:var(--vira-gold)!important;
  color:var(--vira-dark)!important;
  font-family:"Manrope",sans-serif!important;
  font-weight:800!important;
}

@media (max-width:1023px) {
  [data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 {
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}

@media (max-width:639px) {
  [data-vira-internal="guias"] [data-internal-hero="true"] > div.relative:not(.absolute) > div.mt-14 {
    grid-template-columns:minmax(0,1fr);
    margin-top:40px!important;
    padding-top:24px!important;
  }
  [data-vira-internal="guias"] [data-purpose="case-study"] {
    padding-block:64px!important;
  }
}
CSS
