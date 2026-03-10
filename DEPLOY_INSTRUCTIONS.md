# 🚀 Instrucciones de Despliegue - Edge Function

## Estado Actual
✅ **Carpeta creada**: `supabase/functions/submit-contact-message/`  
✅ **Archivo copiado**: `supabase/functions/submit-contact-message/index.ts` (8.2 KB)  
⚠️ **Pendiente**: Instalar Supabase CLI y desplegar

---

## Paso 1: Instalar Supabase CLI

### Opción A: Con npm (recomendado)
```powershell
npm install -g supabase
```

### Opción B: Con Chocolatey
```powershell
choco install supabase
```

### Opción C: Con Scoop
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Verificar instalación:
```powershell
supabase --version
```

---

## Paso 2: Iniciar Sesión en Supabase

```powershell
supabase login
```

Esto abrirá tu navegador para autenticarte.

---

## Paso 3: Vincular tu Proyecto

```powershell
# Obtén tu PROJECT_REF desde: https://supabase.com/dashboard/project/_/settings/general
# Aparece como "Reference ID" 

supabase link --project-ref febogdjpoxbyfhetwgip
```

---

## Paso 4: Desplegar la Edge Function

```powershell
cd "C:\Users\josevicente.agusti\JVAGUSTI\Proyectos\Projects Lab\TripLab\maldives-vip-experience"

supabase functions deploy submit-contact-message --no-verify-jwt
```

**Nota**: `--no-verify-jwt` es necesario porque esta función es pública (acepta llamadas desde el navegador).

---

## Paso 5: Verificar que Funciona

### Desde PowerShell:
```powershell
$testPayload = @"
{
  "passenger_name": "Test Deployment",
  "experience_rating": 5,
  "favorite_activity": "Testing",
  "fun_level": "Muy divertido",
  "would_repeat": "Sí",
  "comment": "Test after deployment",
  "source": "deployment-test",
  "user_agent": "PowerShell",
  "honeypot": ""
}
"@

Invoke-RestMethod -Uri "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1/submit-contact-message" -Method Post -ContentType "application/json" -Body $testPayload
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Feedback received successfully"
}
```

---

## Paso 6: Verificar en Supabase Dashboard

1. Ve a: https://supabase.com/dashboard/project/febogdjpoxbyfhetwgip/editor
2. Abre la tabla: `maldives_experience_feedback`
3. Deberías ver el registro de prueba

---

## Troubleshooting

### Error: "Missing environment variables"
Las variables `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` se configuran automáticamente en el entorno de Supabase. No necesitas hacer nada.

### Error: "Failed to save message"
Verifica que la tabla `maldives_experience_feedback` exista:
1. Ve a SQL Editor en Supabase
2. Ejecuta el contenido de: `docs/supabase-setup.sql`

### Error: "Method not allowed"
Asegúrate de usar `POST` y que CORS esté configurado (la función ya lo incluye).

---

## Comandos Rápidos (Resumen)

```powershell
# 1. Instalar CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Vincular proyecto
supabase link --project-ref febogdjpoxbyfhetwgip

# 4. Desplegar
supabase functions deploy submit-contact-message --no-verify-jwt

# 5. Probar
$testPayload = '{"passenger_name":"Test","experience_rating":5,"favorite_activity":"Testing","fun_level":"Muy divertido","would_repeat":"Sí","comment":"Test","source":"test","user_agent":"PowerShell","honeypot":""}'
Invoke-RestMethod -Uri "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1/submit-contact-message" -Method Post -ContentType "application/json" -Body $testPayload
```

---

## Siguiente Paso

Una vez desplegada la función, **prueba el formulario en tu navegador**:
1. Abre: http://localhost:8000/pages/feedback.html
2. Rellena el formulario
3. Envía
4. Deberías ver: "✅ ¡Feedback enviado correctamente!"

---

## ¿Necesitas ayuda?

- 📚 Documentación: [docs/EDGE_FUNCTION_SETUP.md](docs/EDGE_FUNCTION_SETUP.md)
- 🔍 Logs de la función: https://supabase.com/dashboard/project/febogdjpoxbyfhetwgip/functions/submit-contact-message/logs
- 💬 Supabase Docs: https://supabase.com/docs/guides/functions
