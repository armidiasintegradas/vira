# VIRA Fase 2.4 — Consolidação da Plataforma

Data: 2026-09-09
Status: design aprovado em chat; aguardando revisão final do usuário antes do plano de implementação.

## 1. Objetivo

Consolidar o site VIRA como uma plataforma única de especificação e apresentação técnica, conectando a Home, as três famílias de produto, uma Central Técnica compartilhada e uma experiência central de Passaporte Digital.

A fase não redefine os dados técnicos dos produtos. Paver VIRA, Blocos VIRA e Guias e Meio-fio VIRA preservam seus conteúdos e estados técnicos atuais. A consolidação organiza navegação, descoberta, documentação e rastreabilidade sem criar novas métricas, normas, laudos, downloads ou promessas não documentadas.

## 2. Princípios de produto

1. A Home é a porta institucional e comercial do ecossistema VIRA.
2. Cada família mantém uma página própria e independente.
3. A navegação entre famílias deve ser direta e consistente em desktop e mobile.
4. Documentação técnica deixa de parecer espalhada por produto e passa a ter uma entrada central.
5. O Passaporte Digital passa a ser apresentado como uma capacidade transversal da VIRA, não como recurso exclusivo de uma família.
6. Estados de conteúdo técnico devem ser explícitos: `Disponível`, `Em preparação`, `Em validação`, `Em consolidação` ou `Demonstração`.
7. Nenhuma interface deve sugerir que um documento, ensaio, norma ou lote real existe quando isso ainda não estiver documentado.
8. A identidade visual e os logos oficiais permanecem intactos.
9. A fase deve reduzir fragmentação sem reescrever desnecessariamente o CSS e o JavaScript já aprovados.

## 3. Arquitetura de informação

Fluxo principal:

`Home VIRA → Produtos → Paver / Blocos / Guias → Central Técnica → Passaporte Digital → Especificar projeto`

Rotas-alvo:

- `/index.html` — Home VIRA
- `/paver.html` — Paver VIRA
- `/blocos.html` — Blocos VIRA
- `/guias.html` — Guias e Meio-fio VIRA
- `/central-tecnica.html` — Central Técnica VIRA
- `/passaporte.html` — Passaporte Digital VIRA

Não haverá login, banco de dados, busca remota, upload de arquivos ou gestão administrativa nesta fase.

## 4. Home VIRA

A Home passa a apresentar as três famílias como portas equivalentes de produto. Os três cards devem usar links HTML reais, não depender de JavaScript para navegação.

Cada card terá:

- nome oficial da família;
- contexto de aplicação;
- estado técnico resumido;
- acesso direto à página da família;
- imagem de aplicação e imagem de fábrica já existentes;
- CTA consistente para abrir a página técnica.

A seção de produtos deve destacar que os dados específicos variam por configuração. Os dados numéricos atualmente definidos para o Paver não devem ser apresentados visualmente como se fossem válidos para Blocos ou Guias.

A Home também ganhará duas novas entradas institucionais, em posição posterior às famílias de produto:

- `Central Técnica VIRA` — documentação e estados por família;
- `Passaporte Digital VIRA` — rastreabilidade e arquitetura de informação por lote.

## 5. Navegação compartilhada entre produtos

As páginas Paver, Blocos e Guias ganharão uma camada compartilhada de navegação entre famílias.

Componente conceitual: `product-switcher`.

Itens:

- Paver
- Blocos
- Guias e Meio-fio
- Central Técnica
- Passaporte

Comportamento:

- indicar visualmente a família atual;
- usar links HTML nativos;
- permanecer acessível por teclado;
- no mobile, usar rolagem horizontal controlada em vez de menu complexo;
- não substituir a navegação interna por âncoras da própria página;
- não depender de JavaScript para funcionar.

A implementação deve ser aditiva. Não será feita uma migração completa de `paver.css`, `blocos.css` e `guias.css` para um novo design system nesta fase.

## 6. Central Técnica VIRA

Criar `central-tecnica.html` como biblioteca central de estado documental.

### Estrutura

Hero:

- título `Central Técnica VIRA`;
- texto explicando que a biblioteca organiza documentos e estados por família;
- aviso claro de que itens não disponíveis não geram downloads simulados.

Filtros locais:

- Todas as famílias
- Paver
- Blocos
- Guias e Meio-fio

Os filtros funcionarão em JavaScript no cliente como melhoria progressiva; todo o catálogo permanecerá legível sem JavaScript.

### Modelo de item

Cada item técnico deve possuir:

- família;
- nome do documento ou ativo;
- finalidade;
- status;
- ação.

A ação só será um link de download quando existir um arquivo real no repositório e houver confirmação de que ele representa o documento correto. Caso contrário, o item exibirá apenas o status, sem link falso.

### Catálogo inicial

Paver:

- Ficha técnica — Em consolidação
- Ensaios e laudos — Em validação
- Manual de instalação — Em preparação
- DWG/BIM/texturas — Em preparação
- Passaporte Digital — Demonstração

Blocos:

- Ficha técnica por geometria — Em consolidação
- Ensaios e laudos — Em validação
- Manual de aplicação — Em preparação
- Arquivos de projeto — Em preparação
- Passaporte Digital — Demonstração

Guias e Meio-fio:

- Ficha técnica por configuração — Em consolidação
- Ensaios e laudos — Em validação
- Manual de instalação — Em preparação
- Arquivos de projeto — Em preparação
- Passaporte Digital — Demonstração

Nenhum status `Disponível` será usado até que um arquivo real e válido seja confirmado durante a implementação.

## 7. Passaporte Digital VIRA

Criar `passaporte.html` como explicação transversal da rastreabilidade VIRA.

### Objetivo

Mostrar como um lote poderá conectar:

1. origem da matéria;
2. composição;
3. configuração do produto;
4. produção;
5. controles e ensaios disponíveis;
6. aplicação prevista;
7. documentos associados.

### Demonstração

A página terá uma experiência demonstrativa claramente identificada com `DEMONSTRAÇÃO`.

Não haverá consulta a banco de dados nesta fase. Os IDs apresentados serão fictícios e explicitamente marcados como demonstração. A interface não deve sugerir acesso a lote comercial real.

A demonstração permitirá alternar entre Paver, Blocos e Guias para visualizar como os campos mudam por família. O conteúdo será estático e seguro.

IDs demonstrativos definidos para esta fase:

- `VIRA-PAVER-DEMO-0001`
- `VIRA-BLOCO-DEMO-0001`
- `VIRA-GUIA-DEMO-0001`

Esses IDs são exemplos de interface e nunca serão descritos como lotes comerciais.

## 8. Especificação e conversão

As páginas de produto mantêm seus formulários atuais.

Na `central-tecnica.html`, o CTA geral `Especificar projeto` apontará para `index.html#contato`. Quando o usuário estiver visualizando uma família filtrada, links contextuais poderão apontar diretamente para o `#especificar` da respectiva página de produto.

Na `passaporte.html`, cada demonstração de família terá CTA explícito para o `#especificar` da página correspondente: Paver → `paver.html#especificar`, Blocos → `blocos.html#especificar`, Guias → `guias.html#especificar`.

Não será criada nesta fase uma API de envio. O fluxo por `mailto:` permanece como mecanismo atual, com assunto e contexto preenchidos pelo JavaScript da página quando aplicável.

A arquitetura deve permitir substituir `mailto:` por backend ou CRM no futuro sem alterar a estrutura das páginas.

## 9. Camada compartilhada de interface

Criar exatamente dois arquivos compartilhados para esta fase:

- `platform.css` — estilos apenas dos componentes compartilhados da Fase 2.4;
- `platform.js` — comportamento opcional de filtros, estado visual e melhorias progressivas.

Responsabilidades de `platform.css`:

- seletor de famílias;
- cards de acesso à Central Técnica/Passaporte;
- estados documentais;
- elementos compartilhados das novas páginas;
- responsividade desses componentes.

Responsabilidades de `platform.js`:

- filtros locais da Central Técnica;
- troca de família na demonstração do Passaporte;
- atualização acessível de estados (`aria-pressed`, `aria-live`) quando necessário.

A navegação principal deve continuar funcional sem JavaScript.

## 10. SEO e metadados

Cada nova página terá:

- `<title>` próprio;
- meta description própria;
- heading `h1` único;
- links internos entre áreas;
- textos descritivos sem keyword stuffing.

Nesta fase, não serão adicionados schemas estruturados que contenham atributos técnicos ainda não documentados.

As páginas de produto existentes receberão links para Central Técnica e Passaporte, mas seus títulos e textos técnicos não serão reescritos fora do necessário para a integração.

## 11. Mobile e acessibilidade

Requisitos mínimos:

- seletor de produto rolável horizontalmente em telas estreitas;
- área de toque adequada para CTAs;
- foco visível em links e controles;
- filtros operáveis por teclado;
- `aria-pressed` nos filtros/toggles;
- conteúdo essencial disponível sem JavaScript;
- respeito a `prefers-reduced-motion`;
- nenhum CTA fixo deve cobrir conteúdo ou controles de formulário.

A camada compartilhada deve respeitar os breakpoints atuais, evitando regressões nas três páginas existentes.

## 12. Fluxo de dados

Não há backend nesta fase.

Fonte de verdade:

- HTML estático para conteúdo e status;
- JavaScript apenas para filtragem e demonstração;
- arquivos reais do repositório para downloads quando existirem.

Fluxo da Central Técnica:

`HTML do catálogo → filtro local opcional → usuário visualiza status → download somente se arquivo real existir`

Fluxo do Passaporte:

`dataset demonstrativo estático → seleção de família → renderização dos campos demonstrativos → CTA da família selecionada`

## 13. Tratamento de erro e degradação

Sem JavaScript:

- Central Técnica exibe todos os itens;
- Passaporte exibe a demonstração inicial do Paver e as explicações completas das três famílias em conteúdo estático de apoio;
- links entre páginas funcionam normalmente.

Com JavaScript:

- filtros devem ignorar seletores inexistentes sem lançar erro;
- troca do Passaporte deve preservar Paver como estado inicial válido;
- nenhum erro de filtro pode esconder permanentemente todo o conteúdo;
- formulários existentes continuam independentes da camada `platform.js`.

Se um download não existir, a interface deve mostrar o status e nunca criar href vazio, `#` ou arquivo fictício.

## 14. Estratégia de testes

A implementação deverá seguir TDD para os novos comportamentos e rotas.

Testes estáticos de regressão deverão verificar:

- existência de `central-tecnica.html` e `passaporte.html`;
- existência de links HTML reais para Paver, Blocos e Guias na Home;
- presença do seletor das três famílias nas páginas de produto;
- ausência de links de download fictícios em itens não disponíveis;
- presença dos cinco estados documentais permitidos e uso coerente;
- identificação explícita de `DEMONSTRAÇÃO` no Passaporte;
- ausência de claims técnicos compartilhados indevidamente entre famílias;
- ausência de IDs demonstrativos apresentados como lotes reais;
- sintaxe válida de `platform.js`;
- preservação dos testes existentes de Paver, Blocos e Guias.

Também deverá haver verificação de diff para impedir uma reescrita acidental das páginas existentes.

## 15. Arquivos previstos

Novos:

- `central-tecnica.html`
- `passaporte.html`
- `platform.css`
- `platform.js`
- `tests/platform-navigation.test.mjs`
- `tests/central-tecnica.test.mjs`
- `tests/passaporte.test.mjs`

Modificações previstas:

- `index.html`
- `paver.html`
- `blocos.html`
- `guias.html`

`app.js` só será alterado para remover dependência de navegação em cards que forem convertidos para links HTML reais. Não haverá refatoração ampla.

## 16. Fora de escopo

Esta fase não inclui:

- autenticação ou login;
- banco de dados;
- painel administrativo;
- consulta de lote real;
- QR Code operacional;
- CRM;
- upload de laudos;
- geração automática de ficha técnica;
- busca remota;
- métricas ESG novas;
- cálculo de CO₂;
- criação ou inferência de normas técnicas;
- publicação de dados técnicos ainda não homologados;
- rebranding ou modificação do logo oficial VIRA.

## 17. Critérios de aceite

A Fase 2.4 estará pronta para merge quando:

1. Home, Paver, Blocos e Guias estiverem conectados por links nativos e consistentes.
2. As três famílias puderem ser alternadas sem retornar obrigatoriamente à Home.
3. A Central Técnica centralizar os estados documentais das três famílias sem downloads fictícios.
4. O Passaporte Digital tiver página própria e for inequivocamente demonstrativo.
5. As três páginas de produto preservarem seus dados e estados técnicos existentes.
6. A navegação funcionar sem JavaScript.
7. Os comportamentos progressivos funcionarem com JavaScript sem erros de sintaxe.
8. Os testes novos e os testes existentes relevantes estiverem verdes no ambiente onde puderem ser executados.
9. O diff não introduzir refatorações não relacionadas.
10. A identidade visual VIRA permanecer intacta.
