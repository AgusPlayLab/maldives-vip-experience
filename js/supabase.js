// ============================================
// INTEGRACIÓN CON SUPABASE EDGE FUNCTION
// ============================================

// IMPORTANTE: Reemplaza con la URL de tu Edge Function
// Ejemplo: https://tuproyecto.supabase.co/functions/v1/submit-contact-message
const EDGE_FUNCTION_URL = "https://febogdjpoxbyfhetwgip.supabase.co/functions/v1/submit-maldivas-feedback";

// Variables de tiempo para rate limiting del cliente
let lastSubmitTime = 0;
const MIN_SUBMIT_INTERVAL = 5000; // 5 segundos entre envíos

/**
 * Guarda el feedback del usuario usando Edge Function de Supabase
 * @param {Object} feedbackData - Datos del formulario de feedback
 * @returns {Promise<Object>} - Resultado de la operación
 */
async function guardarFeedback(feedbackData) {
    // Rate limiting del lado del cliente
    const now = Date.now();
    if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
        return {
            success: false,
            error: 'Por favor espera un momento antes de reintentar.'
        };
    }

    // Validación básica del lado del cliente
    if (!feedbackData.nombre || feedbackData.nombre.trim().length < 2) {
        return {
            success: false,
            error: 'El nombre debe tener al menos 2 caracteres'
        };
    }

    if (!feedbackData.valoracion || feedbackData.valoracion < 1 || feedbackData.valoracion > 5) {
        return {
            success: false,
            error: 'La valoración debe estar entre 1 y 5'
        };
    }

    if (!feedbackData.actividadFavorita || feedbackData.actividadFavorita.trim().length < 2) {
        return {
            success: false,
            error: 'La actividad favorita no puede estar vacía'
        };
    }

    // Validación de honeypot (debe estar vacío)
    if (feedbackData.honeypot && feedbackData.honeypot.trim() !== '') {
        console.warn('Honeypot detectado - posible bot');
        return {
            success: false,
            error: 'Validación fallida'
        };
    }

    // Verificar configuración antes de enviar
    if (EDGE_FUNCTION_URL === 'TU_EDGE_FUNCTION_URL') {
        console.error('❌ Edge Function no configurada. Por favor actualiza EDGE_FUNCTION_URL en js/supabase.js');
        return {
            success: false,
            error: '⚙️ Sistema de feedback no configurado. Contacta al administrador.'
        };
    }

    // Preparar payload para la Edge Function
    const payload = {
        passenger_name: feedbackData.nombre,
        experience_rating: feedbackData.valoracion,
        favorite_activity: feedbackData.actividadFavorita,
        fun_level: feedbackData.nivelDiversion,
        would_repeat: feedbackData.repetiria,
        comment: feedbackData.comentario || null,
        source: feedbackData.source || 'maldives-vip-web',
        user_agent: feedbackData.userAgent || navigator.userAgent,
        honeypot: feedbackData.honeypot || ''
    };

    try {
        console.log('📤 Enviando feedback a Edge Function...');
        console.log('🔗 URL:', EDGE_FUNCTION_URL);
        console.log('📦 Payload:', payload);

        const response = await fetch(EDGE_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log('📥 Response status:', response.status);
        console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

        const data = await response.json().catch((jsonError) => {
            console.error('❌ Error parseando JSON:', jsonError);
            return {};
        });

        console.log('📥 Response data:', data);

        if (response.status === 201 || response.ok) {
            console.log('✅ Feedback guardado exitosamente:', data);
            lastSubmitTime = Date.now();
            return {
                success: true,
                data: data
            };
        } else if (response.status === 400) {
            return {
                success: false,
                error: data.error || 'Datos inválidos'
            };
        } else if (response.status === 403) {
            return {
                success: false,
                error: data.error || 'Acceso denegado'
            };
        } else if (response.status === 404) {
            return {
                success: false,
                error: '⚠️ Edge Function no encontrada. Verifica que esté desplegada en Supabase.'
            };
        } else if (response.status === 429) {
            return {
                success: false,
                error: 'Demasiadas solicitudes. Intenta más tarde.'
            };
        } else {
            console.error('❌ Error from function:', data);
            return {
                success: false,
                error: data.error || `❌ Error ${response.status}: ${response.statusText}`
            };
        }

    } catch (error) {
        console.error('❌ Network or unexpected error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        // Proporcionar más contexto según el tipo de error
        let errorMsg = '❌ Error de red al enviar el mensaje';
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMsg = '⚠️ No se pudo conectar con el servidor. Verifica que la Edge Function esté desplegada.';
        } else if (error.name === 'AbortError') {
            errorMsg = '⏱️ La solicitud tardó demasiado. Intenta de nuevo.';
        }
        
        return {
            success: false,
            error: errorMsg
        };
    }
}

/**
 * Función de verificación de configuración
 * Llama a esta función desde la consola para verificar la configuración
 */
function verificarConfiguracion() {
    console.group('🔧 Verificación de Configuración');
    
    if (EDGE_FUNCTION_URL === 'TU_EDGE_FUNCTION_URL') {
        console.warn('⚠️ Edge Function NO está configurada');
        console.log('📝 Pasos para configurar:');
        console.log('1. Edita js/supabase.js línea 7');
        console.log('2. Reemplaza TU_EDGE_FUNCTION_URL con:');
        console.log('   https://tuproyecto.supabase.co/functions/v1/submit-contact-message');
        console.groupEnd();
        return false;
    }
    
    console.log('✅ Edge Function URL:', EDGE_FUNCTION_URL);
    console.log('✅ Configuración correcta');
    console.groupEnd();
    return true;
}

// Exportar función de verificación al objeto window para uso en consola
if (typeof window !== 'undefined') {
    window.verificarConfiguracion = verificarConfiguracion;
}

console.log('🏝️ Supabase Edge Function module loaded');
console.log('💡 Ejecuta verificarConfiguracion() en la consola para comprobar la configuración');

