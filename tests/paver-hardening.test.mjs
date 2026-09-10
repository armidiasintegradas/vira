import fs from 'node:fs';
import assert from 'node:assert/strict';

const js = fs.readFileSync(new URL('../paver.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../paver-hardening.css', import.meta.url), 'utf8');

assert(js.includes('paver-hardening.css'), 'paver.js não carrega a camada de hardening');
assert(js.includes('hero-paver-orla-menina-v10.webp'), 'hero não foi direcionado para a imagem panorâmica');
assert(js.includes('produto-paver-brasil-v1.webp'), 'imagem de aplicações não foi reorganizada');
assert(js.includes('aria-valuetext'), 'controle de área não expõe valor acessível atualizado');
assert(js.includes('projectType') && js.includes('specApplication'), 'aplicação escolhida na calculadora não é sincronizada com a especificação');
assert(css.includes('.hero-meta{display:none}'), 'chips do hero ainda podem sobrepor conteúdo no mobile');
assert(css.includes('content:"VIRA"') && css.includes('content:"Convencional"'), 'comparador mobile perde contexto das colunas');

console.log('paver-hardening: ok');
