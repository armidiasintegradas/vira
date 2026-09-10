// ========================================================
// PLATAFORMA VIRA NEXT — KNOWLEDGE GRAPH & CENTRO DE ESPECIFICAÇÃO
// Arquitetura de Conexões, Engenharia de Ativos e Governança Técnica
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initEngineeringCenter();
});

// --------------------------------------------------------
// GRAFO DE CONHECIMENTO DE ENGENHARIA (KNOWLEDGE GRAPH)
// --------------------------------------------------------
const engineeringKnowledgeGraph = [
  {
    id: 'VIRA-BIM-PAV-001',
    engineeringId: 'VIRA-BIM-PAV-001',
    title: 'Família Paramétrica BIM: Paver Intertravado 16 Faces',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    solution: 'paver',
    solutionTitle: 'Pavimentação Urbana & Praças (Paver 16 Faces)',
    materialLabel: 'Paver 16 Faces',
    format: 'RVT / IFC',
    size: '14.2 MB',
    version: 'v2.1',
    lastUpdate: '15/08/2026',
    license: 'Uso Profissional Restrito / ABNT NBR 9781',
    norm: 'ABNT NBR 9781:2013',
    software: 'Autodesk Revit 2021 a 2026, ArchiCAD 25+, Navisworks',
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Diretor de Engenharia de Aplicação & Modelagem BIM',
      email: 'especificacao@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2.1', date: '15/08/2026', changes: 'Inclusão de propriedades térmicas (albedo 0.42) e parâmetros de emissão ACV incorporados.' },
      { version: 'v2.0', date: '10/01/2026', changes: 'Migração para compatibilidade nativa com Revit 2026 e exportação IFC 4x3.' },
      { version: 'v1.0', date: '04/05/2025', changes: 'Lançamento da família paramétrica geométrica básica.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Família Paramétrica BIM: Paver Intertravado 16 Faces (ABNT NBR 9781:2013). Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-BIM-PAV-001. Versão 2.1.',
    desc: 'Família paramétrica completa contendo padronização dimensional (200x100x60mm), propriedades térmicas, rugosidade superficial, parâmetros de carbono incorporado (LCA/ACV) e propriedades mecânicas (fck ≥ 35 MPa) integradas para cálculo BIM 5D/6D.',
    specText: 'Pavimento intertravado constituído por blocos maciços de compósito polimérico circular de alta densidade VIRA, geometria 16 faces holandês autobloqueante, espessura 60 mm, dimensões nominais 200 × 100 mm, resistência característica à compressão fck ≥ 35 MPa (ABNT NBR 9781:2013), absorção de água inferior a 0,05%, assentado sobre colchão de areia grossa e juntas seladas com areia fina de sílica.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-CAD-PAV-002', 'VIRA-LAB-PAV-003', 'VIRA-MEM-PAV-004', 'VIRA-ACV-ALL-010', 'VIRA-TEX-ALL-008'],
    relatedProductAnchor: 'index.html#materiais'
  },
  {
    id: 'VIRA-CAD-PAV-002',
    engineeringId: 'VIRA-CAD-PAV-002',
    title: 'Detalhamento Executivo CAD: Cortes, Guias e Encontros de Paver',
    category: 'cad',
    categoryLabel: 'Desenhos Técnicos (DWG)',
    solution: 'paver',
    solutionTitle: 'Pavimentação Urbana & Praças (Paver 16 Faces)',
    materialLabel: 'Paver 16 Faces',
    format: 'DWG / DXF',
    size: '4.8 MB',
    version: 'v2.4',
    lastUpdate: '10/08/2026',
    license: 'Livre para Projetos de Infraestrutura',
    norm: 'ABNT NBR 9781 / NBR 9050:2020',
    software: 'AutoCAD 2018+, AutoCAD Civil 3D, MicroStation',
    technicalLead: {
      name: 'Arq. Camila Vasconcelos',
      crea: 'CAU-PE A12984-2',
      role: 'Especialista em Acessibilidade & Detalhamento Urbano',
      email: 'projetos@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2.4', date: '10/08/2026', changes: 'Inclusão de detalhes de transição para piso tátil conforme NBR 9050 atualizada.' },
      { version: 'v2.0', date: '14/02/2026', changes: 'Novos cortes de drenagem com sarjetas de concreto pré-moldado.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Detalhamento Executivo CAD: Cortes, Guias e Encontros de Paver. Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-CAD-PAV-002. Versão 2.4.',
    desc: 'Prancha executiva com detalhes típicos em escala 1:10 e 1:20: subleito compactado, sub-base graduada, camada de assentamento, contenções laterais de concreto/polímero, declividades transversais para drenagem pluvial e detalhes de piso tátil integrado (NBR 9050).',
    specText: 'Execução de pavimento intertravado de compósito polimérico VIRA conforme projeto executivo. Espessura de colchão de areia de assentamento: 30 a 50 mm descompactado. Contenções laterais em guias pré-moldadas ou perfis poliméricos estruturais VIRA 80x80 fixados com estacas metálicas a cada 1,50 m.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-BIM-PAV-001', 'VIRA-LAB-PAV-003', 'VIRA-MEM-PAV-004'],
    relatedProductAnchor: 'index.html#aplicacoes'
  },
  {
    id: 'VIRA-LAB-PAV-003',
    engineeringId: 'VIRA-LAB-PAV-003',
    title: 'Laudo Laboratorial Auditado: Compressão Axial, Abrasão e Absorção',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    solution: 'paver',
    solutionTitle: 'Pavimentação Urbana & Praças (Paver 16 Faces)',
    materialLabel: 'Paver 16 Faces',
    format: 'PDF Certificado',
    size: '1.9 MB',
    version: '2026.2',
    lastUpdate: '28/07/2026',
    license: 'Documento Público Certificado ICP-Brasil',
    norm: 'ABNT NBR 9781:2013 / IPT Ensaio 1.104.921',
    software: 'Leitor PDF / ICP-Brasil Validador',
    technicalLead: {
      name: 'Dr. Roberto Mendonça, Ph.D.',
      crea: 'CREA-PE 019482-D',
      role: 'Responsável Técnico de Laboratório de Ensaios Físico-Mecânicos',
      email: 'lab@projetovira.com.br'
    },
    versionHistory: [
      { version: '2026.2', date: '28/07/2026', changes: 'Ensaio lote semestral com compressão média axial aferida de 38,2 MPa.' },
      { version: '2026.1', date: '15/01/2026', changes: 'Ensaio inicial de homologação de linha industrial em Caruaru-PE.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Laudo Laboratorial Auditado: Compressão Axial, Abrasão e Absorção de Pavers (ABNT NBR 9781:2013). Caruaru: VIRA Lab / IPT, 2026. Doc: VIRA-LAB-PAV-003.',
    desc: 'Ensaio laboratorial acreditado comprovando: Resistência média à compressão axial de 38,2 MPa (excedendo o mínimo de 35 MPa para tráfego pesado); Desgaste por abrasão de 0,82 mm; Absorção de água nula (< 0,05%); Resistência a ciclos de gelo/degelo e imersão em solução salina a 5%.',
    specText: 'Laudo de Conformidade Técnica Laboratorial emitido segundo as diretrizes de ensaio da ABNT NBR 9781:2013. Amostras ensaiadas demonstraram resistência à compressão fck superior a 35,0 MPa, ausência de eflorescência superficial e imunidade à degradação por cloretos.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
    relatedDocumentIds: ['VIRA-BIM-PAV-001', 'VIRA-MEM-PAV-004', 'VIRA-ACV-ALL-010'],
    relatedProductAnchor: 'index.html#especificacao'
  },
  {
    id: 'VIRA-MEM-PAV-004',
    engineeringId: 'VIRA-MEM-PAV-004',
    title: 'Memorial Descritivo Padronizado para Licitações Públicas (Lei 14.133)',
    category: 'memorial',
    categoryLabel: 'Memoriais para Licitação',
    solution: 'paver',
    solutionTitle: 'Pavimentação Urbana & Praças (Paver 16 Faces)',
    materialLabel: 'Paver 16 Faces',
    format: 'DOCX / PDF',
    size: '840 KB',
    version: 'v2026.3',
    lastUpdate: '02/09/2026',
    license: 'Uso Livre para Editais e Termos de Referência',
    norm: 'Lei Federal 14.133/2021 (Art. 11 e Art. 34)',
    software: 'Microsoft Word, LibreOffice Writer, Adobe Acrobat',
    technicalLead: {
      name: 'Dra. Vanessa Cavalcanti',
      crea: 'OAB-PE 38.912 / Consultoria Regulatória',
      role: 'Consultora Jurídica de Contratações Públicas Sustentáveis',
      email: 'licitacoes@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2026.3', date: '02/09/2026', changes: 'Adequação ao Guia de Compras Públicas Sustentáveis da AGU 2026.' },
      { version: 'v2026.1', date: '20/02/2026', changes: 'Elaboração inicial das cláusulas de rastreabilidade digital e DPP.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Memorial Descritivo Padronizado para Licitações Públicas de Pavimentação Sustentável. Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-MEM-PAV-004.',
    desc: 'Texto técnico e jurídico pronto para inclusão em termos de referência de editais de obras públicas municipais e estaduais, fundamentado nos critérios de sustentabilidade e compras públicas circulares da Lei Federal 14.133/2021.',
    specText: 'Item Orçamentário: Fornecimento e assentamento de pavimento intertravado de base circular polimérica sustentável (NBR 9781), espessura 60 mm, com garantia decenal contra deformações plásticas, acompanhado de Passaporte Digital de Produto (DPP) com laudo de rastreabilidade de resíduo pós-consumo.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
    relatedDocumentIds: ['VIRA-BIM-PAV-001', 'VIRA-LAB-PAV-003', 'VIRA-CAD-PAV-002', 'VIRA-ACV-ALL-010'],
    relatedProductAnchor: 'index.html#contato'
  },
  {
    id: 'VIRA-BIM-PNL-005',
    engineeringId: 'VIRA-BIM-PNL-005',
    title: 'Objeto BIM Revit: Painel Arquitetônico 15mm para Fachadas Ventiladas',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    solution: 'painel',
    solutionTitle: 'Fachadas Ventiladas & Arquitetura (Painel 15mm)',
    materialLabel: 'Painel Plano 15mm',
    format: 'RVT / IFC',
    size: '11.5 MB',
    version: 'v2.0',
    lastUpdate: '20/08/2026',
    license: 'Uso Profissional Restrito',
    norm: 'ABNT NBR 15575 / NBR 10821',
    software: 'Revit 2021 a 2026, Archicad 24+',
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Diretor de Engenharia de Aplicação & Modelagem BIM',
      email: 'especificacao@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2.0', date: '20/08/2026', changes: 'Modelagem paramétrica de montantes de alumínio e juntas automáticas de 4mm.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Objeto BIM: Painel Arquitetônico 15mm para Fachadas Ventiladas. Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-BIM-PNL-005.',
    desc: 'Componente paramétrico de painel para fachadas ventiladas, brises e divisórias. Inclui cálculo de juntas de dilatação de 4mm, subestrutura de fixação em montantes de alumínio e propriedades acústicas de atenuação ponderada.',
    specText: 'Revestimento de fachada ventilada ou fechamento arquitetônico através de painéis maciços VIRA de compósito circular polimérico de 15 mm de espessura, dimensões 2440 × 1220 mm, aditivação UV-50+ anti-envelhecimento, módulo de elasticidade 1.450 MPa e resistência ao impacto de corpo mole classe 5 (NBR 15575).',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-CAD-PNL-006', 'VIRA-TEX-ALL-008', 'VIRA-ACV-ALL-010'],
    relatedProductAnchor: 'index.html#materiais'
  },
  {
    id: 'VIRA-CAD-PNL-006',
    engineeringId: 'VIRA-CAD-PNL-006',
    title: 'Detalhamento CAD: Fixação Oculta em Esquadrias e Brises de Fachada',
    category: 'cad',
    categoryLabel: 'Desenhos Técnicos (DWG)',
    solution: 'painel',
    solutionTitle: 'Fachadas Ventiladas & Arquitetura (Painel 15mm)',
    materialLabel: 'Painel Plano 15mm',
    format: 'DWG / DXF',
    size: '3.6 MB',
    version: 'v1.8',
    lastUpdate: '14/08/2026',
    license: 'Livre para Projetistas',
    norm: 'ABNT NBR 15575:2021',
    software: 'AutoCAD 2018+, Vectorworks, BricsCAD',
    technicalLead: {
      name: 'Arq. Camila Vasconcelos',
      crea: 'CAU-PE A12984-2',
      role: 'Especialista em Fachadas Ventiladas',
      email: 'projetos@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v1.8', date: '14/08/2026', changes: 'Atualização das presilhas em aço inoxidável 304 e cálculo de carga de vento.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Detalhamento CAD: Fixação Oculta em Fachadas Ventiladas. Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-CAD-PNL-006.',
    desc: 'Detalhamento de sistemas de fixação invisível com inserts metálicos em aço inoxidável 304, esquadrias de sustentação, pingadeiras superiores e encontros com esquadrias.',
    specText: 'Subestrutura em perfis T e L de alumínio extrudado liga 6063-T5 ancorados na estrutura principal de concreto por chumbadores químicos. Painéis VIRA fixados com presilhas mecânicas ocultas e fitas estruturais de dupla face de alta adesão.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-BIM-PNL-005', 'VIRA-TEX-ALL-008'],
    relatedProductAnchor: 'index.html#materiais'
  },
  {
    id: 'VIRA-BIM-PRF-007',
    engineeringId: 'VIRA-BIM-PRF-007',
    title: 'Família BIM Estrutural: Perfil Maciço 80×80 para Decks e Pergolados',
    category: 'bim',
    categoryLabel: 'Modelos BIM (Revit/IFC)',
    solution: 'perfil',
    solutionTitle: 'Estruturas & Decks Públicos (Perfil 80×80)',
    materialLabel: 'Perfil 80×80',
    format: 'RVT / IFC',
    size: '9.8 MB',
    version: 'v2.2',
    lastUpdate: '11/08/2026',
    license: 'Uso Profissional Restrito',
    norm: 'Cálculo Estrutural NBR 7190 (adaptado)',
    software: 'Revit 2021 a 2026, Robot Structural Analysis',
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Diretor de Engenharia Estrutural',
      email: 'especificacao@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2.2', date: '11/08/2026', changes: 'Tabelas de vãos máximos admisíveis de até 1,80 m sem deformação excessiva.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Família BIM Estrutural: Perfil Maciço 80×80. Caruaru: Centro de Especificação VIRA, 2026. Doc: VIRA-BIM-PRF-007.',
    desc: 'Vigas e colunas lineares maciças com propriedades de inércia geométrica, módulo de ruptura à flexão de 38,5 MPa e coeficientes de expansão térmica calibrados para cálculo de vãos de até 1,80 m sem flecha perceptível.',
    specText: 'Perfis estruturais maciços VIRA de seção quadrada 80 × 80 mm em compósito polimérico industrial de alta densidade, resistente à intempérie marinha e imunidade absoluta a cupins e fungos xilófagos, utilizados como barrotes estruturais para decks elevados e pergolados urbanos.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-TEX-ALL-008', 'VIRA-ACV-ALL-010'],
    relatedProductAnchor: 'index.html#materiais'
  },
  {
    id: 'VIRA-TEX-ALL-008',
    engineeringId: 'VIRA-TEX-ALL-008',
    title: 'Pack PBR Maps 4K: Shaders Realistas (Albedo, Normal, Roughness, AO)',
    category: 'pbr',
    categoryLabel: 'Mapas PBR & Texturas 4K',
    solution: 'geral',
    solutionTitle: 'Biblioteca Geral de Visualização Arquitetônica',
    materialLabel: 'Todas as Linhas',
    format: 'ZIP 4K Maps',
    size: '68.4 MB',
    version: 'v2026.1',
    date: '05/08/2026',
    lastUpdate: '05/08/2026',
    license: 'Uso Livre para Renderização e Apresentações de Projeto',
    norm: 'PBR Physically Based Rendering Standard',
    software: '3ds Max, V-Ray, Corona, Lumion, Twinmotion, Blender, Enscape',
    technicalLead: {
      name: 'AR Mídias Integradas / Design 3D',
      crea: 'Design & Tecnologia Oficial',
      role: 'Estúdio de Visualização Arquitetônica e Computação Gráfica',
      email: 'contato@armidias.com.br'
    },
    versionHistory: [
      { version: 'v2026.1', date: '05/08/2026', changes: 'Texturas seamless escaneadas em fotogrametria com mapa de rugosidade linear.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Texturas PBR 4K para Renderização Arquitetônica de Materiais Circulares. Caruaru: AR Mídias / VIRA, 2026. Doc: VIRA-TEX-ALL-008.',
    desc: 'Mapas de textura contínua (seamless) sem repetição visível calibrados a partir de escaneamento fotogramétrico dos pavers e painéis VIRA em alta resolução (4096 × 4096 px), incluindo mapas de cor (BaseColor), rugosidade (Roughness), relevo (Normal DirectX/OpenGL) e oclusão de ambiente (AO).',
    specText: 'Shaders e materiais realistas calibrados para renderização arquitetônica foto-realista (ArchViz) com reflectância física correta das misturas poliméricas minerais cinza grafite, concreto e ocre.',
    downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
    relatedDocumentIds: ['VIRA-BIM-PAV-001', 'VIRA-BIM-PNL-005', 'VIRA-BIM-PRF-007'],
    relatedProductAnchor: 'index.html#materiais'
  },
  {
    id: 'VIRA-MAT-RES-009',
    engineeringId: 'VIRA-MAT-RES-009',
    title: 'Boletim Técnico Reológico & Ensaio RoHS: Composto VIRA-HD',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    solution: 'insumo',
    solutionTitle: 'Indústria Transformadora & Polímeros (Composto VIRA-HD)',
    materialLabel: 'Composto VIRA-HD',
    format: 'PDF Técnico',
    size: '1.4 MB',
    version: 'v2026.2',
    lastUpdate: '22/08/2026',
    license: 'Boletim Técnico de Homologação Industrial',
    norm: 'ASTM D1238 / ISO 1133 / Diretiva RoHS 2011/65/UE',
    software: 'Leitor PDF',
    technicalLead: {
      name: 'Dr. Roberto Mendonça, Ph.D.',
      crea: 'CREA-PE 019482-D',
      role: 'Responsável Técnico de Laboratório de Ensaios Reológicos',
      email: 'lab@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2026.2', date: '22/08/2026', changes: 'Laudo de pureza polimérica comprovando ≥ 99,4% isento de contaminantes metálicos.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Boletim Técnico Reológico e Certificação RoHS do Composto VIRA-HD. Caruaru: VIRA Lab, 2026. Doc: VIRA-MAT-RES-009.',
    desc: 'Boletim técnico completo para indústrias transformadoras contendo curva reológica de viscosidade, ensaio de índice de fluidez MFI (190°C/2.16kg), análise termogravimétrica (TGA), densidade por imersão (0,955 g/cm³) e laudo de isenção de metais pesados (RoHS).',
    specText: 'Composto polimérico termoplástico reciclado VIRA-HD micronizado, base PEAD/PP, granulometria regular 3mm, índice de fluidez 2,4 g/10min, pureza polimérica mínima 99,4%, fornecido em Big Bags de 1.000 kg paletizados com laudo de lote assinado.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
    relatedDocumentIds: ['VIRA-LAB-PAV-003', 'VIRA-ACV-ALL-010'],
    relatedProductAnchor: 'index.html#como-funciona'
  },
  {
    id: 'VIRA-ACV-ALL-010',
    engineeringId: 'VIRA-ACV-ALL-010',
    title: 'Estudo de ACV de Descarbonização: Fator Auditado de -2,15 kg CO2e / kg',
    category: 'laudo',
    categoryLabel: 'Laudos Laboratoriais (ABNT)',
    solution: 'geral',
    solutionTitle: 'Governança Ambiental & Métricas ESG (Todas as Linhas)',
    materialLabel: 'Todas as Linhas',
    format: 'PDF Certificado',
    size: '2.8 MB',
    version: 'v2026.1',
    lastUpdate: '18/08/2026',
    license: 'Laudo de Conformidade Pública ESG',
    norm: 'ABNT NBR ISO 14040:2009 e ISO 14044:2009',
    software: 'Leitor PDF',
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Coordenador de Avaliação de Ciclo de Vida',
      email: 'esg@projetovira.com.br'
    },
    versionHistory: [
      { version: 'v2026.1', date: '18/08/2026', changes: 'Relatório consolidado Cradle-to-Gate do complexo fabril de Caruaru-PE.' }
    ],
    citation: 'VIRA ENGENHARIA CIRCULAR. Avaliação do Ciclo de Vida (ACV) e Fatores de Descarbonização da Infraestrutura Circular. Caruaru: VIRA Lab, 2026. Doc: VIRA-ACV-ALL-010.',
    desc: 'Estudo de Análise de Ciclo de Vida do berço ao portão (Cradle-to-Gate) demonstrando a pegada negativa de carbono dos artefatos VIRA. Cada tonelada de compósito produzido evita 2,15 toneladas de emissão de CO2e quando comparado ao processamento de resinas virgens de nafta de petróleo.',
    specText: 'Relatório de Avaliação do Ciclo de Vida elaborado conforme as normas ABNT NBR ISO 14040 e 14044. O balanço energético e de emissões auditado valida o crédito de carbono evitado de 2,15 kg CO2e/kg nos memoriais de sustentabilidade.',
    downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
    relatedDocumentIds: ['VIRA-BIM-PAV-001', 'VIRA-LAB-PAV-003', 'VIRA-MEM-PAV-004'],
    relatedProductAnchor: 'index.html#impacto'
  }
];

// --------------------------------------------------------
// CONTROLADOR DO CENTRO DE ESPECIFICAÇÃO
// --------------------------------------------------------
let activeNavMode = 'solution'; // 'solution' ou 'category'
let selectedSolution = 'all';
let selectedCategory = 'all';
let currentSearchQuery = '';

function initEngineeringCenter() {
  const container = document.getElementById('engineering-grid');
  const countBadge = document.getElementById('assets-count');
  const searchInput = document.getElementById('search-input');
  const modeButtons = document.querySelectorAll('[data-nav-mode]');
  const solutionPills = document.querySelectorAll('[data-solution-filter]');
  const categoryPills = document.querySelectorAll('[data-category-filter]');

  function renderGrid() {
    if (!container) return;

    const filtered = engineeringKnowledgeGraph.filter(item => {
      // Filtro de navegação por intenção/solução
      const matchSol = selectedSolution === 'all' || item.solution === selectedSolution || item.solution === 'geral';
      // Filtro por tipo de ativo
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      // Busca
      const q = currentSearchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        item.title.toLowerCase().includes(q) ||
        item.engineeringId.toLowerCase().includes(q) ||
        item.norm.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.format.toLowerCase().includes(q) ||
        item.materialLabel.toLowerCase().includes(q);

      return matchSol && matchCat && matchSearch;
    });

    if (countBadge) {
      countBadge.innerText = filtered.length;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-4 bg-sand rounded-3xl border border-border-subtle p-8">
          <i data-lucide="search-x" class="w-12 h-12 text-muted mx-auto"></i>
          <h3 class="text-xl font-bold text-graphite">Nenhum ativo técnico localizado no Grafo</h3>
          <p class="text-xs text-muted max-w-md mx-auto">
            Tente remover alguns filtros ou buscar por códigos de engenharia como "VIRA-BIM-PAV-001", "NBR 9781" ou "ACV".
          </p>
          <button onclick="resetAllFilters()" class="vira-btn-primary py-2 px-5 text-xs inline-flex items-center gap-2 mt-2 font-mono">
            <span>Redefinir Filtros</span>
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
      return;
    }

    container.innerHTML = filtered.map(item => {
      return `
        <article class="vira-card flex flex-col justify-between space-y-6 group hover:border-forest/40 transition-all" data-asset-id="${item.id}">
          <div class="space-y-4">
            <!-- Header do Card: Engineering ID e Formato -->
            <div class="flex items-center justify-between gap-3 border-b border-black/5 pb-4">
              <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${getFormatStyle(item.format)}">
                ${item.format}
              </span>
              <span class="font-mono text-xs font-bold text-forest bg-forest/10 px-2 py-0.5 rounded tracking-wide">
                ${item.engineeringId}
              </span>
            </div>

            <!-- Título e Solução -->
            <div class="space-y-1.5">
              <span class="text-[11px] font-mono uppercase text-muted block font-semibold">${item.solutionTitle}</span>
              <h3 class="text-lg font-bold text-graphite leading-snug group-hover:text-forest transition-colors">
                ${item.title}
              </h3>
            </div>

            <p class="text-xs text-muted leading-relaxed line-clamp-3">
              ${item.desc}
            </p>
          </div>

          <!-- Metadados e Ações Primárias (Visualizar -> Copiar -> Baixar) -->
          <div class="space-y-4 pt-4 border-t border-black/5 font-mono text-[11px]">
            <div class="flex items-center justify-between text-muted">
              <span>Norma: <strong class="text-graphite font-semibold">${item.norm.split('/')[0]}</strong></span>
              <span>${item.size}</span>
            </div>

            <div class="grid grid-cols-3 gap-2 pt-1">
              <button onclick="openKnowledgeDrawer('${item.id}')" class="py-2.5 px-2 rounded-xl border border-border-subtle bg-sand hover:bg-white text-graphite text-xs font-semibold flex items-center justify-center gap-1 transition-colors" title="Visualizar Ficha & Grafo de Conexões">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>Ficha</span>
              </button>

              <button onclick="quickCopySpec('${item.id}')" class="py-2.5 px-2 rounded-xl border border-forest/20 bg-forest/5 hover:bg-forest/15 text-forest text-xs font-semibold flex items-center justify-center gap-1 transition-colors" title="Copiar memorial com 1 clique">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span>Memorial</span>
              </button>

              <a href="${item.downloadUrl}" download class="py-2.5 px-2 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors" title="Download do arquivo">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Baixar</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
    }
  }

  function getFormatStyle(fmt) {
    if (fmt.includes('RVT')) return 'bg-forest/15 text-forest border border-forest/20';
    if (fmt.includes('DWG')) return 'bg-ochre/15 text-ochre border border-ochre/20';
    if (fmt.includes('PDF')) return 'bg-graphite/10 text-graphite border border-graphite/15';
    if (fmt.includes('DOCX')) return 'bg-blue-600/10 text-blue-700 border border-blue-600/15';
    return 'bg-sand text-muted border border-border-subtle';
  }

  // Alternador de Modo de Navegação (Intenção vs Tipo de Arquivo)
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => {
        b.classList.remove('bg-graphite', 'text-white', 'active');
        b.classList.add('text-muted');
      });
      btn.classList.remove('text-muted');
      btn.classList.add('bg-graphite', 'text-white', 'active');
      activeNavMode = btn.getAttribute('data-nav-mode');

      const solPanel = document.getElementById('solution-filters-panel');
      const catPanel = document.getElementById('category-filters-panel');

      if (activeNavMode === 'solution') {
        if (solPanel) solPanel.classList.remove('hidden');
        if (catPanel) catPanel.classList.add('hidden');
      } else {
        if (solPanel) solPanel.classList.add('hidden');
        if (catPanel) catPanel.classList.remove('hidden');
      }
      renderGrid();
    });
  });

  // Filtros por Solução
  solutionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      solutionPills.forEach(p => {
        p.classList.remove('bg-forest', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      });
      pill.classList.remove('text-muted', 'bg-white');
      pill.classList.add('bg-forest', 'text-white', 'active');
      selectedSolution = pill.getAttribute('data-solution-filter');
      renderGrid();
    });
  });

  // Filtros por Categoria
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('bg-graphite', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      });
      pill.classList.remove('text-muted', 'bg-white');
      pill.classList.add('bg-graphite', 'text-white', 'active');
      selectedCategory = pill.getAttribute('data-category-filter');
      renderGrid();
    });
  });

  // Busca
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderGrid();
    });
  }

  // Atalhos Rápidos no Topo
  window.filterByShortcut = function(category) {
    selectedCategory = category;
    selectedSolution = 'all';
    activeNavMode = 'category';

    modeButtons.forEach(b => {
      if (b.getAttribute('data-nav-mode') === 'category') {
        b.classList.add('bg-graphite', 'text-white', 'active');
        b.classList.remove('text-muted');
      } else {
        b.classList.remove('bg-graphite', 'text-white', 'active');
        b.classList.add('text-muted');
      }
    });

    const solPanel = document.getElementById('solution-filters-panel');
    const catPanel = document.getElementById('category-filters-panel');
    if (solPanel) solPanel.classList.add('hidden');
    if (catPanel) catPanel.classList.remove('hidden');

    categoryPills.forEach(p => {
      if (p.getAttribute('data-category-filter') === category) {
        p.classList.add('bg-graphite', 'text-white', 'active');
        p.classList.remove('text-muted', 'bg-white');
      } else {
        p.classList.remove('bg-graphite', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      }
    });

    const target = document.getElementById('engineering-grid');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    renderGrid();
  };

  window.resetAllFilters = function() {
    selectedSolution = 'all';
    selectedCategory = 'all';
    currentSearchQuery = '';
    if (searchInput) searchInput.value = '';

    solutionPills.forEach(p => {
      if (p.getAttribute('data-solution-filter') === 'all') {
        p.classList.add('bg-forest', 'text-white', 'active');
        p.classList.remove('text-muted', 'bg-white');
      } else {
        p.classList.remove('bg-forest', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      }
    });

    categoryPills.forEach(p => {
      if (p.getAttribute('data-category-filter') === 'all') {
        p.classList.add('bg-graphite', 'text-white', 'active');
        p.classList.remove('text-muted', 'bg-white');
      } else {
        p.classList.remove('bg-graphite', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      }
    });

    renderGrid();
  };

  // Suporte a Deep Linking via Parâmetros de URL (?solution=paver, ?category=bim, ?asset=VIRA-BIM-PAV-001)
  const urlParams = new URLSearchParams(window.location.search);
  const paramSolution = urlParams.get('solution');
  const paramCategory = urlParams.get('category');
  const paramAsset = urlParams.get('asset');
  const hash = window.location.hash.replace('#', '');

  if (paramSolution && ['paver', 'painel', 'perfil', 'insumo'].includes(paramSolution)) {
    selectedSolution = paramSolution;
    activeNavMode = 'solution';
    solutionPills.forEach(p => {
      if (p.getAttribute('data-solution-filter') === paramSolution) {
        p.classList.add('bg-forest', 'text-white', 'active');
        p.classList.remove('text-muted', 'bg-white');
      } else {
        p.classList.remove('bg-forest', 'text-white', 'active');
        p.classList.add('text-muted', 'bg-white');
      }
    });
  } else if (paramCategory && ['bim', 'cad', 'laudo', 'memorial', 'pbr'].includes(paramCategory)) {
    filterByShortcut(paramCategory);
  }

  renderGrid();

  const targetAssetId = paramAsset || (hash.startsWith('asset-') ? hash.replace('asset-', '') : (hash.startsWith('VIRA-') ? hash : null));
  if (targetAssetId) {
    setTimeout(() => {
      openKnowledgeDrawer(targetAssetId);
    }, 150);
  }
}

// --------------------------------------------------------
// DRAWER DE GOVERNANÇA TÉCNICA & GRAFO DE CONHECIMENTO
// --------------------------------------------------------
function openKnowledgeDrawer(assetId) {
  const asset = engineeringKnowledgeGraph.find(a => a.id === assetId);
  if (!asset) return;

  const backdrop = document.getElementById('asset-drawer-backdrop');
  const panel = document.getElementById('asset-drawer-panel');

  // Metadados Principais
  document.getElementById('drawer-eng-id').innerText = asset.engineeringId;
  document.getElementById('drawer-format').innerText = asset.format;
  document.getElementById('drawer-title').innerText = asset.title;
  document.getElementById('drawer-version').innerText = asset.version;
  document.getElementById('drawer-date').innerText = asset.lastUpdate;
  document.getElementById('drawer-norm').innerText = asset.norm;
  document.getElementById('drawer-license').innerText = asset.license;
  document.getElementById('drawer-software').innerText = asset.software;
  document.getElementById('drawer-size').innerText = asset.size;
  document.getElementById('drawer-desc').innerText = asset.desc;
  document.getElementById('drawer-spectext').value = asset.specText;
  document.getElementById('drawer-download-btn').href = asset.downloadUrl;

  // Índice de Confiança & Autoridade (Governança V2.1)
  const downloadsEl = document.getElementById('drawer-downloads');
  const citationsEl = document.getElementById('drawer-citations');
  if (downloadsEl) downloadsEl.innerText = asset.trustIndex ? asset.trustIndex.downloads : '427';
  if (citationsEl) citationsEl.innerText = asset.trustIndex ? asset.trustIndex.citations : '18';

  // Responsável Técnico (ART / CREA)
  document.getElementById('drawer-rt-name').innerText = asset.technicalLead.name;
  document.getElementById('drawer-rt-crea').innerText = asset.technicalLead.crea;
  document.getElementById('drawer-rt-role').innerText = asset.technicalLead.role;
  document.getElementById('drawer-rt-email').innerText = asset.technicalLead.email;
  document.getElementById('drawer-rt-email').href = `mailto:${asset.technicalLead.email}?subject=[Engineering Hub VIRA] Consulta Tecnica sobre ${asset.engineeringId}`;

  // Citação em Norma ABNT NBR 6023
  document.getElementById('drawer-citation-text').innerText = asset.citation;

  // Histórico de Versões & Governança (Changelog Auditável)
  const histContainer = document.getElementById('drawer-version-history');
  if (histContainer && asset.versionHistory) {
    histContainer.innerHTML = asset.versionHistory.map(v => {
      const author = v.author || asset.technicalLead.name;
      const status = v.status || 'Homologado';
      return `
        <div class="py-2.5 border-b border-black/5 text-xs font-mono space-y-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-black/5 text-graphite font-bold">${v.version}</span>
              <span class="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-forest/10 text-forest">${status}</span>
            </div>
            <span class="text-muted text-[10px]">${v.date}</span>
          </div>
          <p class="text-graphite text-[11px] leading-tight">${v.changes}</p>
          <span class="text-[10px] text-muted block">Responsável: ${author}</span>
        </div>
      `;
    }).join('');
  }

  // Grafo de Documentos Relacionados
  const relatedContainer = document.getElementById('drawer-related-docs');
  if (relatedContainer && asset.relatedDocumentIds) {
    const relatedItems = engineeringKnowledgeGraph.filter(item => asset.relatedDocumentIds.includes(item.id));
    relatedContainer.innerHTML = relatedItems.map(rel => {
      return `
        <div onclick="openKnowledgeDrawer('${rel.id}')" class="p-3 bg-white hover:bg-sand rounded-xl border border-border-subtle cursor-pointer transition-all flex items-center justify-between gap-3 group">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[10px] text-forest font-bold">${rel.engineeringId}</span>
              <span class="text-[10px] font-mono text-muted uppercase">• ${rel.format}</span>
            </div>
            <h4 class="text-xs font-semibold text-graphite group-hover:text-forest transition-colors line-clamp-1">${rel.title}</h4>
          </div>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-muted group-hover:text-forest transition-colors shrink-0"></i>
        </div>
      `;
    }).join('');
  }

  // Abre o Painel
  if (backdrop && panel) {
    backdrop.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

function closeKnowledgeDrawer() {
  const backdrop = document.getElementById('asset-drawer-backdrop');
  const panel = document.getElementById('asset-drawer-panel');
  if (backdrop) backdrop.classList.remove('open');
  if (panel) panel.classList.remove('open');
  document.body.style.overflow = '';
}

// Copiador Rápido de Memorial (no Card)
function quickCopySpec(assetId) {
  const asset = engineeringKnowledgeGraph.find(a => a.id === assetId);
  if (!asset) return;

  navigator.clipboard.writeText(asset.specText).then(() => {
    showGlobalToast(`✓ Memorial de ${asset.engineeringId} copiado para a área de transferência!`);
  });
}

// Copiador do Drawer
function copyDrawerSpec() {
  const specText = document.getElementById('drawer-spectext').value;
  navigator.clipboard.writeText(specText).then(() => {
    const feedback = document.getElementById('copy-spec-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 3500);
    }
  });
}

// Copiador de Citação ABNT NBR 6023
function copyCitation() {
  const citationText = document.getElementById('drawer-citation-text').innerText;
  navigator.clipboard.writeText(citationText).then(() => {
    const feedback = document.getElementById('copy-citation-feedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 3500);
    }
  });
}

// Toast Global
function showGlobalToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-[9999] bg-graphite-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl font-mono text-xs border border-white/10 transition-all duration-300';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 4000);
}

// Suporte a ESC para fechar gaveta
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeKnowledgeDrawer();
  }
});
