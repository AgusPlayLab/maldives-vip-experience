// ============================================
// FUNCIONES COMPARTIDAS ENTRE PÁGINAS
// ============================================

/**
 * Estructura del progreso guardado en localStorage
 */
const defaultProgress = {
    completedSteps: [], // Índices de experiencias completadas
    completedGames: {}, // { experienciaId: [gameIndex1, gameIndex2, ...] }
    vipName: 'Verónica Forner',
    employeeName: 'Agus Palomo Spain'
};

/**
 * Obtiene el progreso actual desde localStorage
 */
function obtenerProgreso() {
    const saved = localStorage.getItem('maldivesProgress');
    if (saved) {
        try {
            return { ...defaultProgress, ...JSON.parse(saved) };
        } catch (error) {
            console.error('Error al cargar progreso:', error);
            return { ...defaultProgress };
        }
    }
    return { ...defaultProgress };
}

/**
 * Guarda el progreso en localStorage
 */
function guardarProgreso(progreso) {
    try {
        localStorage.setItem('maldivesProgress', JSON.stringify(progreso));
        console.log('Progreso guardado');
    } catch (error) {
        console.error('Error al guardar progreso:', error);
    }
}

/**
 * Carga el progreso (alias para compatibilidad)
 */
function cargarProgreso() {
    return obtenerProgreso();
}

/**
 * Marca una experiencia como completada
 */
function marcarExperienciaCompletada(experienciaIndex) {
    const progreso = obtenerProgreso();
    if (!progreso.completedSteps.includes(experienciaIndex)) {
        progreso.completedSteps.push(experienciaIndex);
        guardarProgreso(progreso);
    }
}

/**
 * Marca un juego específico como completado
 */
function marcarJuegoCompletado(experienciaId, gameIndex) {
    const progreso = obtenerProgreso();
    
    if (!progreso.completedGames[experienciaId]) {
        progreso.completedGames[experienciaId] = [];
    }
    
    if (!progreso.completedGames[experienciaId].includes(gameIndex)) {
        progreso.completedGames[experienciaId].push(gameIndex);
        guardarProgreso(progreso);
    }
}

/**
 * Verifica si un juego está completado
 */
function juegoEstaCompletado(experienciaId, gameIndex) {
    const progreso = obtenerProgreso();
    return progreso.completedGames[experienciaId] && 
           progreso.completedGames[experienciaId].includes(gameIndex);
}

/**
 * Verifica si una experiencia está completada
 */
function experienciaEstaCompletada(experienciaIndex) {
    const progreso = obtenerProgreso();
    return progreso.completedSteps.includes(experienciaIndex);
}

/**
 * Muestra una notificación temporal
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.className = 'notification';
    
    const colores = {
        success: 'var(--turquoise)',
        error: '#e74c3c',
        info: 'var(--ocean-blue)'
    };
    
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colores[tipo] || colores.success};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        font-weight: 500;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

/**
 * Agregar animaciones CSS si no existen
 */
if (!document.getElementById('sharedAnimations')) {
    const style = document.createElement('style');
    style.id = 'sharedAnimations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Crea la navegación para volver al inicio
 */
function crearNavegacion(tituloActual = '') {
    const nav = document.createElement('nav');
    nav.className = 'top-nav';
    nav.innerHTML = `
        <div class="nav-container">
            <a href="../index.html" class="nav-home">
                <span class="nav-icon">🏝️</span>
                <span class="nav-text">Maldives VIP</span>
            </a>
            ${tituloActual ? `<span class="nav-current">${tituloActual}</span>` : ''}
            <button id="btnVolverInicio" class="btn-nav">Volver al inicio</button>
        </div>
    `;
    
    document.body.insertBefore(nav, document.body.firstChild);
    
    document.getElementById('btnVolverInicio').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}

/**
 * Abre un modal de juego
 */
function abrirModal(titulo, contenido, onCompletar) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <div class="modal-body">
                <h2>${titulo}</h2>
                ${contenido}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listener para completar
    const btnCompletar = modal.querySelector('.btn-completar');
    if (btnCompletar && onCompletar) {
        btnCompletar.addEventListener('click', () => {
            onCompletar();
            modal.remove();
        });
    }
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Crea contenido de modal según el tipo de juego
 */
function crearContenidoJuego(game) {
    let html = `<p class="game-description">${game.description}</p>`;
    
    switch (game.type) {
        case 'text':
            html += `
                <textarea id="gameInput" placeholder="Escribe tu respuesta..." rows="4"></textarea>
                <button class="btn-primary btn-completar">Continuar</button>
            `;
            break;
        
        case 'choice':
            html += '<div class="game-choices">';
            game.options.forEach(option => {
                html += `
                    <button class="btn-choice btn-completar">
                        ${option}
                    </button>
                `;
            });
            html += '</div>';
            break;
        
        case 'timer':
            html += `
                <div class="timer-display" id="timerDisplay">${game.duration}</div>
                <button class="btn-primary" onclick="iniciarTimer(${game.duration})">Comenzar</button>
            `;
            break;
        
        case 'interactive':
        default:
            html += `<button class="btn-primary btn-completar">Completar</button>`;
            break;
    }
    
    return html;
}

/**
 * Inicia un temporizador
 */
function iniciarTimer(segundos) {
    const display = document.getElementById('timerDisplay');
    let restante = segundos;
    
    const btn = event.target;
    btn.disabled = true;
    btn.textContent = 'En progreso...';
    
    const interval = setInterval(() => {
        restante--;
        if (display) {
            display.textContent = restante;
        }
        
        if (restante <= 0) {
            clearInterval(interval);
            display.textContent = '✓';
            btn.textContent = 'Completado';
            
            setTimeout(() => {
                const modal = display.closest('.modal');
                if (modal) modal.remove();
                mostrarNotificacion('¡Actividad completada! 🎉');
            }, 500);
        }
    }, 1000);
}

/**
 * Reinicia todo el progreso
 */
function reiniciarProgreso() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
        localStorage.removeItem('maldivesProgress');
        mostrarNotificacion('Progreso reiniciado');
        setTimeout(() => {
            // Detectar si estamos en /pages o en raíz
            const indexPath = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
            window.location.href = indexPath;
        }, 1500);
    }
}

/**
 * Obtiene el porcentaje de completitud
 */
function obtenerPorcentajeCompletado() {
    const progreso = obtenerProgreso();
    const total = experiencias.length;
    const completados = progreso.completedSteps.length;
    return Math.round((completados / total) * 100);
}

/**
 * Inicializa audio ambiente en páginas interiores
 */
function initAudio() {
    if (localStorage.getItem('audioEnabled') !== 'true') return;
    if (document.getElementById('audioAmbiente')) return; // ya existe en index.html
    const audio = document.createElement('audio');
    audio.src = '../assets/audio/ambiente.mp3';
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);
    audio.play().catch(() => {});
}

document.addEventListener('DOMContentLoaded', initAudio);
