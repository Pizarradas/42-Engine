# storybook/js/layouts - indice de paginas por marca + Grid

Los **Layouts** del Storybook siguen siendo, en su mayoria, **paginas completas por marca**
(`layout-[marca]-[tipo]`). Se publican como stories `kind:"page"`: el iframe navega al
fichero y ejecuta su propio `<head>`, CSS y JS.

Hay una excepcion deliberada: **`Grid`**. Antes vivia en `Varios` como una pagina muda
(`layout-grid-flex.html`) junto a `layout-home.html`. Ahora `Grid` se publica como entrada
interactiva dentro del grupo `Layouts`, dividida en dos categorias:

- `Basics`
  Para leer breakpoints, columnas y rows base sin mezclar variantes contextuales.
- `Advanced variants`
  Para variantes complejas o mas contextuales, cada una con su sistema de control
  especifico.

Las stories siguen leyendo `_grid.scss` por capas reales:

- `Responsive column`
  Lee una columna completa con `Xs/Sm/Md/Lg`, offsets e inner spacer.
  La story muestra una matriz por breakpoint para evitar la confusion tipica de
  "he tocado Xs pero estoy mirando Sm".
- `Row behaviors`
  Expone el set base de `__row*`: justify, align, reverse, `rowMaxgrid`
  y `rowIs-p-less`.
- `Editorial row`
  Mueve a avanzado las variantes mas dificiles de leer en una demo basica:
  `rowIs-fullwidth`, `rowAds` y `rowAdsGutter-0`.
- `Column utilities`
  Expone `colFirst-*`, `colLast-*`, `colGutter-*` y `colIs-relative`.
- `2 / 3 / 4 columns`
  Muestran patrones canonicos por breakpoint activo, sin mezclar overrides de
  varios breakpoints a la vez.
- `Nested construction`
  Documenta `__nested`, `__nestedCenter/End-*` y `__nestedGutter-0` dentro de
  un shell main/aside.

`layout-home.html` queda fuera del indice.

## Diferencia con Templates

| | Templates | Layouts |
|---|---|---|
| Naturaleza | composicion multimarca | pagina por marca |
| `brandable` | `true` | `false` en las paginas reales |
| Excepcion | no aplica | `Grid` se documenta como entry interactiva |

## SSOT actual

`layouts.js` mantiene una **SSOT mixta**:

- listado de paginas reales de `fourty/layouts/*.html`
- una entrada manual `Grid` que sustituye al viejo `Varios`

Reglas practicas:

- las paginas reales siguen agrupadas por marca
- `Grid` ya no se navega como `page`; se documenta como sistema
- el primer bloque es `Basics`; las variantes contextuales viven en `Advanced variants`
- `Home` ya no aparece en el sidebar
- `Grid` se fuerza al inicio del grupo `Layouts` con `sort` y se marca con icono propio

## Fuente tecnica

- grid estructural: `scss/layout/_grid.scss`
- helpers complementarios: `scss/base/helpers/_grids.scss`
- referencia historica: `fourty/layouts/layout-grid-flex.html`
