/**
 * AR OS — Background Job Queue & Workers Engine
 * Holding: AR Mídias Integradas
 * Gerencia execução assíncrona fora da thread principal de UI
 */

const SLA_TIERS = {
  CRITICAL: { name: 'critical', priority: 100, maxLatencyMs: 2000, description: 'SLA < 2s — Auditoria imediata, travas concorrentes e eventos críticos' },
  NORMAL: { name: 'normal', priority: 50, maxLatencyMs: 30000, description: 'SLA < 30s — Geração de cadernos executivos PDF, exportações e memoriais' },
  BACKGROUND: { name: 'background', priority: 20, maxLatencyMs: 300000, description: 'SLA < 5min — Vetorização IA de normas e consolidação ACV' },
  SCHEDULED: { name: 'scheduled', priority: 10, maxLatencyMs: 3600000, description: 'SLA < 1h — Rollup de telemetria, rotinas de integridade e diagnósticos' }
};

class InMemoryJobQueue {
  constructor() {
    this.jobs = [];
    this.handlers = new Map();
  }

  enqueue(queueName, payload, options = {}) {
    const tierName = (typeof options === 'string' ? options : (options.slaTier || 'normal')).toUpperCase();
    const sla = SLA_TIERS[tierName] || SLA_TIERS.NORMAL;

    const job = {
      id: 'job-' + Math.random().toString(36).substring(2, 9),
      queueName,
      payload,
      status: 'pending',
      slaTier: sla.name,
      priority: sla.priority,
      slaMaxLatencyMs: sla.maxLatencyMs,
      attempts: 0,
      createdAt: new Date().toISOString(),
      enqueuedAtMs: Date.now()
    };
    this.jobs.push(job);
    return job;
  }

  registerWorker(queueName, handler) {
    this.handlers.set(queueName, handler);
  }

  async processNext(queueName) {
    // Filtra jobs pendentes da fila e ordena por maior prioridade (SLA Critical > Normal > Background > Scheduled)
    const pendingJobs = this.jobs
      .filter(j => j.queueName === queueName && j.status === 'pending')
      .sort((a, b) => b.priority - a.priority || a.enqueuedAtMs - b.enqueuedAtMs);

    const job = pendingJobs[0];
    if (!job) return null;

    const handler = this.handlers.get(queueName);
    if (!handler) {
      job.status = 'failed';
      job.lastError = 'Nenhum worker registrado para ' + queueName;
      return job;
    }

    job.status = 'processing';
    job.attempts += 1;
    const startTime = Date.now();
    try {
      const result = await handler(job.payload);
      const durationMs = Date.now() - startTime;
      job.status = 'completed';
      job.result = result;
      job.durationMs = durationMs;
      job.slaMet = durationMs <= job.slaMaxLatencyMs;
      job.completedAt = new Date().toISOString();
      return job;
    } catch (err) {
      job.status = 'failed';
      job.lastError = err.message;
      job.durationMs = Date.now() - startTime;
      job.slaMet = false;
      return job;
    }
  }

  getJobsByQueue(queueName) {
    return this.jobs.filter(j => j.queueName === queueName);
  }

  getMetrics() {
    const total = this.jobs.length;
    const completed = this.jobs.filter(j => j.status === 'completed');
    const pending = this.jobs.filter(j => j.status === 'pending').length;
    const failed = this.jobs.filter(j => j.status === 'failed').length;
    const withinSla = completed.filter(j => j.slaMet).length;

    return {
      totalJobs: total,
      pendingJobs: pending,
      completedJobs: completed.length,
      failedJobs: failed,
      slaComplianceRate: completed.length > 0 ? Math.round((withinSla / completed.length) * 100) : 100,
      slaTiers: SLA_TIERS
    };
  }
}

const arJobQueue = new InMemoryJobQueue();

// Workers canônicos do ecossistema AR OS
arJobQueue.registerWorker('pdf_generation', async (payload) => {
  return {
    documentType: payload.documentType || 'memorial_licitacao',
    fileUrl: `https://storage.arplatform.com.br/cadernos/${payload.projectId || 'projeto'}-executivo.pdf`,
    generatedAt: new Date().toISOString()
  };
});

arJobQueue.registerWorker('ia_embeddings', async (payload) => {
  return {
    standardCode: payload.code,
    chunksIndexed: payload.chunks ? payload.chunks.length : 12,
    dimensions: 1536,
    indexedAt: new Date().toISOString()
  };
});

arJobQueue.registerWorker('telemetry_aggregation', async (payload) => {
  return {
    aggregatedEvents: payload.eventCount || 42,
    avgTtsSeconds: 88,
    status: 'OPTIMAL'
  };
});

module.exports = { InMemoryJobQueue, arJobQueue, SLA_TIERS };
