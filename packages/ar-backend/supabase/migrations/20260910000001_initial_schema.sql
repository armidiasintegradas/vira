-- ========================================================
-- AR OS BACKEND • MIGRATION 001: INITIAL SCHEMA
-- Holding: AR Mídias Integradas
-- Compatível com PostgreSQL 16+ e Supabase
-- ========================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums de Domínio
CREATE TYPE data_tier_enum AS ENUM (
  'homologado',
  'meta_produto',
  'exemplo_ilustrativo',
  'projeto_usuario'
);

CREATE TYPE brand_enum AS ENUM (
  'vira',
  'verdis',
  'replasticando',
  'reciclobike',
  'muta'
);

-- 1. Organizações & Tenants (Prefeituras, Construtoras, Consultorias)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) UNIQUE,
  type VARCHAR(50) NOT NULL DEFAULT 'consultoria', -- 'prefeitura' | 'construtora' | 'universidade' | 'consultoria'
  city VARCHAR(100),
  state VARCHAR(2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Usuários da Plataforma
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  full_name VARCHAR(255) NOT NULL,
  council_registration VARCHAR(50), -- CREA / CAU / Matrícula
  role VARCHAR(50) NOT NULL DEFAULT 'engenheiro', -- 'engenheiro' | 'arquiteto' | 'gestor' | 'fiscal' | 'admin'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Projetos do Workspace (Project Engine)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  brand brand_enum NOT NULL DEFAULT 'vira',
  schema_version INTEGER NOT NULL DEFAULT 4,
  name VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  purpose TEXT,
  responsible VARCHAR(255) NOT NULL,
  data_tier data_tier_enum NOT NULL DEFAULT 'projeto_usuario',
  status VARCHAR(50) NOT NULL DEFAULT 'em_estudo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Itens e Soluções Especificadas no Projeto
CREATE TABLE IF NOT EXISTS project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  solution_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL,
  quantity_m2 NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  density_kg_m2 NUMERIC(8, 2) NOT NULL DEFAULT 18.50,
  lca_factor_co2 NUMERIC(6, 2) NOT NULL DEFAULT 2.15,
  unit_cost_estimate NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Trilha de Auditoria Imutável (Audit Trail)
CREATE TABLE IF NOT EXISTS project_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL, -- 'PROJECT_CREATED' | 'ITEM_ADDED' | 'EXPORT_CSV'
  details TEXT NOT NULL,
  actor VARCHAR(255) NOT NULL,
  checksum CHAR(8) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices de Alta Performance
CREATE INDEX IF NOT EXISTS idx_projects_tenant_brand ON projects(tenant_id, brand);
CREATE INDEX IF NOT EXISTS idx_project_items_project ON project_items(project_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_project ON project_audit_logs(project_id, created_at DESC);
