from pathlib import Path

path = Path('internal-pages.css')
css = path.read_text(encoding='utf-8')

old = '''[data-vira-internal="brandbook"] :where(
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
}'''

new = '''[data-vira-internal="brandbook"] [data-purpose="brand-overview"],
[data-vira-internal="brandbook"] [data-purpose="brand-logo-system"],
[data-vira-internal="brandbook"] [data-purpose="brand-colors"],
[data-vira-internal="brandbook"] [data-purpose="brand-typography"],
[data-vira-internal="brandbook"] [data-purpose="brand-signage"],
[data-vira-internal="brandbook"] [data-purpose="brand-uniforms"],
[data-vira-internal="brandbook"] [data-purpose="brand-downloads"] {
  padding-block:80px!important;
  scroll-margin-top:calc(var(--vira-page-top) + 58px)!important;
}'''

count = css.count(old)
if count != 1:
    raise SystemExit(f'Expected one grouped Brandbook chapter selector, found {count}')

path.write_text(css.replace(old, new, 1), encoding='utf-8')
print('Brandbook chapter selectors made explicit')
