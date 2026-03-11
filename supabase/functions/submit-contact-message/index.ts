import { createClient } from "npm:@supabase/supabase-js@2.31.0";

/**
 * Llama a la edge function privada resend-emails
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

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") || "*";
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "600",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(JSON.stringify({ ok: true }), { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: corsHeaders });
  }

  let payload: any;
  try { payload = await req.json(); }
  catch { return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: corsHeaders }); }

  const { passenger_name, experience_rating, favorite_activity, fun_level, would_repeat, comment, source, user_agent, honeypot } = payload;

  if (!passenger_name || !experience_rating || !favorite_activity || !fun_level || !would_repeat) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: passenger_name, experience_rating, favorite_activity, fun_level, would_repeat" }),
      { status: 400, headers: corsHeaders }
    );
  }

  if (honeypot && honeypot.trim() !== "") {
    return new Response(JSON.stringify({ error: "Invalid submission" }), { status: 403, headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "Missing Supabase environment variables" }), { status: 500, headers: corsHeaders });
  }

  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { global: { fetch } });

  try {
    // 1. Guardar feedback en la base de datos
    const insert = await sb.from("maldives_experience_feedback").insert([{
      passenger_name,
      experience_rating: parseInt(experience_rating),
      favorite_activity,
      fun_level,
      would_repeat,
      comment: comment || null,
      source: source || "maldives-vip-web",
      user_agent: user_agent || null,
      honeypot_value: "",
    }]).select();

    if (insert.error) {
      console.error("Insert error", insert.error);
      return new Response(JSON.stringify({ error: insert.error.message }), { status: 500, headers: corsHeaders });
    }

    // 2. Envio de email (aislado, no bloquea si falla)
    try {
      await sendNotificationEmail(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        name: passenger_name,
        email: "admin@maldives-vip.com",
        message: `NUEVO FEEDBACK\nPasajero: ${passenger_name}\nValoracion: ${experience_rating}/5\nActividad: ${favorite_activity}\nDiversion: ${fun_level}\nRepetira: ${would_repeat}\nComentario: ${comment || "Sin comentario"}\nFuente: ${source || "web"}`,
        source: source || "maldives-vip-web",
      });
    } catch (mailErr) {
      console.error("Email sending failed (non-critical):", mailErr);
    }

    return new Response(JSON.stringify({ ok: true, data: insert.data }), { status: 201, headers: corsHeaders });

  } catch (err) {
    console.error("Unexpected error", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500, headers: corsHeaders });
  }
});
