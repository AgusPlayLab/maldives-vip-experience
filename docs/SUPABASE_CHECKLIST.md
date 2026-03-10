# ✅ Checklist de Configuración de Supabase

Sigue estos pasos en orden para activar Supabase en tu proyecto Maldives VIP Experience.

## 📋 Pasos Rápidos (5 minutos)

### ☐ Paso 1: Crear cuenta y proyecto
- [ ] Ir a [supabase.com](https://supabase.com) y crear cuenta
- [ ] Crear nuevo proyecto
- [ ] Anotar contraseña de la base de datos

### ☐ Paso 2: Ejecutar script SQL
- [ ] Ir a **SQL Editor** en Supabase
- [ ] Abrir el archivo `docs/supabase-setup.sql`
- [ ] Copiar **TODO** el contenido
- [ ] Pegar en SQL Editor de Supabase
- [ ] Hacer click en **Run** (F5)
- [ ] Verificar que dice "Success" en todos los comandos

### ☐ Paso 3: Obtener credenciales
- [ ] Ir a **Settings** → **API**
- [ ] Copiar **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
- [ ] Copiar **anon public key** (es un token JWT largo)

### ☐ Paso 4: Configurar el proyecto
- [ ] Abrir el archivo `js/supabase.js`
- [ ] Buscar línea 7: `const SUPABASE_URL = ...`
- [ ] Reemplazar con tu URL
- [ ] Buscar línea 8: `const SUPABASE_ANON_KEY = ...`
- [ ] Reemplazar con tu key
- [ ] Guardar el archivo

### ☐ Paso 5: Probar
- [ ] Abrir `index.html` en el navegador
- [ ] Completar el viaje hasta el formulario de feedback
- [ ] Enviar un feedback de prueba
- [ ] Ir a Supabase → **Table Editor** → **maldives_experience_feedback**
- [ ] Verificar que aparece tu feedback

---

## 🎉 ¡Listo!

Si todos los pasos tienen ✅, tu sistema de feedback está funcionando con:

✅ Base de datos en la nube (Supabase)  
✅ Rate limiting (1 envío cada 5 minutos)  
✅ Detección de spam con honeypot  
✅ Auditoría de intentos sospechosos  
✅ Vistas de estadísticas pre-configuradas  

---

## 🔍 Verificación adicional

### Probar rate limiting:
1. Envía un feedback
2. Intenta enviar otro inmediatamente con el mismo nombre
3. Debería mostrar error: "Rate limit exceeded"

### Probar anti-spam:
1. Abre consola del navegador (F12)
2. Ejecuta: `document.getElementById('hp_field').value = 'spam'`
3. Envía el formulario
4. Debería rechazarse y registrarse en `feedback_audit_log`

### Ver estadísticas:
1. Ve a **SQL Editor** en Supabase
2. Ejecuta: `SELECT * FROM feedback_stats;`
3. Deberías ver el resumen de todos los feedbacks

---

## 📞 ¿Problemas?

Consulta [docs/SUPABASE_SETUP.md](SUPABASE_SETUP.md#-troubleshooting) para troubleshooting detallado.
