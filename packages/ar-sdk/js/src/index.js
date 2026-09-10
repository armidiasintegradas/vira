/**
 * @ar-platform/sdk — Cliente Oficial JavaScript / TypeScript
 * AR OS • AR Mídias Integradas
 */

class ArClient {
  /**
   * @param {Object} options
   * @param {string} [options.apiKey]
   * @param {string} [options.baseUrl]
   * @param {string} [options.tenant]
   * @param {string} [options.brand] 'vira' | 'verdis' | 'replasticando' | 'reciclobike' | 'muta'
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey || 'ar_test_key_sandbox';
    this.baseUrl = (options.baseUrl || 'https://api.arplatform.com.br/v1').replace(/\/$/, '');
    this.tenant = options.tenant || 'default';
    this.brand = options.brand || 'vira';

    // Sub-clientes de domínio
    this.materials = new MaterialsResource(this);
    this.projects = new ProjectsResource(this);
    this.compliance = new ComplianceResource(this);
    this.dpp = new DppResource(this);
    this.academy = new AcademyResource(this);
  }

  async _request(endpoint, options = {}) {
    // Se estiver em ambiente mock ou sem fetch externo
    if (typeof fetch === 'undefined' || this.apiKey.includes('sandbox')) {
      return this._mockResponse(endpoint, options);
    }

    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'X-AR-Tenant': this.tenant,
      'X-AR-Brand': this.brand,
      ...options.headers
    };

    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      throw new Error(`[AR OS SDK] Erro na requisição HTTP ${res.status}: ${res.statusText}`);
    }

    return res.json();
  }

  _mockResponse(endpoint, options) {
    const timestamp = new Date().toISOString();
    const governance = {
      dataTier: 'homologado',
      auditSource: 'IPT nº 1.104.921-A / ABNT NBR 9781:2013',
      accreditationNotice: 'Dados certificados por laboratório acreditado ou norma ABNT vigente.'
    };

    if (endpoint === '/materials') {
      return Promise.resolve({
        status: 200,
        timestamp,
        governance,
        data: [
          { id: 'paver', name: 'Paver Intertravado 16 Faces', fck: 38.2, lca: -2.15 },
          { id: 'painel', name: 'Painel Fachada Ventilada 15mm', fck: 28.0, lca: -2.15 },
          { id: 'perfil', name: 'Perfil Maciço 80x80mm', fck: 32.0, lca: -2.15 },
          { id: 'insumo', name: 'Composto VIRA-HD Granulado', fck: 35.0, lca: -2.15 }
        ]
      });
    }

    if (endpoint.startsWith('/dpp/')) {
      return Promise.resolve({
        status: 200,
        timestamp,
        governance,
        data: {
          batchNumber: 'LOTE-2026-VR09',
          brand: this.brand,
          status: 'HOMOLOGADO',
          fckMpa: 38.2,
          absorptionPct: 0.04,
          artNumber: 'PE-2026-048291',
          verified: true
        }
      });
    }

    return Promise.resolve({ status: 200, timestamp, governance, data: { ok: true, endpoint } });
  }
}

class MaterialsResource {
  constructor(client) { this.client = client; }
  async list() { return this.client._request('/materials'); }
  async get(id) { return this.client._request(`/materials/${id}`); }
}

class ProjectsResource {
  constructor(client) { this.client = client; }
  async list() { return this.client._request('/projects'); }
  async create(projectData) {
    return this.client._request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }
}

class ComplianceResource {
  constructor(client) { this.client = client; }
  async validate(solutionId) { return this.client._request(`/compliance/${solutionId}`); }
}

class DppResource {
  constructor(client) { this.client = client; }
  async verify(batchId) { return this.client._request(`/dpp/${this.client.brand}/${batchId}`); }
}

class AcademyResource {
  constructor(client) { this.client = client; }
  async getTracks() { return this.client._request('/academy/tracks'); }
}

function createArClient(options) {
  return new ArClient(options);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ArClient, createArClient };
}

if (typeof window !== 'undefined') {
  window.ArClient = ArClient;
  window.createArClient = createArClient;
}
