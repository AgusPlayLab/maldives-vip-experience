# 🚀 Guía de Inicio Rápido - Nuevo Diseño Multi-Página

## ✨ Novedades

El proyecto ha sido **reestructurado** con un diseño multi-página más modular:

- ✅ **Página principal (hub)** con grid de experiencias
- ✅ **9 páginas individuales** para cada experiencia
- ✅ **Sistema híbrido**: experiencias libres + bloqueadas
- ✅ **Fácil de expandir**: agregar juegos es muy simple

## Pasos para poner en marcha

### 1. **Agregar imágenes**

Descarga 15 imágenes de Maldivas y colócalas en:
- `assets/images/` - 10 imágenes principales (ver [assets/images/README.md](assets/images/README.md))
- `assets/memories/` - 5 fotos para el álbum (ver [assets/memories/README.md](assets/memories/README.md))

Fuentes gratuitas: [Unsplash](https://unsplash.com/s/photos/maldives), [Pexels](https://www.pexels.com/search/maldives/)

### 2. **Abrir la aplicación**

Abre el archivo `src/index.html` directamente en tu navegador.

**O** usa un servidor local:

#### Opción A: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `src/index.html` > "Open with Live Server"

#### Opción B: Python

```bash
cd src
python -m http.server 8000
```

Luego abre: <http://localhost:8000>

#### Opción C: Node.js

```bash
npx serve src -p 8000
```

Luego abre: <http://localhost:8000>

### 3. **Configurar Supabase** (Opcional)

Si quieres guardar el feedback en una base de datos:

1. Sigue las instrucciones en [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Edita `src/supabase.js` con tus credenciales

**Nota:** El proyecto funciona perfectamente sin Supabase.

### 4. **Explorar las experiencias**

1. Abre `index.html` → Verás el hero y grid de experiencias
2. Las experiencias libres están siempre disponibles (✈️🌊🌺📸)
3. Las experiencias bloqueadas muestran un candado (🔒)
4. Haz clic en cualquier experiencia libre para comenzar
5. Completa juegos → Se marcan con ✓
6. Finaliza la experiencia → Vuelve al hub con ✅

### 5. **Agregar más juegos** (¡Súper fácil!)

#### Para agregar un juego a experiencia existente:

1. Abre `src/experiencias.js`
2. Busca la experiencia (ej: `actividades`)
3. Agrega un nuevo juego al array `games`:

```javascript
{
    title: 'Buceo profundo',
    description: 'Explora el arrecife de coral',
    type: 'interactive',
    image: '../assets/images/buceo.jpg'
}
```

4. Coloca la imagen en `assets/images/buceo.jpg`
5. ¡Recarga la página! El juego aparece automáticamente

#### Para crear una nueva experiencia completa:

1. Agrega la configuración en `experiencias.js`
2. Crea una nueva página HTML (copia `actividades.html` como plantilla)
3. Agrega la imagen

Ver detalles en [ARQUITECTURA.md](ARQUITECTURA.md)

## 📁 Estructura del Proyecto (Nuevo Diseño)

```text
maldives-vip-experience/
├── assets/
│   ├── images/          # 10 imágenes de experiencias
│   └── memories/        # 5 fotos del álbum
├── src/
│   ├── index.html       # Hub principal (página de inicio)
│   ├── vuelo.html       # Página: Vuelo
│   ├── hidroavion.html  # Página: Hidroavión
│   ├── villa.html       # Página: Villa
│   ├── actividades.html # Página: Actividades (múltiples juegos)
│   ├── spa.html         # Página: Spa
│   ├── cena.html        # Página: Cena
│   ├── atardecer.html   # Página: Atardecer
│   ├── album.html       # Página: Álbum de fotos
│   ├── feedback.html    # Página: Formulario final
│   ├── style.css        # Estilos globales
│   ├── shared.js        # ⭐ Funciones compartidas
│   ├── experiencias.js  # ⭐ Configuración de experiencias
│   └── supabase.js      # Integración BD (opcional)
├── ARQUITECTURA.md      # ⭐ Guía del nuevo diseño
├── QUICKSTART.md        # Esta guía
└── SUPABASE_SETUP.md    # Configuración de BD
```

## ✨ Características

✅ **Diseño Multi-Página** - Cada experiencia tiene su propia página  
✅ **Grid de Miniaturas** - Vista visual de todas las experiencias  
✅ **Sistema Híbrido** - Algunas experiencias libres, otras bloqueadas  
✅ **Progreso Persistente** - Se guarda en localStorage automáticamente  
✅ **9 Experiencias Interactivas** - Con múltiples juegos  
✅ **Fácil de Expandir** - Agregar juegos es muy simple  
✅ **Responsive** - Funciona en móvil y desktop  
✅ **Navegación Intuitiva** - Barra superior en cada página  
✅ **Modales Interactivos** - Para actividades y juegos  
✅ **Feedback con Supabase** - Opcional pero funcional  

## 🎮 Tipos de Juegos Disponibles

- **text** - Campo de texto para respuestas abiertas
- **choice** - Opciones múltiples para elegir
- **timer** - Temporizador para actividades de tiempo
- **interactive** - Interacción simple tipo "completar"

## 🔓 Experiencias Libres vs Bloqueadas

**Libres** (siempre accesibles):
- ✈️ Vuelo a Maldivas  
- 🌊 Playa y actividades  
- 🌺 Spa  
- 📸 Álbum del viaje  

**Bloqueadas** (secuenciales):
- 🛩️ Hidroavión (después del vuelo)  
- 🏝️ Villa (después del hidroavión)  
- 🍽️ Cena en la playa  
- 🌅 Atardecer  
- 📝 Feedback (final)  

## Compatibilidad

- ✅ Chrome/Edge (versiones recientes)
- ✅ Firefox (versiones recientes)
- ✅ Safari (versiones recientes)
- ✅ Móviles (iOS/Android)

## Publicar en GitHub Pages

1. Sube el proyecto a GitHub
2. Ve a **Settings** > **Pages**
3. Selecciona la rama `main` y carpeta `/src`
4. Tu sitio estará disponible en: `https://tu-usuario.github.io/maldives-vip-experience/`

## Soporte

Si tienes problemas:
1. Abre la consola del navegador (F12) y busca errores
2. Verifica que todas las imágenes estén en su lugar
3. Asegúrate de que los paths relativos sean correctos

## Próximas Mejoras Posibles

- [ ] Agregar más mini-juegos interactivos
- [ ] Sistema de puntos o logros
- [ ] Compartir en redes sociales
- [ ] Modo oscuro
- [ ] Sonidos ambiente del océano
- [ ] Más idiomas

¡Disfruta creando experiencias VIP inolvidables! 🏝️✨
