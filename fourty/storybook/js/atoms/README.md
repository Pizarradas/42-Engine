# storybook/js/atoms

Stories de **átomos** del 42DS. Un átomo es la pieza fundamental indivisible
(`.ft-btn`, `.ft-tag`, `.ft-link`…). Espeja `/fourty/atoms/` del showroom.

```
atoms/
├── README.md              ← este archivo (receta de migración)
└── <x>/                    ← una subcarpeta por átomo
    ├── <x>.js              ← lógica: argTypes + args + stories + overview
    └── <x>.html            ← (opcional) markup HTML editable
```

**Ejemplo canónico**: [`btn/btn.js`](btn/btn.js) — referencia obligada antes de migrar.
Documenta la pieza más rica del DS (.ft-btn con 6 familias × ~5 ejes cada una).

---

## Índice de componentes

Cada átomo tiene su **ficha de contexto** (`<x>/README.md`): identidad, clase raíz,
señales JS, stories y trazabilidad al SCSS. Es el punto de entrada rápido para agentes
(la doc completa vive en el `overview` del `.js`).

| Componente | Ficha | Señales | Clase raíz |
|------------|-------|---------|------------|
| Ad | [`ad/`](ad/README.md) | `js` | `.ft-ad` |
| Advice | [`advice/`](advice/README.md) | — | `.ft-advice` |
| Anchor | [`anchor/`](anchor/README.md) | — | `.ft-anchor` |
| Animation | [`animation/`](animation/README.md) | — | `.ft-animation-*` |
| Btn | [`btn/`](btn/README.md) | — | `.ft-btn` |
| Check | [`check/`](check/README.md) | — | `.ft-check` |
| Date | [`date/`](date/README.md) | — | `.ft-date` |
| Embed | [`embed/`](embed/README.md) | — | `.ft-embed` |
| Img | [`img/`](img/README.md) | — | `.ft-img` |
| Link | [`link/`](link/README.md) | — | `.ft-link` |
| List | [`list/`](list/README.md) | — | `.ft-list` |
| Radio | [`radio/`](radio/README.md) | — | `.ft-radio` |
| ReadMore | [`readmore/`](readmore/README.md) | — | `.ft-readMore` |
| Scrollbar | [`scrollbar/`](scrollbar/README.md) | `js` | `[data-scrollbar]` |
| Skiplink | [`skiplink/`](skiplink/README.md) | — | `.ft-skiplink` |
| SvgMap | [`svgmap/`](svgmap/README.md) | — | `.ft-svgmap` |
| Switch | [`switch/`](switch/README.md) | — | `.ft-switch` |
| Tag | [`tag/`](tag/README.md) | `js` | `.ft-tag` |
| Text | [`text/`](text/README.md) | — | `.ft-text` |
| Timer | [`timer/`](timer/README.md) | — | `.ft-timer` |
| Toogle | [`toogle/`](toogle/README.md) | — | `.ft-toogle` *(typo histórico)* |
| Tooltip | [`tooltip/`](tooltip/README.md) | — | `.ft-tooltip` |
| Tour | [`tour/`](tour/README.md) | — | `.ft-tour__message` |
| Trust | [`trust/`](trust/README.md) | — | `.ft-trust` |

---

## Qué define un átomo en este contexto

| Característica | Atom | NO es atom |
|----------------|------|------------|
| Prefijo de clase | `.ft-<x>` | `.ft-mol-*` (molécula) o `.ft-org-*` (organismo) |
| Composición | Indivisible, no contiene otros componentes del DS | Compuesto por átomos |
| Layout | Inline o inline-block (botón, tag, link, icon…) | Bloque (containers) |
| Story flag | NO usa `full: true` por defecto | Moléculas/organismos sí |

---

## Receta de migración showroom → storybook (átomo)

Pasos para migrar un átomo del showroom (`/fourty/atoms/atom-<x>.html`) a este formato:

### 1. Identificar la fuente de verdad del SCSS

```
scss/fourties/atoms/<x>/_<x>.scss
```

Leer **completo**. Listar todos los modificadores reales (`--primary`, `--md`,
`--has-icon`…). Esto es el **catálogo canónico**. Nunca inventar clases que no existan
aquí.

### 2. Leer el showroom HTML

```
fourty/atoms/atom-<x>.html
```

Para entender:
- Las **familias** del componente (Base, Nav, RRSS, Txt…).
- Los **modificadores en uso real** vs. los del SCSS (a veces el SCSS define modificadores
  que el showroom no usa — incluirlos si tienen sentido, omitirlos si son experimentales).
- Los ejemplos de **markup canónico** que el front quiere mantener.

### 3. Crear subcarpeta y módulo JS

```bash
mkdir storybook/js/atoms/<x>/
touch storybook/js/atoms/<x>/<x>.js
touch storybook/js/atoms/<x>/<x>.html  # opcional
```

Estructura del módulo (plantilla, mirar btn.js para ejemplo real):

```js
/* ════════════════════════════════════════════════════════════════════════
   atoms/<x>/<x>.js — Atoms / <Name>
   Casuística REAL de scss/fourties/atoms/<x>/_<x>.scss (clases .ft-<x>*).
   Markup tomado de fourty/atoms/atom-<x>.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT). Añadir/    ║
   ║  quitar variante = editar el array, no el markup.                     ║
   ╚══════════════════════════════════════════════════════════════════════╝

   Estructura: el componente "<Name>" lista sus familias como STORIES PLANAS
   (Base, Nav, RRSS, Txt, Help) — cada una interactiva con sus propios controls —,
   y un subgrupo "Markup" cargado de forma asíncrona desde <x>.html.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec, block } = window.SB.helpers;
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const each = (list, fn) => list.map(fn).join("");

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — editar SOLO estos arrays  ▼▼▼
       Reflejan 1:1 los modificadores de scss/fourties/atoms/<x>/_<x>.scss.
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        kinds: ["primary", "secondary", "tertiary"],
        sizes: ["xs", "sm", "md", "lg"]
        // ... añadir TODOS los modificadores reales, 1:1 con el SCSS
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructores de markup ─── */
    const atom = (mods, label) => `<button type="button" class="${["ft-<x>"].concat(mods).join(" ")}">${esc(label)}</button>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-<x> (pieza fundamental). Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "kind", control: "select", desc: "Jerarquía visual (.ft-<x>--[kind]).",
          options: DATA.kinds.map(k => [k, k]) },
        { key: "size", control: "select", desc: "Tamaño (.ft-<x>--[size]).",
          options: DATA.sizes.map(s => [s, s]) },
        { key: "label", control: "text", desc: "Contenido textual del átomo (slot)." }
    ];
    const baseArgs = { kind: "primary", size: "md", label: "Text" };
    function liveBase(a) {
        const mods = [];
        if (a.kind) mods.push(`ft-<x>--${a.kind}`);
        if (a.size) mods.push(`ft-<x>--${a.size}`);
        return atom(mods, a.label);
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍAS — variantes fijas para ejes con muchas opciones (iconos, redes…).
       Se agrupan bajo un subgroup "Galleries" plegado.
       ══════════════════════════════════════════════════════════════════════ */
    function galleryKinds() {
        return DATA.kinds.map(k =>
            spec(k, atom([`ft-<x>--${k}`], cap(k)))
        ).join("");
    }

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW — documentación técnica (NO incrustar el componente vivo)
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1><Name></h1>
        <p class="cb-docs__lead">Átomo del 42DS (<code>.ft-<x></code>) que ...</p>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-<x></code>:</p>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/<x>.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/<x>/_<x>.scss</code> + <code><x>-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
                </tbody>
            </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>variante por defecto</td></tr>
                <tr><td><code>--primary</code></td><td>jerarquía primaria</td></tr>
                <!-- ... TODOS los modificadores reales -->
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-<x></code></td></tr>
                <tr><td>Icono (opc)</td><td><code>.ft-<x>__icon</code></td></tr>
                <!-- ... -->
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/<x>/_<x>.scss</code> · markup: <code>fourty/atoms/atom-<x>.html</code></p>
    </div>`;

    /* ══════════════════════════════════════════════════════════════════════
       Registro
       ══════════════════════════════════════════════════════════════════════ */
    const X = {
        id: "<x>",
        name: "<Name>",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive",  // sin hint de clase (la clase vive en el Overview)
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "kinds", name: "Kinds", hint: "todas las jerarquías",
                    kind: "gallery", render: galleryKinds }
              ]
            }
        ]
    };
    window.SB.register(X);

    /* Markup HTML editable por el front (opcional, ver btn/btn.html como ejemplo) */
    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src);
})();
```

### 4. Crear `<x>.html` (opcional, recomendado)

Bloques `<template data-story="Nombre">` con HTML real `.ft-<x>`. Ejemplos canónicos
copiables que el front mantendrá sin tocar JS:

```html
<!-- storybook/js/atoms/<x>/<x>.html -->
<template data-story="Anchor base">
  <a href="#" class="ft-<x>" title="title" target="_self">btn</a>
</template>
<template data-story="Primary">
  <button type="button" class="ft-<x> ft-<x>--primary ft-<x>--md">Primary</button>
</template>
<template data-story="Disabled">
  <button type="button" class="ft-<x> ft-<x>--primary ft-<x>--md" disabled>Disabled</button>
</template>
```

### 5. Enlazar en `index.html`

```html
<script src="storybook/js/atoms/<x>/<x>.js" defer></script>
```

Posición: después del `core/storybook.js`, entre los otros átomos. El orden entre átomos
no importa funcionalmente (cada uno se autorregistra) pero por convención: alfabético
dentro de cada nivel.

### 6. Verificar

1. Recarga el storybook.
2. Comprueba que el átomo aparece en el sidebar bajo "Atoms".
3. Verifica que cada story renderiza el componente.
4. Manipula cada control y verifica que el preview se actualiza.
5. Cambia de marca → el átomo se re-renderiza con el nuevo CSS.
6. Activa dark mode → el átomo respeta el dark mode real del DS.

---

## Reglas específicas de átomos

1. **NO usar `full: true`**: los átomos son inline. El canvas flex-wrap-arriba-izquierda
   los muestra correctamente. La excepción es si el átomo tiene un comportamiento de
   alineación que requiere ancho (raro en átomos).

2. **Stories múltiples por familia**: si el átomo tiene FAMILIAS de variantes (como
   `.ft-btn` con `-btn`, `-btn-nav`, `-btn-rrss`, `-btn-txt`, `-btn-help`), cada familia
   = una story plana interactiva separada con sus propios `argTypes`. Ver `btn.js`.

3. **Galerías para ejes discretos extensos**: cuando un eje tiene 15+ opciones (iconos,
   redes sociales, colores), una story `gallery` dentro de `subgroups` lo enumera todo
   en una vista de catálogo. Ver Btn `Galleries → All icons` (26 iconos), `All networks`
   (15 redes).

4. **Default args con valores SEMÁNTICAMENTE NEUTROS**: para `text` controls, el default
   suele ser `"Text"` o el nombre del componente. Para selects/radios, el primer valor
   "real" (no vacío) de la lista.

5. **Cada eje del SCSS = un argType**: cero invención. Si el SCSS no tiene `--ultra-mega`,
   el módulo tampoco.

6. **Numeric controls con `min`/`max`**: si el átomo tiene un eje numérico (poco común),
   usar `control: "number"` con clamp lógico del DS (ver `authors.js count`).

7. **Estilos experimentales en `<x>.html`**: si quieres probar un modificador nuevo
   (`.ft-<x>--rounded`, override de color…) sin tocar SCSS, añade un `<style>` top-level
   al `<x>.html` y se aplicará a TODAS las stories del átomo (Base, familias y Markup).
   Workflow de promoción al SCSS canónico documentado en
   [`storybook/README.md` §"Estilos experimentales"](../../README.md#estilos-experimentales-style-en-xhtml).
   Mientras exista, el panel **Code** muestra un banner ámbar de aviso.

---

## Antipatrones (lo que NO hacer)

| Antipatrón | Por qué está mal | Qué hacer en su lugar |
|------------|------------------|------------------------|
| Crear el módulo sin leer el `_<x>.scss` primero | Invención de API que falsifica el DS | Leer SCSS, listar modificadores reales, reflejarlos 1:1 en `DATA` |
| Stories con `args` que sobreescriben otro estado | Estados equivalentes duplicados | Una story = un estado visualmente único |
| `overview` con `<button class="ft-btn">` incrustado | Duplica con las stories, confunde | `overview` solo tablas y texto |
| `full: true` en un átomo inline | Rompe el flex-wrap del canvas | Quitar `full` (default es false) |
| Importar otro módulo (`btngroup` desde `btn`) | Acoplamiento prohibido entre componentes | Cada módulo es self-contained |
| Texto del default en mayúsculas o gritando ("TEXT", "PRIMARY") | Antipatrón UI | Capitalización normal ("Text", "Primary") |
| `args: { kind: "Primary" }` | Value no coincide con el SCSS (lowercase) | `args: { kind: "primary" }` |

---

## Referencias

- **Ejemplo canónico**: [`btn/btn.js`](btn/btn.js) y [`btn/btn.html`](btn/btn.html)
  - 6 familias (Base, Nav, RRSS, Txt, Help, Anchor) + galerías (iconos, redes)
  - DATA con 6 arrays (kinds, sizes, navIcons, navShapes, navSizes, rrss)
  - Overview con dependencias completas incluyendo `--scrollUp` (caso JS opcional)
- **SCSS fuente del catálogo**: `scss/fourties/atoms/<x>/_<x>.scss`
- **HTML del showroom**: `fourty/atoms/atom-<x>.html`
- **Patrón JS general**: `js/README.md`
- **Motor (API SB)**: `js/core/README.md`
