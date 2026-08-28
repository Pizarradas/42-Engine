# storybook/js

Capa **JavaScript** del Storybook. Separación deliberada motor ↔ componentes, igual que
el Storybook real separa el framework de los `*.stories.js`.

```
js/
├── README.md                       ← este archivo (overview + orden de carga)
├── changelog.js                    ← pagina-doc standalone del registro de releases
├── ai.js                           ← pagina-doc standalone sobre la carpeta AI y sus modes
├── emailing.js                     ← índice del grupo Externals > Emailing
├── core/                           ← MOTOR (agnóstico de componente)
│   ├── README.md
│   └── storybook.js                ← define window.SB
├── atoms/                          ← una subcarpeta por átomo (espeja /fourty/atoms)
│   ├── README.md                   ← receta de migración + índice de componentes del nivel
│   └── <x>/{README.md, <x>.js, <x>.html}   ← README.md = ficha de contexto del componente (indexa el .js)
├── molecules/                      ← (.ft-mol-*)
│   ├── README.md
│   └── <x>/{<x>.js, <x>.html}
└── organisms/                      ← (.ft-org-*)
    ├── README.md
    └── <x>/{<x>.js, <x>.html}
```

---

## Quién es responsable de qué

| Capa | Responsabilidad | NO toca |
|------|-----------------|---------|
| **`core/storybook.js`** | Monta el chrome, gestiona estado global (marca, viewport, fondo, dark, a11y, inspector), reescribe el iframe en `mountFrame()`, expone `window.SB.register / loadMarkup / refresh / helpers` | Componentes concretos (no conoce `btn`, `btnGroup`, etc.) |
| **`<nivel>/<x>/<x>.js`** | Define UN componente: argTypes, args, stories (Base, variantes, galerías), overview con tablas, opcional `loadMarkup(...)` | El chrome (no manipula sidebar, toolbar, ni paneles addon) |
| **`<nivel>/<x>/<x>.html`** | Catálogo de HTML plano editable por el front: `<template data-story="Nombre">` con `.ft-*` reales. Admite `<style>` top-level (CSS experimental compartido por todas las stories del componente) y `<style>` por template (scoped a esa story). Ver [§"Estilos experimentales"](../README.md#estilos-experimentales-style-en-xhtml) en el README maestro | JS (es 100% markup, sin scripts) |

El componente **se autodeclara** via `SB.register(def)`. El motor lo enruta al sidebar
según `group:` (no según la carpeta), y al canvas según la story seleccionada. Cero
acoplamiento bidireccional.

---

## Orden de carga (`fourty/index.html`)

```html
<script src="storybook/assets/icons.js" defer></script>
<script src="storybook/data/brand-data.js" defer></script>
<script src="storybook/js/core/storybook.js" defer></script>
<script src="storybook/js/atoms/btn/btn.js" defer></script>
<script src="storybook/js/molecules/btngroup/btngroup.js" defer></script>
<script src="storybook/js/organisms/authors/authors.js" defer></script>
```

**`defer` garantiza orden de ejecución** en el orden de aparición, AFTER del HTML
parsing. Critical sequence:

1. **`assets/icons.js`** define `window.SB_ICONS` (paths Phosphor).
2. **`data/brand-data.js`** arranca el fetch async del CSV; expone `window.SB_BRANDS_READY`.
3. **`core/storybook.js`** monta el chrome (consume `SB_ICONS`, hace `.then(SB_BRANDS_READY)` para hidratar el dropdown Cabecera) y expone `window.SB`.
4. **Cada `<nivel>/<x>/<x>.js`** llama `window.SB.register({...})` para auto-registrar
   su componente.

Los componentes se cargan **después** del core porque dependen de `window.SB.register`.
Internamente, cada módulo es una IIFE autocontenida — no hay dependencias entre
componentes.

---

## API runtime (`window.SB`)

Expuesta por `core/storybook.js`:

```js
window.SB = {
  helpers: { esc, spec, block },

  /** Registra UN componente. Idempotente: llamadas repetidas con el mismo id
      no duplican (gana la última, sobreescribe). */
  register(def) { ... },

  /** Carga un .html de markup (bloques <template data-story="…">), lo publica
      como subgrupo "Markup" plegado del def. scriptSrc = document.currentScript.src
      del módulo. opts.full=true → canvas en bloque para componentes de layout. */
  loadMarkup(def, scriptSrc, opts?) { ... },

  /** Re-monta el árbol del sidebar (útil tras registro async como loadMarkup). */
  refresh() { ... }
};
```

Helpers:
- `esc(str)` → HTML-escape. **Uso obligatorio** para cualquier string interpolada en
  templates (XSS-safe).
- `spec(label, html)` → renderiza una fila `<div class="cb-spec"><span class="cb-spec__label">label</span>...</div>`. Para galerías.
- `block(titulo, html)` → renderiza un bloque con encabezado. Para galerías agrupadas.

---

## Patrón de módulo (cada componente sigue esta forma)

```js
/* ════════════════════════════════════════════════════════════════════════
   <nivel>/<x>/<x>.js — <Group> / <Name>
   Casuística REAL de scss/fourties/<nivel>/<x>/_<x>.scss (clases .ft-*).
   Markup tomado de fourty/<nivel>/<nivel>-<x>.html. Cero invención de API.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec, block, docsTable, changeBlock, deprecationBlock, removeBlock } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales del SCSS ▼ */
    const DATA = {
        kinds: ["primary", "secondary", "tertiary"],
        sizes: ["xs", "sm", "md", "lg"],
        // ...
    };

    /* Constructores de markup (plantillas genéricas) */
    const item = (mods, label) => `<button class="${["ft-x"].concat(mods).join(" ")}">${esc(label)}</button>`;

    /* — argTypes / args (controls del panel) — */
    const baseArgTypes = [
        { key: "kind", control: "select", desc: "...", options: DATA.kinds.map(k => [k, k]) },
        { key: "size", control: "select", desc: "...", options: DATA.sizes.map(s => [s, s]) },
        { key: "label", control: "text", desc: "Texto del slot." }
    ];
    const baseArgs = { kind: "primary", size: "md", label: "Text" };

    /* — render functions — */
    function liveBase(a) { return item([`ft-x--${a.kind}`, `ft-x--${a.size}`], a.label); }

    /* — Overview (Docs) — */
    const overview = `<div class="cb-docs__inner">
        <h1>X</h1>
        <p class="cb-docs__lead">Definicion tecnica breve para front y desarrollo: que es la pieza, su clase raiz y el contrato principal.</p>
        <div class="cb-callout">Bloque de uso mas coloquial: para que sirve, cuando reutilizarlo y con que otras piezas suele combinarse.</div>
        <div class="cb-callout cb-callout--warn">Aviso temprano si hay dependencias JS, limites de integracion, branding sensible o contexto de accesibilidad.</div>
        <h2>Dependencias</h2>
        <div class="cb-deps">${docsTable({ columns: ["Dependencia", "Tipo", "Cuando"], rows: [...] })}</div>
        <h2>Modificadores</h2>
        ${docsTable({ variant: "dense", columns: ["Clase", "Efecto"], rows: [...] })}
        <h2>Anatomía</h2>
        ${docsTable({ columns: ["Pieza", "Clase"], rows: [...] })}
        <h2>Registro de cambios</h2>
        ${changeBlock({
            type: "changed",
            date: "2026-08-11",
            title: "Cambio relevante del componente",
            summary: "Qué cambió y para qué.",
            scope: "Piezas o variantes afectadas.",
            impact: "Consecuencias para front, desarrollo o QA.",
            files: ["scss/fourties/<nivel>/<x>/_<x>.scss"]
        })}
        ${deprecationBlock({
            title: "API antigua",
            since: "2026-06-18",
            summary: "Usa este bloque solo cuando haya una deprecacion real y trazable.",
            replacement: "<code>.ft-x--new</code>",
            scope: "Consumidores legacy o stories antiguas"
        })}
        ${removeBlock({
            title: "Variante retirada",
            since: "2026-06-18",
            summary: "Usa este bloque cuando la retirada ya sea efectiva y sea importante mantener la traza en la documentacion.",
            scope: "Equipos que aun busquen esa variante en legacy o en el showroom anterior.",
            replacement: "Explica aqui el flujo vigente o la pieza que la sustituye."
        })}
        <p class="cb-src">Fuente: <code>scss/fourties/<nivel>/<x>/_<x>.scss</code></p>
    </div>`;

    /* — Registro — */
    const X = {
        id: "<x>",
        name: "<Name>",
        group: "<Atoms|Molecules|Organisms>",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-x", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
            // ... más stories: Nav, RRSS, Galleries...
        ],
        subgroups: [
            // { id: "galleries", name: "Galleries", collapsed: true, stories: [...] }
        ]
    };
    window.SB.register(X);

    /* Markup HTML editable por el front (opcional) */
    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src);
})();
```

Variantes según nivel:
- **Atoms** (`atoms/<x>/<x>.js`): `group: "Atoms"`, clase raíz `.ft-<x>`. Stories suelen
  ser inline → **NO** llevan `full: true`. Ver `js/atoms/README.md`.
- **Molecules** (`molecules/<x>/<x>.js`): `group: "Molecules"`, clase raíz `.ft-mol-<x>`.
  Si el componente tiene `justify-content` o necesita ancho para mostrar su layout,
  marcar `full: true`. Ver `js/molecules/README.md`.
- **Organisms** (`organisms/<x>/<x>.js`): `group: "Organisms"`, clase raíz `.ft-org-<x>`.
  Casi siempre `full: true` (son contenedores de moléculas). Ver `js/organisms/README.md`.

---

## Casuística data-driven (DATA como SSOT)

El motor recomienda **encerrar la matriz de variantes en un objeto `DATA`** al principio
del módulo. Ventajas:

1. **Single Source of Truth**: añadir/quitar una variante = editar el array, no el render.
2. **Generación automática de stories**: `stories.push(...DATA.kinds.map(k => ({...})))`.
3. **Generación automática de `argTypes.options`**: `options: DATA.sizes.map(s => [s, s])`.
4. **Coherencia con el SCSS**: cada array refleja 1:1 los modificadores reales del
   `_<x>.scss` — y eso es trazable.

Ejemplo canónico: ver `atoms/btn/btn.js`:

```js
const DATA = {
    kinds: ["primary", "secondary", "tertiary"],
    sizes: ["xs", "sm", "md", "lg", "sm-md", "md-lg"],
    navIcons: ["back", "close", "send", /* 26 iconos */],
    navShapes: [["", "—"], ["circle", "circle"], ["square", "square"]],
    navSizes: { "": ["md"], circle: ["sm-md", "md", "lg"], square: ["md", "lg"] },
    rrss: ["email", "facebook", "instagram", /* 15 redes */]
};
```

---

## Reglas no-negociables

1. **Una IIFE por módulo** — `(function(){ "use strict"; ... })();`. No globals
   accidentales.
2. **Cero acoplamiento entre componentes**: ningún módulo lee de otro. Si dos componentes
   necesitan el mismo dato, lo duplican (es trivial) o lo ponen en su propio `DATA`.
3. **El motor es la única dependencia compartida** vía `window.SB`. No acceder a internals
   del motor (`window.SB.helpers` sí; `window.SB.components` no — es privado).
4. **Clases `.ft-*` REALES** — verificar contra el SCSS. La regla canónica:
   `scss/fourties/<nivel>/<x>/_<x>.scss` es la fuente de verdad.
5. **Stories puras**: sin lógica de render compleja ni side effects. Reciben `args`,
   devuelven HTML string. Listo.
6. **`esc()` obligatorio** para todo `${input}` que vaya a render. XSS-safety baseline.
7. **`overview` solo documentación técnica** — no incrustar el componente vivo (eso lo
   hacen las stories).
