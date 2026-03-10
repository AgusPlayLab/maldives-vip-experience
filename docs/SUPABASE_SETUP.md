# Configuración de Supabase

Este documento explica cómo configurar Supabase para guardar el feedback de la experiencia con seguridad avanzada.

## 🚀 Configuración Rápida (5 minutos)

### 1. Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto (elige un nombre, región y contraseña)

### 2. Ejecutar el script SQL

1. En tu proyecto de Supabase, ve a **SQL Editor** (icono de base de datos en el menú lateral)
2. Crea una nueva query
3. Copia **TODO** el contenido del archivo [`supabase-setup.sql`](supabase-setup.sql)
4. Pégalo en el editor SQL
5. Click en **Run** (o presiona F5)

✅ Esto creará:
- Tabla `maldives_experience_feedback` con validaciones
- Sistema de rate limiting (1 envío cada 5 minutos)
- Detección automática de spam con honeypot
- Tabla de auditoría para registrar intentos sospechosos
- Vistas de estadísticas y análisis
- Índices para mejor rendimiento

### 3. Obtener credenciales

1. Ve a **Settings** > **API** en tu proyecto de Supabase
2. Busca y copia:
   - **Project URL** → `https://tuproyecto.supabase.co`
   - **anon public key** → `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Configurar en el proyecto

Abre [`js/supabase.js`](../js/supabase.js) y reemplaza las constantes en las líneas 7-8:

```javascript
const SUPABASE_URL = 'https://tuproyecto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### 5. ¡Listo! Probar

1. Abre la aplicación web
2. Completa el viaje y llega a la página de feedback
3. Envía el formulario
4. Verifica en Supabase: **Table Editor** > **maldives_experience_feedback**

---

## 🔒 Características de Seguridad Implementadas

### ✅ Rate Limiting
- Máximo 1 feedback cada 5 minutos por nombre
- Previene envíos masivos automáticos
- Trigger a nivel de base de datos

### ✅ Honeypot Anti-Spam
- Campo oculto `hp_field` que los bots llenan
- Si tiene valor → se rechaza y se registra en auditoría
- Los humanos no ven ni llenan este campo

### ✅ Validaciones de Datos
- Nombre: mínimo 2 caracteres
- Rating: solo valores 1-5
- Actividad favorita: mínimo 2 caracteres
- Nivel de diversión: solo valores predefinidos
- ¿Repetiría?: solo valores predefinidos

### ✅ Auditoría de Intentos Sospechosos
- Tabla `feedback_audit_log` registra:
  - Spam detectado (honeypot lleno)
  - Rate limiting excedido
  - Validaciones fallidas

---

## 📊 Consultas Útiles

Una vez configurado, puedes ejecutar estas consultas en el SQL Editor:

### Ver estadísticas generales
```sql
SELECT * FROM feedback_stats;
```

### Top 5 actividades favoritas
```sql
SELECT * FROM top_favorite_activities LIMIT 5;
```

### Feedbacks recientes (últimos 10)
```sql
SELECT * FROM recent_feedbacks LIMIT 10;
```

### Ver intentos de spam
```sql
SELECT * FROM feedback_audit_log 
WHERE event_type = 'spam_detected' 
ORDER BY created_at DESC;
```

### Promedio de valoraciones
```sql
SELECT ROUND(AVG(experience_rating), 2) as promedio
FROM maldives_experience_feedback;
```

### Distribución de "¿Repetirías?"
```sql
SELECT would_repeat, COUNT(*) as cantidad
FROM maldives_experience_feedback
GROUP BY would_repeat
ORDER BY cantidad DESC;
```

---

## 🛠️ Mantenimiento

### Limpiar feedbacks antiguos (más de 1 año)
```sql
SELECT cleanup_old_feedbacks();
```

### Ver tamaño de la tabla
```sql
SELECT 
    pg_size_pretty(pg_total_relation_size('maldives_experience_feedback')) as table_size;
```

### Exportar todos los feedbacks a CSV
1. Ve a **Table Editor** > **maldives_experience_feedback**
2. Click en el botón **...** (tres puntos)
3. Selecciona **Export to CSV**

---

## 🔧 Personalización

### Cambiar tiempo de rate limiting

Edita la función `check_feedback_rate_limit()` en SQL Editor:

```sql
-- Cambiar de 5 minutos a 10 minutos
WHERE created_at > NOW() - INTERVAL '10 minutes';
```

### Permitir múltiples feedbacks del mismo usuario

Elimina el trigger de rate limiting:

```sql
DROP TRIGGER IF EXISTS feedback_rate_limit_trigger ON maldives_experience_feedback;
```

### Desactivar detección de spam

Elimina el trigger anti-spam:

```sql
DROP TRIGGER IF EXISTS feedback_spam_detection_trigger ON maldives_experience_feedback;
```

---

## ❓ Troubleshooting

### Error: "Rate limit exceeded"
- Normal: el usuario ya envió feedback hace menos de 5 minutos
- Solución: esperar o ajustar el intervalo en la función de rate limiting

### Error: "Invalid submission detected"
- Causa: el campo honeypot tiene valor (probablemente un bot)
- Solución: verificar que el formulario HTML no pre-llene `hp_field`

### No se guardan los feedbacks
1. Verificar en consola del navegador si hay errores
2. Confirmar que `SUPABASE_URL` y `SUPABASE_ANON_KEY` sean correctos
3. Verificar en Supabase que las políticas RLS estén habilitadas
4. Probar insertar manualmente en Table Editor

### Ver logs de errores en tiempo real
1. Ve a **Logs** > **Database Logs** en Supabase
2. Filtra por errores recientes
3. Revisa el stack trace completo

---

## 📱 Sin Supabase

Si no configuras Supabase, la aplicación seguirá funcionando:
- El feedback se mostrará en la consola del navegador (`console.log`)
- No se guardará en ninguna base de datos
- Todas las experiencias y juegos funcionarán normalmente

---

## 📚 Referencias

- [Documentación oficial de Supabase](https://supabase.com/docs)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Triggers](https://www.postgresql.org/docs/current/trigger-definition.html)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

