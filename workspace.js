// ========================================================
// VIRA OS — KNOWLEDGE ENGINE & WORKSPACE (workspace.js)
// Motor Unificado de Especificação de Engenharia Circular
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initWorkspace();
});

// --------------------------------------------------------
// BASE DE DADOS INTEGRADA DE ENGENHARIA (KNOWLEDGE ENGINE)
// --------------------------------------------------------
const workspaceData = {
  paver: {
    id: 'paver',
    name: 'Paver Intertravado 16 Faces',
    category: 'Pavimentação Urbana & Praças',
    code: 'VRA-PAV-2026',
    badge: 'Infraestrutura Viária',
    tagline: 'Pavimentação Holandesa Autobloqueante para Tráfego Pesado (fck ≥ 35 MPa)',
    material: 'Compósito Polimérico Circular de Alta Densidade (PEAD/PP) e Cargas Minerais Inertes',
    dimensions: '200 × 100 × 60 mm (± 2 mm)',
    weight: '1,85 kg / bloco (~18,5 kg / m² instalado)',
    status: 'Homologado',
    trustIndex: {
      rating: '5.0 / 5.0',
      stars: '★★★★★',
      downloads: 427,
      citations: 18,
      projectsExecuted: 34
    },
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Diretor de Engenharia de Aplicação & Modelagem BIM',
      email: 'marcelo.albuquerque@projetovira.com.br'
    },
    connectedAssets: {
      bim: 'VIRA-BIM-PAV-001',
      cad: 'VIRA-CAD-PAV-002',
      lab: 'VIRA-LAB-PAV-003',
      mem: 'VIRA-MEM-PAV-004',
      acv: 'VIRA-ACV-ALL-010',
      tex: 'VIRA-TEX-ALL-008'
    },
    citation: 'VIRA ENGENHARIA CIRCULAR. Caderno Técnico de Especificação: Paver Intertravado 16 Faces (ABNT NBR 9781:2013). Caruaru: VIRA Engineering Hub™, 2026. Versão 2.1.',
    specText: 'Pavimento intertravado constituído por blocos maciços de compósito polimérico circular de alta densidade VIRA, geometria 16 faces holandês autobloqueante, espessura 60 mm, dimensões nominais 200 × 100 mm, resistência característica à compressão axial fck ≥ 35 MPa (ABNT NBR 9781:2013), absorção de água inferior a 0,05%, assentado sobre colchão de areia média/grossa de 3 a 5 cm e juntas travadas com areia fina de sílica. Produto acompanhado de Passaporte Digital de Produto (DPP) e Declaração de ACV (ISO 14044) com abatimento comprovado de 2,15 kg CO2e/kg.',
    
    // Conteúdo Modular das 13 Visões Unificadas
    views: {
      overview: {
        headline: 'Visão Geral & Parâmetros Dimensionais',
        summary: 'Artefato maciço de engenharia circular desenvolvido para substituir diretamente paralelepípedos e pavers cimentícios convencionais em vias públicas municipais, calçadões de alto fluxo de pedestres e pátios de manobra industrial. Não esfarela superficialmente, dissipa o calor com albedo superior ao asfalto e possui imunidade absoluta contra intempéries marinhas.',
        keyMetrics: [
          { label: 'Resistência Axial (fck)', val: '≥ 35.0 MPa', note: 'Excede ABNT NBR 9781' },
          { label: 'Absorção de Água', val: '< 0.05%', note: 'Impermeável / Sem Eflorescência' },
          { label: 'Índice de Albedo Solar', val: 'SRI 42', note: 'Mitiga Ilhas Urbanas de Calor' },
          { label: 'Garantia Estrutural', val: '10 Anos', note: 'Conttra Deformações Plásticas' }
        ],
        image: 'assets/foto-institucional-pavers-cinza.avif'
      },
      specs: {
        headline: 'Quadro Completo de Ensaios Laboratoriais',
        description: 'Propriedades mecânicas e físico-químicas aferidas em laboratórios de ensaios tecnológicos acreditados conforme normas ABNT e ASTM.',
        table: [
          { prop: 'Resistência Característica à Compressão Axial (fck)', val: '38,2 MPa (Média do Lote)', norm: 'ABNT NBR 9781', status: 'Conforme' },
          { prop: 'Absorção de Água por Imersão Total (24h)', val: '< 0,042% (Nula)', norm: 'ABNT NBR 9781', status: 'Conforme' },
          { prop: 'Desgaste Superficial por Abrasão (Roda de Piche)', val: '0,82 mm de desgaste', norm: 'ABNT NBR 12042', status: 'Excelente' },
          { prop: 'Resistência ao Escorregamento Úmido / Seco', val: 'BPN 68 (Excelente aderência)', norm: 'ASTM E303', status: 'Conforme NBR 9050' },
          { prop: 'Variação Dimensional sob Ciclos Térmicos (-10°C a +80°C)', val: '± 0,15% reversível', norm: 'ASTM D696', status: 'Estável' },
          { prop: 'Comportamento frente a Óleos, Graxas e Cloretos', val: 'Zero degradação química', norm: 'ASTM D543', status: 'Imune' },
          { prop: 'Módulo de Elasticidade Tangencial', val: '1.620 MPa', norm: 'ASTM D790', status: 'Homologado' }
        ]
      },
      applications: {
        headline: 'Diretrizes Executivas de Infraestrutura Urbana',
        description: 'Enquadramentos de carga e recomendações para projetos de vias públicas, praças e áreas industriais.',
        items: [
          {
            title: 'Vias Urbanas e Corredores Comerciais (Tráfego Comercial Médio e Pesado)',
            text: 'Recomendado para leitos carroçáveis com tráfego contínuo de ônibus e caminhões urbanos (Volume Diário Médio > 100 veículos comerciais). O encaixe em 16 faces garante travamento tridimensional e impede deslocamentos rotacionais sob frenagem pesada.',
            subgrade: 'Subleito compactado (98% PN), sub-base de brita graduada tratada (BGT) de 15 cm e colchão de assentamento de 4 cm.'
          },
          {
            title: 'Calçadões, Praças Públicas e Parques Urbanos',
            text: 'Permite paginações contínuas e decorativas, integração nativa de faixas de piso tátil direcional/alerta (NBR 9050) e juntas drenantes que auxiliam na recarga de aquíferos sem poças.',
            subgrade: 'Base de brita 1 compactada de 10 cm e areia média de 3 cm.'
          },
          {
            title: 'Orlas Marítimas, Portos e Ambientes com Alta Salinidade',
            text: 'Substituto ideal para artefatos de concreto em orlas, onde a penetração de íons cloreto oxida armaduras e degrada agregados cimentícios. O compósito polimérico VIRA possui absorção nula e é 100% inerte à maresia.',
            subgrade: 'Sub-base drenante em rachão ou brita grossa para contenção de maré.'
          }
        ]
      },
      standards: {
        headline: 'Conformidade Regulatória & Enquadramento Normativo',
        description: 'Normas técnicas oficiais da ABNT e parâmetros internacionais atendidos pelo Paver 16 Faces.',
        list: [
          { code: 'ABNT NBR 9781:2013', name: 'Peças de concreto para pavimentação — Determinação da resistência à compressão e absorção de água', role: 'Norma Primária de Referência Mecânica' },
          { code: 'ABNT NBR 9050:2020', name: 'Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos', role: 'Requisitos de Rampa, Desníveis e Aderência Antiderrapante' },
          { code: 'ABNT NBR 15953:2011', name: 'Pavimento intertravado com peças de concreto — Execução', role: 'Procedimentos Executivos de Obra e Compactação' },
          { code: 'ABNT NBR ISO 14044:2009', name: 'Gestão ambiental — Avaliação do ciclo de vida — Requisitos e orientações', role: 'Homologação da Pegada de Carbono Negativa' },
          { code: 'Lei Federal 14.133/2021', name: 'Nova Lei de Licitações e Contratos Administrativos (Art. 11, IV e Art. 34)', role: 'Enquadramento em Compras Públicas Sustentáveis' }
        ]
      },
      bim: {
        headline: 'Modelagem Paramétrica BIM (Revit & IFC)',
        code: 'VIRA-BIM-PAV-001',
        software: 'Autodesk Revit 2021 a 2026, ArchiCAD 25+, Navisworks, Solibri',
        size: '14.2 MB',
        version: 'v2.1 (Homologado)',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Família paramétrica completa com tipologias em 16 faces, propriedades físicas (resistência à compressão 35 MPa, densidade 0,96 g/cm³, condutividade térmica 0,22 W/m.K, albedo 0,42) e parâmetros COBie/IFC para dimensionamento 5D (custo) e 6D (sustentabilidade/ACV).',
        parameters: [
          { param: 'OmniClass', val: '23-13 31 19 11 (Unit Paving)' },
          { param: 'IFC Class', val: 'IfcPaving / IfcCovering' },
          { param: 'Carbono Incorporado (LCA)', val: '-2.15 kg CO2e / kg' },
          { param: 'Resistência fck', val: '35 MPa' },
          { param: 'Junta Nominal', val: '3.0 mm paramétrica' }
        ]
      },
      cad: {
        headline: 'Detalhamento Executivo CAD (Pranchas DWG)',
        code: 'VIRA-CAD-PAV-002',
        software: 'AutoCAD 2018+, AutoCAD Civil 3D, MicroStation, BricsCAD',
        size: '4.8 MB',
        version: 'v2.4 (Homologado)',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Pranchas executivas prontas para incorporação em projetos viários e urbanísticos em escala 1:10 e 1:20: cortes estratigráficos de pavimentação, subleito, contenções de concreto e guias poliméricas VIRA 80x80, canaletas de drenagem e encontro com caixas de inspeção.',
        sheets: [
          { name: 'PR-01: Corte Típico em Leito Viário de Tráfego Pesado (Escala 1:20)' },
          { name: 'PR-02: Detalhamento de Transição com Guia Pré-Moldada e Sarjeta (Escala 1:10)' },
          { name: 'PR-03: Integração de Faixas de Piso Tátil Alerta e Direcional NBR 9050 (Escala 1:10)' },
          { name: 'PR-04: Paginações em Espinha de Peixe a 45° e 90° com travamento (Escala 1:25)' }
        ]
      },
      lab: {
        headline: 'Laudo Laboratorial Auditado (IPT)',
        code: 'VIRA-LAB-PAV-003',
        institute: 'Instituto de Pesquisas Tecnológicas (IPT) / VIRA Lab',
        protocol: 'Ensaio nº 1.104.921-A / Lote 2026.2',
        certification: 'ICP-Brasil Digital Signature Verified',
        size: '1.9 MB',
        version: '2026.2',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        summary: 'Ensaio de caracterização mecânica à compressão axial estática em corpo de prova maciço. Resultado médio de 38,2 MPa com desvio padrão inferior a 1,1 MPa em 20 amostras ensaiadas. Ausência total de trincas por fadiga higrotérmica e taxa de absorção de água de 0,038%.',
        table: [
          { sample: 'CP-01 a CP-05', axialLoad: '458 kN', stress: '38,1 MPa', ruptureMode: 'Sem esmagamento frágil' },
          { sample: 'CP-06 a CP-10', axialLoad: '462 kN', stress: '38,5 MPa', ruptureMode: 'Sem esmagamento frágil' },
          { sample: 'CP-11 a CP-15', axialLoad: '454 kN', stress: '37,8 MPa', ruptureMode: 'Sem esmagamento frágil' },
          { sample: 'CP-16 a CP-20', axialLoad: '461 kN', stress: '38,4 MPa', ruptureMode: 'Sem esmagamento frágil' }
        ]
      },
      lca: {
        headline: 'Avaliação de Ciclo de Vida (ACV) & Pegada de Carbono',
        code: 'VIRA-ACV-ALL-010',
        factor: '-2.15 kg CO2e / kg de compósito instalado',
        scope: 'Cradle-to-Gate (Berço ao Portão de Fábrica)',
        norm: 'ABNT NBR ISO 14040:2009 e ISO 14044:2009',
        size: '2.8 MB',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        narrative: 'A cada 1.000 m² de pavimento intertravado VIRA 16 Faces assentado, 18,5 toneladas de resíduo plástico pós-consumo são definitivamente desviadas de aterros sanitários e corpos hídricos, evitando a emissão de 39,7 toneladas de CO2 equivalente frente à extração e refino de matérias-primas virgens de petróleo e clínquer cimentício.',
        benchmarks: [
          { material: 'Paver Intertravado VIRA', footprint: '-2.15 kg CO2e/kg', badge: 'Negativo (Crédito)' },
          { material: 'Paver de Concreto Tradicional', footprint: '+0.85 kg CO2e/kg', badge: 'Emissor' },
          { material: 'Asfalto Betuminoso CBUQ', footprint: '+1.42 kg CO2e/kg', badge: 'Alto Emissor' }
        ]
      },
      cases: {
        headline: 'Obras Executadas & Estudos de Caso',
        description: 'Registros de intervenções urbanas implantadas com monitoramento contínuo de durabilidade e desempenho.',
        casesList: [
          {
            city: 'Recife — PE',
            location: 'Orla Urbana e Calçadão Comercial (Setor Sul)',
            area: '4.200 m²',
            impact: '77,7 t de plástico regenerado • 167 t CO2e mitigadas',
            year: '2025/2026',
            status: 'Em Operação Contínua (18 meses)',
            notes: 'Exposição direta a maresia marítima agressiva. Monitoramento visual apontou zero descoloração, ausência total de eflorescência branca e integridade das juntas sem poças.'
          },
          {
            city: 'Caruaru — PE',
            location: 'Pátio de Carga e Manobra do Polo Industrial',
            area: '2.800 m²',
            impact: '51,8 t de plástico regenerado • 111 t CO2e mitigadas',
            year: '2026',
            status: 'Tráfego Pesado (Carretas Bitrem)',
            notes: 'Piso submetido a manobras em raio curto de empilhadeiras e carretas com 45 toneladas de PBTC. Desgaste superficial nulo e sem trilhas de roda.'
          },
          {
            city: 'Caruaru — PE',
            location: 'Parque Urbano Ambiental da Criança',
            area: '1.500 m²',
            impact: '27,7 t de plástico regenerado • 59 t CO2e mitigadas',
            year: '2025',
            status: 'Espaço Público de Alto Fluxo',
            notes: 'Paginação multicolorida (cinza grafite e ocre) com ilhas de drenagem natural e rampas de acessibilidade 100% em conformidade com a NBR 9050.'
          }
        ]
      },
      academy: {
        headline: 'VIRA Academy — Manual de Boas Práticas & Execução',
        description: 'Diretrizes técnicas para engenheiros de campo, encarregados de pavimentação e fiscais de contratos públicos.',
        steps: [
          {
            num: '01',
            title: 'Preparo e Compactação do Subleito',
            text: 'O subleito deve ser regularizado com caimento transversal mínimo de 2% para drenagem subsuperficial e compactado até atingir 98% da densidade máxima do ensaio Proctor Normal.'
          },
          {
            num: '02',
            title: 'Camada de Assentamento (Colchão de Areia)',
            text: 'Espalhar camada uniforme de areia média ou grossa lavada com espessura descompactada de 30 a 50 mm. A areia deve ser isenta de argila ou matéria orgânica.'
          },
          {
            num: '03',
            title: 'Assentamento das Peças e Travamento',
            text: 'Iniciar o assentamento a partir da guia de contenção em padrão espinha de peixe (45° ou 90°), mantendo juntas de 2 a 3 mm entre peças. Utilizar martelo de borracha para ajustes de alinhamento.'
          },
          {
            num: '04',
            title: 'Compactação Inicial e Selagem das Juntas',
            text: 'Executar a primeira passada com placa vibratória (mínimo 16 a 20 kN) equipada com base plástica de proteção. Espalhar areia fina de sílica seca sobre o pavimento e varrer até o preenchimento total das juntas.'
          }
        ]
      },
      faq: {
        headline: 'FAQ Técnico & Respaldo para Comissões de Licitação',
        description: 'Respostas fundamentadas para dúvidas recorrentes de engenheiros calculistas e procuradorias municipais.',
        faqs: [
          {
            q: 'Como especificar o Paver VIRA em editais públicos da Lei 14.133/2021 sem direcionar a concorrência?',
            a: 'A especificação deve ser orientada estritamente por desempenho e critérios ambientais previstos nos Arts. 11 e 34 da Lei 14.133. Deve-se exigir: bloco intertravado para pavimentação com fck ≥ 35 MPa (NBR 9781), comprovação de origem circular pós-consumo com rastreabilidade de cadeia (Passaporte Digital de Produto) e estudo de ACV (ISO 14044) comprovando emissão evitada.'
          },
          {
            q: 'O compósito polimérico sofre deformação plástica em dias de calor extremo no Nordeste?',
            a: 'Não. O composto VIRA é submetido a termocompressão com aditivação de reforço mineral inerte, elevando o ponto de amolecimento térmico Vicat para além de 128°C. A temperatura superficial de pavimentos no Brasil raramente ultrapassa 65°C em picos de verão.'
          },
          {
            q: 'Qual a vantagem financeira real em 10 anos frente ao concreto convencional?',
            a: 'Além do custo de instalação competitivo, o paver circular não sofre corrosão química, eflorescência salina ou desgaste por cloretos. Intervenções em redes subterrâneas (água/esgoto/energia) permitem remoção e recolocação de 100% dos blocos sem necessidade de quebra ou remendo asfáltico, gerando economia de até 65% em manutenção preditiva.'
          }
        ]
      },
      downloads: {
        headline: 'Downloads Estruturados & Pacotes Executivos',
        description: 'Todos os ativos técnicos homologados disponíveis para download imediato em alta resolução.',
        files: [
          { name: 'Pacote Completo de Especificação Paver 16 Faces (.ZIP)', format: 'ZIP', size: '28.4 MB', desc: 'Contém Famílias Revit, Pranchas DWG, Laudo IPT, Memorial Lei 14.133 e Texturas PBR 4K', url: 'assets/downloads/VIRA_Brand_Assets_Pack.zip', primary: true },
          { name: 'Família Paramétrica BIM Revit 2026 (.RVT/.IFC)', format: 'RVT', size: '14.2 MB', desc: 'Objeto BIM com cálculo 5D/6D e propriedades térmicas integradas', url: 'assets/downloads/VIRA_Brand_Assets_Pack.zip' },
          { name: 'Pranchas de Detalhamento Executivo CAD (.DWG/.DXF)', format: 'DWG', size: '4.8 MB', desc: '4 pranchas executivas em corte 1:10 e 1:20 com piso tátil', url: 'assets/downloads/VIRA_Brand_Assets_Pack.zip' },
          { name: 'Laudo de Ensaio Mecânico à Compressão Axial (.PDF)', format: 'PDF', size: '1.9 MB', desc: 'Laudo IPT nº 1.104.921 comprovando fck médio de 38,2 MPa', url: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf' },
          { name: 'Memorial Descritivo para Licitação Lei 14.133 (.DOCX)', format: 'DOCX', size: '840 KB', desc: 'Minuta técnica e jurídica pronta para termos de referência', url: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf' },
          { name: 'Estudo de Análise de Ciclo de Vida ACV ISO 14044 (.PDF)', format: 'PDF', size: '2.8 MB', desc: 'Relatório Cradle-to-Gate do complexo fabril de Caruaru', url: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf' }
        ]
      },
      support: {
        headline: 'Suporte Técnico Direto & Emissão de ART',
        description: 'Canal consultivo exclusivo para projetistas, secretarias de obras e comissões de contratação pública.',
        lead: {
          name: 'Eng. Marcelo Albuquerque, M.Sc.',
          crea: 'CREA-PE 048291-D',
          role: 'Diretor de Engenharia de Aplicação & Suporte ao Especificador',
          email: 'marcelo.albuquerque@projetovira.com.br',
          phone: '+55 (81) 3721-0000',
          plant: 'Complexo Industrial de Caruaru — Pernambuco'
        }
      }
    }
  },

  painel: {
    id: 'painel',
    name: 'Painel Arquitetônico 15mm',
    category: 'Fachadas Ventiladas & Divisórias',
    code: 'VRA-PNL-1204',
    badge: 'Fachadas & Arquitetura',
    tagline: 'Placas Termoprensadas de Alta Rigidez e Proteção UV-50+ (NBR 15575)',
    material: 'Compósito Polimérico Circular Reforçado com Cargas Minerais',
    dimensions: '2440 × 1220 × 15 mm (± 1 mm)',
    weight: '14,4 kg / m²',
    status: 'Homologado',
    trustIndex: {
      rating: '5.0 / 5.0',
      stars: '★★★★★',
      downloads: 312,
      citations: 14,
      projectsExecuted: 22
    },
    technicalLead: {
      name: 'Arq. Camila Vasconcelos',
      crea: 'CAU-PE A12984-2',
      role: 'Especialista em Fachadas Ventiladas & Conforto Térmico',
      email: 'camila.vasconcelos@projetovira.com.br'
    },
    connectedAssets: {
      bim: 'VIRA-BIM-PNL-005',
      cad: 'VIRA-CAD-PNL-006',
      acv: 'VIRA-ACV-ALL-010',
      tex: 'VIRA-TEX-ALL-008'
    },
    citation: 'VIRA ENGENHARIA CIRCULAR. Caderno Técnico: Painel Arquitetônico 15mm para Fachadas Ventiladas. Caruaru: VIRA Engineering Hub™, 2026. Versão 2.0.',
    specText: 'Revestimento de fachada ventilada ou fechamento arquitetônico através de painéis maciços VIRA de compósito circular polimérico de 15 mm de espessura, dimensões 2440 × 1220 mm, aditivação UV-50+ anti-envelhecimento, módulo de elasticidade 1.450 MPa e resistência ao impacto de corpo mole classe 5 (NBR 15575). Fixação oculta em montantes de alumínio liga 6063-T5 e presilhas em aço inox 304.',
    views: {
      overview: {
        headline: 'Visão Geral: Painel Arquitetônico 15mm',
        summary: 'Placas arquitetônicas rígidas de grande formato produzidas por termocompressão contínua em Caruaru-PE. Projetadas para sistemas de fachadas ventiladas, brises solares e divisórias corporativas de alta durabilidade sem necessidade de pintura periódica.',
        keyMetrics: [
          { label: 'Espessura Nominal', val: '15 mm', note: 'Também em 10mm e 20mm' },
          { label: 'Proteção Ultravioleta', val: 'UV-50+', note: 'Cura molecular 10 anos' },
          { label: 'Módulo de Elasticidade', val: '1.450 MPa', note: 'Elevada Rigidez' },
          { label: 'Impacto Corpo Mole', val: 'Classe 5', note: 'ABNT NBR 15575' }
        ],
        image: 'assets/produto-paver-prensa.avif'
      },
      specs: {
        headline: 'Ensaios Físicos e Mecânicos da Placa',
        description: 'Laudos de caracterização mecânica segundo as diretrizes de desempenho da norma ABNT NBR 15575.',
        table: [
          { prop: 'Resistência à Flexão Estática', val: '24,0 MPa', norm: 'ASTM D790', status: 'Conforme' },
          { prop: 'Densidade Aparente', val: '0,96 g/cm³', norm: 'ASTM D792', status: 'Homologado' },
          { prop: 'Absorção de Umidade (24h)', val: '< 0,08%', norm: 'ASTM D570', status: 'Imune' },
          { prop: 'Comportamento ao Fogo (Reação)', val: 'Classe B-s1,d0 (Auto-extinguível)', norm: 'NBR 14432', status: 'Aprovado' }
        ]
      },
      applications: {
        headline: 'Aplicações em Fachadas e Brises',
        description: 'Fachadas ventiladas corporativas, escolas públicas e hospitais municipais.',
        items: [
          { title: 'Fachada Ventilada com Câmara de Ar', text: 'Cria colchão térmico convectivo que reduz o ganho de calor solar em até 35%, aliviando o consumo de climatização artificial.' },
          { title: 'Brises-Soleil e Elementos de Sombreamento', text: 'Perfis e placas recortadas a laser para proteção solar passiva.' }
        ]
      },
      standards: {
        headline: 'Normas Aplicáveis',
        description: 'Enquadramento normativo para envoltórias de edifícios.',
        list: [
          { code: 'ABNT NBR 15575:2021', name: 'Edificações habitacionais — Desempenho (Sistemas de Vedações Verticais)', role: 'Segurança Estrutural e Impacto' },
          { code: 'ABNT NBR 10821', name: 'Esquadrias para edificações', role: 'Cargas de Vento e Estanqueidade' }
        ]
      },
      bim: {
        headline: 'Objeto BIM Revit (Painel Arquitetônico)',
        code: 'VIRA-BIM-PNL-005',
        software: 'Autodesk Revit 2021+, ArchiCAD 24+',
        size: '11.5 MB',
        version: 'v2.0',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Família de cortina e painéis paramétricos com juntas de dilatação de 4mm e montantes de alumínio automáticos.',
        parameters: [
          { param: 'Modulação Padrão', val: '2440 × 1220 mm' },
          { param: 'Atenuação Acústica', val: 'Rw 28 dB' }
        ]
      },
      cad: {
        headline: 'Detalhamento CAD: Fixação Oculta',
        code: 'VIRA-CAD-PNL-006',
        software: 'AutoCAD 2018+',
        size: '3.6 MB',
        version: 'v1.8',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Detalhamento de presilhas ocultas de aço inoxidável 304 e pingadeiras superiores.',
        sheets: [{ name: 'PR-01: Corte Vertical de Fachada Ventilada e Ancoragens (Escala 1:10)' }]
      },
      lab: {
        headline: 'Laudo de Impacto e Envelhecimento UV',
        code: 'VIRA-LAB-PAV-003',
        institute: 'IPT / VIRA Lab',
        protocol: 'Relatório nº 892.401',
        certification: 'Acreditado ABNT',
        size: '1.6 MB',
        version: '2026.1',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        summary: 'Ensaio de impacto de corpo mole com esfera de 40 kg (energia de impacto 720 J) sem ruptura ou fissuração da placa.',
        table: [{ sample: 'Painel 15mm #1 a #5', axialLoad: '720 J Impacto', stress: 'Sem Dano', ruptureMode: 'Classe 5 NBR 15575' }]
      },
      lca: {
        headline: 'Métricas de Sustentabilidade & ACV',
        code: 'VIRA-ACV-ALL-010',
        factor: '-2.15 kg CO2e / kg',
        scope: 'Cradle-to-Gate',
        norm: 'ISO 14044',
        size: '2.8 MB',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        narrative: 'Painéis que substituem o ACM (alumínio composto) convencional, eliminando a pegada fóssil do alumínio primário.',
        benchmarks: [
          { material: 'Painel VIRA 15mm', footprint: '-2.15 kg CO2e/kg', badge: 'Crédito' },
          { material: 'Painel ACM Convencional', footprint: '+5.80 kg CO2e/kg', badge: 'Alto Emissor' }
        ]
      },
      cases: {
        headline: 'Casos Reais de Fachada',
        description: 'Projetos institucionais e educacionais.',
        casesList: [
          { city: 'Caruaru — PE', location: 'Edifício Tecnológico do Agreste', area: '1.800 m²', impact: '26 t de resíduo regenerado', year: '2025', status: 'Concluído', notes: 'Conforto térmico aferido com redução média de 4°C no ambiente interno.' }
        ]
      },
      academy: {
        headline: 'Guia de Montagem de Fachadas Ventiladas',
        description: 'Passo a passo de fixação e alinhamento.',
        steps: [
          { num: '01', title: 'Ancoragem dos Perfis T de Alumínio', text: 'Fixar os suportes reguláveis na estrutura de concreto com chumbadores químicos.' },
          { num: '02', title: 'Instalação das Presilhas Ocultas', text: 'Fixar os inserts mecânicos na face posterior dos painéis VIRA.' }
        ]
      },
      faq: {
        headline: 'FAQ Fachadas Ventiladas',
        description: 'Dúvidas estruturais.',
        faqs: [
          { q: 'O painel pode ser cortado na obra?', a: 'Sim, pode ser usinado com ferramentas padrão de marcenaria e serralheria (serras com dentes de widea).' }
        ]
      },
      downloads: {
        headline: 'Downloads Painel Arquitetônico',
        description: 'Pacotes para arquitetura e cálculo.',
        files: [
          { name: 'Pacote Completo Painel 15mm (.ZIP)', format: 'ZIP', size: '19.8 MB', desc: 'BIM, CAD, Laudo e Texturas', url: 'assets/downloads/VIRA_Brand_Assets_Pack.zip', primary: true }
        ]
      },
      support: {
        headline: 'Suporte de Fachada com ART',
        description: 'Contato direto com a arquiteta responsável.',
        lead: {
          name: 'Arq. Camila Vasconcelos',
          crea: 'CAU-PE A12984-2',
          role: 'Especialista em Fachadas Ventiladas',
          email: 'camila.vasconcelos@projetovira.com.br',
          phone: '+55 (81) 3721-0000',
          plant: 'Complexo Industrial de Caruaru — PE'
        }
      }
    }
  },

  perfil: {
    id: 'perfil',
    name: 'Perfil Estrutural Maciço 80×80',
    category: 'Construção Civil & Decks Públicos',
    code: 'VRA-PRF-0142',
    badge: 'Estrutural & Decks',
    tagline: 'Vigas e Colunas Maciças Imunes a Cupins e Maresia (Substituto de Madeira e Aço)',
    material: 'Compósito Polimérico Industrial de Altíssima Densidade',
    dimensions: '80 × 80 mm (Comprimentos 3.000 e 4.000 mm)',
    weight: '6,14 kg / metro linear',
    status: 'Homologado',
    trustIndex: {
      rating: '5.0 / 5.0',
      stars: '★★★★★',
      downloads: 284,
      citations: 11,
      projectsExecuted: 19
    },
    technicalLead: {
      name: 'Eng. Marcelo Albuquerque, M.Sc.',
      crea: 'CREA-PE 048291-D',
      role: 'Diretor de Engenharia Estrutural',
      email: 'marcelo.albuquerque@projetovira.com.br'
    },
    connectedAssets: {
      bim: 'VIRA-BIM-PRF-007',
      acv: 'VIRA-ACV-ALL-010',
      tex: 'VIRA-TEX-ALL-008'
    },
    citation: 'VIRA ENGENHARIA CIRCULAR. Caderno Técnico: Perfil Estrutural Maciço 80x80. Caruaru: VIRA Engineering Hub™, 2026. Versão 2.2.',
    specText: 'Perfis estruturais maciços VIRA de seção quadrada 80 × 80 mm em compósito polimérico industrial de alta densidade, resistente à intempérie marinha e imunidade absoluta a cupins e fungos xilófagos, tensão de ruptura à flexão de 38,5 MPa, utilizados como vigamentos para decks elevados e pergolados urbanos.',
    views: {
      overview: {
        headline: 'Visão Geral: Perfil Maciço 80×80',
        summary: 'Perfis lineares maciços de alta tonelagem para suporte estrutural de decks públicos, píeres e pergolados. Eliminam custos de verniz e reposição frequente da madeira de lei.',
        keyMetrics: [
          { label: 'Seção', val: '80 × 80 mm', note: 'Maciço Integral' },
          { label: 'Carga de Ruptura', val: '38.5 MPa', note: 'Flexão Estática' },
          { label: 'Imunidade Biológica', val: '100% Imune', note: 'Zero Pragas e Cupins' },
          { label: 'Garantia', val: '15 Anos', note: 'Áreas Externas' }
        ],
        image: 'assets/maquinario-matriz-prensa.avif'
      },
      specs: {
        headline: 'Propriedades Estruturais',
        description: 'Cálculo para vãos e flechas máximas admissíveis.',
        table: [
          { prop: 'Módulo de Ruptura à Flexão', val: '38,5 MPa', norm: 'ASTM D790', status: 'Homologado' },
          { prop: 'Momento de Inércia (Ix = Iy)', val: '341 cm⁴', norm: 'Geometria', status: 'Conforme' },
          { prop: 'Absorção de Água em Submersão', val: '< 0,02%', norm: 'ASTM D570', status: 'Zero Inchaço' }
        ]
      },
      applications: {
        headline: 'Infraestrutura Externa e Orlas',
        description: 'Estruturas expostas a umidade contínua e maresia.',
        items: [
          { title: 'Decks de Orla e Passadiços em Manguezais', text: 'Imunidade à podridão marinha e fungos marinhos.' },
          { title: 'Pergolados e Mobiliário Urbano Antivandalismo', text: 'Alta resistência a impacto e fácil higienização.' }
        ]
      },
      standards: {
        headline: 'Normas Aplicáveis',
        description: 'Parâmetros de cálculo estrutural.',
        list: [
          { code: 'ABNT NBR 7190 (Adaptada)', name: 'Projeto de estruturas de madeira (Parâmetros comparativos)', role: 'Cálculo de Vigamento e Flechas' }
        ]
      },
      bim: {
        headline: 'Família BIM Estrutural Revit',
        code: 'VIRA-BIM-PRF-007',
        software: 'Revit 2021 a 2026, Robot Structural',
        size: '9.8 MB',
        version: 'v2.2',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Perfis com propriedades de rigidez e vãos admissíveis de até 1,80 m sem flecha excessiva.',
        parameters: [{ param: 'Seção Transversal', val: '80 × 80 mm' }]
      },
      cad: {
        headline: 'Pranchas CAD DWG',
        code: 'VIRA-CAD-PAV-002',
        software: 'AutoCAD 2018+',
        size: '3.8 MB',
        version: 'v2.0',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Encontros estruturais com parafusos de aço inox e sapatas metálicas.',
        sheets: [{ name: 'PR-01: Detalhe de Ancoragem de Pilares em Fundação (Escala 1:10)' }]
      },
      lab: {
        headline: 'Laudo Mecânico de Flexão e Ruptura',
        code: 'VIRA-LAB-PAV-003',
        institute: 'IPT / VIRA Lab',
        protocol: 'Relatório nº 744.102',
        certification: 'ICP-Brasil',
        size: '1.4 MB',
        version: '2026.1',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        summary: 'Ensaio de flexão em 3 pontos com vão de 1,50 m. Ruptura atingida em 38,5 MPa.',
        table: [{ sample: 'Perfil 80x80 #1', axialLoad: '28,4 kN', stress: '38,5 MPa', ruptureMode: 'Dúctil' }]
      },
      lca: {
        headline: 'Impacto Ambiental e Descarbonização',
        code: 'VIRA-ACV-ALL-010',
        factor: '-2.15 kg CO2e / kg',
        scope: 'Cradle-to-Gate',
        norm: 'ISO 14044',
        size: '2.8 MB',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        narrative: 'Evita a derrubada de árvores nativas para vigamentos de madeira de lei.',
        benchmarks: [
          { material: 'Perfil VIRA 80x80', footprint: '-2.15 kg CO2e/kg', badge: 'Crédito' }
        ]
      },
      cases: {
        headline: 'Casos Executados',
        description: 'Instalações públicas em parques e orlas.',
        casesList: [
          { city: 'Tamandaré — PE', location: 'Passadiço Ecológico de Acesso à Praia', area: '450 metros', impact: '12 t de plástico desviado', year: '2025', status: 'Imune à Maré Alta', notes: 'Zero degradação por caranguejos e água salgada.' }
        ]
      },
      academy: {
        headline: 'Guia de Fixação e Parafusamento',
        description: 'Orientações de furação e fixação.',
        steps: [
          { num: '01', title: 'Pré-furação', text: 'Executar pré-furo com broca de diâmetro correspondente a 80% do parafuso para evitar tensões concentradas.' }
        ]
      },
      faq: {
        headline: 'FAQ Perfil Estrutural',
        description: 'Dúvidas de montagem.',
        faqs: [
          { q: 'Pode receber parafusos comuns?', a: 'Recomenda-se o uso de parafusos autobrocantes em aço inoxidável 304 ou 316.' }
        ]
      },
      downloads: {
        headline: 'Downloads do Perfil 80×80',
        description: 'Arquivos técnicos.',
        files: [
          { name: 'Pacote Perfil 80×80 (.ZIP)', format: 'ZIP', size: '15.2 MB', desc: 'BIM, CAD e Laudo', url: 'assets/downloads/VIRA_Brand_Assets_Pack.zip', primary: true }
        ]
      },
      support: {
        headline: 'Suporte Estrutural',
        description: 'Dimensionamento de vãos.',
        lead: {
          name: 'Eng. Marcelo Albuquerque, M.Sc.',
          crea: 'CREA-PE 048291-D',
          role: 'Diretor de Engenharia Estrutural',
          email: 'marcelo.albuquerque@projetovira.com.br',
          phone: '+55 (81) 3721-0000',
          plant: 'Complexo Industrial de Caruaru — PE'
        }
      }
    }
  },

  insumo: {
    id: 'insumo',
    name: 'Composto Micronizado VIRA-HD',
    category: 'Matéria-Prima Circular Industrial',
    code: 'VRA-MAT-RES-009',
    badge: 'Polímero Circular',
    tagline: 'Resina Termoplástica Micronizada de Alta Fluidez para Injeção e Extrusão Industrial',
    material: 'Blends Selecionados de PEAD e PP Pós-Consumo Micronizados',
    dimensions: 'Granulometria Regular 2,5 a 4,0 mm',
    weight: 'Big Bags de 1.000 kg paletizados',
    status: 'Homologado',
    trustIndex: {
      rating: '5.0 / 5.0',
      stars: '★★★★★',
      downloads: 195,
      citations: 8,
      projectsExecuted: 15
    },
    technicalLead: {
      name: 'Dr. Roberto Mendonça, Ph.D.',
      crea: 'CREA-PE 019482-D',
      role: 'Responsável Técnico de Laboratório de Ensaios Reológicos',
      email: 'lab@projetovira.com.br'
    },
    connectedAssets: {
      lab: 'VIRA-MAT-RES-009',
      acv: 'VIRA-ACV-ALL-010'
    },
    citation: 'VIRA ENGENHARIA CIRCULAR. Boletim Técnico Reológico: Composto Micronizado VIRA-HD. Caruaru: VIRA Engineering Hub™, 2026. Versão 2026.2.',
    specText: 'Composto polimérico termoplástico reciclado VIRA-HD micronizado, base PEAD/PP, granulometria regular 3mm, índice de fluidez 2,4 g/10min, pureza polimérica mínima 99,4%, isenção de metais pesados (Diretiva RoHS 2011/65/UE), fornecido em Big Bags de 1.000 kg com laudo reológico de lote.',
    views: {
      overview: {
        headline: 'Visão Geral: Composto VIRA-HD',
        summary: 'Insumo industrial sustentável para indústrias transformadoras de plástico que buscam descarbonizar suas linhas de injeção, extrusão de dutos ou rotomoldagem de peças técnicas com matéria-prima de alto fluxo e pureza certificada.',
        keyMetrics: [
          { label: 'Índice de Fluidez (MFI)', val: '1.2 a 3.8 g/10min', note: '190°C / 2,16 kg' },
          { label: 'Pureza Polimérica', val: '≥ 99.4%', note: 'Isento de Metais' },
          { label: 'Certificação RoHS', val: 'Aprovado', note: 'Diretiva 2011/65/UE' },
          { label: 'Embalagem', val: 'Big Bags 1.000 kg', note: 'Paletizado e Lacrado' }
        ],
        image: 'assets/materia-flakes-close.avif'
      },
      specs: {
        headline: 'Boletim Reológico e Parâmetros Térmicos',
        description: 'Propriedades de processabilidade industrial.',
        table: [
          { prop: 'MFI (Índice de Fluidez)', val: '2,4 g/10 min', norm: 'ASTM D1238', status: 'Homologado' },
          { prop: 'Densidade por Imersão', val: '0,955 g/cm³', norm: 'ISO 1183', status: 'Estável' },
          { prop: 'Ponto de Fusão (DSC)', val: '128°C a 134°C', norm: 'ASTM D3418', status: 'Conforme' }
        ]
      },
      applications: {
        headline: 'Linhas Industriais Compatíveis',
        description: 'Processamento em linhas convencionais de transformação.',
        items: [
          { title: 'Injeção de Artefatos Técnicos', text: 'Caixas organizadoras, paletes industriais e bases técnicas.' },
          { title: 'Extrusão Contínua de Dutos e Perfis', text: 'Eletrodutos de infraestrutura e perfis arquitetônicos.' }
        ]
      },
      standards: {
        headline: 'Conformidade e Diretivas',
        description: 'Normas de resinas plásticas.',
        list: [
          { code: 'ISO 1133 / ASTM D1238', name: 'Determinação do índice de fluidez mássica de termoplásticos', role: 'Homologação de Processabilidade' },
          { code: 'Diretiva RoHS 2011/65/UE', name: 'Restrição de substâncias perigosas e metais pesados', role: 'Segurança Ambiental e Sanitária' }
        ]
      },
      bim: {
        headline: 'Propriedades do Material para Engenharia',
        code: 'VIRA-MAT-RES-009',
        software: 'Autodesk Moldflow, SolidWorks Plastics',
        size: '1.2 MB',
        version: 'v2026.1',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Tabela de viscosidade e propriedades de contração volumétrica para simulação CAE de molde.',
        parameters: [{ param: 'Contração Volumétrica Típica', val: '1,5% a 2,0%' }]
      },
      cad: {
        headline: 'Desenhos Técnicos',
        code: 'VIRA-MAT-RES-009',
        software: 'PDF / CAD',
        size: '1.0 MB',
        version: 'v1.0',
        downloadUrl: 'assets/downloads/VIRA_Brand_Assets_Pack.zip',
        desc: 'Ficha dimensional de paletização e acondicionamento logístico.',
        sheets: [{ name: 'PR-01: Esquema de Armazenamento e Paletização de Big Bags' }]
      },
      lab: {
        headline: 'Boletim Reológico e Espectrometria',
        code: 'VIRA-MAT-RES-009',
        institute: 'VIRA Lab de Reologia',
        protocol: 'Boletim nº 319.400',
        certification: 'Laudo de Lote Assinado',
        size: '1.4 MB',
        version: 'v2026.2',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        summary: 'Curva de escoamento e taxa de cinzas residuais inferior a 0,5%.',
        table: [{ sample: 'Lote 2026-HD-04', axialLoad: 'MFI 2,4', stress: 'Cinzas < 0,5%', ruptureMode: 'Aprovado' }]
      },
      lca: {
        headline: 'Descarbonização Industrial de Insumos',
        code: 'VIRA-ACV-ALL-010',
        factor: '-2.15 kg CO2e / kg',
        scope: 'Cradle-to-Gate',
        norm: 'ISO 14044',
        size: '2.8 MB',
        downloadUrl: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf',
        narrative: 'Permite que indústrias transformadoras abatam diretamente suas metas de emissões de Escopo 3 no GHG Protocol.',
        benchmarks: [
          { material: 'Composto VIRA-HD', footprint: '-2.15 kg CO2e/kg', badge: 'Crédito' },
          { material: 'Resina Virgem PEAD Fóssil', footprint: '+2.10 kg CO2e/kg', badge: 'Emissor' }
        ]
      },
      cases: {
        headline: 'Homologação Industrial',
        description: 'Fornecimento contínuo para polos fabris.',
        casesList: [
          { city: 'Pernambuco', location: 'Indústria de Caixas e Paletes Logísticos', area: '120 toneladas/mês', impact: '258 t CO2e mitigadas/mês', year: '2026', status: 'Fornecimento Contínuo', notes: 'Zero quebras em máquina injetora ciclo rápido.' }
        ]
      },
      academy: {
        headline: 'Boas Práticas de Processamento',
        description: 'Temperatura e pressão de injeção.',
        steps: [
          { num: '01', title: 'Perfil Térmico Recomendado', text: 'Alimentação a 170°C, zona de compressão a 190°C e bico a 205°C.' }
        ]
      },
      faq: {
        headline: 'FAQ Insumo VIRA-HD',
        description: 'Dúvidas de transformação.',
        faqs: [
          { q: 'É compatível com matrizes de resina virgem?', a: 'Sim, pode ser usado 100% puro ou blocado em blendas com resina virgem.' }
        ]
      },
      downloads: {
        headline: 'Downloads do Composto VIRA-HD',
        description: 'Documentos técnicos.',
        files: [
          { name: 'Ficha Técnica Completa e Boletim Reológico (.PDF)', format: 'PDF', size: '1.4 MB', desc: 'Curvas de fluxo e certificados RoHS', url: 'assets/downloads/VIRA-Manual-de-Identidade-Visual-2026.pdf', primary: true }
        ]
      },
      support: {
        headline: 'Suporte de Engenharia de Materiais',
        description: 'Contato com o laboratório.',
        lead: {
          name: 'Dr. Roberto Mendonça, Ph.D.',
          crea: 'CREA-PE 019482-D',
          role: 'Responsável Técnico de Laboratório de Ensaios Reológicos',
          email: 'lab@projetovira.com.br',
          phone: '+55 (81) 3721-0000',
          plant: 'Complexo Industrial de Caruaru — PE'
        }
      }
    }
  }
};

// --------------------------------------------------------
// ESTADO GLOBAL DO WORKSPACE
// --------------------------------------------------------
let currentSolutionId = 'paver';
let currentTabId = 'overview';
let currentWorkspaceMode = 'solutions'; // 'solutions' | 'projects'
let currentSidebarTab = 'knowledge'; // 'knowledge' | 'ai'
let currentAcademyRole = 'engenheiro'; // 'engenheiro' | 'arquiteto' | 'gestor' | 'fiscal'

// --------------------------------------------------------
// INICIALIZADOR DO WORKSPACE
// --------------------------------------------------------
function initWorkspace() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramMode = urlParams.get('mode');
  const paramSolution = urlParams.get('solution');
  const paramTab = urlParams.get('tab');
  const paramRole = urlParams.get('role');

  if (paramMode === 'projects') {
    currentWorkspaceMode = 'projects';
  }
  if (paramSolution && workspaceData[paramSolution]) {
    currentSolutionId = paramSolution;
  }
  if (paramTab && isValidTab(paramTab)) {
    currentTabId = paramTab;
  }
  if (paramRole && ['engenheiro', 'arquiteto', 'gestor', 'fiscal'].includes(paramRole)) {
    currentAcademyRole = paramRole;
    if (typeof ViraStore !== 'undefined' && ViraStore.userStore) {
      ViraStore.userStore.role = paramRole;
    }
  }

  setupSolutionPickers();
  setupTabNavigation();
  updateWorkspace();
}

function isValidTab(tab) {
  const valid = ['overview', 'specs', 'applications', 'standards', 'bim', 'cad', 'lab', 'lca', 'dpp', 'cases', 'academy', 'faq', 'downloads', 'support'];
  return valid.includes(tab);
}

// --------------------------------------------------------
// MODO OPERACIONAL: SOLUÇÕES VS PROJETOS
// --------------------------------------------------------
function setWorkspaceMode(mode) {
  currentWorkspaceMode = mode;
  updateModeUi();
  updateUrlParams();
  if (mode === 'projects') {
    const solPicker = document.getElementById('ws-solutions-picker-container');
    const tabsBar = document.getElementById('ws-tabs-bar-section');
    if (solPicker) solPicker.classList.add('hidden');
    if (tabsBar) tabsBar.classList.add('hidden');
    renderProjectsCanvas();
  } else {
    const solPicker = document.getElementById('ws-solutions-picker-container');
    const tabsBar = document.getElementById('ws-tabs-bar-section');
    if (solPicker) solPicker.classList.remove('hidden');
    if (tabsBar) tabsBar.classList.remove('hidden');
    updateHeaderMetadata();
    renderMainCanvas();
  }
  renderRelatedKnowledge();
  if (window.lucide) {
    lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

function updateModeUi() {
  const btnSol = document.getElementById('ws-mode-btn-solutions');
  const btnProj = document.getElementById('ws-mode-btn-projects');
  const counter = document.getElementById('ws-projects-counter-badge');
  if (counter && window.projectEngine) {
    counter.innerText = window.projectEngine.getProjects().length;
  }

  if (currentWorkspaceMode === 'solutions') {
    if (btnSol) {
      btnSol.className = 'px-3.5 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 bg-forest text-white font-bold shadow-sm';
    }
    if (btnProj) {
      btnProj.className = 'px-3.5 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 bg-white border-border-subtle text-muted hover:text-graphite';
    }
  } else {
    if (btnSol) {
      btnSol.className = 'px-3.5 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 bg-white border-border-subtle text-muted hover:text-graphite';
    }
    if (btnProj) {
      btnProj.className = 'px-3.5 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 bg-ochre text-white font-bold shadow-sm';
    }
  }
}

function setSidebarTab(tab) {
  currentSidebarTab = tab;
  renderRelatedKnowledge();
}

window.setSidebarTab = setSidebarTab;
window.setWorkspaceMode = setWorkspaceMode;

window.toggleAiPanel = function(force) {
  currentSidebarTab = 'ai';
  renderRelatedKnowledge();
  if (window.innerWidth < 1024) {
    const sidebar = document.getElementById('related-knowledge-container');
    if (sidebar) sidebar.scrollIntoView({ behavior: 'smooth' });
  }
};

// --------------------------------------------------------
// SELETOR DE SOLUÇÕES (TOPO)
// --------------------------------------------------------
function setupSolutionPickers() {
  const buttons = document.querySelectorAll('[data-ws-solution]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sol = btn.getAttribute('data-ws-solution');
      setWorkspaceSolution(sol);
    });
  });
}

function setWorkspaceSolution(solutionId) {
  if (!workspaceData[solutionId] || currentSolutionId === solutionId) return;
  currentSolutionId = solutionId;
  if (currentWorkspaceMode === 'projects') {
    setWorkspaceMode('solutions');
  } else {
    updateUrlParams();
    updateWorkspace();
  }
}

// --------------------------------------------------------
// NAVEGAÇÃO DE ABAS
// --------------------------------------------------------
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll('[data-ws-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-ws-tab');
      setWorkspaceTab(tab);
    });
  });
}

function setWorkspaceTab(tabId) {
  if (!isValidTab(tabId) || currentTabId === tabId) return;
  currentTabId = tabId;
  if (currentWorkspaceMode === 'projects') {
    setWorkspaceMode('solutions');
  }
  updateUrlParams();
  updateTabsUi();
  renderMainCanvas();
  // Scroll suave para o topo do canvas no mobile
  if (window.innerWidth < 1024) {
    const canvas = document.getElementById('workspace-canvas');
    if (canvas) canvas.scrollIntoView({ behavior: 'smooth' });
  }
}

function updateUrlParams() {
  const url = new URL(window.location);
  url.searchParams.set('mode', currentWorkspaceMode);
  if (currentWorkspaceMode === 'solutions') {
    url.searchParams.set('solution', currentSolutionId);
    url.searchParams.set('tab', currentTabId);
    if (currentTabId === 'academy') {
      url.searchParams.set('role', currentAcademyRole);
    } else {
      url.searchParams.delete('role');
    }
  } else {
    url.searchParams.delete('tab');
    url.searchParams.delete('role');
    if (window.projectEngine) {
      url.searchParams.set('proj', window.projectEngine.getActiveProject().id);
    }
  }
  window.history.replaceState({}, '', url);
}

// --------------------------------------------------------
// ATUALIZAÇÃO INTEGRAL DO WORKSPACE
// --------------------------------------------------------
function updateWorkspace() {
  updateModeUi();
  if (currentWorkspaceMode === 'projects') {
    const solPicker = document.getElementById('ws-solutions-picker-container');
    const tabsBar = document.getElementById('ws-tabs-bar-section');
    if (solPicker) solPicker.classList.add('hidden');
    if (tabsBar) tabsBar.classList.add('hidden');
    renderProjectsCanvas();
  } else {
    const solPicker = document.getElementById('ws-solutions-picker-container');
    const tabsBar = document.getElementById('ws-tabs-bar-section');
    if (solPicker) solPicker.classList.remove('hidden');
    if (tabsBar) tabsBar.classList.remove('hidden');
    updateSolutionPickerUi();
    updateHeaderMetadata();
    updateTabsUi();
    renderMainCanvas();
  }
  renderRelatedKnowledge();
  if (window.lucide) {
    lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

function updateSolutionPickerUi() {
  const buttons = document.querySelectorAll('[data-ws-solution]');
  buttons.forEach(btn => {
    const sol = btn.getAttribute('data-ws-solution');
    if (sol === currentSolutionId) {
      btn.classList.add('bg-forest', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-graphite', 'hover:bg-sand');
    } else {
      btn.classList.remove('bg-forest', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'text-graphite', 'hover:bg-sand');
    }
  });
}

function updateHeaderMetadata() {
  const sol = workspaceData[currentSolutionId];
  if (!sol) return;

  const titleEl = document.getElementById('ws-solution-title');
  const codeEl = document.getElementById('ws-solution-code');
  const badgeEl = document.getElementById('ws-solution-badge');
  const taglineEl = document.getElementById('ws-solution-tagline');
  const breadcrumbEl = document.getElementById('ws-breadcrumb-sol');

  if (titleEl) titleEl.innerText = sol.name;
  if (codeEl) codeEl.innerText = sol.code;
  if (badgeEl) badgeEl.innerText = sol.badge;
  if (taglineEl) taglineEl.innerText = sol.tagline;
  if (breadcrumbEl) breadcrumbEl.innerText = sol.name;
}

function updateTabsUi() {
  const tabButtons = document.querySelectorAll('[data-ws-tab]');
  tabButtons.forEach(btn => {
    const tab = btn.getAttribute('data-ws-tab');
    if (tab === currentTabId) {
      btn.classList.add('border-forest', 'text-forest', 'font-bold', 'bg-forest/5');
      btn.classList.remove('border-transparent', 'text-muted', 'hover:text-graphite');
    } else {
      btn.classList.remove('border-forest', 'text-forest', 'font-bold', 'bg-forest/5');
      btn.classList.add('border-transparent', 'text-muted', 'hover:text-graphite');
    }
  });
}

// --------------------------------------------------------
// RENDERIZAÇÃO DO CANVAS PRINCIPAL (A ABA ATIVA)
// --------------------------------------------------------
function renderMainCanvas() {
  const canvas = document.getElementById('workspace-canvas');
  if (!canvas) return;

  const sol = workspaceData[currentSolutionId];
  const view = sol.views[currentTabId];
  if (!view) return;

  let html = '';

  switch (currentTabId) {
    case 'overview':
      html = `
        <div class="space-y-8 animate-fadeIn">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-7 space-y-4">
              <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 01. Visão Geral da Solução</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
              <p class="text-sm text-muted leading-relaxed">${view.summary}</p>
              <div class="pt-2 text-xs font-mono space-y-1.5 text-muted border-t border-border-subtle">
                <p><strong class="text-graphite">Composição:</strong> ${sol.material}</p>
                <p><strong class="text-graphite">Dimensões Nominais:</strong> ${sol.dimensions}</p>
                <p><strong class="text-graphite">Massa Específica:</strong> ${sol.weight}</p>
              </div>
            </div>
            <div class="lg:col-span-5">
              <div class="h-64 sm:h-72 rounded-3xl overflow-hidden border border-border-subtle bg-sand relative shadow-sm">
                <img src="${view.image}" alt="${sol.name}" class="w-full h-full object-cover" />
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold text-forest uppercase">
                  ${sol.code}
                </span>
              </div>
            </div>
          </div>

          <!-- Métricas Chave -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${view.keyMetrics.map(m => `
              <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-1">
                <span class="font-mono text-[10px] uppercase text-muted font-bold block">${m.label}</span>
                <p class="text-xl sm:text-2xl font-bold text-graphite font-mono">${m.val}</p>
                <span class="text-[10px] text-forest font-semibold block">${m.note}</span>
              </div>
            `).join('')}
          </div>

          <!-- Ação Rápida de Especificação -->
          <div class="p-6 bg-forest/5 rounded-3xl border border-forest/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-graphite">Pronto para incorporar ao projeto?</h4>
              <p class="text-xs text-muted">Acesse o memorial padronizado da Lei 14.133 ou baixe as famílias BIM e pranchas CAD.</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="setWorkspaceTab('bim')" class="vira-btn-primary py-2.5 px-4 text-xs font-mono">
                <i data-lucide="layers" class="w-3.5 h-3.5"></i>
                <span>Ver Modelo BIM</span>
              </button>
              <button onclick="copyWorkspaceSpec()" class="vira-btn-outline py-2.5 px-4 text-xs font-mono bg-white">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span>Copiar Memorial</span>
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'specs':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 02. Especificação & Ensaios</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="overflow-x-auto bg-white rounded-2xl border border-border-subtle shadow-sm p-4">
            <table class="w-full text-left font-mono text-xs">
              <thead>
                <tr class="border-b border-black/10 text-muted text-[10px] uppercase">
                  <th class="py-3 px-3">Propriedade Física / Mecânica</th>
                  <th class="py-3 px-3">Valor Aferido em Ensaio</th>
                  <th class="py-3 px-3">Norma Técnica</th>
                  <th class="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-black/5">
                ${view.table.map(row => `
                  <tr>
                    <td class="py-3 px-3 font-medium text-graphite font-sans text-xs">${row.prop}</td>
                    <td class="py-3 px-3 font-bold text-forest">${row.val}</td>
                    <td class="py-3 px-3 text-muted">${row.norm}</td>
                    <td class="py-3 px-3 text-right">
                      <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-bold text-[10px]">${row.status}</span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
      break;

    case 'applications':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 03. Aplicações em Infraestrutura</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${view.items.map((it, idx) => `
              <div class="p-6 bg-sand rounded-3xl border border-border-subtle space-y-3 flex flex-col justify-between">
                <div class="space-y-2">
                  <span class="font-mono text-[10px] text-forest font-bold uppercase">Aplicação 0${idx + 1}</span>
                  <h3 class="text-base font-bold text-graphite">${it.title}</h3>
                  <p class="text-xs text-muted leading-relaxed">${it.text}</p>
                </div>
                ${it.subgrade ? `
                  <div class="p-3 bg-white rounded-xl border border-border-subtle font-mono text-[11px] text-graphite">
                    <span class="text-muted block text-[10px] uppercase font-bold">Sub-base Recomendada:</span>
                    ${it.subgrade}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'standards':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 04. Normas ABNT & ISO</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="space-y-3">
            ${view.list.map(std => `
              <div class="p-4 sm:p-5 bg-sand rounded-2xl border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-1 rounded bg-forest/10 text-forest font-mono text-xs font-bold">${std.code}</span>
                    <span class="text-[11px] font-mono text-muted uppercase">• ${std.role}</span>
                  </div>
                  <p class="text-xs sm:text-sm text-graphite font-medium">${std.name}</p>
                </div>
                <span class="text-xs font-mono text-forest font-bold shrink-0 flex items-center gap-1">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                  Homologada
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'bim':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="p-6 sm:p-8 bg-forest/5 rounded-3xl border border-forest/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded bg-forest text-white font-mono text-xs font-bold">${view.code}</span>
                <span class="font-mono text-xs text-forest font-semibold">${view.version}</span>
              </div>
              <h2 class="text-2xl font-bold text-graphite">${view.headline}</h2>
              <p class="text-xs text-muted max-w-xl">${view.desc}</p>
            </div>
            <a href="${view.downloadUrl}" download class="vira-btn-primary shrink-0 py-3 px-6 text-xs font-mono">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download (.RVT / .IFC)</span>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-2">
              <span class="text-muted block text-[10px] uppercase font-bold">Compatibilidade</span>
              <p class="text-graphite font-semibold">${view.software}</p>
            </div>
            <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-2">
              <span class="text-muted block text-[10px] uppercase font-bold">Tamanho do Arquivo</span>
              <p class="text-graphite font-semibold">${view.size}</p>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="font-mono text-xs uppercase tracking-wider text-graphite font-bold">Parâmetros Incorporados no Objeto BIM (COBie / IFC)</h3>
            <div class="bg-white rounded-2xl border border-border-subtle divide-y divide-black/5 font-mono text-xs">
              ${view.parameters.map(p => `
                <div class="flex items-center justify-between p-3.5">
                  <span class="text-muted">${p.param}</span>
                  <strong class="text-graphite font-semibold">${p.val}</strong>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      break;

    case 'cad':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="p-6 sm:p-8 bg-ochre/5 rounded-3xl border border-ochre/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded bg-ochre text-white font-mono text-xs font-bold">${view.code}</span>
                <span class="font-mono text-xs text-ochre font-semibold">${view.version}</span>
              </div>
              <h2 class="text-2xl font-bold text-graphite">${view.headline}</h2>
              <p class="text-xs text-muted max-w-xl">${view.desc}</p>
            </div>
            <a href="${view.downloadUrl}" download class="vira-btn-primary shrink-0 py-3 px-6 text-xs font-mono bg-ochre hover:bg-ochre-light">
              <i data-lucide="download" class="w-4 h-4"></i>
              <span>Download Pranchas (.DWG)</span>
            </a>
          </div>

          <div class="space-y-3">
            <h3 class="font-mono text-xs uppercase tracking-wider text-graphite font-bold">Pranchas Executivas Inclusas no Pacote</h3>
            <div class="space-y-2">
              ${view.sheets.map((sh, idx) => `
                <div class="p-4 bg-sand rounded-xl border border-border-subtle flex items-center justify-between font-mono text-xs">
                  <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded bg-graphite/10 text-graphite flex items-center justify-center font-bold text-[10px]">0${idx+1}</span>
                    <span class="text-graphite font-semibold">${sh.name}</span>
                  </div>
                  <span class="text-forest text-[11px] font-bold">2D Vector DWG</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      break;

    case 'lab':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="p-6 sm:p-8 bg-graphite text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded bg-forest text-white font-mono text-xs font-bold">${view.code}</span>
                <span class="font-mono text-xs text-white/70">${view.protocol}</span>
              </div>
              <h2 class="text-2xl font-bold">${view.headline}</h2>
              <p class="text-xs text-white/70 max-w-xl font-light">${view.summary}</p>
            </div>
            <a href="${view.downloadUrl}" download class="vira-btn-primary shrink-0 py-3 px-6 text-xs font-mono">
              <i data-lucide="file-check" class="w-4 h-4"></i>
              <span>Baixar Laudo Assinado (.PDF)</span>
            </a>
          </div>

          <div class="space-y-3">
            <h3 class="font-mono text-xs uppercase tracking-wider text-graphite font-bold">Corpos de Prova Ensaiados (Amostragem ABNT NBR 9781)</h3>
            <div class="overflow-x-auto bg-white rounded-2xl border border-border-subtle p-4 font-mono text-xs">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-black/10 text-muted text-[10px] uppercase">
                    <th class="py-2.5 px-3">Amostra</th>
                    <th class="py-2.5 px-3">Carga de Ruptura</th>
                    <th class="py-2.5 px-3">Tensão fck Calculada</th>
                    <th class="py-2.5 px-3 text-right">Comportamento</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-black/5">
                  ${view.table.map(r => `
                    <tr>
                      <td class="py-2.5 px-3 font-semibold text-graphite">${r.sample}</td>
                      <td class="py-2.5 px-3 text-muted">${r.axialLoad}</td>
                      <td class="py-2.5 px-3 font-bold text-forest">${r.stress}</td>
                      <td class="py-2.5 px-3 text-right text-muted">${r.ruptureMode}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
      break;

    case 'lca':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 08. ACV & Descarbonização</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.narrative}</p>
          </div>

          <div class="p-6 bg-sand rounded-3xl border border-border-subtle space-y-4">
            <span class="font-mono text-xs uppercase tracking-wider text-forest font-bold block">Fator de Emissão Evitada (ISO 14044)</span>
            <div class="flex items-baseline gap-3">
              <span class="text-4xl sm:text-5xl font-bold text-forest font-mono">${view.factor}</span>
            </div>
            <p class="text-xs text-muted">Crédito de carbono líquido comprovado por auditoria independente Cradle-to-Gate do complexo de Caruaru-PE.</p>
          </div>

          <!-- Calculadora Instantânea no Workspace -->
          <div class="p-6 bg-white rounded-3xl border border-border-subtle shadow-sm space-y-4">
            <h3 class="text-base font-bold text-graphite">Simulador de Mitigação para a sua Obra</h3>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <label for="ws-calc-area" class="font-mono text-xs text-muted shrink-0">Área de Projeto (m²):</label>
              <input id="ws-calc-area" type="number" value="1000" min="50" max="50000" step="50" class="w-full sm:w-48 p-2.5 bg-sand rounded-xl border border-border-subtle font-mono text-xs font-bold text-graphite focus:outline-none focus:ring-2 focus:ring-forest" oninput="calculateWorkspaceImpact()" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div class="p-4 bg-forest/5 rounded-2xl border border-forest/15">
                <span class="text-[10px] text-muted uppercase font-bold block">Resíduo Plástico Desviado</span>
                <p id="ws-res-plastic" class="text-2xl font-bold text-forest mt-1">18.500 kg</p>
              </div>
              <div class="p-4 bg-ochre/5 rounded-2xl border border-ochre/15">
                <span class="text-[10px] text-muted uppercase font-bold block">Emissões de CO2e Evitadas</span>
                <p id="ws-res-co2" class="text-2xl font-bold text-ochre mt-1">39.775 kg</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'dpp':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• Engine 08. Digital Product Passport (DPP)</span>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">Passaporte Ativo & Homologado</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">Passaporte Digital do Produto</h2>
            <p class="text-xs sm:text-sm text-muted">Painel vivo de rastreabilidade de lote, composição macromolecular, cadeia de custódia e ensaios auditados com certificação ICP-Brasil.</p>
          </div>

          <!-- Grade de Rastreabilidade do DPP -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-2.5">
              <span class="text-[10px] text-forest font-bold uppercase block tracking-wider">Composição Macromolecular & Cargas</span>
              <p class="text-graphite text-xs leading-relaxed font-sans">
                <strong>85% Matriz Polimérica Circular</strong> (PEAD/PP pós-consumo) + <strong>15% Cargas Minerais Inertes</strong> para estabilização dimensional e albedo térmico.
              </p>
              <div class="text-[10px] text-muted pt-1 border-t border-black/5">
                <span>Ponto de Amolecimento Vicat: <strong>> 128°C</strong></span>
              </div>
            </div>

            <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-2.5">
              <span class="text-[10px] text-forest font-bold uppercase block tracking-wider">Origem do Resíduo & Cadeia de Custódia</span>
              <p class="text-graphite text-xs leading-relaxed font-sans">
                Resíduos plásticos regenerados da <strong>Bacia Hidrográfica do Rio Capibaribe</strong> e do Agreste de Pernambuco. Rastreabilidade com Passaporte Digital e compensação socioambiental.
              </p>
              <div class="text-[10px] text-muted pt-1 border-t border-black/5">
                <span>Unidade Industrial: <strong>Polo de Caruaru — PE</strong></span>
              </div>
            </div>
          </div>

          <!-- Matriz de Ensaios & Telemetria do Lote -->
          <div class="p-6 bg-white rounded-3xl border border-border-subtle shadow-sm space-y-4 font-sans text-xs">
            <div class="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 class="font-bold text-sm text-graphite">Inventário de Telemetria e Ensaios Acreditados</h3>
                <p class="text-muted text-xs">Relação de testes tecnológicos auditados para este código de produto.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-forest/10 text-forest font-mono font-bold text-[10px] uppercase">Lote 2026.08-A</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div class="p-3 bg-sand rounded-xl">
                <span class="text-[10px] text-muted uppercase block font-mono">Resistência Axial</span>
                <p class="font-bold text-graphite text-sm">38,2 MPa</p>
                <span class="text-[10px] text-forest font-semibold font-mono">IPT nº 1.104.921-A</span>
              </div>
              <div class="p-3 bg-sand rounded-xl">
                <span class="text-[10px] text-muted uppercase block font-mono">Absorção de Água</span>
                <p class="font-bold text-graphite text-sm">&lt; 0,05%</p>
                <span class="text-[10px] text-forest font-semibold font-mono">Nula / Sem Eflorescência</span>
              </div>
              <div class="p-3 bg-sand rounded-xl">
                <span class="text-[10px] text-muted uppercase block font-mono">Pegada de Carbono</span>
                <p class="font-bold text-forest text-sm">-2,15 kg/kg</p>
                <span class="text-[10px] text-forest font-semibold font-mono">ISO 14044 Homologado</span>
              </div>
            </div>
          </div>

          <!-- Assinatura e QR Code de Autenticidade -->
          <div class="p-6 bg-sand rounded-3xl border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div class="space-y-1">
              <span class="text-[10px] text-muted uppercase block font-bold">Assinatura Digital ICP-Brasil</span>
              <p class="font-bold text-graphite text-sm">${sol.technicalLead.name}</p>
              <p class="text-muted text-xs">${sol.technicalLead.crea} • ${sol.technicalLead.role}</p>
              <p class="text-[10px] text-muted/80">Chave SHA-256: 4a7135c68d2b...90509781</p>
            </div>
            <div class="p-4 bg-white rounded-2xl border border-border-subtle shadow-sm flex items-center gap-3 shrink-0">
              <i data-lucide="qr-code" class="w-10 h-10 text-forest"></i>
              <div class="text-[10px]">
                <span class="font-bold text-graphite block">QR Code Canteiro</span>
                <span class="text-muted">Leitura na face inferior</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'cases':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 09. Obras & Estudos de Caso</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="space-y-4">
            ${view.casesList.map(cs => `
              <div class="p-6 bg-sand rounded-3xl border border-border-subtle space-y-3">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
                  <div>
                    <span class="font-mono text-[10px] text-forest font-bold uppercase">${cs.city}</span>
                    <h3 class="text-lg font-bold text-graphite">${cs.location}</h3>
                  </div>
                  <div class="flex items-center gap-2 font-mono text-xs">
                    <span class="px-2.5 py-1 rounded bg-white border border-border-subtle text-graphite font-semibold">${cs.area}</span>
                    <span class="px-2.5 py-1 rounded bg-forest/10 text-forest font-bold">${cs.status}</span>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-muted">
                  <p><strong class="text-graphite">Impacto Aferido:</strong> ${cs.impact}</p>
                  <p><strong class="text-graphite">Ano de Instalação:</strong> ${cs.year}</p>
                </div>
                <p class="text-xs text-muted leading-relaxed pt-1">${cs.notes}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'academy': {
      const tracks = (typeof ViraServices !== 'undefined' && ViraServices.academyService)
        ? ViraServices.academyService.getTracks()
        : (typeof EngineeringKnowledgeBase !== 'undefined' && EngineeringKnowledgeBase.academyTracks ? EngineeringKnowledgeBase.academyTracks : []);
      
      const currentTrack = (typeof ViraServices !== 'undefined' && ViraServices.academyService)
        ? ViraServices.academyService.getTrackByRole(currentAcademyRole)
        : (tracks.find(t => t.role === currentAcademyRole) || tracks[0] || {
            title: view.headline,
            role: 'engenheiro',
            targetAudience: 'Engenheiros e Especificadores',
            estimatedHours: '8h',
            modules: view.steps.map(s => ({ num: s.num, title: s.title, content: s.text, normReference: 'ABNT NBR 9781', labEvidence: 'IPT nº 1.104.921-A' })),
            deliverables: ['Memória de Cálculo em PDF', 'Prancha Técnica DWG/DXF', 'Certificado Profissional']
          });

      const trackProfiles = [
        { role: 'engenheiro', label: 'Engenheiro Civil', icon: 'hard-hat', time: '8h', color: 'forest' },
        { role: 'arquiteto', label: 'Arquiteto & Paisagista', icon: 'compass', time: '6h', color: 'forest' },
        { role: 'gestor', label: 'Gestor Público', icon: 'landmark', time: '5h', color: 'forest' },
        { role: 'fiscal', label: 'Fiscal de Obras', icon: 'clipboard-check', time: '6h', color: 'forest' }
      ];

      html = `
        <div class="space-y-8 animate-fadeIn">
          <!-- Cabeçalho Principal -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 10. VIRA Academy — Programa de Formação Técnica</span>
              <span class="px-2.5 py-0.5 rounded-full bg-forest/10 border border-forest/20 text-forest font-mono text-[10px] font-bold uppercase tracking-wide">Design Partners • V4.1</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">Capacitação Especializada por Perfil de Engenharia</h2>
            <p class="text-xs sm:text-sm text-muted max-w-3xl leading-relaxed">
              Trilhas técnicas desenhadas com rigor normativo (ABNT NBR 9781, 9050, 15953), laudos laboratoriais acreditados (IPT nº 1.104.921-A) e fundamentação jurídica na Lei Federal nº 14.133/2021 para capacitação contínua de nossos parceiros de projeto.
            </p>
          </div>

          <!-- Seletor Interativo das 4 Trilhas -->
          <div class="p-1.5 bg-sand rounded-2xl border border-border-subtle grid grid-cols-2 sm:grid-cols-4 gap-2">
            ${trackProfiles.map(t => {
              const isActive = currentAcademyRole === t.role;
              return `
                <button onclick="selectAcademyTrack('${t.role}')" class="py-3 px-4 rounded-xl text-center font-bold text-xs transition-all flex flex-col items-center justify-center gap-1.5 ${isActive ? 'bg-white text-forest shadow-md border border-forest/30 ring-1 ring-forest/20' : 'text-muted hover:text-graphite hover:bg-white/60'}">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="${t.icon}" class="w-4 h-4 ${isActive ? 'text-forest' : 'text-muted'}"></i>
                    <span class="truncate">${t.label}</span>
                  </div>
                  <span class="font-mono text-[10px] font-semibold ${isActive ? 'text-forest/80' : 'opacity-60'}">Carga: ${t.time}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Banner da Trilha Ativa -->
          <div class="p-6 bg-gradient-to-br from-sand via-white to-sand rounded-3xl border border-border-subtle shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1.5 max-w-2xl">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-forest text-white font-mono text-[10px] font-bold uppercase tracking-wider">Trilha Oficial</span>
                <span class="text-xs font-mono text-muted">• Carga Horária: <strong class="text-graphite">${currentTrack.estimatedHours}</strong></span>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-graphite tracking-tight">${currentTrack.title}</h3>
              <p class="text-xs text-muted"><strong>Público-Alvo:</strong> ${currentTrack.targetAudience}</p>
            </div>
            <button onclick="openCertificateModal('${currentTrack.role}')" class="vira-btn-primary py-3 px-5 text-xs font-mono flex items-center gap-2 shrink-0 shadow-sm">
              <i data-lucide="award" class="w-4 h-4"></i>
              <span>Emitir Certificado</span>
            </button>
          </div>

          <!-- Módulos de Formação Técnica -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-bold text-graphite uppercase font-mono tracking-wider">Módulos da Trilha Formativa</h4>
                <span class="text-xs text-muted font-mono">(${currentTrack.modules.length} Módulos Especializados)</span>
              </div>
              <span class="text-xs font-mono text-forest font-semibold bg-forest/10 px-2.5 py-0.5 rounded-full">100% Auditado</span>
            </div>

            <div class="grid grid-cols-1 gap-4">
              ${currentTrack.modules.map(mod => `
                <div class="p-6 bg-sand rounded-2xl border border-border-subtle hover:border-forest/40 transition-all space-y-4 shadow-sm">
                  <div class="flex items-start gap-4">
                    <span class="w-10 h-10 rounded-xl bg-forest text-white flex items-center justify-center font-mono text-sm font-bold shrink-0 shadow-sm">
                      ${mod.num}
                    </span>
                    <div class="space-y-1 flex-1">
                      <h5 class="text-base font-bold text-graphite">${mod.title}</h5>
                      <p class="text-xs sm:text-sm text-muted leading-relaxed">${mod.content}</p>
                    </div>
                  </div>
                  
                  <div class="pt-3 border-t border-border-subtle/80 flex flex-wrap items-center gap-2 text-xs">
                    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border-subtle rounded-xl text-graphite font-mono">
                      <i data-lucide="book-open" class="w-3.5 h-3.5 text-forest"></i>
                      <span class="text-[11px]"><strong>Norma:</strong> ${mod.normReference}</span>
                    </div>
                    <div class="flex items-center gap-1.5 px-3 py-1.5 bg-forest/10 border border-forest/20 rounded-xl text-forest font-mono">
                      <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                      <span class="text-[11px]"><strong>Evidência:</strong> ${mod.labEvidence}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Entregáveis Técnicos da Trilha -->
          <div class="space-y-4 pt-2">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-bold text-graphite uppercase font-mono tracking-wider">Entregáveis & Modelos Técnicos</h4>
                <p class="text-xs text-muted">Arquivos e modelos parametrizados prontos para aplicação em canteiro e gabinete.</p>
              </div>
              <span class="text-xs font-mono text-muted">Acesso Imediato</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${currentTrack.deliverables.map((deliv, idx) => `
                <div class="p-5 bg-sand rounded-2xl border border-border-subtle flex flex-col justify-between gap-4 hover:border-forest/30 transition-all shadow-sm">
                  <div class="space-y-2">
                    <div class="w-8 h-8 rounded-xl bg-white border border-border-subtle flex items-center justify-center text-forest shadow-xs">
                      <i data-lucide="${idx === 0 ? 'file-text' : (idx === 1 ? 'layers' : 'award')}" class="w-4 h-4"></i>
                    </div>
                    <h5 class="text-xs font-bold text-graphite leading-snug">${deliv}</h5>
                    <p class="text-[11px] text-muted leading-relaxed">Modelo auditado e parametrizado para inserção direta no fluxo de trabalho.</p>
                  </div>
                  <button onclick="downloadAcademyDeliverable('${currentTrack.role}', ${idx})" class="w-full vira-btn-outline bg-white py-2.5 px-3 text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-forest hover:text-white transition-colors">
                    <i data-lucide="download" class="w-3.5 h-3.5"></i>
                    <span>Baixar Documento</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Banner Chamada Certificação -->
          <div class="p-8 bg-forest text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div class="space-y-1.5 max-w-xl">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded bg-white/20 font-mono text-[10px] uppercase font-bold tracking-wider">Certificação Oficial VIRA</span>
                <span class="text-white/75 text-xs font-mono">• Habilitação Técnica</span>
              </div>
              <h4 class="text-lg sm:text-xl font-bold">Certificado de Especificador de Engenharia Circular</h4>
              <p class="text-xs sm:text-sm text-white/80 leading-relaxed">
                Emite documento formal de conclusão com protocolo de autenticidade criptográfica para comprovação perante conselhos de classe (CREA / CAU) e comissões municipais de licitação.
              </p>
            </div>
            <button onclick="openCertificateModal('${currentTrack.role}')" class="bg-white text-forest hover:bg-sand font-mono font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2">
              <i data-lucide="award" class="w-4 h-4"></i>
              <span>Emitir Certificado</span>
            </button>
          </div>
        </div>
      `;
      break;
    }

    case 'faq':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 11. FAQ Técnico & Jurídico</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="space-y-3">
            ${view.faqs.map(f => `
              <div class="p-6 bg-sand rounded-2xl border border-border-subtle space-y-2">
                <h3 class="text-sm font-bold text-graphite flex items-start gap-2">
                  <span class="text-forest font-mono font-bold">P:</span>
                  ${f.q}
                </h3>
                <p class="text-xs text-muted leading-relaxed pl-5">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'downloads':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 12. Downloads Estruturados</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="space-y-3">
            ${view.files.map(fi => `
              <div class="p-5 ${fi.primary ? 'bg-forest/10 border-forest/30' : 'bg-sand border-border-subtle'} rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded ${fi.primary ? 'bg-forest text-white' : 'bg-black/5 text-graphite'} font-mono text-[10px] font-bold uppercase">${fi.format}</span>
                    <span class="text-xs font-mono text-muted">${fi.size}</span>
                  </div>
                  <h3 class="text-sm font-bold text-graphite">${fi.name}</h3>
                  <p class="text-xs text-muted">${fi.desc}</p>
                </div>
                <a href="${fi.url}" download class="${fi.primary ? 'vira-btn-primary' : 'vira-btn-outline bg-white'} shrink-0 py-2.5 px-5 text-xs font-mono">
                  <i data-lucide="download" class="w-3.5 h-3.5"></i>
                  <span>Download</span>
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      break;

    case 'support':
      html = `
        <div class="space-y-6 animate-fadeIn">
          <div class="space-y-2">
            <span class="font-mono text-xs text-forest uppercase font-bold tracking-wider">• 13. Suporte com ART Técnica</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-graphite tracking-tight">${view.headline}</h2>
            <p class="text-xs sm:text-sm text-muted">${view.description}</p>
          </div>

          <div class="p-8 bg-sand rounded-3xl border border-border-subtle space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-forest/15 text-forest flex items-center justify-center font-mono font-bold text-xl">
                ART
              </div>
              <div class="space-y-1">
                <h3 class="text-lg font-bold text-graphite">${view.lead.name}</h3>
                <p class="font-mono text-xs text-forest font-semibold">${view.lead.crea} • ${view.lead.role}</p>
                <p class="text-xs text-muted">${view.lead.plant}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-black/5 flex flex-wrap gap-3">
              <a href="mailto:${view.lead.email}?subject=[VIRA Workspace] Consulta Tecnica sobre ${sol.code}" class="vira-btn-primary py-3 px-6 text-xs font-mono">
                <i data-lucide="mail" class="w-4 h-4"></i>
                <span>Enviar E-mail à Engenharia</span>
              </a>
              <a href="index.html#contato" class="vira-btn-outline py-3 px-6 text-xs font-mono bg-white">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                <span>Solicitar Parecer Técnico / Amostra</span>
              </a>
            </div>
          </div>
        </div>
      `;
      break;
  }

  canvas.innerHTML = html;
  if (window.lucide) {
    lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  }
}

// --------------------------------------------------------
// RENDERIZAÇÃO DO CANVAS DE PROJETOS EXECUTIVOS (PROJECT ENGINE)
// --------------------------------------------------------
function renderProjectsCanvas() {
  const canvas = document.getElementById('workspace-canvas');
  if (!canvas || !window.projectEngine) return;

  const projects = window.projectEngine.getProjects();
  const activeProj = window.projectEngine.getActiveProject();
  const totals = window.projectEngine.calculateProjectTotals(activeProj);

  const tonsPlastic = (totals.totalPlasticKg / 1000).toFixed(1).replace('.', ',');
  const tonsCo2 = (totals.totalCo2MitigatedKg / 1000).toFixed(1).replace('.', ',');

  canvas.innerHTML = `
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Barra de Seleção de Projetos Cadastrados -->
      <div class="p-6 bg-sand rounded-3xl border border-border-subtle space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
          <div>
            <span class="font-mono text-xs text-forest font-bold uppercase tracking-wider">• Workspace de Projetos Executivos</span>
            <h2 class="text-xl sm:text-2xl font-bold text-graphite tracking-tight mt-0.5">${activeProj.name}</h2>
            <p class="text-xs text-muted mt-0.5">Órgão / Cliente: <strong class="text-graphite">${activeProj.client}</strong></p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="window.openProjectExporterModal()" class="vira-btn-primary py-2.5 px-4 text-xs font-mono flex items-center gap-1.5 shadow-sm">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Exportar Caderno (PDF)</span>
            </button>
            <button onclick="window.projectEngine.exportProjectCsv('${activeProj.id}')" class="vira-btn-outline py-2.5 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5" title="Baixar Planilha CSV de Quantitativos e Orçamento">
              <i data-lucide="table" class="w-3.5 h-3.5"></i>
              <span>CSV</span>
            </button>
            <button onclick="window.projectEngine.exportProjectText('${activeProj.id}')" class="vira-btn-outline py-2.5 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5" title="Baixar Memorial Descritivo em Texto Simples">
              <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
              <span>TXT</span>
            </button>
            <button onclick="window.projectEngine.exportProjectJson('${activeProj.id}')" class="vira-btn-outline py-2.5 px-3 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5" title="Baixar JSON do Projeto">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>JSON</span>
            </button>
            <button onclick="window.projectEngine.duplicateProject('${activeProj.id}'); window.updateWorkspace();" class="p-2.5 rounded-xl border border-border-subtle bg-white text-muted hover:text-forest transition-colors shadow-sm" title="Duplicar Projeto">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="handleDeleteProject()" class="p-2.5 rounded-xl border border-border-subtle bg-white text-muted hover:text-rose-600 transition-colors shadow-sm" title="Excluir Projeto">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Seletor em Pílulas de Projetos Ativos -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          <span class="text-muted text-[10px] uppercase font-bold shrink-0">Projetos:</span>
          ${projects.map(p => `
            <button onclick="switchProject('${p.id}')" class="px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${p.id === activeProj.id ? 'bg-white border-forest text-forest font-bold shadow-sm' : 'bg-transparent border-transparent text-muted hover:text-graphite'}">
              <span class="w-2 h-2 rounded-full ${p.id === activeProj.id ? 'bg-forest' : 'bg-muted/40'}"></span>
              <span class="truncate max-w-[200px]">${p.name}</span>
            </button>
          `).join('')}
          <button onclick="window.openNewProjectModal()" class="px-2.5 py-1.5 rounded-xl border border-dashed border-border-subtle hover:border-forest text-muted hover:text-forest transition-all shrink-0 flex items-center gap-1 text-[11px]">
            <i data-lucide="plus" class="w-3 h-3"></i>
            <span>Novo</span>
          </button>
        </div>

        <!-- Metadados de Governança do Projeto -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono border-t border-black/5 text-muted">
          <div><strong class="text-graphite">Resp. Técnico:</strong> ${activeProj.responsible}</div>
          <div><strong class="text-graphite">Enquadramento:</strong> ${activeProj.lawReference}</div>
          <div><strong class="text-graphite">Status:</strong> <span class="text-forest font-bold">${activeProj.status}</span></div>
          <div><strong class="text-graphite">Governança:</strong> <span class="px-1.5 py-0.5 rounded text-[10px] ${activeProj.dataTier === 'homologado' ? 'bg-forest/10 text-forest' : (activeProj.dataTier === 'exemplo_ilustrativo' ? 'bg-amber-500/10 text-amber-700' : 'bg-blue-500/10 text-blue-700')} font-bold uppercase">${activeProj.dataTier || 'projeto_usuario'}</span></div>
        </div>
      </div>

      <!-- Grade Monumental de Impacto Consolidado -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div class="p-5 bg-white rounded-2xl border border-border-subtle shadow-sm space-y-1">
          <span class="text-[10px] text-muted uppercase block font-bold">Área Total Especificada</span>
          <p class="text-2xl font-bold text-graphite">${totals.totalArea.toLocaleString('pt-BR')} <span class="text-xs font-normal text-muted">m²</span></p>
          <span class="text-[10px] text-muted block">Pavimentos e Painéis</span>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-border-subtle shadow-sm space-y-1">
          <span class="text-[10px] text-forest uppercase block font-bold">Plástico Regenerado</span>
          <p class="text-2xl font-bold text-forest">${tonsPlastic} <span class="text-xs font-normal text-forest/70">t</span></p>
          <span class="text-[10px] text-muted block">${totals.totalPlasticKg.toLocaleString('pt-BR')} kg desviados</span>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-border-subtle shadow-sm space-y-1">
          <span class="text-[10px] text-forest uppercase block font-bold">CO2e Evitado (ACV)</span>
          <p class="text-2xl font-bold text-forest">${tonsCo2} <span class="text-xs font-normal text-forest/70">t CO2e</span></p>
          <span class="text-[10px] text-muted block">ISO 14044 (-2,15 kg/kg)</span>
        </div>

        <div class="p-5 bg-white rounded-2xl border border-border-subtle shadow-sm space-y-1">
          <span class="text-[10px] text-ochre uppercase block font-bold">Orçamento Paramétrico</span>
          <p class="text-2xl font-bold text-graphite">R$ ${(totals.totalCostEstimate / 1000).toFixed(0)}k</p>
          <span class="text-[10px] text-muted block">R$ ${totals.totalCostEstimate.toLocaleString('pt-BR')},00</span>
        </div>
      </div>

      <!-- Tabela de Itens e Quantitativos do Projeto -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm space-y-6 font-sans text-xs">
        <div class="flex items-center justify-between border-b border-border-subtle pb-4">
          <div>
            <h3 class="font-bold text-base text-graphite">Itens e Materiais Especificados</h3>
            <p class="text-muted text-xs">Composição detalhada dos artefatos circulares vinculados a este caderno executivo.</p>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-sand text-graphite font-mono font-bold text-xs">${activeProj.items.length} itens</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-border-subtle font-mono text-[10px] text-muted uppercase">
                <th class="py-3 px-2">#</th>
                <th class="py-3 px-2">Material / Solução</th>
                <th class="py-3 px-2">Código</th>
                <th class="py-3 px-2 text-right">Quantitativo</th>
                <th class="py-3 px-2 text-right">Massa Total</th>
                <th class="py-3 px-2 text-right">CO2e Evitado</th>
                <th class="py-3 px-2 text-right">Estimativa</th>
                <th class="py-3 px-2 text-center">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border-subtle">
              ${activeProj.items.map((it, idx) => {
                const pKg = Math.round(it.quantityM2 * it.densityKgM2);
                const co2Kg = Math.round(pKg * it.lcaFactorCo2);
                const cost = Math.round(it.quantityM2 * it.unitCostEstimate);
                return `
                  <tr class="hover:bg-sand/40 transition-colors">
                    <td class="py-3 px-2 font-mono text-muted">0${idx + 1}</td>
                    <td class="py-3 px-2 font-bold text-graphite">${it.name}</td>
                    <td class="py-3 px-2 font-mono text-ochre font-bold text-[11px]">${it.code}</td>
                    <td class="py-3 px-2 text-right font-mono font-medium">${it.quantityM2.toLocaleString('pt-BR')} ${it.solutionId === 'perfil' ? 'm' : 'm²'}</td>
                    <td class="py-3 px-2 text-right font-mono text-forest font-bold">${pKg.toLocaleString('pt-BR')} kg</td>
                    <td class="py-3 px-2 text-right font-mono text-forest font-bold">${co2Kg.toLocaleString('pt-BR')} kg</td>
                    <td class="py-3 px-2 text-right font-mono">R$ ${cost.toLocaleString('pt-BR')}</td>
                    <td class="py-3 px-2 text-center">
                      <button onclick="removeProjectItem(${idx})" class="text-muted hover:text-rose-600 transition-colors p-1" title="Remover item">
                        <i data-lucide="trash" class="w-3.5 h-3.5"></i>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Formulário Rápido para Adicionar Material -->
        <form onsubmit="handleAddProjectItem(event)" class="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-end gap-3 bg-sand p-4 rounded-2xl">
          <div class="space-y-1 w-full sm:w-1/2">
            <label class="font-mono text-muted uppercase font-bold text-[10px]">Adicionar Solução VIRA</label>
            <select id="pi-solution" class="w-full bg-white px-3 py-2 rounded-xl border border-border-subtle text-graphite font-medium text-xs">
              <option value="paver">Paver 16 Faces (VRA-PAV-2026) — 18,5 kg/m²</option>
              <option value="painel">Painel Fachada 15mm (VRA-PNL-1204) — 14,4 kg/m²</option>
              <option value="perfil">Perfil Maciço 80×80 (VRA-PRF-0142) — 6,14 kg/m</option>
            </select>
          </div>
          <div class="space-y-1 w-full sm:w-1/4">
            <label class="font-mono text-muted uppercase font-bold text-[10px]">Metragem (m² ou m)</label>
            <input id="pi-quantity" type="number" min="1" step="any" value="500" required class="w-full bg-white px-3 py-2 rounded-xl border border-border-subtle text-graphite font-medium text-xs font-mono" />
          </div>
          <button type="submit" class="vira-btn-primary py-2 px-5 text-xs font-mono shrink-0 w-full sm:w-auto justify-center">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Adicionar</span>
          </button>
        </form>
      </div>

      <!-- Memorial & Justificativa para Licitações (Lei 14.133) -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm space-y-4 font-sans text-xs">
        <div class="flex items-center justify-between border-b border-border-subtle pb-3">
          <div class="space-y-0.5">
            <h3 class="font-bold text-base text-graphite">Justificativa e Anotações Técnicas de Canteiro</h3>
            <p class="text-muted text-xs">Parâmetros de enquadramento para comissões de contratação sob a Lei 14.133/2021.</p>
          </div>
          <button onclick="handleSaveProjectNotes()" class="vira-btn-outline py-2 px-4 text-xs font-mono bg-white shadow-sm flex items-center gap-1.5">
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>Salvar Notas</span>
          </button>
        </div>
        <textarea id="project-notes-textarea" rows="4" class="w-full bg-sand p-4 rounded-2xl border border-border-subtle text-graphite focus:outline-none focus:ring-1 focus:ring-forest text-xs font-sans leading-relaxed" placeholder="Descreva os requisitos específicos desta intervenção urbana...">${activeProj.notes || ''}</textarea>
      </div>

      <!-- Trilha de Auditoria do Projeto (Audit Trail Imutável) -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm space-y-4 font-sans text-xs">
        <div class="flex items-center justify-between border-b border-border-subtle pb-3">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-forest/10 text-forest font-mono text-[10px] font-bold uppercase tracking-wider">Governança & Rastreabilidade</span>
              <span class="font-mono text-[10px] text-muted">• ${Array.isArray(activeProj.auditTrail) ? activeProj.auditTrail.length : 0} eventos registrados</span>
            </div>
            <h3 class="font-bold text-base text-graphite">Trilha de Auditoria do Projeto (Audit Trail)</h3>
          </div>
          <span class="font-mono text-[10px] text-muted">Hash de Integridade Ativo</span>
        </div>

        <div class="space-y-3 font-mono text-xs max-h-64 overflow-y-auto pr-1">
          ${(activeProj.auditTrail && activeProj.auditTrail.length > 0) ? activeProj.auditTrail.map((entry) => `
            <div class="p-3 bg-sand rounded-xl border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="px-1.5 py-0.5 rounded bg-graphite/10 text-graphite font-bold text-[9px] uppercase tracking-wider">${entry.action}</span>
                  <span class="text-graphite font-bold text-xs">${entry.actor}</span>
                  <span class="text-[10px] text-muted">${entry.timestamp}</span>
                </div>
                <p class="font-sans text-muted text-xs">${entry.details}</p>
              </div>
              <div class="text-right shrink-0">
                <span class="text-[10px] text-muted font-mono bg-white px-2 py-1 rounded border border-black/5" title="Checksum de Não-Repúdio">#${entry.checksum || '00000000'}</span>
              </div>
            </div>
          `).join('') : `
            <p class="text-muted font-sans italic text-center py-4">Nenhum evento registrado ainda na trilha deste projeto.</p>
          `}
        </div>
      </div>

      <!-- Banner de Emissão do Caderno Executivo -->
      <div class="p-8 bg-forest text-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2">
          <span class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold uppercase">Homologação Pronta</span>
          <h3 class="text-2xl font-bold tracking-tight">Caderno Executivo de Encargos do Projeto</h3>
          <p class="text-sm opacity-90 max-w-xl">
            Emita o memorial descritivo completo com todas as cláusulas jurídicas para edital de concorrência pública, laudos IPT vinculados e declaração de ACV.
          </p>
        </div>
        <button onclick="window.openProjectExporterModal()" class="py-3 px-6 bg-white text-forest hover:bg-sand rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0">
          <i data-lucide="file-text" class="w-4 h-4"></i>
          <span>Gerar Caderno Completo (PDF)</span>
        </button>
      </div>

    </div>
  `;
}

// Manipuladores de Operações de Projeto
function switchProject(id) {
  if (window.projectEngine) {
    window.projectEngine.setActiveProject(id);
    updateWorkspace();
  }
}

function removeProjectItem(index) {
  if (window.projectEngine) {
    const proj = window.projectEngine.getActiveProject();
    window.projectEngine.removeItemFromProject(proj.id, index);
    showWorkspaceToast('✓ Item removido do projeto.');
    updateWorkspace();
  }
}

function handleAddProjectItem(e) {
  e.preventDefault();
  const select = document.getElementById('pi-solution');
  const qtyInput = document.getElementById('pi-quantity');
  if (!select || !qtyInput) return;

  const solId = select.value;
  const qty = parseFloat(qtyInput.value) || 100;
  let itemData = {
    solutionId: 'paver',
    name: 'Paver Intertravado 16 Faces',
    code: 'VRA-PAV-2026',
    quantityM2: qty,
    densityKgM2: 18.5,
    lcaFactorCo2: 2.15,
    unitCostEstimate: 88.50
  };

  if (solId === 'painel') {
    itemData = {
      solutionId: 'painel',
      name: 'Painel Arquitetônico 15mm',
      code: 'VRA-PNL-1204',
      quantityM2: qty,
      densityKgM2: 14.4,
      lcaFactorCo2: 2.15,
      unitCostEstimate: 145.00
    };
  } else if (solId === 'perfil') {
    itemData = {
      solutionId: 'perfil',
      name: 'Perfil Estrutural Maciço 80×80',
      code: 'VRA-PRF-0142',
      quantityM2: qty,
      densityKgM2: 6.14,
      lcaFactorCo2: 2.15,
      unitCostEstimate: 62.00
    };
  }

  const proj = window.projectEngine.getActiveProject();
  window.projectEngine.addItemToProject(proj.id, itemData);
  showWorkspaceToast(`✓ Adicionado ${qty} m² de ${itemData.name} ao projeto!`);
  updateWorkspace();
}

function handleSaveProjectNotes() {
  const notesEl = document.getElementById('project-notes-textarea');
  if (!notesEl || !window.projectEngine) return;
  const proj = window.projectEngine.getActiveProject();
  window.projectEngine.updateProject(proj.id, { notes: notesEl.value });
  showWorkspaceToast('✓ Justificativa do projeto salva com sucesso!');
}

function handleDeleteProject() {
  if (!window.projectEngine) return;
  const proj = window.projectEngine.getActiveProject();
  if (confirm(`Deseja realmente excluir o projeto "${proj.name}"?`)) {
    const success = window.projectEngine.deleteProject(proj.id);
    if (success) {
      showWorkspaceToast('✓ Projeto excluído.');
      updateWorkspace();
    }
  }
}

// --------------------------------------------------------
// RENDERIZAÇÃO DO RELATED KNOWLEDGE GRAPH LATERAL & IA
// --------------------------------------------------------
function renderRelatedKnowledge() {
  const container = document.getElementById('related-knowledge-container');
  if (!container) return;

  const sol = workspaceData[currentSolutionId];
  if (!sol) return;

  let contentHtml = '';

  if (currentSidebarTab === 'ai') {
    contentHtml = `<div id="sidebar-ai-mount"></div>`;
  } else {
    contentHtml = `
      <div class="space-y-6 animate-fadeIn">
        <!-- Card de Autoridade & Confiança do Nó -->
        <div class="p-5 bg-sand rounded-2xl border border-border-subtle space-y-3 font-mono text-xs">
          <div class="flex items-center justify-between border-b border-black/5 pb-2.5">
            <span class="text-muted text-[10px] uppercase font-bold">Nó do Grafo</span>
            <span class="px-2 py-0.5 rounded bg-forest text-white text-[10px] font-bold uppercase">Homologado</span>
          </div>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-ochre font-bold">${sol.trustIndex.stars}</span>
              <span class="text-graphite font-bold text-[11px]">${sol.trustIndex.rating}</span>
            </div>
            <p class="text-[11px] text-muted">${sol.trustIndex.downloads} downloads auditados • ${sol.trustIndex.citations} citações</p>
          </div>
          <div class="pt-2 border-t border-black/5 text-[10px] text-muted space-y-0.5">
            <p><strong class="text-graphite">Resp. Técnico:</strong> ${sol.technicalLead.name}</p>
            <p>${sol.technicalLead.crea}</p>
          </div>
        </div>

        <!-- Nós Conectados no Grafo (Related Knowledge) -->
        <div class="space-y-2.5">
          <h3 class="font-mono text-xs uppercase tracking-wider text-graphite font-bold flex items-center gap-1.5">
            <i data-lucide="git-branch" class="w-3.5 h-3.5 text-forest"></i>
            <span>Related Knowledge Graph</span>
          </h3>

          <div class="space-y-2 font-mono text-xs">
            <!-- BIM -->
            ${sol.connectedAssets.bim ? `
              <div onclick="setWorkspaceTab('bim')" class="p-3 bg-white hover:bg-forest/5 rounded-xl border border-border-subtle hover:border-forest/30 transition-all cursor-pointer flex items-center justify-between group">
                <div class="space-y-0.5">
                  <span class="text-[9px] text-forest uppercase font-bold">Modelo Paramétrico BIM</span>
                  <p class="text-xs font-semibold text-graphite group-hover:text-forest transition-colors">${sol.connectedAssets.bim}</p>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-muted group-hover:text-forest transition-colors"></i>
              </div>
            ` : ''}

            <!-- CAD -->
            ${sol.connectedAssets.cad ? `
              <div onclick="setWorkspaceTab('cad')" class="p-3 bg-white hover:bg-ochre/5 rounded-xl border border-border-subtle hover:border-ochre/30 transition-all cursor-pointer flex items-center justify-between group">
                <div class="space-y-0.5">
                  <span class="text-[9px] text-ochre uppercase font-bold">Detalhamento Executivo CAD</span>
                  <p class="text-xs font-semibold text-graphite group-hover:text-ochre transition-colors">${sol.connectedAssets.cad}</p>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-muted group-hover:text-ochre transition-colors"></i>
              </div>
            ` : ''}

            <!-- LAB -->
            ${sol.connectedAssets.lab ? `
              <div onclick="setWorkspaceTab('lab')" class="p-3 bg-white hover:bg-graphite/5 rounded-xl border border-border-subtle hover:border-graphite/30 transition-all cursor-pointer flex items-center justify-between group">
                <div class="space-y-0.5">
                  <span class="text-[9px] text-graphite uppercase font-bold">Laudo Laboratorial Auditado</span>
                  <p class="text-xs font-semibold text-graphite group-hover:text-graphite transition-colors">${sol.connectedAssets.lab}</p>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-muted group-hover:text-graphite transition-colors"></i>
              </div>
            ` : ''}

            <!-- MEMORIAL -->
            ${sol.connectedAssets.mem ? `
              <div onclick="copyWorkspaceSpec()" class="p-3 bg-white hover:bg-forest/5 rounded-xl border border-border-subtle hover:border-forest/30 transition-all cursor-pointer flex items-center justify-between group">
                <div class="space-y-0.5">
                  <span class="text-[9px] text-forest uppercase font-bold">Memorial Licitação (Lei 14.133)</span>
                  <p class="text-xs font-semibold text-graphite group-hover:text-forest transition-colors">${sol.connectedAssets.mem}</p>
                </div>
                <i data-lucide="copy" class="w-3.5 h-3.5 text-muted group-hover:text-forest transition-colors"></i>
              </div>
            ` : ''}

            <!-- ACV -->
            ${sol.connectedAssets.acv ? `
              <div onclick="setWorkspaceTab('lca')" class="p-3 bg-white hover:bg-forest/5 rounded-xl border border-border-subtle hover:border-forest/30 transition-all cursor-pointer flex items-center justify-between group">
                <div class="space-y-0.5">
                  <span class="text-[9px] text-forest uppercase font-bold">Análise Ciclo de Vida (ISO 14044)</span>
                  <p class="text-xs font-semibold text-graphite group-hover:text-forest transition-colors">${sol.connectedAssets.acv}</p>
                </div>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-muted group-hover:text-forest transition-colors"></i>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Ações Rápidas de Especificação -->
        <div class="space-y-2 pt-2 border-t border-border-subtle">
          <button onclick="copyWorkspaceSpec()" class="vira-btn-primary w-full text-center justify-center py-3 text-xs font-mono">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            <span>Copiar Memorial para Edital</span>
          </button>
          <button onclick="copyWorkspaceCitation()" class="vira-btn-outline w-full text-center justify-center py-2.5 text-xs font-mono bg-white">
            <i data-lucide="quote" class="w-3.5 h-3.5"></i>
            <span>Citar este Documento (ABNT)</span>
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Alternador de Abas da Sidebar: Grafo vs IA -->
      <div class="flex items-center gap-1 bg-surface p-1 rounded-2xl border border-border-subtle font-mono text-xs">
        <button onclick="setSidebarTab('knowledge')" class="flex-1 py-2 px-3 rounded-xl text-center font-bold transition-all ${currentSidebarTab === 'knowledge' ? 'bg-white text-forest shadow-sm' : 'text-muted hover:text-graphite'}">
          Knowledge Graph
        </button>
        <button onclick="setSidebarTab('ai')" class="flex-1 py-2 px-3 rounded-xl text-center font-bold transition-all flex items-center justify-center gap-1.5 ${currentSidebarTab === 'ai' ? 'bg-white text-forest shadow-sm' : 'text-muted hover:text-graphite'}">
          <span>Copiloto IA</span>
          <span class="px-1.5 py-0.2 rounded-full bg-forest/10 text-forest text-[9px] font-bold">Engine 06</span>
        </button>
      </div>

      <div id="sidebar-tab-content">
        ${contentHtml}
      </div>
    </div>
  `;

  if (currentSidebarTab === 'ai' && window.engineeringAi) {
    window.engineeringAi.mount('sidebar-ai-mount');
  }
}

// --------------------------------------------------------
// UTILITÁRIOS: COPIADORES & CALCULADORA
// --------------------------------------------------------
function copyWorkspaceSpec() {
  const sol = workspaceData[currentSolutionId];
  if (!sol) return;

  navigator.clipboard.writeText(sol.specText).then(() => {
    showWorkspaceToast(`✓ Memorial descritivo de ${sol.name} copiado para a área de transferência!`);
  });
}

function copyWorkspaceCitation() {
  const sol = workspaceData[currentSolutionId];
  if (!sol) return;

  navigator.clipboard.writeText(sol.citation).then(() => {
    showWorkspaceToast(`✓ Citação ABNT NBR 6023 copiada!`);
  });
}

function calculateWorkspaceImpact() {
  const input = document.getElementById('ws-calc-area');
  const plasticEl = document.getElementById('ws-res-plastic');
  const co2El = document.getElementById('ws-res-co2');

  if (!input || !plasticEl || !co2El) return;

  const sqMeters = parseFloat(input.value) || 0;
  const plasticKg = Math.round(sqMeters * 18.5);
  const co2Kg = Math.round(plasticKg * 2.15);

  plasticEl.innerText = plasticKg.toLocaleString('pt-BR') + ' kg';
  co2El.innerText = co2Kg.toLocaleString('pt-BR') + ' kg';
}

function showWorkspaceToast(msg) {
  let toast = document.getElementById('ws-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ws-toast';
    toast.className = 'fixed bottom-6 right-6 z-[9999] bg-graphite-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl font-mono text-xs border border-white/10 transition-all duration-300';
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 3500);
}

// --------------------------------------------------------
// VIRA ACADEMY — GESTÃO DE TRILHAS, ENTREGÁVEIS & CERTIFICAÇÃO
// --------------------------------------------------------
function selectAcademyTrack(role) {
  if (!['engenheiro', 'arquiteto', 'gestor', 'fiscal'].includes(role)) return;
  currentAcademyRole = role;
  if (typeof ViraStore !== 'undefined' && ViraStore.userStore) {
    ViraStore.userStore.role = role;
  }
  updateWorkspace();
  showWorkspaceToast(`✓ Trilha ativa: ${role.toUpperCase()}`);
}

function downloadAcademyDeliverable(role, index) {
  const tracks = (typeof ViraServices !== 'undefined' && ViraServices.academyService)
    ? ViraServices.academyService.getTracks()
    : (typeof EngineeringKnowledgeBase !== 'undefined' && EngineeringKnowledgeBase.academyTracks ? EngineeringKnowledgeBase.academyTracks : []);
  const track = tracks.find(t => t.role === role) || tracks[0];
  if (!track || !track.deliverables || !track.deliverables[index]) return;
  const deliverableName = track.deliverables[index];

  const content = `================================================================================
VIRA OS — ENTREGÁVEL TÉCNICO VIRA ACADEMY (V4.1)
Documento: ${deliverableName}
Trilha Técnica: ${track.title}
Público-Alvo: ${track.targetAudience}
Carga Horária: ${track.estimatedHours}
Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}
Autenticação: VRA-ACAD-${role.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}
================================================================================

1. ESCOPO DO ENTREGÁVEL
Este documento constitui modelo técnico e diretriz operacional homologada pelo VIRA OS,
destinado a subsidiar projetos executivos, termos de referência de contratações públicas
e rotinas de fiscalização de obras de infraestrutura com compósitos circulares de alta densidade.

2. ESPECIFICAÇÃO DO MATERIAL HOMOLOGADO
• Resistência Característica à Compressão (fck): ≥ 38,2 MPa (ABNT NBR 9781:2013)
• Taxa de Absorção de Água: < 0,05% (Imunidade total a maresia e eflorescência)
• Fator de Descarbonização (LCA): -2,15 kg CO2e / kg de material reciclado (ISO 14044)
• Laudo de Referência: IPT Relatório nº 1.104.921-A

3. DIRETRIZES TÉCNICAS E MÓDULOS DE FORMAÇÃO
${track.modules.map(m => `--------------------------------------------------------------------------------
Módulo ${m.num}: ${m.title}
Norma de Referência: ${m.normReference}
Evidência Laboratorial: ${m.labEvidence}

Conteúdo & Diretrizes:
${m.content}
`).join('\n')}

4. CRITÉRIOS DE CONFORMIDADE E RECEBIMENTO
- Verificar selo de garantia de 10 anos contra esfarelamento e deformação plástica.
- Exigir o Passaporte Digital de Produto (DPP) com QR Code rastreável no canteiro.
- Amostragem em conformidade com ABNT NBR 9781 (Anexo A) em laboratório acreditado RBC.
- Para contratações públicas municipais: aplicar os critérios de sustentabilidade da Lei 14.133/2021 (Art. 11, IV e Art. 34).

================================================================================
VIRA OS — Operating System para Engenharia Circular
Centro de Inovação & Engenharia de Aplicação | Caruaru - PE
================================================================================`;

  if (typeof document !== 'undefined') {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VIRA-Academy-${role}-${deliverableName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showWorkspaceToast(`✓ Download concluído: ${deliverableName}`);
  }
}

function openCertificateModal(role) {
  const tracks = (typeof ViraServices !== 'undefined' && ViraServices.academyService)
    ? ViraServices.academyService.getTracks()
    : (typeof EngineeringKnowledgeBase !== 'undefined' && EngineeringKnowledgeBase.academyTracks ? EngineeringKnowledgeBase.academyTracks : []);
  const track = tracks.find(t => t.role === role) || tracks[0] || { title: 'Engenharia Circular', estimatedHours: '8h' };

  let backdrop = document.getElementById('academy-certificate-modal-backdrop');
  if (!backdrop) {
    const modalHtml = `
      <div id="academy-certificate-modal-backdrop" class="fixed inset-0 z-[10000] bg-graphite/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div id="academy-certificate-modal-dialog" class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col font-sans max-h-[92vh] animate-fadeIn my-auto">
          <!-- Cabeçalho do Modal -->
          <div class="px-6 py-5 bg-sand border-b border-border-subtle flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-2xl bg-forest/15 text-forest flex items-center justify-center font-bold">
                <i data-lucide="award" class="w-5 h-5"></i>
              </span>
              <div>
                <h3 class="font-bold text-base text-graphite">Certificação de Especificador Circular</h3>
                <p class="text-xs text-muted">Emissão de Certificado Técnico Profissional — VIRA Academy</p>
              </div>
            </div>
            <button onclick="closeCertificateModal()" class="w-8 h-8 rounded-full bg-white border border-border-subtle flex items-center justify-center text-muted hover:text-graphite transition-all">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Conteúdo / Formulário -->
          <div id="certificate-modal-body" class="p-6 overflow-y-auto space-y-6">
            <form id="certificate-form" onsubmit="generateCertificate(event)" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-mono font-bold text-graphite uppercase">Nome Completo do Profissional</label>
                <input id="cert-user-name" type="text" required placeholder="Ex: Eng. Mariana Souza" class="w-full px-4 py-2.5 bg-sand rounded-xl border border-border-subtle text-sm text-graphite focus:outline-none focus:border-forest" />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-mono font-bold text-graphite uppercase">Registro (CREA / CAU / Matrícula)</label>
                  <input id="cert-user-reg" type="text" required placeholder="Ex: CREA-PE 058192-D" class="w-full px-4 py-2.5 bg-sand rounded-xl border border-border-subtle text-sm text-graphite focus:outline-none focus:border-forest" />
                </div>
                <div class="space-y-1.5">
                  <label class="block text-xs font-mono font-bold text-graphite uppercase">Entidade / Órgão / Empresa</label>
                  <input id="cert-user-org" type="text" required placeholder="Ex: Prefeitura Municipal / Escritório" class="w-full px-4 py-2.5 bg-sand rounded-xl border border-border-subtle text-sm text-graphite focus:outline-none focus:border-forest" />
                </div>
              </div>
              <div class="p-4 bg-forest/5 rounded-2xl border border-forest/20 text-xs text-muted space-y-1">
                <div class="font-bold text-forest">Trilha Selecionada: <span id="cert-track-title">${track.title}</span></div>
                <div>Carga Horária: <strong id="cert-track-hours">${track.estimatedHours}</strong> • Evidências ABNT NBR 9781 / NBR 9050 / ISO 14044</div>
              </div>
              <button type="submit" class="w-full vira-btn-primary py-3 rounded-xl font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Gerar Certificado Oficial</span>
              </button>
            </form>

            <div id="certificate-output" class="hidden space-y-4">
              <!-- Certificado renderizado -->
              <div id="certificate-print-area" class="p-8 bg-gradient-to-b from-sand to-white rounded-2xl border-2 border-forest/30 space-y-6 text-center shadow-inner">
                <div class="flex items-center justify-between border-b border-forest/20 pb-4">
                  <span class="font-mono text-xs font-bold text-forest uppercase tracking-wider">VIRA ACADEMY • CERTIFICADO PROFISSIONAL</span>
                  <span id="cert-checksum" class="font-mono text-[10px] px-2 py-0.5 bg-forest/10 text-forest rounded font-bold">#VRA-00000000</span>
                </div>
                <div class="space-y-2 py-4">
                  <p class="text-xs text-muted uppercase tracking-widest font-mono">Certificamos para os devidos fins de comprovação técnica que</p>
                  <h2 id="cert-display-name" class="text-2xl font-bold text-graphite">Nome do Profissional</h2>
                  <p class="text-xs text-muted font-mono"><span id="cert-display-reg">CREA-PE</span> • <span id="cert-display-org">Entidade</span></p>
                </div>
                <div class="text-xs text-graphite leading-relaxed max-w-lg mx-auto bg-white/80 p-4 rounded-xl border border-border-subtle">
                  Concluiu com pleno aproveitamento a capacitação técnica em <strong id="cert-display-track">${track.title}</strong>,
                  com carga horária de <strong id="cert-display-hours">${track.estimatedHours}</strong>, estando habilitado(a) a especificar,
                  dimensionar e fiscalizar a aplicação de artefatos de engenharia circular com compósito polimérico de alta performance
                  (fck 38,2 MPa, absorção &lt; 0,05%, LCA -2,15 kg CO2e/kg), em conformidade com as normas ABNT NBR 9781, NBR 15953, NBR 9050,
                  NBR ISO 14044 e os preceitos de sustentabilidade da Lei Federal nº 14.133/2021.
                </div>
                <div class="pt-6 border-t border-forest/20 flex items-center justify-between text-left text-[11px] text-muted font-mono">
                  <div>
                    <div class="font-bold text-graphite">Eng. Marcelo Albuquerque, M.Sc.</div>
                    <div>Diretoria de Engenharia de Aplicação</div>
                    <div>CREA-PE 048291-D</div>
                  </div>
                  <div class="text-right">
                    <div>Data: <strong id="cert-display-date">${new Date().toLocaleDateString('pt-BR')}</strong></div>
                    <div>Registro: Caruaru/PE</div>
                    <div class="text-forest font-bold">Autenticidade Verificada</div>
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <button onclick="window.print()" class="flex-1 vira-btn-primary py-2.5 rounded-xl font-mono text-xs flex items-center justify-center gap-2">
                  <i data-lucide="printer" class="w-4 h-4"></i>
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button onclick="resetCertificateForm()" class="px-4 py-2.5 rounded-xl border border-border-subtle bg-sand text-graphite font-mono text-xs hover:bg-white transition-all">
                  Novo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    backdrop = document.getElementById('academy-certificate-modal-backdrop');
  }

  // Sincroniza dados da trilha selecionada
  const titleEl = document.getElementById('cert-track-title');
  const hoursEl = document.getElementById('cert-track-hours');
  if (titleEl) titleEl.textContent = track.title;
  if (hoursEl) hoursEl.textContent = track.estimatedHours;
  backdrop.dataset.role = role;

  resetCertificateForm();
  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeCertificateModal() {
  const backdrop = document.getElementById('academy-certificate-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function generateCertificate(event) {
  if (event) event.preventDefault();
  const name = (document.getElementById('cert-user-name')?.value || 'Especificador Técnico').trim();
  const reg = (document.getElementById('cert-user-reg')?.value || 'CREA/CAU').trim();
  const org = (document.getElementById('cert-user-org')?.value || 'Órgão / Empresa').trim();

  const backdrop = document.getElementById('academy-certificate-modal-backdrop');
  const role = backdrop ? backdrop.dataset.role : currentAcademyRole;

  const tracks = (typeof ViraServices !== 'undefined' && ViraServices.academyService)
    ? ViraServices.academyService.getTracks()
    : (typeof EngineeringKnowledgeBase !== 'undefined' && EngineeringKnowledgeBase.academyTracks ? EngineeringKnowledgeBase.academyTracks : []);
  const track = tracks.find(t => t.role === role) || tracks[0] || { title: 'Engenharia Circular', estimatedHours: '8h' };

  // Gera hash de autenticidade determinístico simples
  let hash = 0;
  const str = `${name}|${reg}|${track.title}|${Date.now()}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const checksum = `#VRA-CERT-${Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()}`;

  document.getElementById('cert-display-name').textContent = name;
  document.getElementById('cert-display-reg').textContent = reg;
  document.getElementById('cert-display-org').textContent = org;
  document.getElementById('cert-display-track').textContent = track.title;
  document.getElementById('cert-display-hours').textContent = track.estimatedHours;
  document.getElementById('cert-display-date').textContent = new Date().toLocaleDateString('pt-BR');
  document.getElementById('cert-checksum').textContent = checksum;

  document.getElementById('certificate-form').classList.add('hidden');
  document.getElementById('certificate-output').classList.remove('hidden');
  showWorkspaceToast(`✓ Certificado gerado com sucesso! Protocolo: ${checksum}`);
  if (window.lucide) lucide.createIcons();
}

function resetCertificateForm() {
  const form = document.getElementById('certificate-form');
  const output = document.getElementById('certificate-output');
  if (form) form.classList.remove('hidden');
  if (output) output.classList.add('hidden');
}

// BINDINGS GLOBAIS DO VIRA OS
window.updateWorkspace = updateWorkspace;
window.selectAcademyTrack = selectAcademyTrack;
window.downloadAcademyDeliverable = downloadAcademyDeliverable;
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
window.generateCertificate = generateCertificate;
window.resetCertificateForm = resetCertificateForm;

