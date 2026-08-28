# 42DS · `ft-org-container` — Guía

Visita guiada al organismo **container**: qué es, sus cinco variantes y un
foco especial en `--communities` (la que monta el listado por comunidad
autónoma del flujo CERCA, pero pensada para cualquier "elige un grupo y
explora dentro").

Este archivo es la **orientación** ("para qué sirve, cómo se monta, qué
moléculas convoca"). Para variantes visuales y código copy-paste mira el
showroom: [`fourty/organisms/organism-container.html`](../../../../fourty/organisms/organism-container.html).

---

## Índice

1. [¿Qué es `ft-org-container`?](#1-qué-es-ft-org-container)
2. [Las cinco variantes](#2-las-cinco-variantes)
3. [Foco: `--communities`](#3-foco---communities)
4. [Anatomía del bloque communities](#4-anatomía-del-bloque-communities)
5. [El grid · `ft-layout-grid-flex`](#5-el-grid--ft-layout-grid-flex)
6. [Las cards · `ft-mol-lnkbox--card`](#6-las-cards--ft-mol-lnkbox--card)
7. [Helpers tipográficos en juego](#7-helpers-tipográficos-en-juego)
8. [El modal asociado](#8-el-modal-asociado)
9. [Cómo se ensambla todo · copy-paste mínimo](#9-cómo-se-ensambla-todo--copy-paste-mínimo)
10. [Adaptarlo a otros casos de uso](#10-adaptarlo-a-otros-casos-de-uso)
11. [Dónde encontrar cada cosa](#11-dónde-encontrar-cada-cosa)
12. [Cheatsheet](#12-cheatsheet)

---

## 1. ¿Qué es `ft-org-container`?

Un **contenedor genérico de sección a ancho completo del viewport**. Es
el "scaffold" reutilizable de cualquier bloque que necesite tres cosas:

- Un **fondo edge-to-edge** (color sólido, gradiente, separador
  ondulado…).
- Un **contenido centrado** dentro de una columna controlada.
- (Opcional) **transiciones onduladas** entre secciones.

No tiene contenido propio. Es **agnóstico**: dentro pone lo que necesites
(moléculas, organismos, helpers de layout). El SCSS aporta el chrome y
el comportamiento responsive; tú aportas el qué.

```
┌─────────────────── viewport (100%) ─────────────────────┐
│  bg-color edge-to-edge                                  │
│  ┌──────── .ft-org-container__content ─────────────┐    │
│  │  ↑ wrapper interno, centrado, max-width acotado │    │
│  │                                                 │    │
│  │       (aquí va tu contenido)                    │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

**Markup canónico**:

```html
<section class="ft-org-container ft-org-container--[variante]">
  <div class="ft-org-container__content">
    <!-- tu contenido -->
  </div>
</section>
```

Las dos clases (`ft-org-container` + un modifier) son **el único contrato**.
El SCSS del modifier decide fondo, padding, max-width interno y
comportamientos responsive.

---

## 2. Las cinco variantes

| Modifier | Pensado para | Comportamiento clave |
|---|---|---|
| `&--welcome` | Hero de sección (CERCA usa esta para el bloque de bienvenida) | Fija `min-height` del `__content` (15rem mobile → 20rem desktop) para garantizar presencia visible mientras carga contenido. |
| `&--chips` | Listado horizontal de chips de sugerencia ("Las más buscadas") | Fondo `lightGrey` edge-to-edge, flex centrado, chips fluyen con `flex-wrap` cuando no caben. |
| `&--curved` (+ `--curved-top` / `--curved-bottom`) | Transición ondulada entre secciones | Aporta el SVG de la curva; combinas `--curved-top` o `--curved-bottom` según donde quede la curva. |
| `&--seeker` | Host del buscador predictivo (`ft-mol-form--has-predictive`) | Layout específico para meter el input + dropdown en una sección a ancho completo. |
| `&--communities` | Listado por comunidad / categoría / región / equipo → cada item abre un modal | Grid de cards centradas, max-width 128rem en desktop. Hermano natural de `--seeker`: dos puertas de entrada al mismo flujo de selección. |

Los modificadores son **independientes y combinables**:
`ft-org-container--curved ft-org-container--curved-top` es legítimo y
frecuente. `--welcome` y `--chips` también se ven juntas en algunos
layouts.

---

## 3. Foco: `--communities`

**El caso de uso**: "el usuario tiene que elegir un destino dentro de
una lista jerarquizada larga (decenas o cientos de items) y la
herramienta principal — el buscador predictivo — no es suficiente para
los que no saben qué buscar".

**La solución de diseño**:
1. Agrupas la lista grande por una dimensión natural (comunidad
   autónoma, categoría, equipo, marca…).
2. Pintas N **cards** (una por grupo), cada una con su nombre y un
   subtítulo descriptivo.
3. Click en la card → abre un **modal** con el contenido del grupo.
4. Dentro del modal, el usuario ve el listado completo del grupo y
   puede filtrarlo (otro buscador, esta vez **scopeado al grupo**).

Pensado originalmente para **CERCA / Faro de Vigo** (17 comunidades
autónomas → localidades), pero el patrón sirve igual para:

| Caso | Grupos (cards) | Contenido del modal |
|---|---|---|
| CERCA localidades | Comunidades autónomas | Localidades de esa CCAA, A-Z |
| Catálogo de equipos | Liga / competición | Equipos de esa liga |
| Búsqueda de revistas | Categorías (deporte, moda…) | Revistas de esa categoría |
| Estaciones de esquí | País / región | Estaciones de esa región |
| Marcas de un retailer | Categoría / sector | Marcas |

Es decir, **`--communities` es un patrón, no un componente CERCA-only**.

---

## 4. Anatomía del bloque communities

```
.ft-org-container.ft-org-container--communities         ← organismo (este partial)
└── .ft-org-container__content                          ← wrapper centrado
    ├── h2.ft-org-container__title                      ← titular (estilado por el partial)
    └── .ft-layout-grid-flex__nested                    ← grid de cards (helper de layout)
        ├── .ft-layout-grid-flex__colXs-12              ← columna responsive
        │   ├──.colSm-6
        │   ├──.colMd-4
        │   └── .ft-mol-lnkbox.ft-mol-lnkbox--card     ← molécula card (DS)
        │       ├── .ft-mol-lnkbox__container
        │       │   ├── .ft-mol-lnkbox__data
        │       │   │   ├── p.ft-mol-lnkbox__data-title       ← nombre del grupo
        │       │   │   └── p.ft-mol-lnkbox__data-subtitle    ← descripción / contenido del grupo
        │       │   └── button.ft-link.ft-link--block         ← trigger del modal
        │       │       [aria-haspopup="dialog"]
        │       │       [aria-controls="overlay"]
        │       │       [data-search-community-card]          ← hook JS
        │       │       [data-search-community-card-name]
        ├── .ft-layout-grid-flex__colXs-12 ... (más cards)
        └── ...
```

**Piezas del 42DS implicadas**:

| Pieza | Tipo | Función en `--communities` |
|---|---|---|
| `.ft-org-container` + `--communities` | organism | El propio bloque (este partial). |
| `.ft-layout-grid-flex` | layout helper | Grid responsive de N columnas (ver §5). |
| `.ft-mol-lnkbox` + `--card` | molecule | Cada card del grid (ver §6). |
| `.ft-link` + `--block` | atom | Trigger del modal — botón que ocupa toda la card. |
| Helpers tipográficos | helpers | Tamaño / peso / color de los textos (ver §7). |
| `.ft-mol-modal` + `-has--back` | molecule | El modal que se abre al hacer click (ver §8). |

---

## 5. El grid · `ft-layout-grid-flex`

El sistema de grid del 42DS es un **flexbox-based de 12 columnas** con
breakpoints declarativos. Las dos clases que importan en
`--communities`:

### `ft-layout-grid-flex__nested`

Wrapper de fila que aplica `display: flex` + `flex-wrap: wrap` y
distribuye el espacio entre columnas. El partial `--communities` le
añade row-gap responsive:

```scss
.ft-layout-grid-flex__nested:has(.ft-mol-lnkbox--card) {
  row-gap: 1.6rem;
  @include min-screen(768px) { row-gap: 2.2rem; }
}
```

> El truco del `:has()`: el row-gap **solo se aplica si hay cards
> dentro**. Así el helper genérico no impone gap a otros usos.

### Columnas responsive

Cada card ocupa una columna que cambia de tamaño según el breakpoint:

```html
<div class="ft-layout-grid-flex__colXs-12
            ft-layout-grid-flex__colSm-6
            ft-layout-grid-flex__colMd-4">
  <!-- card aquí -->
</div>
```

Tabla de breakpoints del 42DS:

| Sufijo | Breakpoint | Columnas typical para `--communities` |
|---|---|---|
| `Xs` | mobile (default) | `12` → una card por fila |
| `Sm` | phablet 600px+ | `6` → dos cards por fila |
| `Md` | tablet 800px+ | `4` → tres cards por fila |
| `Lg` | laptop 1024px+ | `4` (same) o `3` si quieres cuatro por fila |
| `Xl` | desktop 1200px+ | igual que `Lg` |

**No hace falta declarar todos los breakpoints**. Si no defines uno, se
hereda el anterior. Mínimo viable: `Xs-12` (siempre obligatorio) + el
breakpoint donde quieres que cambie.

Doc completa del grid: [`fourty/helpers/helper-grids.html`](../../../../fourty/helpers/helper-grids.html)
y el partial [`scss/base/helpers/_grids.scss`](../../../base/helpers/_grids.scss).

---

## 6. Las cards · `ft-mol-lnkbox--card`

La molécula **lnkbox** ("link-box") es una caja clicable genérica del
DS. Pensada para cuadrículas de navegación donde cada tile es una
puerta a otra sección.

**Estructura BEM**:

```
.ft-mol-lnkbox
└── .ft-mol-lnkbox__container
    ├── .ft-mol-lnkbox__data
    │   ├── .ft-mol-lnkbox__data-title       ← titular (nombre del grupo)
    │   └── .ft-mol-lnkbox__data-subtitle    ← descripción (qué contiene el grupo)
    └── <button>.ft-link.ft-link--block      ← trigger
```

**Modificador `--card`** convierte la lnkbox en una **tarjeta** con
fondo, padding interno, border-radius y hover sutil. Sin `--card` la
lnkbox es más plana (típica de breadcrumbs / paths de navegación).

**El trigger** suele ser un `<button>` con `.ft-link.ft-link--block`
para que el área clicable cubra toda la card. ARIA importante:

```html
<button type="button"
        class="ft-link ft-link--block"
        aria-haspopup="dialog"       ← abre un modal
        aria-controls="overlay"      ← ID del modal
        data-search-community-card   ← hook JS (POC-specific)
        data-search-community-card-name="Comunidad Valenciana">
  Más información
</button>
```

`aria-haspopup="dialog"` + `aria-controls` son **obligatorios** para
accesibilidad: avisan al lector de pantalla de que ese botón abre una
ventana de diálogo, no navega.

Doc completa: [`fourty/molecules/molecule-lnkBox.html`](../../../../fourty/molecules/molecule-lnkBox.html)
(showroom) · [`scss/fourties/molecules/lnkbox/_lnkbox.scss`](../../molecules/lnkbox/_lnkbox.scss) (partial).

---

## 7. Helpers tipográficos en juego

El partial del container **no fuerza** los textos de las cards (los
deja al consumidor). Las cards del POC CERCA usan estos helpers:

| Texto | Helpers aplicados |
|---|---|
| Nombre del grupo (`__data-title`) | `ft-helper-fontSize-body-L--small` + `ft-helper-fontWeight-700` |
| Descripción (`__data-subtitle`) | `ft-helper-fontSize-body-S` + `ft-helper-fontColor-quaternary` |

**Por qué helpers y no clases custom**: porque el `lnkbox` es genérico y
sus textos varían según el consumidor. El partial provee el slot, tú
decides la jerarquía visual con helpers (que son inspectables por
diseño y consistentes con el resto del DS).

Doc completa de helpers tipográficos:
- [`helper-fontSize.html`](../../../../fourty/helpers/helper-fontSize.html)
- [`helper-fontWeight.html`](../../../../fourty/helpers/helper-fontWeight.html)
- [`helper-fontColor.html`](../../../../fourty/helpers/helper-fontColor.html)

---

## 8. El modal asociado

`--communities` solo es **la mitad del patrón**. La otra mitad es el
modal que se abre al hacer click en una card. En el flujo CERCA es
`#overlay`, que usa la molécula **`ft-mol-modal`** con el modificador
**`-has--back`** (introducido durante la migración POC → DS).

### El modifier `ft-mol-modal-has--back`

Compone un header del modal con dos elementos en línea: **botón "atrás"**
+ **título** (+ opcionalmente un campo de búsqueda debajo). Pensado
para flujos drill-down: la card te lleva a un sub-listado, el botón
atrás te devuelve al grid.

```html
<div class="ft-mol-modal ft-mol-modal-has--back" id="overlay"
     role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="ft-mol-modal__container">
    <div class="ft-mol-modal__window">

      <!-- Header con back + título -->
      <div class="ft-mol-modal__header">
        <button class="ft-btn-nav ft-btn-nav--back" type="button"
                aria-label="Volver al listado de comunidades">
          <span class="ft-btn-nav__text">Volver</span>
          <span class="ft-btn-nav__icon" aria-hidden="true"></span>
        </button>
        <h3 id="modalTitle" class="ft-mol-modal__title">Comunidad</h3>
      </div>

      <!-- Buscador interno (filtra dentro del grupo) -->
      <div class="ft-mol-modal__body--hoffset">
        <div class="ft-mol-form ft-mol-form--has-clear">
          <input class="ft-mol-form__input" type="search"
                 id="communitySearch" placeholder="Buscar...">
          <label for="communitySearch" class="ft-mol-form__label">
            Escribe una localidad
          </label>
        </div>
      </div>

      <!-- Listado A-Z (otra molécula del DS) -->
      <div class="ft-mol-modal__body">
        <div class="ft-mol-az-list">
          <h3 class="ft-mol-az-list__title">Comunidad</h3>
          <div class="ft-mol-az-list__layout">
            <ul class="ft-mol-az-list__list ft-list ft-list--primary ft-list--add"></ul>
            <nav class="ft-mol-az-list__rail" hidden></nav>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
```

**Moléculas que viven dentro del modal de `--communities`**:

| Pieza | Para qué |
|---|---|
| `.ft-mol-modal` (`-has--back`) | El modal + el header con back-button. |
| `.ft-mol-form--has-clear` | Buscador interno (filtra dentro del grupo). |
| `.ft-mol-az-list` (+ `__rail`) | Listado indexado A-Z con scrubber lateral. |
| `.ft-list` (`--add`, `--has-icon`) | Filas de items dentro de la az-list. |
| `.ft-btn-nav--back` | Botón "atrás" del header. |

Cada una está documentada en su propio showroom (`molecule-modal.html`,
`molecule-form.html`, `molecule-az-list.html`, `atom-list.html`,
`atom-btn.html`).

---

## 9. Cómo se ensambla todo · copy-paste mínimo

Markup absolutamente mínimo para un `--communities` funcional con 3
cards:

```html
<section class="ft-org-container ft-org-container--communities"
         aria-labelledby="myCommunitiesTitle">
  <div class="ft-org-container__content">

    <h2 id="myCommunitiesTitle" class="ft-org-container__title">
      Explora por categoría
    </h2>

    <div class="ft-layout-grid-flex__nested">

      <!-- Card 1 -->
      <div class="ft-layout-grid-flex__colXs-12
                  ft-layout-grid-flex__colSm-6
                  ft-layout-grid-flex__colMd-4">
        <div class="ft-mol-lnkbox ft-mol-lnkbox--card">
          <div class="ft-mol-lnkbox__container">
            <div class="ft-mol-lnkbox__data">
              <p class="ft-mol-lnkbox__data-title">
                <span class="ft-helper-fontSize-body-L--small
                             ft-helper-fontWeight-700">Grupo A</span>
              </p>
              <p class="ft-mol-lnkbox__data-subtitle">
                <span class="ft-helper-fontSize-body-S
                             ft-helper-fontColor-quaternary">Descripción</span>
              </p>
            </div>
            <button type="button" class="ft-link ft-link--block"
                    aria-haspopup="dialog"
                    aria-controls="overlay"
                    data-card-name="Grupo A">
              Más información
            </button>
          </div>
        </div>
      </div>

      <!-- Card 2, 3, ... mismo patrón -->

    </div>
  </div>
</section>

<!-- El modal #overlay queda fuera del container (suele ir al final del body) -->
```

Eso es **todo el HTML**. Sin JS, ya verás:
- Grid responsive (1 col mobile / 2 col tablet / 3 col desktop).
- Cards con hover sutil.
- Tipografía consistente.

El JS solo es necesario para **conectar el click de la card al modal**
(qué grupo abrir, qué contenido pintar dentro). Ese es trabajo del
consumidor.

---

## 10. Adaptarlo a otros casos de uso

`--communities` no impone ni el dato ni el comportamiento del modal.
Para reutilizarlo en otro caso solo hay que cambiar:

1. **El texto de las cards** — nombre del grupo + descripción.
2. **Los hooks de las cards** — `data-card-name` (o el atributo que
   quieras) que identifique cuál se ha pulsado.
3. **El contenido del modal asociado** — la `ft-mol-az-list` se cambia
   por lo que necesites: lista plana, grid, tabla, lo que sea.
4. **El nombre del modal** (`aria-controls`, `id`) — si tienes más de
   un patrón de drill-down en la misma página.

Ejemplos concretos:

| Caso | `__data-title` | `__data-subtitle` | Modal interno |
|---|---|---|---|
| Localidades por CCAA | "Comunidad Valenciana" | "Alicante, Castellón, Valencia" | `ft-mol-az-list` con localidades |
| Equipos por liga | "LaLiga Santander" | "20 equipos · temporada 25/26" | Grid de logos clicables |
| Revistas por categoría | "Moda" | "12 revistas" | Lista plana de revistas con thumbnail |
| Estaciones por país | "Andorra" | "3 estaciones" | Cards de estaciones |

El patrón **container → grid → cards → modal** es estable. Lo que cambia
es el contenido del modal.

---

## 11. Dónde encontrar cada cosa

| Necesitas... | Mira en... |
|---|---|
| **Esta guía** (orientación, para qué sirve, cómo ensamblar) | Este archivo. |
| **Variantes interactivas y código copy-paste** | Showroom: [`organism-container.html`](../../../../fourty/organisms/organism-container.html). |
| **El SCSS canónico** (todas las variantes con comentarios) | [`_container.scss`](./_container.scss) (este directorio). |
| **Overrides visuales por marca** | `container-[marca].scss` en este mismo directorio. |
| **El grid system** | [`helper-grids.html`](../../../../fourty/helpers/helper-grids.html) (showroom) + [`_grids.scss`](../../../base/helpers/_grids.scss). |
| **La molécula lnkbox** | [`molecule-lnkBox.html`](../../../../fourty/molecules/molecule-lnkBox.html) + [`_lnkbox.scss`](../../molecules/lnkbox/_lnkbox.scss). |
| **El modal con back-button** | [`molecule-modal.html`](../../../../fourty/molecules/molecule-modal.html) (panel `ft-mol-modal-has--back`) + [`_modal.scss`](../../molecules/modal/_modal.scss). |
| **La az-list que va dentro del modal** | [`molecule-az-list.html`](../../../../fourty/molecules/molecule-az-list.html) + [`_az-list.scss`](../../molecules/az-list/_az-list.scss). |
| **Ejemplo real en producción / POC** | POC CERCA: [`faro-vigo.html`](../../../../fourty/pocs/PI-396-CERCA--modificar-resultados-busqueda-V2-RTD-42DS/faro-vigo.html) líneas ~8383–8770. Doc: [`GUIA.md` de la POC](../../../../fourty/pocs/PI-396-CERCA--modificar-resultados-busqueda-V2-RTD-42DS/GUIA.md). |
| **Helpers tipográficos usados en las cards** | [`helper-fontSize.html`](../../../../fourty/helpers/helper-fontSize.html), [`helper-fontWeight.html`](../../../../fourty/helpers/helper-fontWeight.html), [`helper-fontColor.html`](../../../../fourty/helpers/helper-fontColor.html). |

---

## 12. Cheatsheet

```html
<!-- Markup mínimo container --communities + grid + N cards -->
<section class="ft-org-container ft-org-container--communities">
  <div class="ft-org-container__content">
    <h2 class="ft-org-container__title">…</h2>
    <div class="ft-layout-grid-flex__nested">

      <!-- N veces: -->
      <div class="ft-layout-grid-flex__colXs-12
                  ft-layout-grid-flex__colSm-6
                  ft-layout-grid-flex__colMd-4">
        <div class="ft-mol-lnkbox ft-mol-lnkbox--card">
          <div class="ft-mol-lnkbox__container">
            <div class="ft-mol-lnkbox__data">
              <p class="ft-mol-lnkbox__data-title">…</p>
              <p class="ft-mol-lnkbox__data-subtitle">…</p>
            </div>
            <button class="ft-link ft-link--block"
                    aria-haspopup="dialog"
                    aria-controls="overlay">…</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

**Breakpoints del grid**:
| Sufijo | Activo desde |
|---|---|
| `Xs` | 0px (default) |
| `Sm` | 600px |
| `Md` | 800px |
| `Lg` | 1024px |
| `Xl` | 1200px |

**Modificadores hermanos del container** que conviven con
`--communities` en el mismo flujo CERCA:
- `--welcome` (hero)
- `--chips` (sugerencias rápidas)
- `--seeker` (buscador predictivo)
- `--curved` + `--curved-top` / `--curved-bottom` (transiciones onduladas)

**Moléculas que invoca el bloque cuando se monta el patrón completo**:
- `ft-mol-lnkbox--card` (las cards del grid)
- `ft-mol-modal` (`-has--back`) (el modal que se abre)
- `ft-mol-form` (buscador interno del modal)
- `ft-mol-az-list` (`+ __rail`) (listado A-Z dentro del modal)
- `ft-list` (`--add`, `--has-icon`) (filas dentro de la az-list)

**ARIA mínimo de las cards**:
- `aria-haspopup="dialog"`
- `aria-controls="[id-del-modal]"`
- `aria-label` descriptivo del botón si el texto visible no es claro
  (p. ej. "Más información" → "Ver localidades de Comunidad Valenciana").

**Lo único POC-specific en el ejemplo CERCA** son los hooks
`data-search-community-card[-name]`. El partial del DS no los conoce —
son convención del consumidor para conectar JS.

Para el detalle profundo de cada pieza: ver §11.
