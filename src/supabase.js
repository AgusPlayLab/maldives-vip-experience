// ============================================
// INTEGRACIÓN CON SUPABASE
// ============================================

// Configuración de Supabase
// IMPORTANTE: Reemplaza estos valores con tus credenciales de Supabase
const SUPABASE_URL = 'TU_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY';

// Inicializar cliente de Supabase
// Carga el cliente desde CDN en index.html:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let supabaseClient = null;

/**
 * Inicializa la conexión con Supabase
 */
function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.warn('Supabase client no está cargado. Asegúrate de incluir el script en index.html');
        return false;
    }
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase inicializado correctamente');
        return true;
    } catch (error) {
        console.error('Error al inicializar Supabase:', error);
        return false;
    }
}

/**
 * Guarda el feedback del usuario en la base de datos
 * @param {Object} feedbackData - Datos del formulario de feedback
 * @returns {Promise<Object>} - Resultado de la operación
 */
async function guardarFeedback(feedbackData) {
    if (!supabaseClient) {
        console.error('Supabase no está inicializado');
        return {
            success: false,
            error: 'Base de datos no disponible'
        };
    }

    try {
        // Preparar datos para insertar
        const data = {
            passenger_name: feedbackData.nombre,
            experience_rating: feedbackData.valoracion,
            favorite_activity: feedbackData.actividadFavorita,
            fun_level: feedbackData.nivelDiversion,
            would_repeat: feedbackData.repetiria,
            comment: feedbackData.comentario,
            created_at: new Date().toISOString()
        };

        // Insertar en la tabla
        const { data: result, error } = await supabaseClient
            .from('maldives_experience_feedback')
            .insert([data])
            .select();

        if (error) {
            throw error;
        }

        console.log('Feedback guardado exitosamente:', result);
        return {
            success: true,
            data: result
        };

    } catch (error) {
        console.error('Error al guardar feedback:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Obtiene todos los feedbacks (opcional - para visualización futura)
 * @returns {Promise<Array>} - Lista de feedbacks
 */
async function obtenerFeedbacks() {
    if (!supabaseClient) {
        console.error('Supabase no está inicializado');
        return [];
    }

    try {
        const { data, error } = await supabaseClient
            .from('maldives_experience_feedback')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Error al obtener feedbacks:', error);
        return [];
    }
}

// Inicializar Supabase cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}
