-- ========================================================
-- AR OS BACKEND • MIGRATION 002: ROW LEVEL SECURITY (RLS)
-- Holding: AR Mídias Integradas
-- Blindagem Multi-Tenant e Isolamento de Dados
-- ========================================================

-- Habilita RLS em todas as tabelas sensíveis
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper para obter tenant do usuário logado
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. Políticas de Profiles
CREATE POLICY "Usuário pode visualizar seu próprio perfil"
ON profiles FOR SELECT USING (id = auth.uid());

CREATE POLICY "Usuário pode atualizar seu próprio perfil"
ON profiles FOR UPDATE USING (id = auth.uid());

-- 2. Políticas de Tenants
CREATE POLICY "Usuários veem apenas sua própria organização"
ON tenants FOR SELECT USING (id = get_current_tenant_id());

-- 3. Políticas de Projects (Isolamento estrito entre municípios e construtoras)
CREATE POLICY "Usuários acessam projetos do seu tenant"
ON projects FOR SELECT USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Usuários podem criar projetos no seu tenant"
ON projects FOR INSERT WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Usuários podem atualizar projetos do seu tenant"
ON projects FOR UPDATE USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Usuários podem deletar projetos do seu tenant"
ON projects FOR DELETE USING (tenant_id = get_current_tenant_id());

-- 4. Políticas de Project Items
CREATE POLICY "Usuários acessam itens de projetos autorizados"
ON project_items FOR ALL USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_items.project_id
    AND projects.tenant_id = get_current_tenant_id()
  )
);

-- 5. Políticas de Audit Logs (Append-Only: Ninguém pode atualizar ou deletar logs)
CREATE POLICY "Visualização de logs restrita ao tenant"
ON project_audit_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_audit_logs.project_id
    AND projects.tenant_id = get_current_tenant_id()
  )
);

CREATE POLICY "Inserção permitida de logs auditados"
ON project_audit_logs FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE projects.id = project_audit_logs.project_id
    AND projects.tenant_id = get_current_tenant_id()
  )
);
