import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=file=>fs.readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
const home=read('index.html');
for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
  assert(home.includes(`href="${href}"`),`Home missing ${href}`);
}
// 2026 Brand Specification for paver.html, blocos.html and guias.html
for(const file of ['paver.html','blocos.html','guias.html']){
  const html = read(file);
  for(const href of ['paver.html','blocos.html','guias.html','central-tecnica.html','passaporte.html']){
    assert(html.includes(`href="${href}"`),`${file} missing ${href}`);
  }
  assert(html.includes('<nav'), `${file} missing navigation bar`);
}
console.log('platform-navigation: ok');
