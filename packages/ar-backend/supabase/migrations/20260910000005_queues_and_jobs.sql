-- ========================================================
-- AR OS BACKEND • MIGRATION 005: JOBS & WORKERS QUEUE
-- Holding: AR Mídias Integradas
-- Filas assíncronas para PDFs, Embeddings de IA e Telemetria
-- ========================================================

CREATE TYPE job_status_enum AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'retrying'
);

CREATE TABLE IF NOT EXISTS background_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name VARCHAR(50) NOT NULL, -- 'pdf_generation' | 'ia_embeddings' | 'telemetry_aggregation'
  payload JSONB NOT NULL,
  status job_status_enum NOT NULL DEFAULT 'pending',
  attempts INT NOT NULL DEFAULT 0,
  max_attempts INT NOT NULL DEFAULT 3,
  last_error TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_queue_status 
ON background_jobs(queue_name, status, scheduled_at);

-- Função transacional para claim atômico de jobs da fila
CREATE OR REPLACE FUNCTION claim_next_job(p_queue_name VARCHAR(50))
RETURNS TABLE (
  job_id UUID,
  job_payload JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  UPDATE background_jobs
  SET status = 'processing',
      started_at = NOW(),
      attempts = attempts + 1
  WHERE id = (
    SELECT id
    FROM background_jobs
    WHERE queue_name = p_queue_name
      AND status = 'pending'
      AND scheduled_at <= NOW()
    ORDER BY scheduled_at ASC
    FOR UPDATE SKIP LOCKED
    LIMIT 1
  )
  RETURNING id AS job_id, payload AS job_payload;
END;
$$;
