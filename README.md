# 🏝️ Maldives VIP Experience

Una experiencia web interactiva de lujo en las Maldivas con sistema de progreso y mini-juegos.

## 📁 Estructura del Proyecto (Profesional)

```text
maldives-vip-experience/
├── index.html              # Página principal (hub de experiencias)
├── checkin.html            # Página de check-in VIP con QR code
├── css/
│   └── style.css          # Estilos globales del proyecto
├── js/
│   ├── shared.js          # Funciones compartidas y gestión de progreso
│   ├── experiencias.js    # Configuración de experiencias y juegos
│   └── supabase.js        # Integración con base de datos (opcional)
├── pages/
│   ├── vuelo.html         # Experiencia: Vuelo a Maldivas
│   ├── hidroavion.html    # Experiencia: Traslado en hidroavión
│   ├── villa.html         # Experiencia: Check-in en la villa
│   ├── actividades.html   # Experiencia: Playa y actividades
│   ├── spa.html           # Experiencia: Spa
│   ├── cena.html          # Experiencia: Cena en la playa
│   ├── atardecer.html     # Experiencia: Atardecer
│   ├── album.html         # Experiencia: Álbum del viaje
│   └── feedback.html      # Experiencia: Opinión final
├── assets/
│   ├── images/            # Imágenes de experiencias (10 fotos)
│   └── memories/          # Fotos del álbum (5 fotos)
└── docs/
    ├── ARQUITECTURA.md    # Documentación de arquitectura
    ├── QUICKSTART.md      # Guía de inicio rápido
    ├── SUPABASE_SETUP.md  # Configuración de base de datos
    ├── CHECKIN.md         # Especificaciones de página check-in
    └── WELCOME.html       # Página de bienvenida del proyecto
```

## ✨ Características

- ✅ **VIP Check-In Page**: Página de validación de embarque con QR code dinámico
- ✅ **Diseño Multi-Página**: Cada experiencia tiene su propia página HTML
- ✅ **Grid Visual**: Vista de miniaturas con todas las experiencias
- ✅ **Sistema Híbrido**: Experiencias libres + experiencias bloqueadas
- ✅ **Progreso Persistente**: Guarda automáticamente en localStorage
- ✅ **9 Experiencias Interactivas**: Con múltiples mini-juegos
- ✅ **Responsive**: Optimizado para móvil y desktop
- ✅ **Modular y Escalable**: Fácil de expandir

## 🎫 Página VIP Check-In

La página [checkin.html](checkin.html) simula un proceso de check-in de aeropuerto VIP antes de comenzar el viaje:

- **Diseño tropical** inspirado en Maldivas con gradientes turquesa y sunset
- **Validación de pasajero** con animaciones de carga
- **QR code estático de alta calidad** que enlaza a la experiencia completa (250x250px, fácil de escanear)
- **Mensajes del resort** para mayor inmersión
- **Mobile-first** y completamente responsive

**Características técnicas:**
- HTML/CSS/JS vanilla (sin frameworks ni librerías externas)
- QR code generado mediante API (QR Server) - sin dependencias JavaScript
- Animaciones CSS suaves y elegantes
- Compatible con GitHub Pages sin configuración adicional
- Alto contraste para fácil lectura del código QR

**Flujo de usuario:**
1. Ver información del pasajero (Veronica → Maldives)
2. Click en "Validate Boarding Pass"
3. Estado de carga con spinner
4. Confirmación de verificación exitosa
5. Visualización automática del QR code
6. Opción de reiniciar validación

## 🚀 Inicio Rápido

### 1. Agregar Imágenes

Descarga 15 imágenes de Maldivas y colócalas en:
- `assets/images/` - 10 imágenes principales
- `assets/memories/` - 5 fotos del álbum

**Fuentes gratuitas:**
- [Unsplash](https://unsplash.com/s/photos/maldives)
- [Pexels](https://www.pexels.com/search/maldives/)

### 2. Abrir el Proyecto

Simplemente abre `index.html` en tu navegador.

**O usa un servidor local:**

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve -p 8000

# Con VS Code
# Extensión: Live Server → Click derecho en index.html → "Open with Live Server"
```

Luego abre: <http://localhost:8000>

### 3. Configurar Supabase (Opcional)

Para guardar el feedback en una base de datos:

1. Lee [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
2. Edita `js/supabase.js` con tus credenciales

**El proyecto funciona perfectamente sin Supabase.**

## 📖 Documentación

- [docs/QUICKSTART.md](docs/QUICKSTART.md) - Guía de inicio rápido completa
- [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) - Arquitectura y cómo expandir
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) - Configuración de base de datos
- [docs/WELCOME.html](docs/WELCOME.html) - Página de bienvenida interactiva

## 🎮 Agregar Nuevos Juegos

### Agregar juego a experiencia existente:

1. Edita `js/experiencias.js`
2. Busca la experiencia (ej: `actividades`)
3. Agrega al array `games`:

```javascript
{
    title: 'Buceo profundo',
    description: 'Explora el arrecife de coral',
    type: 'interactive',
    image: '../assets/images/buceo.jpg'
}
```

4. Coloca la imagen en `assets/images/buceo.jpg`
5. ¡Recarga! El juego aparece automáticamente

Ver [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md) para crear nuevas experiencias completas.

## 🌐 Publicar en GitHub Pages

### Configuración:

1. Sube el proyecto a GitHub
2. Ve a **Settings** > **Pages**
3. Selecciona la rama `main` y carpeta **/ (root)**
4. ¡Listo! Tu sitio estará en: `https://tu-usuario.github.io/maldives-vip-experience/`

**Nota:** Como `index.html` está en la raíz, GitHub Pages lo detectará automáticamente como página principal.

## 🔓 Sistema de Experiencias

**Experiencias Libres** (siempre accesibles):
- ✈️ Vuelo a Maldivas
- 🌊 Playa y actividades
- 🌺 Spa
- 📸 Álbum del viaje

**Experiencias Bloqueadas** (secuenciales):
- 🛩️ Hidroavión (requiere completar vuelo)
- 🏝️ Villa (requiere completar hidroavión)
- 🍽️ Cena en la playa
- 🌅 Atardecer
- 📝 Feedback (final)

## 🛠️ Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript Vanilla** - Lógica
- **localStorage** - Persistencia de progreso
- **Supabase** (opcional) - Base de datos

## 🎨 Paleta de Colores

```css
--turquoise: #40E0D0
--ocean-blue: #006994
--sand-beige: #F5DEB3
--white: #FFFFFF
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (versiones recientes)
- ✅ Firefox (versiones recientes)
- ✅ Safari (versiones recientes)
- ✅ Móviles (iOS/Android)

## 💡 Próximas Mejoras

- [ ] Más tipos de juegos interactivos
- [ ] Sistema de puntos o logros
- [ ] Sonidos ambiente del océano
- [ ] Compartir en redes sociales
- [ ] Modo oscuro
- [ ] Soporte multi-idioma

## 📄 Licencia

Este proyecto es de código abierto para uso educativo y personal.

## 👥 Créditos

Creado con ❤️ para experiencias VIP inolvidables.

**Imágenes:** [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (agregar tus propias imágenes)

---

🏝️ **¡Disfruta creando experiencias inolvidables en las Maldivas!** ✨

The project must work as a **static website compatible with GitHub Pages** and be easy to edit using **VSCode with GitHub Copilot**.

Use only:

- HTML
- CSS
- Vanilla JavaScript

No frameworks.

The website language must be **Spanish**.

The code must be clean, modular and easy to expand because new travel experiences and games may be added later.

--------------------------------------------------

PROJECT GOAL

The website simulates a playful luxury trip to the Maldives with a VIP passenger.

The experience unfolds step by step like a travel itinerary.

Each step unlocks the next one and contains playful challenges or mini-games.

Progress must be saved using **localStorage** so if the user closes the page they can continue the journey.

--------------------------------------------------

VISUAL STYLE

Luxury tropical resort aesthetic.

Color palette:

- turquoise
- ocean blue
- sand beige
- white

Use large immersive images.

Design should feel:

- relaxing
- immersive
- playful
- elegant

Add smooth transitions and hover animations.

--------------------------------------------------

PROJECT STRUCTURE

Create this folder structure:

assets/
images/
memories/

Files:

index.html
style.css
script.js
experiencias.js
supabase.js

--------------------------------------------------

HERO SECTION

At the top of the page create a large hero header using a Maldives beach image.

Overlay text:

Maldives VIP Experience

Pasajera VIP: Veronica  
Empleado de confianza: [nombre]

Misión:
Garantizar que la experiencia Maldives sea inolvidable.

Include a button:

"Comenzar viaje"

Optional toggle for ocean ambient sound.

--------------------------------------------------

TRAVEL ITINERARY

Create a horizontal itinerary progress bar with icons.

Steps:

✈ Vuelo a Maldivas  
🛩 Traslado en hidroavión  
🏝 Check-in en la villa  
🌊 Playa y actividades  
🌺 Spa  
🍽 Cena en la playa  
🌅 Atardecer  
📸 Álbum del viaje  
📝 Opinión de la experiencia

Some step titles should remain hidden until unlocked.

Example:

🌊 ---- ----
🌺 ---- ----
🍽 ---- ----

Unlock the next step after completing the current one.

--------------------------------------------------

EXPERIENCE SYSTEM

Experiences must be defined in a configuration file called:

experiencias.js

Each experience should contain:

id  
title  
icon  
description  
image  
games[]

Games should contain:

title  
description  

This structure must allow adding or removing experiences and games easily.

--------------------------------------------------

ACTIVITIES SECTION

For activities create image cards that are clickable.

Examples:

Snorkel  
Paseo por la playa  
Aventura en la isla

Clicking a card opens a modal with the challenge description.

--------------------------------------------------

SPA SECTION

Relaxing section with spa image and calming text.

Challenge example:

10 seconds of deep breathing.

--------------------------------------------------

DINNER SECTION

Dinner on the beach experience.

Challenge example:

Each traveler says something positive about the trip.

--------------------------------------------------

SUNSET SECTION

Sunset moment experience.

Challenge:

Look at the horizon silently for 5 seconds.

--------------------------------------------------

PHOTO ALBUM

Create a gallery grid with 5 travel memory photos.

Add captions such as:

Llegada al paraíso  
Exploradores marinos  
Momento zen  
Sunset crew  
Misión cumplida

--------------------------------------------------

FEEDBACK FORM

Final section where the passenger can rate the experience.

Fields:

Nombre  
Valoración del viaje (1–5 estrellas)  
Actividad favorita  
Nivel de diversión  
¿Repetirías el viaje?  
Comentario

--------------------------------------------------

SUPABASE INTEGRATION

Create a module called:

supabase.js

Use Supabase client to insert feedback into table:

maldives_experience_feedback

Fields:

passenger_name  
experience_rating  
favorite_activity  
fun_level  
would_repeat  
comment  
created_at

--------------------------------------------------

INTERACTIONS

Include:

smooth transitions  
modal popups for games  
hover effects on cards  
progress bar updates  
localStorage progress saving

--------------------------------------------------

MOBILE DESIGN

Design must be mobile-first.

The itinerary should be horizontally scrollable on small screens.

Images should scale responsively.

--------------------------------------------------

CODE QUALITY

Write clear commented code.

Separate responsibilities:

HTML structure  
CSS styling  
JavaScript logic  
Experience configuration  
Supabase integration

The system must be easy to expand with new travel experiences and new mini-games.