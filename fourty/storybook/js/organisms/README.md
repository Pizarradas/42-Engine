# storybook/js/organisms

Stories de **organismos** del 42DS. Un organismo es un contenedor de moléculas
(`.ft-org-authors` contiene `.ft-mol-authors`, `.ft-org-masthead` contiene `.ft-date`,
`.ft-mol-rrss`, `.ft-mol-menu`…). Espeja `/fourty/organisms/`.

```
organisms/
├── README.md              ← este archivo (receta de migración)
└── <x>/                    ← una subcarpeta por organismo
    ├── <x>.js
    └── <x>.html            ← (opcional) markup HTML editable
```

**Ejemplo canónico**: [`authors/authors.js`](authors/authors.js).

---

## Índice de componentes

Cada organismo tiene su **ficha de contexto** (`<x>/README.md`): identidad, clase raíz,
señales JS, stories y trazabilidad al SCSS. Punto de entrada rápido para agentes
(la doc completa vive en el `overview` del `.js`).

| Componente | Ficha | Señales | Clase raíz |
|------------|-------|---------|------------|
| Accordion | [`accordion/`](accordion/README.md) | — | `.ft-org-accordion` |
| Author | [`author/`](author/README.md) | — | `.ft-org-author` |
| Authors | [`authors/`](authors/README.md) | — | `.ft-org-authors` |
| Boxfeatures | [`boxfeatures/`](boxfeatures/README.md) | — | `.ft-org-boxfeatures` |
| Breadcrumb | [`breadcrumb/`](breadcrumb/README.md) | — | `.ft-org-breadcrumb` |
| Card Home | [`cardhome/`](cardhome/README.md) | — | `.ft-org-cardHome` |
| Comments | [`comments/`](comments/README.md) | — | `.ft-org-comments` |
| Container | [`container/`](container/README.md) | — | `.ft-org-container` |
| Direct News | [`directnews/`](directnews/README.md) | — | `.ft-org-directNews` |
| Footer | [`footer/`](footer/README.md) | — | `.ft-org-footer` |
| Game | [`game/`](game/README.md) | — | `.ft-org-game` |
| Header Custom | [`header-custom/`](header-custom/README.md) | — | `.ft-org-header-custom` |
| Header Revistas (Woman) | [`header-revistas-woman/`](header-revistas-woman/README.md) | — | `.ft-org-header-revistas` |
| Hero Welcome | [`hero-welcome/`](hero-welcome/README.md) | — | `.ft-org-hero-welcome` |
| Hiperlocal Map | [`hiperlocalmap/`](hiperlocalmap/README.md) | `js` | `.ft-org-hiperlocalmap` |
| Masthead | [`masthead/`](masthead/README.md) | `js` | `.ft-org-masthead` |
| Mediaviewer | [`mediaviewer/`](mediaviewer/README.md) | — | `.ft-org-mediaviewer` |
| Newsletter | [`newsletter/`](newsletter/README.md) | — | `.ft-org-newsletter` |
| Path | [`path/`](path/README.md) | — | `.ft-org-path` |
| Paywall | [`paywall/`](paywall/README.md) | — | `.org-paywall` *(sin `ft-`)* |
| Pick | [`pick/`](pick/README.md) | — | `.ft-org-pick` |
| Scoreboard | [`scoreboard/`](scoreboard/README.md) | — | `.ft-org-scoreboard` |
| Search Autocomplete | [`search-autocomplete/`](search-autocomplete/README.md) | `js` | `.ft-org-search-autocomplete` |
| Services | [`services/`](services/README.md) | — | `.ft-org-services` |
| Suggestions Chips | [`suggestions-chips/`](suggestions-chips/README.md) | `js` | `.ft-org-suggestions-chips` |
| Toolbar | [`toolbar/`](toolbar/README.md) | — | `.ft-org-toolbar` |

> **Sin SCSS canónico:** `hiperlocalmap` no tiene parcial en `scss/fourties/organism/`
> (es un widget JS sobre Leaflet); su ficha lo marca con SSOT `—`.

---

## Qué define un organismo

| Característica | Organismo |
|----------------|-----------|
| Prefijo de clase | `.ft-org-<x>` |
| Composición | Compone **moléculas** del DS (y a veces átomos directamente) |
| Rol | Sección completa de página (masthead, footer, hero, mediareport…) |
| Story flag | **`full: true` casi siempre** (los organismos ocupan ancho completo) |
| Cabeceras CSV | Los organismos son los principales beneficiarios del dropdown Cabecera (masthead, footer, header revistas…) — al cambiar cabecera se ven los logos, colores y nombres reales de producción |

---

## Diferencias clave vs moléculas

### 1. `full: true` es prácticamente obligatorio

Un organismo SIEMPRE ocupa ancho completo en producción (es una sección de página). Sus
moléculas internas suelen tener su propia distribución (flex grids, columnas). Sin
`full: true` el canvas encogería el organismo y se vería todo apilado / mal distribuido.

```js
{ id: "base", name: "Base", hint: ".ft-org-<x>", kind: "interactive",
  full: true,                                                         // ← siempre
  argTypes: baseArgTypes, args: baseArgs, render: live }
```

### 2. **Compone moléculas**, no las importa

Mismo principio que en moléculas: el organismo **replica el markup** de las moléculas
que contiene, no importa el módulo de la molécula. Las dos quedan consistentes con el
SCSS porque ambas usan clases reales.

```js
// authors.js — el organismo .ft-org-authors compone .ft-mol-authors
function authorCard(layout, name) {
    return `<div class="ft-mol-authors ${layout}">
              <div class="ft-mol-authors__userPhoto">...</div>
              <div class="ft-mol-authors__content">
                <h3 class="ft-mol-authors__contentTitle">${esc(name)}</h3>
                <ul class="ft-list ft-list--tag">...</ul>
              </div>
            </div>`;
}

function live(a) {
    const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
    const items = [];
    for (let i = 0; i < n; i++) items.push(authorCard(a.layout, NAMES[i % NAMES.length]));
    return `<div class="ft-org-<x>">${items.join("")}</div>`;
}
```

### 3. Data extras: datasets para contenido realista

A diferencia de los átomos (cuyo contenido es texto libre) o moléculas (cuyo contenido
suelen ser átomos genéricos), los organismos suelen mostrar **datos plausibles**: nombres
de autores, fechas, RRSS, fotos placeholder.

Patrón: arrays de datos al principio del módulo, ciclar al renderizar:

```js
const NAMES = ["Andrea de los Santos", "Marc Vidal", "Lucía Romero"];
const PHOTO = "https://estaticos-cdn.prensaiberica.es/.../source.jpg";
// ...
for (let i = 0; i < n; i++) items.push(card(NAMES[i % NAMES.length]));
```

**Importante**: las imágenes deben ser URLs absolutas o paths a recursos REALES del DS
(no placeholders genéricos tipo placeholder.com — el organismo debe verse como en
producción).

### 4. La cabecera (CSV) **es crítica** para organismos

El dropdown Cabecera (toolbar Canvas) es especialmente potente para organismos: aplica la
marca (`ft-brand-*`, de `ds__group`) + el `body_class` del outlet al body del iframe → el
organismo se renderiza con el logo, colores y nombre EXACTOS de producción.

Ej.: organism `Masthead` + Cabecera "Albal" → masthead de Levante-El Mercantil
Valenciano con logo "La Crónica de Albal" idéntico al de la web real.

Esto NO requiere código extra en el módulo del organismo — el motor ya lo gestiona vía
`frameHTML()`. Solo asegúrate de que el organismo **use las clases reales del DS** y
producción se verá fielmente reflejada.

---

### 5. Controles MÍNIMOS — la fidelidad la da el markup

Los organismos son grandes, anidados y heterogéneos. **No los parametrices pieza a
pieza** como un átomo. El criterio es inverso:

- **Prima el markup sobre los controles.** Cada variante = la **construcción literal del
  showroom** (moléculas internas verbatim, con sus clases, comentarios estructurales y
  datos reales). Si hacerlo «configurable» obliga a recortar el markup, no se recorta.
- **Un solo `control: "select"` de variante** que recorre las familias del showroom
  (tipo 1 / tipo 2, base / `--updates`, base / `--curved`…), cada opción mapeada a su
  markup verbatim en un objeto `VARIANTS`. Una sola construcción → **cero controles**.
- **Nada de `count` / `text` / `boolean` por defecto.** El `count` cíclico (patrón
  `authors`) se reserva para **contenedores homogéneos de N moléculas idénticas**. En
  cuanto el contenido es heterogéneo, gana el select de variantes verbatim.
- **Extrae con script** (no a mano): lee `organism-<x>.html`, toma el INNER balanceado de
  cada panel `data-showroom-view="html5"` (salta AMP), retira el andamiaje del showroom
  (`<div class="code-container">` + comentarios `code highlighted` / `data-id deben
  coincidir`) **y todo `<script>…</script>`** (no se ejecuta en el iframe; es
  comportamiento, no construcción; y evitas backticks/`${}` que rompen el template-literal),
  y **conserva** los comentarios del componente. Normaliza
  `../../cds-statics` → `/cds-statics`. Borra el script al terminar.
- **Panels con varios ejemplos apilados** (p.ej. `--updates` + `--is-highlighted`) →
  tráelos juntos en esa variante, tal cual el showroom.

```js
/* Patrón "VARIANTS verbatim" — el grueso de los organismos migrados (breadcrumb,
   cardHome, container, directNews, footer…). */
const VARIANTS = {
    "ep-1": `<!-- org: footer --> ...markup verbatim del showroom... <!-- end // org: footer -->`,
    "ep-2": `...`,
    // ...
};
const baseArgTypes = [
    { key: "variant", control: "select", desc: "Variante del organismo (markup verbatim).",
      options: [["ep-1", "El Periódico, tipo 1"], ["ep-2", "El Periódico, tipo 2"]] }
];
const baseArgs = { variant: "ep-1" };
const live = (a) => VARIANTS[a.variant] || VARIANTS["ep-1"];
```

> El patrón `authorCard()` + `count` de §2/§3 sigue vigente para el caso homogéneo
> (`authors`). Para todo lo demás (la mayoría), usa `VARIANTS` verbatim + select.

---

## Receta de migración showroom → storybook (organismo)

### 1. Identificar SCSS y moléculas componentes

```
scss/fourties/organism/<x>/_<x>.scss
```

(Nota: la carpeta SCSS es `organism/` en singular en el repo, sin "s" final — la carpeta
del Storybook es `organisms/` plural por convención inglesa.)

Identificar:
- Modificadores del organismo (`--branded`, `--reduced`…).
- **Moléculas que compone**: leer cada `.ft-mol-*` que aparece en el markup del showroom
  y sus modificadores.

### 2. Leer el showroom HTML

```
fourty/organisms/organism-<x>.html
```

Aquí está el **markup canónico** del organismo. Listar:
- La estructura completa (cabecera, navegación, body, footer del organismo).
- Las moléculas internas y sus clases reales.
- Variantes del organismo (algunas tienen múltiples HTMLs:
  `organism-<x>.html`, `organism-<x>-reduced.html`…).

### 3. Crear módulo JS

Plantilla resumida (ver `authors/authors.js` para ejemplo real):

```js
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH ▼ */
    const DATA = {
        layouts: [
            ["ft-mol-<sub>--horizontal", "horizontal (defecto)"],
            ["ft-mol-<sub>--vertical", "vertical"],
            // ...
        ]
    };
    const NAMES = ["Nombre 1", "Nombre 2", "Nombre 3"];   // datos realistas

    /* Constructor de la molécula interna (replicado, no importado) */
    function subCard(layout, name) {
        return `<div class="ft-mol-<sub> ${layout}">
                  <h3>${esc(name)}</h3>
                  <!-- ... estructura completa replicada de fourty/molecules/molecule-<sub>.html -->
                </div>`;
    }

    const baseArgTypes = [
        { key: "layout", control: "select", desc: "Variante de las moléculas internas.", options: DATA.layouts },
        { key: "count", control: "number", desc: "Número de moléculas internas (1-6; si n>3 ciclan los datos).", min: 1, max: 6 }
    ];
    const baseArgs = { layout: DATA.layouts[0][0], count: 2 };

    function live(a) {
        const n = Math.max(1, Math.min(20, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 0; i < n; i++) items.push(subCard(a.layout, NAMES[i % NAMES.length]));
        return `<div class="ft-org-<x>">${items.join("")}</div>`;
    }

    const overview = `<div class="cb-docs__inner">
        <h1><Name></h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-<x></code>) que apila ...</p>

        <h2>Dependencias</h2>
        <p>Al ser un organismo de composición, reúne el CSS de varias piezas. Para renderizar <code>.ft-org-<x></code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/organism/<x>.css</code></td><td>CSS del organismo (contenedor)</td><td>Siempre</td></tr>
                    <tr><td><code>brands/[marca]/molecules/<sub>.css</code></td><td>CSS de la molécula interna</td><td>Siempre</td></tr>
                    <tr><td><code>molecules/rrss.css</code> · <code>atoms/tag.css</code> · <code>atoms/link.css</code></td><td>CSS de piezas reutilizadas</td><td>Según el contenido (RRSS, tags, enlaces…)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">...</table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-<x></code></td></tr>
                <tr><td>Contenido</td><td>uno o más <code>.ft-mol-<sub></code></td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/<x>/_<x>.scss</code> · markup: <code>fourty/organisms/organism-<x>.html</code></p>
    </div>`;

    const X = {
        id: "<x>",
        name: "<Name>",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-org-<x>", kind: "interactive",
              full: true,                                              // ← siempre en organismos
              argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(X);

    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src, { full: true });
})();
```

### 4. Crear `<x>.html` (recomendado)

Para organismos, el `<x>.html` es especialmente útil porque puede contener el HTML
completo del showroom (que el front ya mantiene) sin tocar JS:

```html
<!-- storybook/js/organisms/<x>/<x>.html -->
<template data-story="Branded full">
  <div class="ft-org-<x> ft-org-<x>--branded">
    <!-- copiar del showroom (fourty/organisms/organism-<x>.html) sustituyendo datos por placeholders realistas -->
  </div>
</template>
<template data-story="Reduced">
  <div class="ft-org-<x> ft-org-<x>--reduced">
    ...
  </div>
</template>
```

### 5. Enlazar y verificar

```html
<script src="storybook/js/organisms/<x>/<x>.js" defer></script>
```

**Verificación crítica para organismos**: el organismo debe renderizarse fielmente con el branding de producción:

1. Activa dark mode → debe respetar el dark mode real del DS.
2. Cambia viewport a "Móvil Xs (360×640)" → debe responder a las media queries reales.

---

## Reglas específicas de organismos

1. **`full: true` SIEMPRE**, salvo casos muy específicos (un organismo que sea inline,
   raro). El default sin `full` rompe la distribución visual del organismo.

2. **Datos realistas, no placeholders**: nombres de autores reales o plausibles, fechas
   actuales, URLs a fotos del DS o de PI. El organismo se ve como producción.

3. **Ciclar datasets si `n > dataset.length`**: `NAMES[i % NAMES.length]`. Permite ver
   el comportamiento del organismo con muchos items sin requerir un dataset gigante.

4. **Replicar markup de moléculas internas**: cero acoplamiento. Una función helper
   `function subCard(...) {...}` que retorna el HTML de la molécula. Si la molécula
   tiene 5 átomos internos, los 5 markups van en el helper.

5. **Overview con dependencias COMPLETAS**: un organismo tiene muchas dependencias CSS
   (organism + molecule + átomos reutilizados). Lista todas. Ver `authors.js` overview
   como ejemplo.

6. **Considerar variantes posicionales en Markup**: `--sticky`, `--floating` →
   stories en `<x>.html`, no dinámicas.

7. **No mezclar dos organismos en una misma story**: cada organismo en su propio módulo.
   Si un organismo COMPONE otro (raro), reconsidera si es una molécula compleja en lugar
   de un organismo contenedor.

8. **Estilos experimentales en `<x>.html`**: especialmente útiles en organismos para
   iterar layouts (grid, gaps, breakpoints) sin recompilar SCSS. Añade un `<style>`
   top-level al `<x>.html` y se aplica a TODAS las stories. Workflow completo en
   [`storybook/README.md` §"Estilos experimentales"](../../README.md#estilos-experimentales-style-en-xhtml).
   En organismos, los overrides suelen tocar reglas del propio `.ft-org-<x>` —
   promocionar al SCSS canónico del organismo, no de las moléculas internas (salvo que
   sea un cambio sistémico al sub-componente).

---

## Antipatrones específicos de organismos

| Antipatrón | Por qué está mal | Qué hacer |
|------------|------------------|-----------|
| Olvidar `full: true` | El organismo se ve apilado / encogido en flex-wrap | `full: true` en todas las stories |
| Importar el módulo de la molécula interna | Acoplamiento prohibido | Replicar markup en helper local |
| Datos placeholder (Lorem ipsum, "Author 1") en story `Base` | El organismo no se ve realista | Datasets plausibles (`NAMES`, fechas, URLs reales) |
| Overview sin tabla de dependencias completa | Un consumidor no sabe qué CSS cargar | Listar organism + molecule + atoms reutilizados |
| Stories de variantes posicionales (`--sticky`) dinámicas | El canvas se rompe visualmente con posicionamiento fijo | Solo en Markup |
| Aplicar dark mode "a mano" en el render | El motor ya lo gestiona vía `data-theme` | Confiar en el motor — tu organismo solo necesita usar clases reales |

---

## Caso especial: el organismo `Masthead`

Es el organismo MÁS sensible a la cabecera del CSV. La razón: el `.ft-org-masthead`
muestra logo, colores y nombre del medio, y todos ellos dependen de la marca + el
`body_class` del outlet que aplica el dropdown Cabecera (marca vía `ds__group`).

**Publicado como stories `kind:"page"` → páginas vivas PROPIAS del storybook.** El masthead es
JS-driven: el botón abre/cierra el menú lateral (`--side`) y la cabecera fija (`--fix`) aparece al
hacer scroll, vía `cds-statics/js/headers/masthead.js` (+ affix, sticking, sidenav, popover,
switch). El canvas NO ejecuta el JS de componente cuando una story **inyecta** markup
(`innerHTML` no corre `<script>`), así que para que **el menú y el scroll funcionen** los estados
se publican como **`kind:"page"`**: el iframe **navega** a una página completa que vive **dentro de
esta carpeta** — [`pages/<estado>.html`](masthead/pages/) — con su propio CSS (ux setting +
ux-index, conmutables por marca), los **JS reales del masthead** (`apuntando a sus respectivos
ficheros en /cds-statics`) y `min-height:2000px` para que haya recorrido de scroll. Estados: App,
Externo, Logueado, Login (`App · 2º nivel` se descartó: header byte-idéntico a `App`). `brandable:
true` → Brand y Cabecera repintan logo/colores sobre la página viva; cada estado expone el control
`minimal` (`.minimal-header`, modificador de ancestro, CSS puro).

⚠ **No se redirige al backup.** Las páginas son artefactos propios del storybook (`pages/`),
generadas extrayendo el `<header>` completo (principal + `--fix` + `--side`) del showroom; `__old-
showroom` solo se usó como fuente puntual de extracción. En **runtime no se referencia ninguna ruta
externa**. Además, **`masthead.html`** publica ese mismo `<header>` completo como **markup plano**
(subgrupo `Markup` vía `SB.loadMarkup`), el SSOT en fichero igual que el `<x>.html` del resto de
organismos. La verificación con las cabeceras del CSV sigue siendo el test de aceptación principal.

---

## Referencias

- **Ejemplo canónico**: [`authors/authors.js`](authors/authors.js) y
  [`authors/authors.html`](authors/authors.html)
  - Organismo simple (contenedor de N moléculas idénticas)
  - DATA con layouts, NAMES dataset, helper `authorCard()`
  - Overview con dependencias multinivel (organism + molecule + 4 átomos reutilizados)
- **SCSS fuente**: `scss/fourties/organism/<x>/_<x>.scss` (carpeta singular en SCSS,
  plural en Storybook)
- **HTML del showroom**: `fourty/organisms/organism-<x>.html`
- **Patrón JS general**: `../README.md`
- **Patrón moléculas**: `../molecules/README.md`
- **Patrón átomos**: `../atoms/README.md`
- **Motor (cabeceras CSV, frameHTML)**: `../core/README.md`
