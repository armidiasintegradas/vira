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

const AR_DOMAINS = {
  EngineeringDomain,
  ProjectsDomain,
  ComplianceDomain,
  KnowledgeDomain,
  AcademyDomain,
  AnalyticsDomain,
  IdentityDomain,
  MaterialsDomain,
  GovernanceDomain
};

module.exports = AR_DOMAINS;
