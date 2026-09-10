-- ========================================================
-- AR OS BACKEND • MIGRATION 003: POSTGIS & DPP
-- Holding: AR Mídias Integradas
-- Mapa Operacional de Obras & Rastreabilidade de Lotes
-- ========================================================

-- Extensão Geoespacial
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Canteiros de Obra & Intervenções Georreferenciadas (V4.2)
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  brand brand_enum NOT NULL DEFAULT 'vira',
  name VARCHAR(255) NOT NULL,
  location_point GEOGRAPHY(Point, 4326),
  boundary_polygon GEOGRAPHY(Polygon, 4326),
  address TEXT,
  total_area_m2 NUMERIC(10, 2),
  carbon_avoided_kg NUMERIC(12, 2) DEFAULT 0.00,
  stage VARCHAR(50) NOT NULL DEFAULT 'planejamento', -- 'planejamento' | 'execucao' | 'concluido'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Passaportes Digitais de Produto (Digital Product Passports - DPP)
CREATE TABLE IF NOT EXISTS digital_product_passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand brand_enum NOT NULL DEFAULT 'vira',
  batch_number VARCHAR(100) NOT NULL UNIQUE,
  material_code VARCHAR(50) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  manufacture_date DATE NOT NULL,
  factory_location VARCHAR(100) NOT NULL DEFAULT 'Caruaru - PE',
  art_number VARCHAR(50) NOT NULL,
  technical_lead VARCHAR(255) NOT NULL,
  lab_report_protocol VARCHAR(100) NOT NULL, -- IPT nº 1.104.921-A
  measured_fck_mpa NUMERIC(5, 2) NOT NULL DEFAULT 38.20,
  measured_water_absorption_pct NUMERIC(4, 2) NOT NULL DEFAULT 0.04,
  lca_factor_co2 NUMERIC(6, 2) NOT NULL DEFAULT -2.15,
  qr_code_hash VARCHAR(64) NOT NULL UNIQUE,
  is_verified BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices Espaciais e de Busca
CREATE INDEX IF NOT EXISTS idx_sites_geo ON sites USING GIST(location_point);
CREATE INDEX IF NOT EXISTS idx_dpp_batch ON digital_product_passports(batch_number);
CREATE INDEX IF NOT EXISTS idx_dpp_qr ON digital_product_passports(qr_code_hash);
