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
