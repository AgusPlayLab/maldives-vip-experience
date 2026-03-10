-- ============================================
-- SCRIPT DE CONFIGURACIÓN DE SUPABASE
-- Maldives VIP Experience - Feedback System
-- ============================================

-- 1. CREAR TABLA PRINCIPAL DE FEEDBACK
-- ============================================
CREATE TABLE IF NOT EXISTS maldives_experience_feedback (
    -- Identificador único
    id BIGSERIAL PRIMARY KEY,
    
    -- Datos del formulario
    passenger_name TEXT NOT NULL,
    experience_rating INTEGER NOT NULL CHECK (experience_rating >= 1 AND experience_rating <= 5),
    favorite_activity TEXT NOT NULL,
    fun_level TEXT NOT NULL,
    would_repeat TEXT NOT NULL,
    comment TEXT,
    
    -- Datos de seguridad y auditoría
    source TEXT DEFAULT 'web',
    user_agent TEXT,
    honeypot_value TEXT,  -- Si tiene valor, es spam
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índice para búsquedas rápidas
    CONSTRAINT valid_fun_level CHECK (fun_level IN ('Muy divertido', 'Divertido', 'Normal', 'Poco divertido')),
    CONSTRAINT valid_would_repeat CHECK (would_repeat IN ('Sí', 'Tal vez', 'No'))
);

-- 2. CREAR ÍNDICES PARA OPTIMIZAR CONSULTAS
-- ============================================
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON maldives_experience_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON maldives_experience_feedback(experience_rating);
CREATE INDEX IF NOT EXISTS idx_feedback_favorite_activity ON maldives_experience_feedback(favorite_activity);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE maldives_experience_feedback ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE SEGURIDAD
-- ============================================

-- Política para permitir inserciones públicas con validación
CREATE POLICY "Enable insert for valid feedback" 
ON maldives_experience_feedback
FOR INSERT
WITH CHECK (
    -- Validar que no sea spam (honeypot vacío)
    (honeypot_value IS NULL OR honeypot_value = '') AND
    -- Validar que tenga nombre
    LENGTH(TRIM(passenger_name)) >= 2 AND
    -- Validar que el rating sea válido
    experience_rating BETWEEN 1 AND 5 AND
    -- Validar actividad favorita no esté vacía
    LENGTH(TRIM(favorite_activity)) >= 2
);

-- Política para permitir lecturas públicas (opcional)
CREATE POLICY "Enable read for all users" 
ON maldives_experience_feedback
FOR SELECT
USING (true);

-- 5. FUNCIÓN PARA RATE LIMITING
-- ============================================
-- Esta función previene envíos masivos desde la misma fuente

CREATE OR REPLACE FUNCTION check_feedback_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
    recent_count INTEGER;
BEGIN
    -- Contar feedbacks de los últimos 5 minutos con el mismo nombre
    SELECT COUNT(*) INTO recent_count
    FROM maldives_experience_feedback
    WHERE passenger_name = NEW.passenger_name
      AND created_at > NOW() - INTERVAL '5 minutes';
    
    -- Si ya envió en los últimos 5 minutos, rechazar
    IF recent_count > 0 THEN
        RAISE EXCEPTION 'Rate limit exceeded. Please wait 5 minutes before submitting again.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger de rate limiting
CREATE TRIGGER feedback_rate_limit_trigger
    BEFORE INSERT ON maldives_experience_feedback
    FOR EACH ROW
    EXECUTE FUNCTION check_feedback_rate_limit();

-- 6. TABLA DE AUDITORÍA (OPCIONAL)
-- ============================================
-- Registra intentos de spam o formularios bloqueados

CREATE TABLE IF NOT EXISTS feedback_audit_log (
    id BIGSERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,  -- 'spam_detected', 'rate_limited', 'validation_failed'
    passenger_name TEXT,
    honeypot_value TEXT,
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_created_at ON feedback_audit_log(created_at DESC);

-- 7. FUNCIÓN PARA DETECTAR SPAM
-- ============================================
CREATE OR REPLACE FUNCTION log_spam_attempt()
RETURNS TRIGGER AS $$
BEGIN
    -- Si el honeypot tiene valor, es spam
    IF NEW.honeypot_value IS NOT NULL AND NEW.honeypot_value != '' THEN
        INSERT INTO feedback_audit_log (
            event_type,
            passenger_name,
            honeypot_value,
            user_agent,
            details
        ) VALUES (
            'spam_detected',
            NEW.passenger_name,
            NEW.honeypot_value,
            NEW.user_agent,
            jsonb_build_object(
                'rating', NEW.experience_rating,
                'activity', NEW.favorite_activity
            )
        );
        
        -- Rechazar el insert
        RAISE EXCEPTION 'Invalid submission detected';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger anti-spam
CREATE TRIGGER feedback_spam_detection_trigger
    BEFORE INSERT ON maldives_experience_feedback
    FOR EACH ROW
    EXECUTE FUNCTION log_spam_attempt();

-- 8. VISTAS ÚTILES PARA ANÁLISIS
-- ============================================

-- Vista de estadísticas generales
CREATE OR REPLACE VIEW feedback_stats AS
SELECT 
    COUNT(*) as total_feedbacks,
    ROUND(AVG(experience_rating), 2) as avg_rating,
    COUNT(CASE WHEN experience_rating = 5 THEN 1 END) as five_stars,
    COUNT(CASE WHEN experience_rating = 4 THEN 1 END) as four_stars,
    COUNT(CASE WHEN experience_rating = 3 THEN 1 END) as three_stars,
    COUNT(CASE WHEN experience_rating = 2 THEN 1 END) as two_stars,
    COUNT(CASE WHEN experience_rating = 1 THEN 1 END) as one_star,
    COUNT(CASE WHEN would_repeat = 'Sí' THEN 1 END) as would_repeat_yes,
    COUNT(CASE WHEN would_repeat = 'Tal vez' THEN 1 END) as would_repeat_maybe,
    COUNT(CASE WHEN would_repeat = 'No' THEN 1 END) as would_repeat_no
FROM maldives_experience_feedback;

-- Vista de actividades favoritas
CREATE OR REPLACE VIEW top_favorite_activities AS
SELECT 
    favorite_activity,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM maldives_experience_feedback), 2) as percentage
FROM maldives_experience_feedback
GROUP BY favorite_activity
ORDER BY count DESC;

-- Vista de feedbacks recientes (últimos 30 días)
CREATE OR REPLACE VIEW recent_feedbacks AS
SELECT 
    passenger_name,
    experience_rating,
    favorite_activity,
    fun_level,
    would_repeat,
    comment,
    created_at
FROM maldives_experience_feedback
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- 9. FUNCIÓN PARA LIMPIAR DATOS ANTIGUOS (OPCIONAL)
-- ============================================
-- Elimina feedbacks de más de 1 año (si lo deseas)

CREATE OR REPLACE FUNCTION cleanup_old_feedbacks()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM maldives_experience_feedback
    WHERE created_at < NOW() - INTERVAL '1 year'
    RETURNING COUNT(*) INTO deleted_count;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- 10. COMENTARIOS EN LAS TABLAS
-- ============================================
COMMENT ON TABLE maldives_experience_feedback IS 'Almacena los feedbacks de la experiencia VIP en Maldivas';
COMMENT ON COLUMN maldives_experience_feedback.honeypot_value IS 'Campo trampa para detectar bots (debe estar vacío)';
COMMENT ON COLUMN maldives_experience_feedback.user_agent IS 'Navegador del usuario para análisis';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- NOTAS DE USO:
-- 1. Ejecuta este script completo en el SQL Editor de Supabase
-- 2. Obtén tus credenciales en Settings > API
-- 3. Configura SUPABASE_URL y SUPABASE_ANON_KEY en js/supabase.js
-- 4. El rate limiting está configurado a 1 feedback cada 5 minutos por nombre
-- 5. Los intentos de spam se registran en feedback_audit_log

-- CONSULTAS ÚTILES DESPUÉS DE LA INSTALACIÓN:
-- Ver estadísticas: SELECT * FROM feedback_stats;
-- Ver top actividades: SELECT * FROM top_favorite_activities;
-- Ver feedbacks recientes: SELECT * FROM recent_feedbacks LIMIT 10;
-- Ver intentos de spam: SELECT * FROM feedback_audit_log ORDER BY created_at DESC;
-- Limpiar datos antiguos: SELECT cleanup_old_feedbacks();
