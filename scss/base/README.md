# Base – Reset y fundamentos

Estilos base: reset, helpers, dark mode. Se importa **antes** del brand setup.

## Estructura

```
base/
├── base.scss              # Punto de entrada
├── _reset.scss            # Reset global
├── _dark.scss             # Modo oscuro
└── helpers/
    ├── helpers.scss       # Orquestador de helpers
    ├── _affixes.scss
    ├── _align.scss
    ├── _anchors.scss
    ├── _animations.scss
    ├── _backgrounds.scss
    ├── _branded.scss
    ├── _collapses.scss
    ├── _closenews.scss
    ├── _display.scss
    ├── _dividers.scss
    ├── _fonts.scss
    ├── _grids.scss
    ├── _hides.scss
    ├── _images.scss
    ├── _overlays.scss
    ├── _position.scss
    ├── _properties.scss
    ├── _size.scss
    ├── _scrolls.scss
    ├── _shows.scss
    ├── _spacers.scss
    ├── _texts.scss
    └── _uihelper.scss
```

## Orden de imports

```scss
@import "base/base";
// = reset, helpers, dark
```

## Contenido

- **reset**: Reset global de estilos
- **helpers**: Clases `ft-helper-*` (spacers, fonts, colors, display, etc.)
- **dark**: Estilos para modo oscuro

## Helpers por categoría (caso de uso)

Cada partial `helpers/_*.scss` genera un grupo de clases utilitarias. Úsalas en el HTML para resolver necesidades puntuales **sin escribir CSS custom**. Documentación visual completa: `fourty/helpers/`.

| Partial | Clases que genera (aprox.) | Caso de uso (cuándo usarlo) |
|---------|----------------------------|------------------------------|
| `_spacers.scss` | `ft-helper-spacer-t/b/inner/gap-*` | Aplicar margen, padding o gap de la escala del DS sin valores mágicos. |
| `_fonts.scss` | `ft-helper-fontSize-*`, `ft-helper-fontWeight-*`, `ft-helper-fontColor-*` | Ajustar tamaño, peso o color de texto puntualmente (ej. el título de una card genérica). |
| `_backgrounds.scss` | `ft-helper-bgColor-*` | Pintar el fondo de un bloque con un color del sistema. |
| `_display.scss` | `ft-helper-display-flex(--middle/--end/--column)` | Maquetar flex rápido (centrar, alinear) sin crear una clase nueva. |
| `_align.scss` | `ft-helper-align-*` | Alinear texto/contenido (left, center, right). |
| `_grids.scss` | `ft-layout-grid-flex*` | Maquetar con el grid flex de 12 columnas y sus breakpoints. |
| `_hides.scss` / `_shows.scss` | `ft-helper-hide-*` / `ft-helper-show-*` | Ocultar/mostrar por breakpoint o de forma accesible (`hide-visually`). |
| `_position.scss` | `ft-helper-position-*` | Posicionar (relative/absolute/sticky) sin CSS custom. |
| `_size.scss` | `ft-helper-size-*` | Forzar ancho/alto de la escala del DS. |
| `_affixes.scss` | `ft-helper-affix-*` | Fijar un elemento al hacer scroll (sticky controlado). |
| `_overlays.scss` | `ft-helper-overlay-*` | Capa/veladura sobre una imagen o bloque. |
| `_images.scss` | `ft-helper-img-*` | `object-fit`, ratios y tratamiento de imágenes. |
| `_texts.scss` | `ft-helper-text-*` | Truncado, `text-transform`, `white-space`. |
| `_dividers.scss` | `ft-helper-divider-*` | Línea o separación entre bloques. |
| `_animations.scss` | `ft-helper-animation-*` | Animación predefinida de entrada/transición. |
| `_anchors.scss` | helpers de anclas | Estilos utilitarios para enlaces/anclas. |
| `_branded.scss` | helpers de marca | Aplicar detalles con identidad de la marca activa. |
| `_collapses.scss` | `ft-helper-collapse-*` | Colapsar/expandir contenido. |
| `_closenews.scss` | helpers de cierre | Descartar/cerrar un bloque de noticia. |
| `_scrolls.scss` | `ft-helper-scroll-*` | Controlar overflow/scroll de un contenedor. |
| `_properties.scss` / `_uihelper.scss` | utilidades varias | Propiedades CSS sueltas no cubiertas por las categorías anteriores. |

> **Regla**: prefiere un helper a escribir CSS custom para espaciado, color, display o tipografía. Solo crea CSS nuevo cuando ningún helper resuelva el caso.

## AMP

Existe `amp-base` para la versión AMP (importado en `amp-*-index.scss`).

## Reglas para IA

1. **No modificar** base sin coordinar; afecta a todo el DS
2. **Helpers**: Los helpers se generan aquí; ver `fourty/helpers/` para documentación HTML
3. **Orden**: Base se importa después de abstracts y antes de brands
4. **Dark mode**: `_dark.scss` contiene estilos para `.ft-skin--dark` o similar
