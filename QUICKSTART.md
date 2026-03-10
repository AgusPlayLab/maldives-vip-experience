# 🚀 Guía de Inicio Rápido

## Pasos para poner en marcha el proyecto

### 1. **Agregar imágenes**

Descarga imágenes de Maldivas y colócalas en:
- `assets/images/` - 10 imágenes principales (ver [assets/images/README.md](assets/images/README.md))
- `assets/memories/` - 5 fotos para el álbum (ver [assets/memories/README.md](assets/memories/README.md))

Fuentes gratuitas: [Unsplash](https://unsplash.com/s/photos/maldives), [Pexels](https://www.pexels.com/search/maldives/)

### 2. **Configurar Supabase** (Opcional)

Si quieres guardar el feedback en una base de datos:
1. Sigue las instrucciones en [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Edita `src/supabase.js` con tus credenciales

Si **NO** configuras Supabase, la app funcionará igual pero el feedback solo se mostrará en consola.

### 3. **Abrir la aplicación**

Simplemente abre el archivo:
```
src/index.html
```

Con tu navegador favorito (Chrome, Firefox, Edge, Safari).

**O** usa un servidor local para mejor experiencia:

#### Opción A: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `src/index.html` > "Open with Live Server"

#### Opción B: Python
```bash
cd src
python -m http.server 8000
```
Luego abre: http://localhost:8000

#### Opción C: Node.js
```bash
npx serve src -p 8000
```
Luego abre: http://localhost:8000

### 4. **Personalizar**

Edita estos archivos según tus necesidades:

- **Nombre de la pasajera VIP**: Edita en `src/script.js` línea 10
- **Agregar más experiencias**: Edita `src/experiencias.js`
- **Cambiar colores**: Edita variables CSS en `src/style.css` líneas 6-11
- **Modificar textos**: Edita `src/index.html`

## Estructura del Proyecto

```
maldives-vip-experience/
├── assets/
│   ├── images/          # Imágenes de las experiencias
│   └── memories/        # Fotos del álbum
├── src/
│   ├── index.html       # Página principal
│   ├── style.css        # Estilos
│   ├── script.js        # Lógica principal
│   ├── experiencias.js  # Configuración de experiencias
│   └── supabase.js      # Integración con base de datos
├── README.md            # Descripción del proyecto
└── SUPABASE_SETUP.md    # Guía de configuración de BD
```

## Características

✅ Sistema de progreso con localStorage (guarda avance automáticamente)  
✅ 9 experiencias interactivas con mini-juegos  
✅ Diseño responsive (funciona en móvil y desktop)  
✅ Formulario de feedback con integración opcional a Supabase  
✅ Transiciones y animaciones suaves  
✅ Código modular y fácil de expandir  

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
