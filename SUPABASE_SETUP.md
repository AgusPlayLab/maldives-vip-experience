# Configuración de Supabase

Este documento explica cómo configurar Supabase para guardar el feedback de la experiencia.

## 1. Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

## 2. Crear la tabla en Supabase

Ejecuta este SQL en el editor SQL de Supabase:

```sql
-- Crear tabla para feedback de la experiencia
CREATE TABLE maldives_experience_feedback (
    id BIGSERIAL PRIMARY KEY,
    passenger_name TEXT NOT NULL,
    experience_rating INTEGER NOT NULL CHECK (experience_rating >= 1 AND experience_rating <= 5),
    favorite_activity TEXT NOT NULL,
    fun_level TEXT NOT NULL,
    would_repeat TEXT NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE maldives_experience_feedback ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones públicas (cualquiera puede enviar feedback)
CREATE POLICY "Enable insert for all users" ON maldives_experience_feedback
    FOR INSERT
    WITH CHECK (true);

-- Política para permitir lecturas públicas (opcional, si quieres mostrar feedbacks)
CREATE POLICY "Enable read for all users" ON maldives_experience_feedback
    FOR SELECT
    USING (true);
```

## 3. Obtener credenciales

1. Ve a **Settings** > **API** en tu proyecto de Supabase
2. Copia:
   - **Project URL** (SUPABASE_URL)
   - **Anon/Public Key** (SUPABASE_ANON_KEY)

## 4. Configurar en el proyecto

Abre `src/supabase.js` y reemplaza las constantes:

```javascript
const SUPABASE_URL = 'tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-clave-publica';
```

## 5. Verificar funcionamiento

1. Abre la aplicación web
2. Completa todas las experiencias
3. Envía el formulario de feedback
4. Verifica en Supabase > **Table Editor** > **maldives_experience_feedback** que se guardó el registro

## Opcional: Ver estadísticas

Puedes crear consultas SQL para analizar el feedback:

```sql
-- Promedio de valoraciones
SELECT AVG(experience_rating) as promedio_valoracion
FROM maldives_experience_feedback;

-- Actividad más popular
SELECT favorite_activity, COUNT(*) as veces_elegida
FROM maldives_experience_feedback
GROUP BY favorite_activity
ORDER BY veces_elegida DESC;

-- Nivel de diversión más común
SELECT fun_level, COUNT(*) as cantidad
FROM maldives_experience_feedback
GROUP BY fun_level
ORDER BY cantidad DESC;
```

## Nota

Si no configuras Supabase, la aplicación seguirá funcionando pero el feedback solo se guardará en la consola del navegador (no en una base de datos).
