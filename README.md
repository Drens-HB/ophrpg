# YORU — El mar no tiene dueño

Prototipo estático de una novela gráfica interactiva, pensado para GitHub Pages. No necesita Node, frameworks ni un servidor.

## Qué incluye
- Portada y selector de capítulos.
- Lector escena a escena con transiciones.
- Navegación con botones y flechas del teclado.
- Indicador de progreso y modo de pantalla completa.
- Diseño adaptable a móvil.
- Escenas iniciales basadas en la historia facilitada.
- Una referencia visual de concepto en `assets/images/referencia-visual.png`.

## Publicar en GitHub Pages
1. Crea un repositorio llamado `yoru-novel` (o el nombre que prefieras).
2. Sube el contenido de esta carpeta, manteniendo la estructura de archivos.
3. En GitHub, entra en **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/ (root)`.
5. Guarda y espera a que GitHub publique la página.

## Añadir ilustraciones originales
El prototipo usa fondos CSS como sustitutos para que el lector funcione desde el primer momento. Para añadir ilustraciones, guarda las imágenes en `assets/images/` y en `js/app.js` añade una propiedad `image` a cada escena, por ejemplo:

```js
{ tag: 'AMAZON LILY', caption: 'Texto de narración...', image: 'assets/images/amazon-lily-01.jpg' }
```

Después se puede adaptar `renderScene()` para usar la imagen como fondo cuando exista. Conviene generar ilustraciones por escena y mantener una guía de estilo consistente para Yoru, Suiren y el resto de personajes.

## Personalización
- Colores, tipografía y responsive: `css/style.css`
- Capítulos, textos y transiciones: `js/app.js`
- Estructura principal: `index.html`

## Nota
La imagen de referencia es una propuesta visual de interfaz, no una página web ni una ilustración final de la historia. Los retratos y fondos de las escenas del prototipo son marcadores estilizados que deben sustituirse por arte original.
