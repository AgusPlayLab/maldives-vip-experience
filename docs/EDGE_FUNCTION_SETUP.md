# 🚀 Guía de Configuración con Edge Function

Esta guía explica cómo desplegar la Edge Function de Supabase para manejar los feedbacks de forma segura.

## 📚 ¿Qué es una Edge Function?

Una Edge Function es un servidor que se ejecuta en la nube de Supabase (no en el navegador del usuario). Esto proporciona:

✅ **Mayor seguridad**: Las credenciales sensibles están solo en el servidor  
✅ **Mejor control**: Rate limiting y validaciones en el servidor  
✅ **Email automático**: Envío de notificaciones cuando llega un feedback  
✅ **Protección contra bots**: Honeypot y validaciones robustas

---

## 🎯 Configuración Rápida (2 opciones)

### Opción A: Tabla Simple `contact_messages` (Recomendada para principiantes)

Esta opción usa una tabla genérica para guardar cualquier mensaje de contacto.

#### 1. Crear la tabla en Supabase

```bash
# Ve a SQL Editor en Supabase
# Ejecuta el contenido de: docs/contact-messages-table.sql
```

#### 2. Desplegar EdgeFunction

```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar sesión
supabase login

# Crear carpeta para la función
mkdir -p supabase/functions/submit-contact-message

# Copiar el código de la función
cp docs/edge-function.ts supabase/functions/submit-contact-message/index.ts

# Vincular a tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Desplegar
supabase functions deploy submit-contact-message
```

#### 3. Configurar en el proyecto web

Edita [`js/supabase.js`](../js/supabase.js) líneas 7-8:

```javascript
const SUPABASE_URL = 'https://tuproyecto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

✅ **¡Listo!** La Edge Function está desplegada y funcionando.

---

### Opción B: Tabla Avanzada `maldives_experience_feedback` (Con más validaciones)

Esta opción usa la tabla completa con rate limiting, honeypot y auditoría.

#### 1. Crear la tabla con script completo

```bash
# Ve a SQL Editor en Supabase
# Ejecuta TODO el contenido de: docs/supabase-setup.sql
```

Este script crea:
- Tabla principal con validaciones estrictas
- Rate limiting automático (1 feedback por nombre cada 5 minutos)
- Tabla de auditoría para spam
- Vistas de estadísticas
- Triggers de seguridad

#### 2. Modificar Edge Function (línea 18 de edge-function.ts)

La Edge Function ya está configurada para usar `maldives_experience_feedback`.  
No necesitas cambiar nada si usas esta opción.

#### 3. Desplegar (mismo proceso que opción A)

```bash
supabase functions deploy submit-contact-message
```

---

## 🔧 Verificación Post-Despliegue

### Probar la Edge Function manualmente

```bash
# Terminal / PowerShell
curl -X POST \
  https://tuproyecto.supabase.co/functions/v1/submit-contact-message \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test feedback",
    "source": "manual-test"
  }'
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Feedback received successfully"
}
```

### Verificar en Supabase

1. Ve a **Table Editor**
2. Busca la tabla `contact_messages` o `maldives_experience_feedback`
3. Deberías ver el mensaje de prueba guardado

### Probar desde la web

1. Abre `index.html` en el navegador
2. Completa el viaje hasta el formulario de feedback
3. Envía un feedback de prueba
4. Verifica que aparece en la tabla de Supabase

---

## 📊 Ver Logs de la Edge Function

```bash
# Logs en tiempo real
supabase functions logs submit-contact-message --follow

# Logs de los últimos 5 minutos
supabase functions logs submit-contact-message
```

---

## 🔒 Seguridad Implementada

### En el Cliente (js/supabase.js)
- ✅ Rate limiting (5 segundos entre envíos)
- ✅ Validación de email con regex
- ✅ Validación de nombre (mínimo 2 caracteres)
- ✅ Detección de honeypot vacío

### En la Edge Function (servidor)
- ✅ Validación de campos requeridos
- ✅ Detección de honeypot lleno (spam)
- ✅ CORS configurado correctamente
- ✅ Manejo robusto de errores
- ✅ Logs detallados para debugging

### En la Base de Datos (SQL)
- ✅ Row Level Security (RLS)
- ✅ Políticas de acceso configuradas
- ✅ Solo service_role puede insertar (edge function)
- ✅ Rate limiting a nivel DB (opción B)

---

## 🛠️ Troubleshooting

### Error: "Method not allowed"
- Causa: Intentando hacer GET en lugar de POST
- Solución: Asegúrate de usar POST en el fetch

### Error: "Missing required fields"
- Causa: Faltan name, email o message en el payload
- Solución: Verifica que el formulario HTML envía todos los campos

### Error: "Invalid submission"
- Causa: El campo honeypot tiene valor (probable bot)
- Solución: Normal, la validación está funcionando

### Error: "Failed to save message"
- Causa: La tabla no existe o RLS bloqueó la inserción
- Solución: Verifica que ejecutaste el script SQL correctamente

### No se guarda nada en la tabla
1. Verifica logs de la función: `supabase functions logs submit-contact-message`
2. Verifica que SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY están configurados
3. Ve a Settings > Edge Functions > submit-contact-message → Variables de entorno

### Página web muestra error
1. Abre consola del navegador (F12)
2. Busca errores de CORS o fetch
3. Verifica que `EDGE_FUNCTION_URL` en js/supabase.js sea correcta

---

## 📧 Configurar Envío de Emails (Opcional)

La Edge Function puede enviar notificaciones por email cuando llega un feedback nuevo.

### Requisitos

1. Otra Edge Function llamada `resend-emails`
2. Cuenta en [Resend.com](https://resend.com) o similar
3. API Key configurada

### Implementación

```typescript
// En otra edge function: supabase/functions/resend-emails/index.ts
import { Resend } from 'resend';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  const { name, email, message } = await req.json();
  
  await resend.emails.send({
    from: 'notifications@tudominio.com',
    to: 'admin@tudominio.com',
    subject: `Nuevo Feedback de ${name}`,
    html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Mensaje:</strong> ${message}</p>`
  });
  
  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
```

Si no configuras esto, la Edge Function seguirá funcionando (solo no enviará emails).

---

## 🔄 Actualizar la Edge Function

Cuando hagas cambios en `docs/edge-function.ts`:

```bash
# Copiar cambios a la carpeta de funciones
cp docs/edge-function.ts supabase/functions/submit-contact-message/index.ts

# Redesplegar
supabase functions deploy submit-contact-message

# Verificar que se desplegó
supabase functions list
```

---

## 📝 Comparación: Cliente Directo vs Edge Function

| Aspecto | Cliente Directo | Edge Function |
|---------|----------------|---------------|
| Seguridad | ⚠️ Anon key expuesta | ✅ Service key en servidor |
| Rate Limiting | ⚠️ Solo cliente | ✅ Cliente + Servidor |
| Email | ❌ No posible | ✅ Automático |
| Complejidad | 🟢 Simple | 🟡 Moderada |
| Costo | 🟢 Gratis | 🟢 Gratis (hasta 500K req/mes) |

**Recomendación**: Usa Edge Function para producción, cliente directo para desarrollo.

---

## 📚 Referencias

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Deno Deploy](https://deno.com/deploy/docs)

---

## ✅ Checklist Final

- [ ] Tabla creada en Supabase (contact_messages o maldives_experience_feedback)
- [ ] Edge Function desplegada (`supabase functions deploy`)
- [ ] Variables configuradas en js/supabase.js (SUPABASE_URL, SUPABASE_ANON_KEY)
- [ ] Prueba manual con curl exitosa
- [ ] Prueba desde web exitosa
- [ ] Verificado en Table Editor que se guarda correctamente
- [ ] Logs revisados sin errores

¡Todo configurado! 🎉
