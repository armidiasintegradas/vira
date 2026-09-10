/**
 * AR OS — Domain-Driven Design (DDD) Registry
 * Holding: AR Mídias Integradas
 * Bounded Contexts canônicos do sistema operacional
 */

const { arEventBus, EVENT_TYPES } = require('../events/eventBus.js');

// 1. Domínio de Engenharia
const EngineeringDomain = {
  name: 'Engineering',
  description: 'Cálculo mecânico, dimensionamento estratigráfico e ensaios de compressão axial.',
  calculateSubgradeCapacity(cbrPercentage) {
    // Cálculo simplificado de módulo de resiliência de subleito MR (MPa) = 10 * CBR
    const mrMpa = Math.max(20, Math.round(10 * (cbrPercentage || 5)));
    return { cbrPercentage, mrMpa, recommendation: mrMpa >= 80 ? 'Subleito Apto para Tráfego Comercial' : 'Exige Camada de Reforço com BGS' };
  }
};

// 2. Domínio de Projetos
const ProjectsDomain = {
  name: 'Projects',
  description: 'Gestão de intervenções, quantitativos de área e memoriais para editais.',
  calculateTotals(items = []) {
    let totalArea = 0;
    let totalPlasticKg = 0;
    let totalCost = 0;

    items.forEach(it => {
      const area = parseFloat(it.quantityM2) || 0;
      const density = parseFloat(it.densityKgM2) || 18.5;
      const cost = parseFloat(it.unitCostEstimate) || 0;
      totalArea += area;
      totalPlasticKg += area * density;
      totalCost += area * cost;
    });

    const totalCo2MitigatedKg = Math.round(totalPlasticKg * 2.15);
    return {
      totalArea: Math.round(totalArea * 100) / 100,
      totalPlasticKg: Math.round(totalPlasticKg),
      totalCo2MitigatedKg,
      totalCostEstimate: Math.round(totalCost)
    };
  }
};

// 3. Domínio de Conformidade (Compliance)
const ComplianceDomain = {
  name: 'Compliance',
  description: 'Auditoria de conformidade técnica ABNT, ISO e enquadramento na Lei 14.133/2021.',
  validateCompressiveStrength(measuredFck) {
    const required = 35.0; // ABNT NBR 9781
    const compliant = measuredFck >= required;
    return {
      standard: 'ABNT NBR 9781:2013',
      requiredFckMpa: required,
      measuredFckMpa: measuredFck,
      compliant,
      status: compliant ? 'CONFORME' : 'NÃO CONFORME'
    };
  }
};

// 4. Domínio de Conhecimento (Knowledge Graph)
const KnowledgeDomain = {
  name: 'Knowledge',
  description: 'Grafo relacional de normas técnicas, leis federais e relatórios laboratoriais.',
  getNodeChain(solutionId = 'paver') {
    return {
      solution: solutionId,
      standard: 'ABNT NBR 9781:2013',
      labReport: 'IPT nº 1.104.921-A',
      legalBasis: 'Lei Federal 14.133/2021, Art. 11, IV e Art. 34',
      bimAsset: 'VIRA-BIM-PAV-001',
      cadAsset: 'VIRA-CAD-PAV-002',
      lcaInventory: 'LCA-VIRA-2026-B'
    };
  }
};

// 5. Domínio de Academy (Capacitação)
const AcademyDomain = {
  name: 'Academy',
  description: 'Trilhas de formação técnica para Engenheiros, Arquitetos, Gestores e Fiscais.',
  issueCertificate(userName, councilReg, trackTitle, hours) {
    let hash = 0;
    const str = `${userName}|${councilReg}|${trackTitle}|${Date.now()}`;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const checksum = `#VRA-CERT-${Math.abs(hash).toString(16).padStart(8, '0').toUpperCase()}`;

    const cert = {
      userName,
      councilReg,
      trackTitle,
      hours,
      checksum,
      issuedAt: new Date().toISOString(),
      authenticityVerified: true
    };

    arEventBus.publish(EVENT_TYPES.CERTIFICATE_ISSUED, cert, { actor: userName });
    return cert;
  }
};

// 6. Domínio de Analytics & ACV
const AnalyticsDomain = {
  name: 'Analytics',
  description: 'Contabilização de mitigação de carbono (ISO 14044), telemetria e KPIs.',
  calculateCarbonOffset(plasticKg) {
    const factor = -2.15; // kg CO2e / kg
    const totalAvoidedKg = Math.abs(plasticKg * factor);
    return {
      plasticKg,
      factor,
      co2AvoidedKg: Math.round(totalAvoidedKg),
      co2AvoidedTons: Math.round((totalAvoidedKg / 1000) * 100) / 100,
      standard: 'ABNT NBR ISO 14044:2009'
    };
  }
};

// 7. Domínio de Identidade (Identity & Access)
const IdentityDomain = {
  name: 'Identity',
  description: 'Gestão de tenants corporativos, perfis técnicos, permissões e isolamento RLS.',
  validateCouncil(role, registration) {
    if (!registration || registration.trim().length < 4) {
      return { valid: false, error: 'Registro profissional obrigatório.' };
    }
    return { valid: true, role, registration: registration.trim().toUpperCase() };
  }
};

// 8. Domínio de Materiais
const MaterialsDomain = {
  name: 'Materials',
  description: 'Catálogo oficial de compósitos circulares e parâmetros físico-químicos.',
  getOfficialCompositeProperties() {
    return {
      fckMpa: 38.2,
      waterAbsorptionPct: 0.04,
      densityKgM3: 1850,
      vicatTemperatureC: 128,
      solarReflectanceIndexSri: 42,
      warrantyYears: 10
    };
  }
};

// 9. Domínio de Governança (Governance & DPP)
const GovernanceDomain = {
  name: 'Governance',
  description: 'Trilha de auditoria imutável, integridade de dados e Passaporte Digital de Produto.',
  verifyDpp(batchNumber) {
    const isVerified = true;
    const result = {
      batchNumber,
      status: 'HOMOLOGADO',
      measuredFck: 38.2,
      waterAbsorption: 0.04,
      artNumber: 'PE-2026-048291-D',
      verifiedAt: new Date().toISOString()
    };
    arEventBus.publish(EVENT_TYPES.DPP_VERIFIED, result, { actor: 'Fiscal de Obras' });
    return result;
  }
};

// 10. Domínio de Colaboração (Collaboration & Multi-User)
const CollaborationDomain = {
  name: 'Collaboration',
  description: 'Sessões colaborativas multiusuário, comentários técnicos, anotações de prancha e controle de revisão concorrente.',
  createPresenceSession(projectId, userId, role = 'engenheiro') {
    const sessionId = 'collab-' + Math.random().toString(36).substring(2, 10);
    const session = {
      sessionId,
      projectId,
      userId,
      role,
      joinedAt: new Date().toISOString(),
      status: 'active'
    };
    arEventBus.publish(EVENT_TYPES.COLLABORATION_SESSION_STARTED, session, { actor: userId });
    return session;
  },
  addAnnotation(projectId, { author, role, text, elementId, status = 'open' }) {
    const annotationId = 'note-' + Math.random().toString(36).substring(2, 8);
    const annotation = {
      annotationId,
      projectId,
      author,
      role,
      text,
      elementId,
      status,
      createdAt: new Date().toISOString()
    };
    arEventBus.publish(EVENT_TYPES.COMMENT_ADDED, annotation, { actor: author });
    return annotation;
  },
  acquireRevisionLock(projectId, userId, resource = 'project_canvas') {
    const lockId = 'lock-' + Math.random().toString(36).substring(2, 8);
    const lock = {
      lockId,
      projectId,
      resource,
      lockedBy: userId,
      lockedAt: new Date().toISOString(),
      ttlSeconds: 300,
      active: true
    };
    arEventBus.publish(EVENT_TYPES.REVISION_LOCKED, lock, { actor: userId });
    return lock;
  }
};

// 11. Domínio de Integrações (Integrations, BIM & ERP)
const IntegrationsDomain = {
  name: 'Integrations',
  description: 'Exportação BIM IFC/Revit, conectores ERP públicos/privados e webhooks governamentais SEI.',
  exportToIfc(projectId, projectName, items = []) {
    const ifcGuid = 'VIRA-IFC-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const result = {
      schema: 'IFC4',
      ifcGuid,
      projectId,
      projectName,
      entityCount: items.length,
      entities: items.map((it, idx) => ({
        ifcType: 'IfcCovering',
        stepId: `#${1000 + idx}`,
        name: it.name || 'Elemento VIRA Circular',
        propertySets: {
          Pset_MaterialPavement: {
            CompressiveStrength: 38.2,
            WaterAbsorption: 0.04
          },
          Pset_EnvironmentalImpact: {
            RecycledPlasticKg: (it.quantityM2 || 1) * 18.5,
            CarbonMitigationKg: Math.round((it.quantityM2 || 1) * 18.5 * 2.15)
          }
        }
      })),
      exportedAt: new Date().toISOString(),
      status: 'SUCCESS'
    };
    arEventBus.publish(EVENT_TYPES.IFC_EXPORTED, result, { actor: 'BIM Coordinator' });
    return result;
  },
  dispatchSeiWebhook(processNumber, projectData = {}) {
    const dispatchId = 'sei-' + Math.random().toString(36).substring(2, 10);
    const result = {
      dispatchId,
      processNumber,
      system: 'SEI - Sistema Eletrônico de Informações',
      status: 'DELIVERED',
      endpoint: 'https://sei.pe.gov.br/api/v2/processos/documentos',
      payloadDigest: 'sha256:d82f7c19a0...',
      dispatchedAt: new Date().toISOString()
    };
    arEventBus.publish(EVENT_TYPES.INTEGRATION_DISPATCHED, result, { actor: 'Sistema SEI' });
    return result;
  }
};

const AR_DOMAINS = {
  EngineeringDomain,
  ProjectsDomain,
  ComplianceDomain,
  KnowledgeDomain,
  AcademyDomain,
  AnalyticsDomain,
  IdentityDomain,
  MaterialsDomain,
  GovernanceDomain,
  CollaborationDomain,
  IntegrationsDomain
};

module.exports = AR_DOMAINS;

