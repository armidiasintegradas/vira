/**
 * AR OS — Background Job Queue & Workers Engine
 * Holding: AR Mídias Integradas
 * Gerencia execução assíncrona fora da thread principal de UI
 */

class InMemoryJobQueue {
  constructor() {
    this.jobs = [];
    this.handlers = new Map();
  }

  enqueue(queueName, payload) {
    const job = {
      id: 'job-' + Math.random().toString(36).substring(2, 9),
      queueName,
      payload,
      status: 'pending',
      attempts: 0,
      createdAt: new Date().toISOString()
    };
    this.jobs.push(job);
    return job;
  }

  registerWorker(queueName, handler) {
    this.handlers.set(queueName, handler);
  }

  async processNext(queueName) {
    const job = this.jobs.find(j => j.queueName === queueName && j.status === 'pending');
    if (!job) return null;

    const handler = this.handlers.get(queueName);
    if (!handler) {
      job.status = 'failed';
      job.lastError = 'Nenhum worker registrado para ' + queueName;
      return job;
    }

    job.status = 'processing';
    job.attempts += 1;
    try {
      const result = await handler(job.payload);
      job.status = 'completed';
      job.result = result;
      job.completedAt = new Date().toISOString();
      return job;
    } catch (err) {
      job.status = 'failed';
      job.lastError = err.message;
      return job;
    }
  }

  getJobsByQueue(queueName) {
    return this.jobs.filter(j => j.queueName === queueName);
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

module.exports = { InMemoryJobQueue, arJobQueue };
