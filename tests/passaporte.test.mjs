import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../passaporte.html', import.meta.url), 'utf8');

// Estrutura H1 e Título
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'Passaporte deve conter exatamente um h1');
assert(html.includes('Transparência radical gravada'), 'H1 deve conter o texto monumental');
assert(html.includes('<title>05 // Passaporte Digital de Produto (DPP) — Rastreabilidade Criptográfica VIRA</title>'), 'Título deve seguir a especificação 2026');

// Protocolo e Normas
assert(html.includes('ISO 59020'), 'Deve referenciar norma ISO 59020');
assert(html.includes('DPP-V4'), 'Deve exibir badge metrológico DPP-V4');
assert(html.includes('NBR 9781'), 'Deve validar conformidade NBR 9781');

// 5 Etapas do Ciclo de Rastreabilidade
for (const etapa of [
  'Coleta &amp; Georreferenciamento',
  'Moagem &amp; Batelada Fabril',
  'Ensaios Laboratoriais RBC',
  'Gravação Indelével a Laser',
  'Leitura Óptica no Canteiro'
]) {
  assert(html.includes(etapa), `Falta a etapa do ciclo: ${etapa}`);
}

// Terminal Interativo de Auditoria & Hash
assert(html.includes('VIRA-LOTE-2026-0842B'), 'Deve incluir o lote de referência padrão');
assert(html.includes('SHA-256'), 'Deve exibir protocolo de chave SHA-256');
assert(html.includes('simularConsultaLote'), 'Função de consulta interativa deve estar presente');
assert(html.includes('copiarHashLote'), 'Função de cópia do hash deve estar presente');

// Calculadora Dinâmica
assert(html.includes('calc-area-slider'), 'Slider da calculadora deve estar presente');
assert(html.includes('atualizarCalculoDpp'), 'Função de cálculo dinâmico deve estar presente');

// Matriz Legal e ESG
for (const lei of ['14.133/2021', '12.305/2010', 'ISO 14021', 'TCE / TCU']) {
  assert(html.includes(lei), `Falta marco legal: ${lei}`);
}

// Rodapé Master com créditos da AR Mídias
assert(html.includes('Desenvolvido por AR Mídias Integradas.'), 'Rodapé deve conter créditos oficiais');

console.log('passaporte: ok');
