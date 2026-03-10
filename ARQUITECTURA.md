# 🏝️ Maldives VIP Experience - Diseño Multi-Página

## Nuevo Diseño Implementado

El proyecto ha sido reestructurado de **una sola página (SPA)** a un **diseño multi-página** más modular y escalable.

## 📁 Estructura del Proyecto

```
maldives-vip-experience/
├── assets/
│   ├── images/          # Imágenes de experiencias (10 fotos)
│   └── memories/        # Fotos del álbum (5 fotos)
├── src/
│   ├── index.html       # 🏠 Hub principal con grid de experiencias
│   ├── vuelo.html       # ✈️ Experiencia: Vuelo a Maldivas
│   ├── hidroavion.html  # 🛩️ Experiencia: Traslado en hidroavión
│   ├── villa.html       # 🏝️ Experiencia: Check-in en la villa
│   ├── actividades.html # 🌊 Experiencia: Playa y actividades (3 juegos)
│   ├── spa.html         # 🌺 Experiencia: Spa
│   ├── cena.html        # 🍽️ Experiencia: Cena en la playa
│   ├── atardecer.html   # 🌅 Experiencia: Atardecer
│   ├── album.html       # 📸 Experiencia: Álbum del viaje
│   ├── feedback.html    # 📝 Experiencia: Opinión final
│   ├── style.css        # 🎨 Estilos globales
│   ├── shared.js        # ⚙️ Funciones compartidas y progreso
│   ├── experiencias.js  # 📋 Configuración de experiencias
│   └── supabase.js      # 🗄️ Integración base de datos
└── QUICKSTART.md
```

## ✨ Características del Nuevo Diseño

### 1. **Página Principal (index.html)**
- Hero section con imagen de fondo
- Grid de miniaturas mostrando todas las experiencias
- Sistema de bloqueo/desbloqueo visual:
  - ✅ **Experiencias libres** (Vuelo, Actividades, Spa, Álbum) - siempre accesibles
  - 🔒 **Experiencias bloqueadas** - requieren completar la anterior
  - ✓ **Experiencias completadas** - marcadas con borde turquesa

### 2. **Páginas Individuales de Experiencias**
Cada experiencia tiene su propia página HTML con:
- Navegación superior para volver al hub
- Header con icono, título y descripción
- Grid de juegos/actividades (si aplica)
- Botón para marcar como completada
- Sistema de modales para interacciones

### 3. **Sistema de Progreso Compartido (shared.js)**
- Guarda el progreso en `localStorage`
- Funciones compartidas entre todas las páginas:
  - `obtenerProgreso()` - Lee el progreso guardado
  - `guardarProgreso()` - Guarda el estado actual
  - `marcarExperienciaCompletada()` - Marca experiencia completa
  - `marcarJuegoCompletado()` - Marca juego individual completo
  - `mostrarNotificacion()` - Muestra mensajes al usuario
  - `crearNavegacion()` - Genera barra de navegación superior

### 4. **Configuración de Experiencias**
El archivo `experiencias.js` define cada experiencia con:
```javascript
{
    id: 'actividades',
    title: 'Playa y actividades',
    icon: '🌊',
    description: '...',
    image: 'assets/images/playa.jpg',
    page: 'actividades.html',      // ← Página HTML dedicada
    libre: true,                    // ← Acceso libre o bloqueado
    games: [...]                    // ← Juegos de la experiencia
}
```

## 🎮 Agregar Nuevos Juegos/Experiencias

### Opción A: Agregar juego a experiencia existente

1. Edita `experiencias.js`
2. Busca la experiencia (ej: `actividades`)
3. Agrega un nuevo juego al array `games`:

```javascript
{
    title: 'Buceo con tortugas',
    description: 'Sumérgete y encuentra tortugas marinas',
    type: 'interactive',
    image: '../assets/images/buceo.jpg'
}
```

4. Coloca la imagen en `assets/images/buceo.jpg`
5. ¡Listo! El juego aparecerá automáticamente

### Opción B: Crear nueva experiencia completa

1. **Agrega la experiencia en `experiencias.js`:**
```javascript
{
    id: 'kayak',
    title: 'Kayak al atardecer',
    icon: '🚣',
    description: 'Rema por aguas tranquilas',
    image: 'assets/images/kayak.jpg',
    page: 'kayak.html',
    libre: true,
    games: [
        {
            title: 'Remo sincronizado',
            description: 'Mantén el ritmo',
            type: 'interactive',
            image: '../assets/images/kayak.jpg'
        }
    ]
}
```

2. **Crea la página HTML `src/kayak.html`** (copia una existente como plantilla)
3. **Actualiza los índices** si es necesario
4. **Agrega la imagen** en `assets/images/kayak.jpg`

## 🎨 Tipos de Juegos Disponibles

El sistema soporta estos tipos de interacciones:

### `type: 'text'`
Campo de texto para respuestas abiertas
```javascript
{
    title: 'Comparte tu experiencia',
    description: '¿Qué momento te gustó más?',
    type: 'text'
}
```

### `type: 'choice'`
Opciones múltiples
```javascript
{
    title: 'Elige tu actividad',
    description: '¿Qué prefieres hacer?',
    type: 'choice',
    options: ['Snorkel', 'Kayak', 'Paddleboard']
}
```

### `type: 'timer'`
Temporizador para actividades de tiempo
```javascript
{
    title: 'Meditación',
    description: 'Relájate durante 30 segundos',
    type: 'timer',
    duration: 30
}
```

### `type: 'interactive'`
Interacción simple sin input específico
```javascript
{
    title: 'Explorar',
    description: 'Descubre el arrecife',
    type: 'interactive'
}
```

## 🔓 Sistema de Bloqueo Híbrido

Puedes controlar qué experiencias están siempre disponibles:

**Experiencias libres** (`libre: true`):
- ✈️ Vuelo a Maldivas
- 🌊 Playa y actividades
- 🌺 Spa
- 📸 Álbum

**Experiencias secuenciales** (`libre: false`):
- 🛩️ Hidroavión (después del vuelo)
- 🏝️ Villa (después del hidroavión)
- 🍽️ Cena (secuencial)
- 🌅 Atardecer (secuencial)
- 📝 Feedback (al final)

## 🚀 Ventajas del Nuevo Diseño

✅ **Modular**: Cada experiencia es independiente
✅ **Escalable**: Agregar nuevas experiencias es simple
✅ **Navegación clara**: Grid visual intuitivo
✅ **Flexible**: Combina acceso libre y secuencial
✅ **Mantenible**: Código organizado y separado
✅ **Reutilizable**: Funciones compartidas evitan duplicación

## 📱 Responsive

Todo el diseño es mobile-first:
- Grid adaptable automáticamente
- Navegación optimizada para móviles
- Tarjetas que se apilan en pantallas pequeñas

## 🎯 Flujo del Usuario

1. **Landing** en `index.html` → Hero + Grid de experiencias
2. **Clic en experiencia** → Abre página dedicada
3. **Completa juegos** → Cada uno se marca como ✓
4. **Finaliza experiencia** → Botón "Completar"
5. **Vuelve al hub** → La experiencia muestra ✅
6. **Siguiente experiencia** → Se desbloquea automáticamente

## 🔧 Mantenimiento

### Cambiar orden de experiencias
Edita el array `experiencias` en `experiencias.js`

### Cambiar colores
Edita las variables CSS en `style.css` líneas 6-11

### Agregar más imágenes
Coloca archivos en `assets/images/` y referencia en `experiencias.js`

### Configurar Supabase
Sigue [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

## 💡 Ideas para Expandir

- 🎨 Agregar más tipos de juegos (quiz, puzzle, arrastrar)
- 🏆 Sistema de puntos o logros
- 📊 Dashboard de estadísticas
- 🌐 Múltiples idiomas
- 🔊 Efectos de sonido
- 📤 Compartir en redes sociales
- 🎥 Videos o GIFs en experiencias
- 🗺️ Mapa interactivo de la isla

¡El diseño está listo para crecer! 🌴✨
