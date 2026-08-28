# Layout - sistema de grid

Sistema de maquetacion del Design System. Define el **grid flex de 12 columnas**
principal, un grid legacy para compatibilidad y la variante AMP.

## Estructura

```text
layout/
|-- _grid.scss
|-- _grid_legacy.scss
`-- _amp-grid.scss
```

## Patron base

```html
<div class="ft-layout-grid-flex">
  <div class="ft-layout-grid-flex__row">
    <div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colLg-8">
      <!-- contenido -->
    </div>
    <div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colLg-4">
      <!-- aside -->
    </div>
  </div>
</div>
```

## Breakpoints reales del SCSS

| Sufijo | Activo desde | Rango aproximado |
|---|---|---|
| `Xs` | `0px` | `0-767px` |
| `Sm` | `768px` | `768-1001px` |
| `Md` | `1002px` | `1002-1279px` |
| `Lg` | `1280px` | `1280px+` |

Reglas:

- `colXs-*` debe declararse siempre.
- Si un breakpoint no se declara, visualmente hereda el comportamiento del anterior.
- Los offsets existen para todos los breakpoints desde `0` hasta `11`.

## Capas reales de `_grid.scss`

### 1. Contenedor y background

| Clase | Funcion |
|---|---|
| `ft-layout-grid-flex` | contenedor del sistema |
| `ft-layout-grid-flex__bg` | background auxiliar oculto salvo setups concretos |
| `ft-layout-grid-flex__bgTop/Rgt/Bttm/Lft` | posicionamiento del background |

### 2. Columnas publicas

| Familia | Clases | Funcion |
|---|---|---|
| Ancho | `ft-layout-grid-flex__col{Xs|Sm|Md|Lg}-[1-12]` | ancho responsive |
| Offset | `ft-layout-grid-flex__col{Xs|Sm|Md|Lg}Offset-[0-11]` | desplazamiento horizontal |
| Orden | `ft-layout-grid-flex__colFirst-{xs|sm|md|lg}` / `__colLast-{xs|sm|md|lg}` | reorder por breakpoint |
| Gutter | `ft-layout-grid-flex__colGutter-{r|l|x}-0` | retira padding lateral desde `768px` |
| Posicion | `ft-layout-grid-flex__colIs-relative` | activa `position: relative` |

Tambien existen familias contextuales:

- `ft-layout-grid-flex__colHas__minWidth`
- `ft-layout-grid-flex__colHas__AdsLeft`
- `ft-layout-grid-flex__colHas__AdsRight`
- `ft-layout-grid-flex__col-addsLeft`
- `ft-layout-grid-flex__col-addsRight`
- `ft-layout-grid-flex__col-addsContent[--L|--XL]`

Estas clases no son primitivas de uso generico: dependen de shells editoriales,
premium o wrappers de publicidad.

### 3. Rows publicos

| Familia | Clases | Funcion |
|---|---|---|
| Base | `ft-layout-grid-flex__row` | fila flex con wrap y max-width del sistema |
| Max width | `ft-layout-grid-flex__rowMaxgrid` | recorta la fila a `980px` |
| Justify | `__row{Start|Center|End|Around|Between}-{xs|sm|md|lg}` | alineacion horizontal responsive |
| Align | `__row{Top|Middle|Bottom}-{xs|sm|md|lg}` | alineacion vertical responsive |
| Reverse | `ft-layout-grid-flex__rowReverse` | invierte el flujo visual |
| Shell | `__rowIs-p-less`, `__rowIs-fullwidth`, `__rowIs-fullheight` | controla padding lateral, ancho o altura |
| Editorial | `__rowHas-bg`, `__rowAds`, `__rowAdsGutter-0` | variaciones para fondos o publicidad |

### 4. Nested publico

| Clase | Funcion |
|---|---|
| `ft-layout-grid-flex__nested` | subfila dentro de una columna |
| `ft-layout-grid-flex__nested{Center|End}-{xs|sm|md|lg}` | justify del nested por breakpoint |
| `ft-layout-grid-flex__nestedGutter-0` | compensa el gutter lateral del nested |

### 5. Ads container

`_grid.scss` termina con `ft-layout-grid__ads-container*`, pensado para soportes
laterales y separadores de navegacion continua. Es una familia contextual, no una
primitiva base del grid.

## Relacion con helpers/grids

`scss/base/helpers/_grids.scss` no sustituye al layout estructural.
Sirve para dos casos complementarios:

- `ft-helper-grid-width-[1-12]`: override de anchura desde desktop
- `ft-helper-grid-out-mo`: sangrado lateral solo en mobile

Usa primero `ft-layout-grid-flex` para la estructura y anade esos helpers solo
si el layout lo necesita.

## Referencias

- Storybook: `fourty/storybook/js/layouts/layouts.js` -> `Layouts > Grid`
- Storybook: la entrada `Grid` se divide en `Basics` y `Advanced variants`
- Showroom historico: `fourty/layouts/layout-grid-flex.html`
