/**
 * AR OS — Core Platform Exports
 * Holding: AR Mídias Integradas
 * 
 * Centraliza os pilares fundacionais do AR OS:
 * 1. Domínios DDD (11 Bounded Contexts)
 * 2. Barramento de Eventos Versionado (EventBus)
 * 3. Registro de Capacidades (Capability Registry)
 * 4. Motor de Chaves de Funcionalidade (Feature Flags)
 */

const AR_DOMAINS = require('./domains/index.js');
const { arEventBus, EVENT_TYPES, EventBus } = require('./events/eventBus.js');
const { arCapabilityRegistry, CapabilityRegistry } = require('./capabilities/registry.js');
const { arFeatureFlags, FeatureFlagService, FEATURE_MATURITY } = require('./features/featureFlags.js');

module.exports = {
  // Domínios DDD
  AR_DOMAINS,
  ...AR_DOMAINS,

  // EventBus Corporativo
  arEventBus,
  EVENT_TYPES,
  EventBus,

  // Capability Registry
  arCapabilityRegistry,
  CapabilityRegistry,

  // Feature Flags Engine
  arFeatureFlags,
  FeatureFlagService,
  FEATURE_MATURITY
};
