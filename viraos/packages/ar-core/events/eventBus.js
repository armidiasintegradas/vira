/**
 * AR OS — Event Bus Corporativo (Event-Driven Architecture)
 * Holding: AR Mídias Integradas
 * Desacopla a emissão de transições de estado entre domínios e aplicações
 */

const EVENT_TYPES = {
  // Projects Domain
  PROJECT_CREATED: 'ar.domain.projects.created.v1',
  PROJECT_CREATED_V1: 'ar.domain.projects.created.v1',
  PROJECT_CREATED_V2: 'ar.domain.projects.created.v2',
  PROJECT_UPDATED: 'ar.domain.projects.updated.v1',
  MATERIAL_ADDED: 'ar.domain.projects.material_added.v1',
  EXPORT_COMPLETED: 'ar.domain.projects.export_completed.v1',

  // Compliance Domain
  SPECIFICATION_APPROVED: 'ar.domain.compliance.specification_approved.v1',
  REPORT_GENERATED: 'ar.domain.compliance.report_generated.v1',

  // Governance & DPP Domain
  DPP_VERIFIED: 'ar.domain.governance.dpp_verified.v1',
  DPP_VERIFIED_V1: 'ar.domain.governance.dpp_verified.v1',
  DPP_VERIFIED_V2: 'ar.domain.governance.dpp_verified.v2',

  // Academy Domain
  CERTIFICATE_ISSUED: 'ar.domain.academy.certificate_issued.v1',

  // Platform & UI
  THEME_CHANGED: 'ar.platform.theme.changed.v1',

  // Collaboration Domain (NOVO)
  COLLABORATION_SESSION_STARTED: 'ar.domain.collaboration.session_started.v1',
  COMMENT_ADDED: 'ar.domain.collaboration.comment_added.v1',
  REVISION_LOCKED: 'ar.domain.collaboration.revision_locked.v1',

  // Integrations Domain (NOVO)
  INTEGRATION_DISPATCHED: 'ar.domain.integrations.dispatched.v1',
  IFC_EXPORTED: 'ar.domain.integrations.ifc_exported.v1'
};

class EventBus {
  constructor() {
    this.handlers = new Map();
    this.history = [];
    this.maxHistory = 500;
  }

  /**
   * Registra um ouvinte para um tipo específico de evento
   * @param {string} eventType
   * @param {Function} handler
   * @returns {Function} Unsubscribe function
   */
  subscribe(eventType, handler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType).add(handler);

    return () => {
      const set = this.handlers.get(eventType);
      if (set) set.delete(handler);
    };
  }

  /**
   * Publica um evento no barramento com metadados e checksum
   * @param {string} eventType
   * @param {Object} payload
   * @param {Object} [meta]
   */
  publish(eventType, payload, meta = {}) {
    const timestamp = new Date().toISOString();
    const eventId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : 'evt-' + Math.random().toString(36).substring(2, 10);

    // Checksum determinístico do evento
    const str = `${eventId}|${eventType}|${timestamp}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const checksum = Math.abs(hash).toString(16).padStart(8, '0');

    // Extração de versão semântica do evento (.v1, .v2, etc.)
    const versionMatch = eventType.match(/\.(v\d+)$/);
    const eventVersion = versionMatch ? versionMatch[1] : (meta.version || 'v1');
    const baseEventType = versionMatch ? eventType.slice(0, -versionMatch[0].length) : eventType;

    const eventRecord = {
      id: eventId,
      type: eventType,
      version: eventVersion,
      timestamp,
      checksum,
      tenant: meta.tenant || 'default',
      brand: meta.brand || 'vira',
      actor: meta.actor || 'system',
      payload
    };

    // Armazena no histórico auditável
    this.history.unshift(eventRecord);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }

    // Notifica ouvintes cadastrados no tópico exato
    const set = this.handlers.get(eventType);
    if (set) {
      set.forEach(fn => {
        try {
          fn(eventRecord);
        } catch (err) {
          console.error(`[AR EventBus] Erro no handler de ${eventType}:`, err);
        }
      });
    }

    // Compatibilidade retroativa: se o evento for versionado (.v1), notifica também ouvintes do tópico base
    if (baseEventType !== eventType) {
      const baseSet = this.handlers.get(baseEventType);
      if (baseSet) {
        baseSet.forEach(fn => {
          try {
            fn(eventRecord);
          } catch (err) {
            console.error(`[AR EventBus] Erro no handler base de ${baseEventType}:`, err);
          }
        });
      }
    }

    // Notifica ouvintes globais com wildcard '*'
    const globalSet = this.handlers.get('*');
    if (globalSet) {
      globalSet.forEach(fn => {
        try {
          fn(eventRecord);
        } catch (err) {
          console.error(`[AR EventBus] Erro no handler global:`, err);
        }
      });
    }

    return eventRecord;
  }

  /**
   * Recupera o histórico recente de eventos
   * @param {string} [filterType]
   */
  getHistory(filterType) {
    if (!filterType) return [...this.history];
    return this.history.filter(e => e.type === filterType);
  }

  clear() {
    this.handlers.clear();
    this.history = [];
  }
}

const arEventBus = new EventBus();

if (typeof window !== 'undefined') {
  window.EVENT_TYPES = EVENT_TYPES;
  window.arEventBus = arEventBus;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EVENT_TYPES, EventBus, arEventBus };
}
