# SCSS – Fuente de estilos 42DS

Código fuente SCSS del Design System. Se compila a CSS y se publica en `cds-statics/css/`. **No hay script de build en npm**; la compilación se realiza con Prepros u otra herramienta externa configurada en `prepros.config`.

## Estructura de carpetas

| Carpeta | Contenido | Uso |
|---------|-----------|-----|
| `abstracts/` | Variables, mixins, funciones, maps | Base compartida por todo el proyecto |
| `base/` | Reset, helpers, dark mode | Estilos fundamentales |
| `brands/` | Setup por marca (ux, sport, ep, etc.) | Resets, tipografía, colors, scrollbar |
| `fourties/` | Componentes Atomic Design | Atoms (31), molecules (71), organisms (35) |
| `layout/` | Sistema de grid | Grid flex 12 columnas, grid legacy, AMP grid |
| `graphs/` | Estilos de gráficos (Chartist) | Gráficos y visualizaciones de datos |
| `vendors/` | Librerías externas (Bourbon, Swiper…) | Dependencias SCSS — no modificar |
| `widgets/` | Widgets específicos | Elecciones, JJOO y otros especiales |

## Flujo de compilación

```
abstracts (variables, mixins, maps, functions)
        ↓
vendors/bourbon (mixin library)
        ↓
base (reset, helpers, dark mode)
        ↓
brands/[marca]-setup (resets-custom, backgrounds, fonts, helpers)
        ↓
layout (grid flex, grid legacy)
        ↓
fourties/atoms → fourties/molecules → fourties/organism
        ↓
cds-statics/css/brands/[marca]/[marca]-core.css
```

## Archivos de entrada (entry points)

### Marcas estándar (HTML5)

| Archivo | Descripción |
|---------|-------------|
| `ux-core.scss` | Bundle showroom/universal |
| `sport-core.scss` | Bundle Sport |
| `ep-core.scss` | Bundle El Periódico |
| `epe-core.scss` | Bundle El Periódico de España |
| `regionales-core.scss` | Bundle Regionales |
| `revistas-core.scss` | Bundle Revistas |

### Piano (paywall) — variantes con muro de pago

Los archivos `piano-[marca]-core.scss` son bundles alternativos para páginas con Piano (sistema de paywall). Incluyen los mismos componentes que el core estándar pero con estilos del muro de pago activos.

| Archivo | Marca |
|---------|-------|
| `piano-sport-core.scss` | Sport |
| `piano-ep-core.scss` | El Periódico |
| `piano-epe-core.scss` | El Periódico de España |
| `piano-regionales-core.scss` | Regionales |
| `piano-revistas-core.scss` | Revistas |

### Header extensions

Bundles adicionales sólo con los estilos del header (para carga independiente en algunos medios):

- `ux-header-ext.scss`, `sport-header-ext.scss`, `ep-header-ext.scss`, `epe-header-ext.scss`, `regionales-header-ext.scss`, `revistas-header-ext.scss`

---

## AMP – Variantes para Google AMP

Las páginas AMP tienen su propio sistema de compilación paralelo. Los entry points AMP son distintos a los HTML5.

### Entry points AMP

| Archivo index | Archivo core | Marca |
|---------------|--------------|-------|
| `amp-sport-index.scss` | `amp-sport-core.scss` | Sport |
| `amp-ep-index.scss` | `amp-ep-core.scss` | El Periódico |
| `amp-epe-index.scss` | `amp-epe-core.scss` | El Periódico de España |
| `amp-regionales-index.scss` | `amp-regionales-core.scss` | Regionales |
| `amp-viajar-index.scss` | `amp-viajar-core.scss` | Viajar |
| `amp-woman-index.scss` | `amp-woman-core.scss` | Woman |
| `amp-stilo-index.scss` | `amp-stilo-core.scss` | Stilo |
| `amp-cuore-index.scss` | `amp-cuore-core.scss` | Cuore |

> **Nota**: Viajar, Woman, Stilo y Cuore sólo existen en versión AMP. No tienen bundle HTML5.

### Diferencias clave AMP vs HTML5

| Aspecto | HTML5 | AMP |
|---------|-------|-----|
| Entry point de abstracts | `abstracts/abstracts.scss` | `abstracts/amp-abstracts.scss` |
| Mixins | `mixins/mixins.scss` | `mixins/amp-mixins.scss` |
| Setup de marca | `brands/[marca]-setup.scss` | `brands/amp-[marca]-setup.scss` |
| Componentes con variante AMP | Archivo suelto en `fourties/` (atoms) o `fourties/[nivel]/` (molecules, organisms) | Mismo patrón `amp-[nombre].scss` / `_amp-[nombre].scss` |
| Variable de marca | `$brand: sport` | `$brand: amp-sport` (o similar) |

### Componentes con variante AMP

**Atoms** — archivos sueltos en `fourties/` (raíz), **no** dentro de la carpeta del atom:
- Partials `_amp-[nombre].scss`: `_amp-ad`, `_amp-btn`, `_amp-img`, `_amp-link`, `_amp-list`, `_amp-text`
- Archivos de marca `amp-[nombre].scss`: `amp-date`, `amp-tag`, `amp-title`, `amp-trust`

**Molecules** con `amp-[nombre].scss` (sueltos en `fourties/molecules/`):
`amp-advice`, `amp-boxInfo`, `amp-breadcrumb`, `amp-btnGroup`, `amp-headband`, `amp-header`, `amp-label`, `amp-modNews`, `amp-multimedia`, `amp-quote`, `amp-rankingNews`, `amp-related`, `amp-subtitle`, `amp-tab`, `amp-tagsNews`, `amp-tapbar`, `amp-ticker`, `amp-writer`

**Organisms** con `amp-[nombre].scss` (sueltos en `fourties/organism/`):
`amp-breadcrumb`, `amp-directNews`, `amp-object`

---

## Orden de imports típico

```scss
$brand: sport;  // Variable de marca — define condicionales @if $brand == ...

@import "abstracts/abstracts";        // Variables, mixins, maps, functions
@import "vendors/bourbon/bourbon";    // Bourbon mixin library
@import "base/base";                  // Reset + helpers
@import "brands/sport-setup";         // Setup de marca
@import "layout/grid";                // Grid flex 12 columnas
@import "layout/grid_legacy";         // Grid legacy (backward compat)

// Atoms
@import "fourties/atoms/btn/btn";
@import "fourties/atoms/tag/tag";
// ... todos los atoms

// Molecules
@import "fourties/molecules/tabs/tabs";
// ... todas las molecules

// Organisms
@import "fourties/organism/masthead/masthead";
// ... todos los organisms

// Variantes de marca (sport)
@import "fourties/atoms/btn/btn-sport";
@import "fourties/molecules/tabs/tabs-sport";
// ...
```

## Variables globales SCSS

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `$images-path` | `/cds-statics/assets/img` | Ruta base para imágenes |
| `$fonts-path` | `../fonts` | Ruta base para fuentes |
| `$brand` | `ux`, `sport`, `ep`… | Marca activa, define condicionales |

## Variables CSS (output en setting.css)

Los estilos usan `var(--color-*)`, `var(--font-stack)`, etc. Estas variables se definen en `cds-statics/css/brands/[marca]/setting.css`, generado desde `brands/[marca]-setup.scss`.

```css
:root {
  --font-stack: "Fuente", sans-serif;
  --font-primary: "FuentePrimaria", sans-serif;
  --color-primary: #hexcolor;
  --color-secondary: #hexcolor;
  --color-black: #000000;
  --color-white: #ffffff;
}
```

## Guía para IA

1. **Siempre importar abstracts** al inicio de cada componente: `@import "../../../abstracts/abstracts.scss"`
2. **Bourbon**: Usar mixins (`@include position()`, `@include margin()`) en lugar de propiedades directas
3. **BEM**: Clases `.ft-`, `.ft-mol-`, `.ft-org-` con `__elemento` y `--modificador`
4. **Variables CSS**: Preferir `var(--color-primary)` sobre valores hex hardcodeados
5. **Paths**: Usar `#{$images-path}/icons/icon.svg` para imágenes
6. **No modificar** `abstracts`, `base`, `brands` sin coordinar con diseño
7. **Variantes por marca**: Crear `[componente]-[marca].scss` cuando el componente difiera visualmente entre marcas
8. **AMP**: Usar `amp-abstracts.scss` y patrones AMP en componentes AMP; no mezclar con HTML5
9. **Piano**: Los bundles `piano-*-core.scss` son paralelos a los estándar; modificar ambos si el cambio afecta a páginas con paywall
10. **Nuevo componente**: Seguir `AI/processes/ds-nuevo-componente.md`
