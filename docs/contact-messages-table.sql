-- ============================================
-- SCRIPT SQL SIMPLIFICADO PARA EDGE FUNCTION
-- Tabla: contact_messages
-- ============================================

-- Este es un script alternativo más simple si prefieres usar
-- la Edge Function con una tabla genérica de mensajes.

-- OPCIÓN 1: Usar tabla genérica contact_messages
-- ============================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    source TEXT DEFAULT 'web',
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Habilitar RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones (todas las solicitudes vienen vía Edge Function)
CREATE POLICY "Enable insert via service role" 
ON contact_messages
FOR INSERT
WITH CHECK (true);

-- Política para lectura (solo usuarios autenticados o service role)
CREATE POLICY "Enable read for authenticated users" 
ON contact_messages
FOR SELECT
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Vista simple para estadísticas
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    COUNT(*) as total_messages,
    COUNT(DISTINCT email) as unique_emails,
    MAX(created_at) as last_message_at,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '24 hours' THEN 1 END) as messages_last_24h,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as messages_last_7d
FROM contact_messages;

-- Comentarios
COMMENT ON TABLE contact_messages IS 'Mensajes de contacto/feedback desde formularios web';
COMMENT ON COLUMN contact_messages.user_agent IS 'Navegador del usuario (opcional)';

-- ============================================
-- NOTAS IMPORTANTES
-- ============================================

/*
Esta tabla es más simple y no incluye las validaciones avanzadas del otro script.
Úsala si quieres una solución más genérica y flexible.

Si ya ejecutaste supabase-setup.sql y prefieres usar la tabla
maldives_experience_feedback con todas sus validaciones, NO necesitas este script.

Para migrar de una tabla a otra, puedes:

-- Ver datos de contact_messages
SELECT * FROM contact_messages ORDER BY created_at DESC;

-- Exportar a CSV desde el Table Editor de Supabase
-- Importar en maldives_experience_feedback adaptando los campos
*/
