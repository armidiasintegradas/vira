-- ========================================================
-- AR OS BACKEND • MIGRATION 004: PGVECTOR & KNOWLEDGE BASE
-- Holding: AR Mídias Integradas
-- Busca Semântica em Normas ABNT, Leis e Laudos Técnicos
-- ========================================================

-- Extensão Vetorial para IA
CREATE EXTENSION IF NOT EXISTS vector;

-- Fragmentos Normativos Vetorizados para RAG (Retrieval Augmented Generation)
CREATE TABLE IF NOT EXISTS normative_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type VARCHAR(50) NOT NULL, -- 'norma_abnt' | 'lei_federal' | 'laudo_ipt'
  code VARCHAR(50) NOT NULL, -- 'ABNT NBR 9781' | 'Lei 14.133/2021'
  title VARCHAR(255) NOT NULL,
  section VARCHAR(100),
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- Compatível com OpenAI text-embedding-3 / Gemini Embeddings
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice de Busca Vetorial HNSW (Hierarchical Navigable Small World)
CREATE INDEX IF NOT EXISTS idx_normative_embedding 
ON normative_chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Função de Busca Semântica
CREATE OR REPLACE FUNCTION match_normative_chunks(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.75,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  code VARCHAR(50),
  title VARCHAR(255),
  section VARCHAR(100),
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    nc.id,
    nc.code,
    nc.title,
    nc.section,
    nc.content,
    1 - (nc.embedding <=> query_embedding) AS similarity
  FROM normative_chunks nc
  WHERE 1 - (nc.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
