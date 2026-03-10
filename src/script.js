// ============================================
// MALDIVES VIP EXPERIENCE - LÓGICA PRINCIPAL
// ============================================

// Estado de la aplicación
const appState = {
    currentStep: 0,
    completedSteps: [],
    vipName: 'Veronica',
    employeeName: '',
    audioEnabled: false
};

// ============================================
// GESTIÓN DE ESTADO Y PERSISTENCIA
// ============================================

/**
 * Carga el progreso guardado desde localStorage
 */
function cargarProgreso() {
    const savedState = localStorage.getItem('maldivesProgress');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            Object.assign(appState, parsed);
            console.log('Progreso cargado:', appState);
        } catch (error) {
            console.error('Error al cargar progreso:', error);
        }
    }
}

/**
 * Guarda el progreso actual en localStorage
 */
function guardarProgreso() {
    try {
        localStorage.setItem('maldivesProgress', JSON.stringify(appState));
        console.log('Progreso guardado');
    } catch (error) {
        console.error('Error al guardar progreso:', error);
    }
}

/**
 * Desbloquea el siguiente paso
 */
function desbloquearSiguientePaso() {
    if (appState.currentStep < experiencias.length - 1) {
        if (!appState.completedSteps.includes(appState.currentStep)) {
            appState.completedSteps.push(appState.currentStep);
        }
        appState.currentStep++;
        guardarProgreso();
        actualizarBarraProgreso();
        mostrarExperiencia(appState.currentStep);
    }
}

/**
 * Marca el paso actual como completado
 */
function completarPasoActual() {
    if (!appState.completedSteps.includes(appState.currentStep)) {
        appState.completedSteps.push(appState.currentStep);
        guardarProgreso();
    }
}

// ============================================
// INTERFAZ DE USUARIO
// ============================================

/**
 * Inicializa la barra de progreso del itinerario
 */
function inicializarBarraProgreso() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    progressBar.innerHTML = '';

    experiencias.forEach((exp, index) => {
        const step = document.createElement('div');
        step.className = 'step';
        step.dataset.step = index;

        // Determinar si el paso está desbloqueado
        const isUnlocked = index === 0 || appState.completedSteps.includes(index - 1);
        const isActive = index === appState.currentStep;
        const isCompleted = appState.completedSteps.includes(index);

        if (isUnlocked) step.classList.add('unlocked');
        if (isActive) step.classList.add('active');
        if (isCompleted) step.classList.add('completed');

        const icon = document.createElement('div');
        icon.className = 'step-icon';
        icon.textContent = exp.icon;

        const title = document.createElement('div');
        title.className = 'step-title';
        title.textContent = isUnlocked ? exp.title : '----';

        step.appendChild(icon);
        step.appendChild(title);

        // Hacer clic en paso desbloqueado
        if (isUnlocked) {
            step.addEventListener('click', () => {
                appState.currentStep = index;
                guardarProgreso();
                mostrarExperiencia(index);
                actualizarBarraProgreso();
            });
        }

        progressBar.appendChild(step);
    });
}

/**
 * Actualiza la barra de progreso
 */
function actualizarBarraProgreso() {
    inicializarBarraProgreso();
}

/**
 * Muestra la experiencia actual
 */
function mostrarExperiencia(index) {
    const experiencia = experiencias[index];
    const mainContent = document.getElementById('mainContent');
    
    if (!mainContent) return;

    // Scroll al contenido principal
    mainContent.scrollIntoView({ behavior: 'smooth' });

    // Construir HTML de la experiencia
    let html = `
        <section id="experiencia-${experiencia.id}" class="section-content">
            <h2 class="section-title">${experiencia.icon} ${experiencia.title}</h2>
            <p class="section-description">${experiencia.description}</p>
    `;

    // Si hay juegos/actividades
    if (experiencia.games && experiencia.games.length > 0) {
        html += '<div class="activities-grid">';
        
        experiencia.games.forEach((game, gameIndex) => {
            html += `
                <div class="activity-card" onclick="abrirJuego(${index}, ${gameIndex})">
                    <img src="${experiencia.image}" alt="${game.title}">
                    <div class="activity-info">
                        <h3>${game.title}</h3>
                        <p>${game.description}</p>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    }

    // Si es el álbum de fotos
    if (experiencia.id === 'album') {
        html += crearGaleriaFotos();
    }

    // Si es el feedback
    if (experiencia.id === 'feedback') {
        html += crearFormularioFeedback();
    }

    // Botón para continuar
    if (index < experiencias.length - 1) {
        html += `
            <div style="text-align: center; margin-top: 3rem;">
                <button class="btn-primary" onclick="desbloquearSiguientePaso()">
                    Continuar al siguiente paso
                </button>
            </div>
        `;
    }

    html += '</section>';

    mainContent.innerHTML = html;
}

/**
 * Crea la galería de fotos
 */
function crearGaleriaFotos() {
    let html = '<div class="photo-gallery">';
    
    memoriasViaje.forEach(memoria => {
        html += `
            <div class="photo-item">
                <img src="${memoria.image}" alt="${memoria.caption}">
                <div class="photo-caption">${memoria.caption}</div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

/**
 * Crea el formulario de feedback
 */
function crearFormularioFeedback() {
    return `
        <form id="feedbackForm" class="feedback-form" onsubmit="enviarFeedback(event)">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            
            <div class="form-group">
                <label for="valoracion">Valoración del viaje (1-5 estrellas)</label>
                <select id="valoracion" name="valoracion" required>
                    <option value="">Selecciona...</option>
                    <option value="1">⭐ 1 estrella</option>
                    <option value="2">⭐⭐ 2 estrellas</option>
                    <option value="3">⭐⭐⭐ 3 estrellas</option>
                    <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="actividadFavorita">Actividad favorita</label>
                <input type="text" id="actividadFavorita" name="actividadFavorita" required>
            </div>
            
            <div class="form-group">
                <label for="nivelDiversion">Nivel de diversión</label>
                <select id="nivelDiversion" name="nivelDiversion" required>
                    <option value="">Selecciona...</option>
                    <option value="Muy divertido">Muy divertido</option>
                    <option value="Divertido">Divertido</option>
                    <option value="Normal">Normal</option>
                    <option value="Poco divertido">Poco divertido</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="repetiria">¿Repetirías el viaje?</label>
                <select id="repetiria" name="repetiria" required>
                    <option value="">Selecciona...</option>
                    <option value="Sí">Sí, definitivamente</option>
                    <option value="Tal vez">Tal vez</option>
                    <option value="No">No</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="comentario">Comentario</label>
                <textarea id="comentario" name="comentario" rows="5"></textarea>
            </div>
            
            <button type="submit" class="btn-primary" style="width: 100%;">
                Enviar opinión
            </button>
        </form>
    `;
}

// ============================================
// SISTEMA DE JUEGOS Y MODALES
// ============================================

/**
 * Abre un juego en modal
 */
function abrirJuego(expIndex, gameIndex) {
    const experiencia = experiencias[expIndex];
    const game = experiencia.games[gameIndex];
    
    mostrarModal(game);
}

/**
 * Muestra un modal con el contenido del juego
 */
function mostrarModal(game) {
    const modal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;

    let content = `
        <h2>${game.title}</h2>
        <p>${game.description}</p>
    `;

    // Según el tipo de juego
    switch (game.type) {
        case 'text':
            content += `
                <textarea id="gameInput" style="width: 100%; padding: 1rem; margin: 1rem 0;" rows="4"></textarea>
                <button class="btn-primary" onclick="completarJuego()">Continuar</button>
            `;
            break;
        
        case 'choice':
            content += '<div style="margin: 1rem 0;">';
            game.options.forEach(option => {
                content += `
                    <button class="btn-primary" style="margin: 0.5rem; width: auto;" onclick="completarJuego()">
                        ${option}
                    </button>
                `;
            });
            content += '</div>';
            break;
        
        case 'timer':
            content += `
                <div id="timerDisplay" style="font-size: 3rem; text-align: center; margin: 2rem 0;">
                    ${game.duration}
                </div>
                <button class="btn-primary" onclick="iniciarTimer(${game.duration})">Comenzar</button>
            `;
            break;
        
        case 'interactive':
        default:
            content += `<button class="btn-primary" onclick="completarJuego()">Completar</button>`;
            break;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Completa el juego actual
 */
function completarJuego() {
    completarPasoActual();
    cerrarModal();
    mostrarNotificacion('¡Actividad completada! 🎉');
}

/**
 * Inicia un temporizador
 */
function iniciarTimer(segundos) {
    const display = document.getElementById('timerDisplay');
    let restante = segundos;
    
    const interval = setInterval(() => {
        restante--;
        if (display) {
            display.textContent = restante;
        }
        
        if (restante <= 0) {
            clearInterval(interval);
            setTimeout(() => {
                completarJuego();
            }, 500);
        }
    }, 1000);
}

/**
 * Muestra una notificación temporal
 */
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--turquoise);
        color: var(--text-dark);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ============================================
// FORMULARIO DE FEEDBACK
// ============================================

/**
 * Envía el formulario de feedback
 */
async function enviarFeedback(event) {
    event.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        valoracion: parseInt(document.getElementById('valoracion').value),
        actividadFavorita: document.getElementById('actividadFavorita').value,
        nivelDiversion: document.getElementById('nivelDiversion').value,
        repetiria: document.getElementById('repetiria').value,
        comentario: document.getElementById('comentario').value
    };

    // Intentar guardar en Supabase
    if (typeof guardarFeedback === 'function') {
        const resultado = await guardarFeedback(formData);
        
        if (resultado.success) {
            mostrarNotificacion('¡Gracias por tu opinión! 💙');
            completarPasoActual();
            
            // Mostrar mensaje final
            setTimeout(() => {
                mostrarMensajeFinal();
            }, 2000);
        } else {
            mostrarNotificacion('Error al guardar. Los datos se guardaron localmente.');
            console.log('Feedback guardado localmente:', formData);
        }
    } else {
        // Guardar localmente si Supabase no está disponible
        console.log('Feedback (sin Supabase):', formData);
        mostrarNotificacion('¡Gracias por tu opinión! 💙');
        completarPasoActual();
    }
}

/**
 * Muestra el mensaje final de agradecimiento
 */
function mostrarMensajeFinal() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <section class="section-content" style="text-align: center; padding: 4rem 2rem;">
            <h2 class="section-title">✨ Misión Cumplida ✨</h2>
            <p class="section-description" style="font-size: 1.5rem; margin: 2rem 0;">
                Gracias por ser parte de esta experiencia VIP en las Maldivas
            </p>
            <p style="font-size: 1.2rem; color: var(--ocean-blue);">
                ${appState.vipName} nunca olvidará este viaje 🏝️💙
            </p>
            <button class="btn-primary" onclick="reiniciarViaje()" style="margin-top: 2rem;">
                Comenzar nuevo viaje
            </button>
        </section>
    `;
}

/**
 * Reinicia el viaje
 */
function reiniciarViaje() {
    if (confirm('¿Estás seguro de que quieres reiniciar el viaje? Se perderá todo el progreso.')) {
        localStorage.removeItem('maldivesProgress');
        location.reload();
    }
}

// ============================================
// CONTROL DE AUDIO
// ============================================

/**
 * Alterna el audio ambiente del océano
 */
function toggleAudio() {
    // Implementar cuando se agregue el archivo de audio
    appState.audioEnabled = !appState.audioEnabled;
    mostrarNotificacion(appState.audioEnabled ? '🔊 Audio activado' : '🔇 Audio desactivado');
}

// ============================================
// INICIO DE LA APLICACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
function iniciarApp() {
    console.log('Iniciando Maldives VIP Experience...');
    
    // Cargar progreso guardado
    cargarProgreso();
    
    // Inicializar barra de progreso
    inicializarBarraProgreso();
    
    // Mostrar experiencia actual
    mostrarExperiencia(appState.currentStep);
    
    // Event listeners
    const btnComenzar = document.getElementById('btnComenzarViaje');
    if (btnComenzar) {
        btnComenzar.addEventListener('click', () => {
            document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', cerrarModal);
    }
    
    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModal();
            }
        });
    }
    
    console.log('Aplicación iniciada correctamente');
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
    iniciarApp();
}
