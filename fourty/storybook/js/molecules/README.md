# storybook/js/molecules

Stories de **moléculas** del 42DS. Una molécula compone átomos (`.ft-mol-btnGroup`
agrupa `.ft-btn`s, `.ft-mol-authors` envuelve `.ft-tag`s + `.ft-link`s…). Espeja
`/fourty/molecules/`.

```
molecules/
├── README.md              ← este archivo (receta de migración)
└── <x>/                    ← una subcarpeta por molécula
    ├── <x>.js
    └── <x>.html            ← (opcional) markup HTML editable
```

**Ejemplo canónico**: [`btngroup/btngroup.js`](btngroup/btngroup.js).

---

## Índice de componentes

Cada molécula tiene su **ficha de contexto** (`<x>/README.md`): identidad, clase raíz,
señales JS, stories y trazabilidad al SCSS. Punto de entrada rápido para agentes
(la doc completa vive en el `overview` del `.js`).

| Componente | Ficha | Señales | Clase raíz |
|------------|-------|---------|------------|
| Accordion | [`accordion/`](accordion/README.md) | — | `.ft-mol-accordion` |
| Action Bar | [`action-bar/`](action-bar/README.md) | `js` | `.ft-mol-action-bar` |
| Advice | [`advice/`](advice/README.md) | — | `.ft-mol-advice` |
| Author | [`author/`](author/README.md) | — | `.ft-mol-author` |
| Authors | [`authors/`](authors/README.md) | — | `.ft-mol-authors` |
| A-Z List | [`az-list/`](az-list/README.md) | — | `.ft-mol-az-list` |
| Bar | [`bar/`](bar/README.md) | — | `.ft-mol-bar` |
| Box Info | [`boxInfo/`](boxInfo/README.md) | — | `.ft-mol-boxInfo` |
| Breadcrumb | [`breadcrumb/`](breadcrumb/README.md) | — | `.ft-mol-breadcrumb` |
| Btn Group | [`btngroup/`](btngroup/README.md) | — | `.ft-mol-btnGroup` |
| Card | [`card/`](card/README.md) | — | `.ft-mol-card` |
| Card Newsletter | [`card-newsletter/`](card-newsletter/README.md) | — | `.ft-mol-card-newsletter` |
| Carousel | [`carousel/`](carousel/README.md) | — | `.ft-mol-carousel` |
| Comment | [`comment/`](comment/README.md) | — | `.ft-mol-comment` |
| Countdown | [`countdown/`](countdown/README.md) | — | `.ft-mol-countdown` |
| Data Sheet | [`dataSheed/`](dataSheed/README.md) | — | `.ft-mol-dataSheed` |
| Divider | [`divider/`](divider/README.md) | — | `.mol-divider` *(sin `ft-`)* |
| Dropdown | [`dropdown/`](dropdown/README.md) | `js` | `.ft-mol-dropdown` |
| Figcaption | [`figcaption/`](figcaption/README.md) | — | `.ft-mol-figcaption` |
| Footer Basic | [`footerbasic/`](footerbasic/README.md) | — | `.ft-mol-footerbasic` |
| Form | [`form/`](form/README.md) | `js` | `.ft-mol-form` |
| Graph Legend | [`graphLegend/`](graphLegend/README.md) | — | `.ft-mol-graph-legend` |
| Headband | [`headband/`](headband/README.md) | — | `.ft-mol-headband` |
| Header Custom | [`header-custom/`](header-custom/README.md) | — | `.ft-mol-header-custom` |
| Label | [`label/`](label/README.md) | — | `.ft-mol-label` |
| Lnk Box | [`lnkbox/`](lnkbox/README.md) | — | `.ft-mol-lnkbox` |
| Marker | [`marker/`](marker/README.md) | — | `.ft-mol-marker` |
| Masonry | [`masonry/`](masonry/README.md) | — | `.ft-mol-masonry` |
| Menu Anchor | [`menuanchor/`](menuanchor/README.md) | — | `.ft-mol-menu-anchor` |
| Modal | [`modal/`](modal/README.md) | `js` | `.ft-mol-modal` |
| Mod News | [`modNews/`](modNews/README.md) | — | `.ft-mol-modNews` |
| Multimedia | [`multimedia/`](multimedia/README.md) | — | `.ft-mol-multimedia` |
| Overlay Live | [`overlay-live/`](overlay-live/README.md) | — | `.ft-mol-overlay-live` |
| Pagination | [`pagination/`](pagination/README.md) | — | `.ft-mol-pagination` |
| Paper | [`paper/`](paper/README.md) | — | `.ft-mol-paper` |
| Path | [`path/`](path/README.md) | — | `.ft-mol-path` |
| Pick | [`pick/`](pick/README.md) | — | `.ft-mol-pick` |
| Pie Chart | [`pie-chart/`](pie-chart/README.md) | `js` | `.ft-mol-chart-pie` |
| Poll Box | [`pollbox/`](pollbox/README.md) | — | `.ft-mol-pollbox` |
| Popover | [`popover/`](popover/README.md) | — | `.ft-mol-popover` |
| Promo | [`promo/`](promo/README.md) | — | `.ft-mol-promo` |
| Promo Header | [`promoHeader/`](promoHeader/README.md) | — | `.ft-mol-promoHeader` |
| Quote | [`quote/`](quote/README.md) | — | `.ft-mol-quote` |
| Ranking News | [`rankingNews/`](rankingNews/README.md) | — | `.ft-mol-rankingNews` |
| Related | [`related/`](related/README.md) | — | `.ft-mol-related` |
| Related Slider | [`relatedSlider/`](relatedSlider/README.md) | — | `.ft-mol-relatedSlider` |
| RRSS | [`rrss/`](rrss/README.md) | — | `.ft-mol-rrss` |
| Score | [`score/`](score/README.md) | — | `.ft-mol-score` |
| Scoreboard | [`scoreboard/`](scoreboard/README.md) | — | `.ft-mol-scoreboard` |
| Slider | [`slider/`](slider/README.md) | — | `.ft-mol-carousel` |
| Sorting | [`sorting/`](sorting/README.md) | — | `.ft-mol-sorting` |
| Sticky Panel | [`sticky-panel/`](sticky-panel/README.md) | — | `.ft-mol-sticky-panel` |
| Subheader | [`subheader/`](subheader/README.md) | — | `.ft-mol-subheader` |
| Subscribe Read | [`subscribeRead/`](subscribeRead/README.md) | — | `.ft-mol-subscribeRead` |
| Subtitle | [`subtitle/`](subtitle/README.md) | — | `.ft-mol-subtitle` |
| Swiper | [`swiper/`](swiper/README.md) | `js` | `.ft-mol-swiper` |
| Table | [`table/`](table/README.md) | — | `.ft-mol-table` |
| Tabs | [`tabs/`](tabs/README.md) | — | `.ft-mol-tabs` |
| Tags News | [`tagsNews/`](tagsNews/README.md) | — | `.ft-mol-tagsNews` |
| Tapbar | [`tapbar/`](tapbar/README.md) | `js` | `.ft-mol-tapbar` |
| Ticker | [`ticker/`](ticker/README.md) | — | `.ft-mol-ticker` |
| TOC | [`toc/`](toc/README.md) | — | `.ft-mol-toc` |
| Toolbar | [`toolbar/`](toolbar/README.md) | — | `.ft-mol-toolbar` |
| Tracking | [`tracking/`](tracking/README.md) | — | `.ft-mol-tracking` |
| Writer | [`writer/`](writer/README.md) | — | `.ft-mol-writer` |

---

## Qué define una molécula

| Característica | Molécula |
|----------------|----------|
| Prefijo de clase | `.ft-mol-<x>` |
| Composición | Compone átomos del DS (no se compone con otras moléculas) |
| Layout | Suele tener alineación / espaciado interno (flex, gap, justify-content) |
| Story flag | **`full: true` en stories que dependen del ancho** (la mayoría) |

---

## Diferencias clave vs átomos

### 1. `full: true` por defecto en stories de layout

La molécula tiene **comportamiento de layout** (`flex`, `justify-content`,
`align-items`). En el canvas por defecto (`flex-wrap arriba-izquierda`), el componente
se encogería y perdería su alineación visual.

Solución: marcar la story como `full: true`:

```js
{ id: "base", name: "Base", hint: ".ft-mol-<x>", kind: "interactive",
  full: true,                                                          // ← clave
  argTypes: baseArgTypes, args: baseArgs, render: liveBase }
```

Con `full: true`:
- El canvas pasa a `display: block`.
- El componente ocupa **todo el ancho disponible** del iframe.
- Su alineación interna (`--cnt`, `--rgt`, `--lft`…) se vuelve visible.

Para el subgroup Markup que también debe heredar el comportamiento:

```js
window.SB.loadMarkup(X, document.currentScript && document.currentScript.src, { full: true });
```

### 2. La molécula **renderiza átomos reales**, no markup mock

```js
// btngroup.js — renderiza .ft-btn reales dentro del .ft-mol-btnGroup
const btn = (kind, label) => `<a href="#" class="ft-btn ft-btn--${kind} ft-btn--md" ...>${esc(label)}</a>`;

function live(a) {
    const cls = ["ft-mol-btnGroup"];
    if (a.align) cls.push(a.align);
    const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
    const items = [];
    for (let i = 0; i < n; i++) items.push(btn(DATA.kinds[i % DATA.kinds.length], a.label));
    return `<div class="${cls.join(" ")}">${items.join("")}</div>`;
}
```

**Importante**: la molécula **no importa** el módulo del átomo (cero acoplamiento entre
componentes). Replica el markup del átomo con clases reales. Si el átomo cambia su
markup, la molécula no se entera automáticamente — pero como ambos usan las clases
reales del DS, las dos quedan consistentes con el SCSS.

### 3. Controls de "número de items" → `control: "number"`

Una molécula típica tiene un control de "cuántos items contiene" (count de botones, de
autores, de breadcrumbs…). Usar **`control: "number"`** con `min`/`max` razonables:

```js
{ key: "count", control: "number", desc: "Número de botones del grupo (rango 1-6).", min: 1, max: 6 }
```

Y en el render, hacer **clamp defensivo**:

```js
const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
```

El input HTML `max="6"` es soft-hint (limita los spinners). El clamp del render protege
ante valores escritos manualmente fuera de rango.

**No usar `control: "radio"` para counts** — `radio` es para enumeraciones FINITAS
(left/right, primary/secondary). Para counts el usuario quiere escribir libremente.

---

## Receta de migración showroom → storybook (molécula)

### 1. Identificar SCSS fuente

```
scss/fourties/molecules/<x>/_<x>.scss
```

Listar modificadores (`--cnt`, `--rgt`, `--lft`, `--is-fixed`…) y la **clase del átomo
contenido** (qué hay dentro del bloque).

### 2. Leer el showroom HTML

```
fourty/molecules/molecule-<x>.html
```

Identificar:
- **Estructura interna**: qué átomos contiene, cuántos suelen ir.
- **Alineaciones disponibles**: cuáles son los modificadores principales.
- **Variantes posicionales** (ej. `--is-fixed`): suelen ir SOLO al subgrupo Markup, no a
  stories dinámicas (porque alteran el posicionamiento global).

### 3. Crear módulo JS

Plantilla resumida (ver `btngroup/btngroup.js` para ejemplo completo):

```js
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH ▼ */
    const DATA = {
        aligns: [
            ["", "izquierda (defecto)"],
            ["ft-mol-<x>--cnt", "cnt · centrado"],
            ["ft-mol-<x>--rgt", "rgt · derecha"],
            ["ft-mol-<x>--lft", "lft · izquierda"]
        ],
        kinds: ["primary", "secondary", "tertiary"]   // átomos internos
    };

    /* Markup interno: el ÁTOMO. La molécula renderiza átomos reales. */
    const atom = (kind, label) => `<a href="#" class="ft-btn ft-btn--${kind} ft-btn--md" title="${esc(label)}" target="_self">${esc(label)}</a>`;

    const baseArgTypes = [
        { key: "align", control: "select", desc: "Alineación del grupo.", options: DATA.aligns },
        { key: "count", control: "number", desc: "Número de items (1-6).", min: 1, max: 6 },
        { key: "label", control: "text", desc: "Texto de los átomos internos." }
    ];
    const baseArgs = { align: "", count: 2, label: "Text" };

    function live(a) {
        const cls = ["ft-mol-<x>"];
        if (a.align) cls.push(a.align);
        const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 0; i < n; i++) items.push(atom(DATA.kinds[i % DATA.kinds.length], a.label));
        return `<div class="${cls.join(" ")}">${items.join("")}</div>`;
    }

    const overview = `<div class="cb-docs__inner">
        <h1><Name></h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-<x></code>) que agrupa <code>.ft-<atomo></code> con una alineación común.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/molecules/<x>.css</code></td><td>CSS compilado de la molécula</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>brands/[marca]/atoms/<atomo>.css</code></td><td>CSS del átomo que agrupa</td><td>Siempre (contiene <code>.ft-<atomo></code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: las variantes son reglas CSS. Carga <code>setting.css</code> primero y el átomo <code><Name></code> para que los items internos tengan estilo.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">...</table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-<x></code></td></tr>
                <tr><td>Contenido</td><td>uno o más <code>.ft-<atomo></code> (átomo <strong><Name></strong>)</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/<x>/_<x>.scss</code> · markup: <code>fourty/molecules/molecule-<x>.html</code></p>
    </div>`;

    const X = {
        id: "<x>",
        name: "<Name>",
        group: "Molecules",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-mol-<x>", kind: "interactive",
              full: true,                                              // ← clave en moléculas de layout
              argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(X);

    /* Markup HTML editable por el front — heredar full: true */
    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src, { full: true });
})();
```

### 4. Crear `<x>.html` (opcional)

Variantes posicionales (`--is-fixed`, `--is-fixed-mo`) son buenos candidatos para vivir
solo en `<x>.html` (no en stories dinámicas), porque alterar el posicionamiento de
forma interactiva sobre el canvas suele ser confuso.

```html
<!-- storybook/js/molecules/<x>/<x>.html -->
<template data-story="Base">
  <div class="ft-mol-<x>">
    <a href="#" class="ft-btn ft-btn--primary ft-btn--md">Primary</a>
    <a href="#" class="ft-btn ft-btn--secondary ft-btn--md">Secondary</a>
  </div>
</template>
<template data-story="Centered">
  <div class="ft-mol-<x> ft-mol-<x>--cnt">
    <a href="#" class="ft-btn ft-btn--primary ft-btn--md">Primary</a>
    <a href="#" class="ft-btn ft-btn--secondary ft-btn--md">Secondary</a>
  </div>
</template>
<template data-story="Fixed bottom">
  <div class="ft-mol-<x> ft-mol-<x>--is-fixed">
    <a href="#" class="ft-btn ft-btn--primary ft-btn--md">Action</a>
  </div>
</template>
```

### 5. Enlazar y verificar

```html
<script src="storybook/js/molecules/<x>/<x>.js" defer></script>
```

Verifica especialmente que la **alineación interna se ve** (gracias a `full: true`):
- "Centrado" debe verse centrado horizontalmente.
- "Derecha" debe ver los items pegados al borde derecho.
- Sin `full: true` esto NO sería visible porque el canvas encogería el componente.

---

## Reglas específicas de moléculas

1. **`full: true` en stories de layout**: si tu molécula tiene `justify-content`,
   `text-align`, o cualquier propiedad que dependa del ancho, **marcar `full: true`**.
   Olvidarlo es el bug más común en moléculas.

2. **`loadMarkup` con `{ full: true }`** para heredar al subgrupo Markup:
   ```js
   window.SB.loadMarkup(X, document.currentScript.src, { full: true });
   ```

3. **Replicar el markup del átomo, no importarlo**: la función helper que genera el HTML
   del átomo interno vive **dentro del módulo de la molécula**. Cero acoplamiento.

4. **`count` siempre con `number` y clamp defensivo**: nunca radio con `[2,3]` (ver btn vs
   btngroup en el historial del repo — todos los radios numéricos se migraron a number).

5. **Ciclo de kinds si `n > kinds.length`**: si el átomo tiene 3 kinds disponibles
   (primary/secondary/tertiary) y el usuario pide 5 items, ciclar el kind para mostrar
   `i % kinds.length`. Útil para inspeccionar el espaciado del grupo con muchos items:
   ```js
   for (let i = 0; i < n; i++) items.push(atom(DATA.kinds[i % DATA.kinds.length], a.label));
   ```

6. **Etiqueta del control de count menciona el rango**: `desc: "Número de items (rango razonable 1-6; si n > 3 las jerarquías ciclan)."` da contexto al usuario sin tener que abrir el SCSS.

7. **Variantes posicionales en Markup**: `--is-fixed`, `--sticky`, `--floating` no tienen
   sentido como stories dinámicas en un canvas estático. Documéntalas en `<x>.html` con
   un `data-story="Fixed bottom"` etc.

8. **Estilos experimentales en `<x>.html`**: para probar un modificador nuevo de la
   molécula o un override puntual del átomo contenido sin compilar SCSS, añade un
   `<style>` top-level en `<x>.html`. Aplica a TODAS las stories (Base + Markup + las que
   `loadMarkup` con `{ full: true }` haya creado). Workflow completo en
   [`storybook/README.md` §"Estilos experimentales"](../../README.md#estilos-experimentales-style-en-xhtml).
   Cuidado: si el override es al átomo (`.ft-btn--…`) y termina siendo canónico, debe
   promocionarse al SCSS **del átomo**, no de la molécula.

---

## Antipatrones específicos de moléculas

| Antipatrón | Por qué está mal | Qué hacer |
|------------|------------------|-----------|
| Olvidar `full: true` en story de layout | La alineación interna no se ve, el componente parece roto | Marcar `full: true` en cada story que dependa del ancho |
| Importar el módulo del átomo | Acoplamiento que rompe la independencia | Replicar el markup del átomo localmente |
| Usar `radio` para count | Limita la libertad del usuario | `control: "number"` con `min`/`max` |
| No hacer clamp en el render | Valores absurdos rompen visualmente | `Math.max(1, Math.min(MAX, parseInt(...) \|\| 1))` |
| Variante `--is-fixed` como story dinámica | Hace que el componente se posicione fijo en el canvas → tapa toda la UI | Solo en Markup |

---

## Referencias

- **Ejemplo canónico**: [`btngroup/btngroup.js`](btngroup/btngroup.js) y
  [`btngroup/btngroup.html`](btngroup/btngroup.html)
- **SCSS fuente**: `scss/fourties/molecules/<x>/_<x>.scss`
- **HTML del showroom**: `fourty/molecules/molecule-<x>.html`
- **Patrón JS general**: `../README.md`
- **Motor**: `../core/README.md`
- **Patrón átomos**: `../atoms/README.md`
