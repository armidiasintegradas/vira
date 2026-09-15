import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=file=>fs.readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
const home=read('index.html');
for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
  assert(home.includes(`href="${href}"`),`Home missing ${href}`);
}
// 2026 Brand Specification for paver.html and blocos.html
for(const file of ['paver.html','blocos.html']){
  const html = read(file);
  for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
    assert(html.includes(`href="${href}"`),`${file} missing ${href}`);
  }
  assert(html.includes('<nav'), `${file} missing navigation bar`);
}

// Legacy platform navigation for remaining product pages
for(const file of ['guias.html']){
  const html=read(file);
  assert(html.includes('class="product-switcher"'),`${file} missing product-switcher`);
  assert(html.includes('platform.css'),`${file} missing platform.css`);
  for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
    assert(html.includes(`href="${href}"`),`${file} missing ${href}`);
  }
  assert(html.includes('class="shared-tech-link"'),`${file} missing Central Técnica CTA`);
  assert(html.includes('class="shared-passport-link"'),`${file} missing Passaporte CTA`);
}
console.log('platform-navigation: ok');
