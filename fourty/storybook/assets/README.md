# storybook/assets

Recursos gráficos del 42DS Storybook (solo el **chrome**; el componente
documentado usa los assets reales del DS en `/cds-statics/`).

```
assets/
├── README.md          ← este archivo
├── icons.js           ← registro runtime de iconos (path inline + currentColor)
└── icons/             ← SVG originales (descargables/editables)
    │ ─── Sidebar (árbol de stories) ───
    ├── folder.svg          → icono de componente en el árbol
    ├── file-text.svg       → icono "Overview" (Docs)
    ├── bookmark-simple.svg → icono de story
    ├── squares-four.svg    → icono de subgroup (Galleries)
    ├── caret-down.svg      → carets de plegado
    ├── magnifying-glass.svg → buscador del sidebar + buscador del dropdown Cabecera
    ├── x.svg               → aspa del botón "Limpiar búsqueda" del buscador
    │
    │ ─── Toolbar Canvas ───
    ├── circle-half.svg     → label "Fondo"
    ├── moon.svg            → label "Oscuro" (modo oscuro)
    ├── arrows-out.svg      → botón "Pantalla completa" (entrar)
    ├── arrows-in.svg       → botón "Pantalla completa" (salir) + solapa "Mostrar paneles"
    │
    │ ─── Sub-toolbar A11y ───
    ├── eye.svg             → label "Visión" (simulación de daltonismo)
    ├── text-aa.svg         → label "Texto" (zoom de fuente)
    ├── circles-three.svg   → label "Colores forzados" (Windows HCM / forced-colors)
    ├── play-pause.svg      → label "Movimiento" (prefers-reduced-motion)
    ├── keyboard.svg        → label "Foco" (focus visible)
    ├── text-indent.svg     → label "Espaciado" (WCAG 1.4.12)
    └── ruler.svg           → label "Medidas" (inspector hover)
```

---

## Iconos — Phosphor

Set: **[Phosphor Icons](https://phosphoricons.com)**, peso `regular`, `viewBox 0 0 256 256`.
Licencia **MIT**.

- `icons/*.svg` — originales tal cual se descargan de Phosphor (fuente de verdad para
  diseño). Son archivos `<svg>` completos, listos para abrir en cualquier editor.
- `icons.js` — los mismos iconos en forma **runtime**: solo el atributo `d` del `<path>`
  inline, con `currentColor` para herencia de color desde CSS. Se carga **antes** del
  motor (`js/core/storybook.js`), que los consume vía `window.SB_ICONS.svg(nombre, clase)`.

**Por qué dos formas**: un `<img src="icons/x.svg">` no permite teñir el icono desde
CSS (el color va dentro del SVG). El SVG inline con `fill="currentColor"` SÍ — el icono
hereda el `color` CSS del padre, lo que permite tematizar light/dark y hover states con
solo cambiar `color`.

---

## Cómo se usa en el motor

```js
const ICONS = window.SB_ICONS;

// En cualquier template del chrome:
'<button class="cb-icobtn">' + ICONS.svg("arrows-out", "cb-icobtn__ic") + '</button>'

// El método devuelve un <svg> inline con la clase indicada:
//   <svg class="cb-icobtn__ic" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
//     <path d="..."/>
//   </svg>
```

Todos los iconos están registrados en `PATHS` dentro de `icons.js`. El método
`SB_ICONS.svg(name, className)` lee el path por nombre, monta el `<svg>` con `viewBox`
estándar y devuelve el HTML como string.

---

## Añadir un icono nuevo

1. **Buscar el icono en Phosphor**: https://phosphoricons.com → escoge peso `regular`.
2. **Descargar el SVG**: botón "Download SVG" → guarda en `icons/<nombre-kebab-case>.svg`.
3. **Extraer el atributo `d` del `<path>`** del SVG descargado (ignora el `<rect width="256"
   height="256" fill="none"/>` decorativo si lo lleva).
4. **Añadir a `PATHS` en `icons.js`** con la clave igual al nombre del archivo:
   ```js
   "mi-icono": "M123,45..."
   ```
5. **Usar en el motor** con `ICONS.svg("mi-icono", "tu-clase-css")`.

Alternativa más rápida si tienes la URL: usar el path desde `unpkg`:

```bash
# Ej. para "ruler":
curl https://unpkg.com/@phosphor-icons/core@2.1.1/assets/regular/ruler.svg
```

El SVG descargado siempre tiene la estructura:
```xml
<svg xmlns="..." viewBox="0 0 256 256" fill="currentColor">
  <path d="..."/>     <!-- ← este es el "d" que necesitas -->
</svg>
```

Pegar el `d` en `PATHS`.

---

## Convenciones

- **Nombre del icono**: kebab-case, exactamente como en Phosphor (`arrows-out`, no
  `arrowsOut` ni `arrows_out`). Permite mapear directamente del catálogo de Phosphor.
- **Peso**: solo `regular`. Otros pesos (`bold`, `fill`, `thin`, `light`, `duotone`) NO
  se usan — coherencia visual obligatoria.
- **Tamaño de uso**: las clases que aplican el icono fijan tamaño (`width: 14px`,
  `width: 16px`…). El SVG en sí es de 256×256 pero escala perfecto.
- **Color**: SIEMPRE `currentColor`. Nunca hardcodear un color en el path.

---

## ¿Por qué no usar una librería de iconos en runtime?

- **Zero-toolchain**: cargar Phosphor desde npm requiere bundler o `<script type="module">`
  + import maps. Innecesario para los ~16 iconos que usa el chrome.
- **Tree-shaking manual gratis**: solo metemos los iconos que usamos. El chrome no carga
  los 1200+ iconos de Phosphor.
- **Cero dependencia externa**: el storybook funciona offline (los SVGs viven en el
  repo).
- **Coste mínimo**: cada path es ~200-500 caracteres. Los 16 iconos suman ~5KB inline en
  `icons.js`, prácticamente nada.

---

## Reglas no-negociables

1. **Solo iconos de Phosphor regular**. No mezclar sets ni pesos.
2. **`currentColor` siempre**. El icono hereda el color del padre.
3. **Mismo nombre del archivo SVG que la clave en `PATHS`**. Trazabilidad: si quieres
   verificar el icono `arrows-out`, vas a `icons/arrows-out.svg`.
4. **`aria-hidden="true"`** en todos los `<svg>` decorativos (lo hace `SB_ICONS.svg`
   automáticamente). Si un icono fuese semánticamente significativo (sin label de texto),
   habría que tematizar el wrapper con `aria-label` — pero en el chrome todos van con
   label, así que esto no aplica.
