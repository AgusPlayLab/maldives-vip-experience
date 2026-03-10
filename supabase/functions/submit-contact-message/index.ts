import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

/**
 * Edge Function: submit-contact-message
 * 
 * Maneja el envío de feedbacks desde el formulario web de Maldives VIP Experience.
 * Guarda el mensaje en la tabla contact_messages y opcionalmente envía un email de notificación.
 * 
 * IMPORTANTE: Esta función debe desplegarse en Supabase Edge Functions
 * 
 * Despliegue:
 * 1. Instala Supabase CLI: npm install -g supabase
 * 2. Inicia sesión: supabase login
 * 3. Vincula proyecto: supabase link --project-ref TU_PROJECT_REF
 * 4. Despliega: supabase functions deploy submit-contact-message
 */

/**
 * Inserta el mensaje en la tabla maldives_experience_feedback
 * Nota: La tabla debe existir previamente (ejecutar supabase-setup.sql)
 */
async function saveFeedback(
  supabaseUrl: string,
  serviceKey: string,
  payload: Record<string, unknown>
) {
  const url = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/maldives_experience_feedback`;

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();
  return { status: resp.status, body: text };
}

/**
 * Llama a la edge function privada resend-emails (OPCIONAL)
 * Requiere tener configurada otra Edge Function para envío de emails
 */
async function sendNotificationEmail(
  supabaseUrl: string,
  serviceKey: string,
  payload: Record<string, unknown>
) {
  return fetch(`${supabaseUrl}/functions/v1/resend-emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify(payload),
  });
}

serve(async (req) => {
  try {
    const { method } = req;

    // 🌍 CORS (permitir solicitudes desde cualquier origen)
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Solo permitir POST
    if (method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // Parsear el body JSON
    const payload = await req.json().catch(() => null);
    if (!payload) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    const { name, email, message, source, honeypot, user_agent, 
            // Campos específicos de maldives_experience_feedback
            passenger_name, experience_rating, favorite_activity, 
            fun_level, would_repeat, comment } = payload as Record<string, any>;

    // Validación de campos requeridos
    if (!passenger_name || !experience_rating || !favorite_activity || !fun_level || !would_repeat) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: passenger_name, experience_rating, favorite_activity, fun_level, would_repeat" }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // 🚫 Validación de honeypot (anti-spam)
    if (honeypot && honeypot.trim() !== '') {
      console.warn('[SPAM DETECTED] Honeypot field filled:', { passenger_name, honeypot });
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { 
          status: 403, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // Obtener variables de entorno
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SERVICE_KEY) {
      console.error("[ERROR] Missing environment variables");
      return new Response(
        JSON.stringify({ error: "Server misconfiguration" }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    // 1️⃣ Guardar feedback en la base de datos
    console.log('[INFO] Saving feedback to database:', { 
      passenger_name, 
      experience_rating, 
      favorite_activity,
      source 
    });
    
    const saveResult = await saveFeedback(
      SUPABASE_URL,
      SERVICE_KEY,
      { 
        passenger_name,
        experience_rating: parseInt(experience_rating),
        favorite_activity,
        fun_level,
        would_repeat,
        comment: comment || null,
        source: source || 'web',
        user_agent: user_agent || null,
        honeypot_value: '', // Siempre vacío si llegó aquí (ya validado)
        created_at: new Date().toISOString()
      }
    );

    if (saveResult.status >= 400) {
      console.error("[ERROR] Database insert failed:", saveResult.body);
      return new Response(
        JSON.stringify({ error: "Failed to save message" }),
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          } 
        }
      );
    }

    console.log('[SUCCESS] Feedback saved successfully');

    // 2️⃣ Envío de email de notificación (OPCIONAL - aislado)
    // Comenta o elimina esta sección si no tienes configurado el servicio de email
    try {
      console.log('[INFO] Attempting to send notification email');
      
      // Construir un mensaje formateado para el email
      const emailMessage = `
📊 NUEVO FEEDBACK - MALDIVES VIP EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Pasajero: ${passenger_name}

⭐ Valoración: ${experience_rating}/5 estrellas
🎯 Actividad Favorita: ${favorite_activity}
😄 Nivel de Diversión: ${fun_level}
🔄 ¿Repetiría?: ${would_repeat}

💭 Comentario:
${comment || 'Sin comentario'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Fuente: ${source || 'web'}
🕐 Fecha: ${new Date().toLocaleString('es-ES')}
      `.trim();
      
      await sendNotificationEmail(
        SUPABASE_URL,
        SERVICE_KEY,
        { 
          name: passenger_name,
          email: 'admin@maldives-vip.com', // Email del destinatario
          message: emailMessage,
          source: source || 'web'
        }
      );
      console.log('[SUCCESS] Notification email sent');
    } catch (mailErr) {
      // ❗ No rompemos el flujo si el email falla
      console.error("[WARNING] Email sending failed (non-critical):", mailErr);
    }

    // ✅ Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Feedback received successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    
  } catch (err) {
    console.error("[ERROR] Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        } 
      }
    );
  }
});
