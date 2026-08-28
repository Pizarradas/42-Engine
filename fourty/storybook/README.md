# 42DS Storybook (Carbon-style)

Storybook **aislado y sin toolchain** para documentar componentes del 42DS con la
arquitectura de IBM Carbon. Vanilla JS + CSS + un CSV de datos. Cero dependencias, cero
build, cero Node en runtime.

Generado y mantenido bajo `[MODE: STORYBOOK]` (ver `AI/mind-system/agents/mode-storybook.md`).
Entry: **`/fourty/index.html`**.

---

## Estructura

```
fourty/
├── index.html          ← entry (shell mínimo: <link>s del DS + 8 <script> fijos de boot)
└── storybook/
    ├── README.md                  ← este archivo (overview maestro + reglas de oro)
    ├── assets/                    ← recursos gráficos del CHROME (iconos Phosphor)
    │   ├── README.md
    │   ├── icons.js               ← registro runtime (path inline + currentColor)
    │   └── icons/*.svg            ← SVG originales (fuente reproducible)
    ├── css/                       ← chrome CSS (prefijo .cb-)
    │   ├── README.md
    │   └── storybook.css
    ├── data/                      ← capa de datos pura (parseo CSV → SB_BRANDS)
    │   ├── README.md
    │   └── brand-data.js
    └── js/
        ├── README.md              ← jerarquía JS y orden de carga
        ├── changelog.js           ← pagina-doc standalone en Docs > Changelog
        ├── ai.js                  ← pagina-doc standalone en Docs > AI
        ├── emailing.js            ← índice del grupo Externals > Emailing
        ├── core/                  ← MOTOR reutilizable (agnóstico de componente)
        │   ├── README.md
        │   └── storybook.js
        ├── atoms/                 ← una subcarpeta por átomo
        │   ├── README.md          ← receta de migración showroom → storybook (atoms)
        │   └── <x>/
        │       ├── README.md      ← ficha de contexto del componente (para agentes; indexa el .js)
        │       ├── <x>.js
        │       └── <x>.html       ← markup HTML editable (opcional, ver §loadMarkup)
        ├── molecules/             ← misma jerarquía, prefijo .ft-mol-
        │   ├── README.md
        │   └── <x>/{<x>.js, <x>.html}
        ├── organisms/             ← misma jerarquía, prefijo .ft-org-
        │   ├── README.md
        │   └── <x>/{<x>.js, <x>.html}
        └── templates|layouts|     ← NIVELES-PÁGINA: índices kind:"page" autogenerados
            widgets|recursos|pocs/    (NO componentes; ver js/templates/README.md)
                ├── README.md
                └── <nivel>.js     ← un módulo plano que registra N page-stories por grupo
```

Las carpetas de nivel atómico (`atoms/`, `molecules/`, `organisms/`) **espejan `/fourty`** del
showroom (un componente por subcarpeta). Los **niveles-página** (`templates/`, `layouts/`,
`widgets/`, `recursos/`, `pocs/`) NO son componentes: son páginas completas hechas a mano que se
**indexan** como stories `kind:"page"` (autogeneradas, un `.js` por nivel). Las recetas concretas
están en el README de cada nivel.

---

## Principios de arquitectura (no-negociables)

1. **Zero-toolchain**: vanilla JS sin transpiler, sin bundler, sin Node en runtime. La
   única dependencia operativa es un servidor estático (Live Server, `npx serve`, etc.).
2. **DEAD-SIMPLE**: features pensadas para que un front sin saber Storybook aporten valor
   en HTML plano (ver `<componente>.html`). El motor NO se sobre-ingenieriza para casos
   teóricos.
3. **Reusar el mecanismo NATIVO del DS**, nunca inventar uno paralelo en el chrome.
   Ejemplos canónicos:
   - **Dark mode** = `data-theme="dark"` en `<html>` del iframe (dispara `_dark.scss`
     real), **NO** un truco de tematizado del chrome.
   - **Fondo del canvas** = clases `ft-helper-bgColor-*` reales, no overrides custom.
   - **Cabeceras de marca** = marca (`ft-brand-*`, vía `ds__group`) + `body_class` del outlet
     desde el CSV maestro `cds-statics/csv/storybook__bodyclass.csv`, idéntico a lo que renderiza producción.
4. **Frontera con el showroom**: el storybook **NO modifica** `cds-statics/` ni `scss/`.
   Solo consume el CSS compilado del DS. Los componentes del canvas usan **solo clases
   `.ft-*` reales** — nunca se inventa API; se verifica contra el SCSS.
5. **El chrome usa prefijo `.cb-`** (Carbon) para no colisionar con `.ft-*` del DS.
6. **Capas separadas**: `data/` (parseo, sin DOM) · `core/` (motor + chrome, sin
   componente concreto) · `js/<nivel>/<x>/` (componentes, sin acoplamiento al motor más
   allá de `SB.register`).

---

## Quick start: documentar un componente nuevo

Si vas a **migrar un componente del showroom** (`/fourty/<nivel>/<nivel>-<x>.html`), la
receta detallada vive en el README del nivel correspondiente:

- Átomos (`.ft-*`): [`js/atoms/README.md`](js/atoms/README.md)
- Moléculas (`.ft-mol-*`): [`js/molecules/README.md`](js/molecules/README.md)
- Organismos (`.ft-org-*`): [`js/organisms/README.md`](js/organisms/README.md)

Resumen del flujo:

```
1. Crear subcarpeta:  storybook/js/<nivel>/<x>/
2. Crear <x>.js:       SB.register({...}) con argTypes + stories + overview
3. (Opcional) <x>.html: bloques <template data-story="..."> de HTML real .ft-*
4. DAR DE ALTA la ruta en el array PHASES de storybook/js/bootstrap-lazy.js
```

> ⚠️ **El alta NO va en `index.html`.** El shell carga 8 scripts fijos (assets, data, meta, motor,
> changelog y el loader) y **todo el catálogo se carga diferido por fases** desde
> `storybook/js/bootstrap-lazy.js`. Añade la ruta del módulo al array `PHASES` de la fase de su
> nivel (helpers/setup · atoms · molecules · organisms · páginas), en orden alfabético dentro de la
> fase. El orden entre fases importa solo para dependencias dato→consumidor (p.ej.
> `logo-gallery-data.js` antes que `logo-gallery.js`).
>
> El **orden alfabético del sidebar es automático** (`buildTree` ordena por `name`), así que la
> posición dentro de la fase es solo higiene, no afecta a lo que ve el usuario.

El motor agrupa y enruta automáticamente. Ver [§Contrato de SB.register](#contrato-de-sbregisterdef).

---

## Cómo verlo

Sírvelo desde la **raíz del repo** (Live Server de VS Code, `python -m http.server`, o
`npx serve .`) y abre **`/fourty/index.html`**.

El **servidor es imprescindible** para 3 cosas:

1. **El canvas es un `<iframe>`** que carga el CSS real del DS desde rutas relativas
   (`../cds-statics/...`) — `file://` no resuelve.
2. **El motor parsea un CSV** (`brand-data.js → storybook__bodyclass.csv`) vía `fetch()` —
   bloqueado en `file://` por CORS.
3. **Los `.html` de markup** de cada componente se cargan async vía `fetch()`.

Sin servidor el chrome arranca pero todo lo que requiere `fetch` degrada en silencio
(canvas vacío, dropdown Cabecera oculto). El resto sigue funcionando.

---

## Features del chrome (overview)

### Sidebar (navegación)

El árbol del sidebar es `group → componente → [Overview] + stories planas + subgrupos`.
Buenas prácticas de navegación (estilo Storybook), todas en `buildTree` (core/storybook.js):

| Feature | Comportamiento |
|---------|----------------|
| **Plegado por defecto** | **Grupos plegados salvo el primero** (`makeBody(gh, gi > 0)`) y **componentes plegados**: el árbol arranca limpio (solo cabeceras). La **story activa expande sus ancestros sola** (`expandAncestors`) → al cargar, el grupo/componente de la primera story queda abierto. |
| **Contadores de items** | Badge `.cb-tree__count` con el nº de stories navegables en cada cabecera de **grupo** y **componente** (`storyCount` = stories planas + subgrupos; **excluye el Overview** docs). **Estático = TOTAL** (no se filtra con la búsqueda). |
| **Búsqueda** | Tokenizada, multi-campo (nombre + hint + componente + grupo + subgrupo), **accent-insensitive**, con resaltado `<mark>` y recuento en `#cbSearchMeta`. **Override del plegado**: con query activa fuerza visibles las ramas con coincidencias e ignora `is-collapsed` (solo respeta el plegado con la query vacía). Por eso los contadores y el plegado por defecto **no afectan** a la búsqueda. |

> Estos comportamientos se **heredan automáticamente** al registrar grupos/componentes nuevos
> (incluidos los **niveles-página** templates/layouts/widgets/recursos/pocs). No hay que tocar
> el motor para añadirlos.

### Toolbar principal (`Canvas`)

| Control | Qué hace | Detalle |
|---------|----------|---------|
| **Brand** | Marca activa del iframe (`ft-brand-ep`, `ft-brand-regionales`…) | 8 marcas hardcoded en `BRAND_MAP` (core/storybook.js). Cambia el CSS cargado en el iframe. |
| **Cabecera** | Submarca concreta del CSV (Albal, Almenara, Levante…) | 159 outlets reales agrupados por medio. Auto-sincroniza Brand a la marca padre. Dropdown custom con búsqueda + footer sticky con total. |
| **Viewport** | Resolución del iframe (Xs/Sm/Md/Lg/Xl + manual W×H) | Dispara media queries reales del DS (`@include min-screen(...)`). |
| **Fondo** | Helper de bg del DS (`ft-helper-bgColor-*`) | Dropdown custom con swatches del color real de cada helper leído del iframe. |
| **Oscuro** | Activa `data-theme="dark"` en `<html>` del iframe | Mecanismo NATIVO del DS — dispara `_dark.scss` real. Persiste en `localStorage["darkMode"]`. |
| **Fullscreen** (icono `⛶`) | Oculta sidebar + toolbar + addons panel; iframe ocupa el viewport | Tecla `F` para alternar, `Esc` o solapa "Mostrar paneles" para salir. |

### Sub-toolbar A11y

| Control | WCAG | Mecanismo |
|---------|------|-----------|
| **Visión** | — | 8 simulaciones de daltonismo (Wickline matrices vía `feColorMatrix`) + grayscale + blur, aplicadas como `filter: url(#sb-vis-X)` al iframe element. |
| **Texto** | 1.4.4 (Resize Text) | Cambia `font-size` raíz del iframe (escala todos los `rem` del DS). Incluye 200% como umbral WCAG. |
| **Contraste** | 1.4.11 (Non-text Contrast) | Forced colors (Windows HCM) — fuerza un dúo BW/WB/YB en todo el subtree. |
| **Movimiento** | 2.3.3 (Animation from Interactions) | Anula `animation` y `transition` en el iframe. |
| **Foco** | 2.4.7 (Focus Visible) | Outline magenta 3px sobre `:focus` / `:focus-visible`. |
| **Espaciado** | 1.4.12 (Text Spacing) | Aplica los mínimos: letter 0.12em · word 0.16em · line 1.5 · paragraph 2em. |
| **Medidas** | — | Inspector hover: outline + tooltip con W×H, font-size, padding, margin. Overlay vive dentro del iframe, throttled con rAF. |

### Paneles addon (debajo del canvas)

- **Controls** — manipula los `args` de la story activa en vivo. Tipos de control:
  `text`, `select`, `radio`, `boolean`, **`number`** (con `min`/`max`/`step` opcionales).
- **Actions** — log de clicks sobre `<button>`/`<a>` del canvas.
- **Accessibility** — checks heurísticos (texto accesible, native interactives,
  type="button"…).
- **Code** — snippet HTML derivado del DOM renderizado (con SVGs colapsados). Si
  la story define `code`, esa salida canónica tiene prioridad sobre el DOM del
  canvas; úsalo cuando el render necesite un harness visual que no deba copiarse.
- **Docs** (`Overview` en el sidebar) — documentación técnica del componente.

### Atajos de teclado

| Tecla | Acción | Ámbito |
|-------|--------|--------|
| `/` | Enfocar el buscador de stories | Document (ignora si foco en input/textarea/select) |
| `F` | Toggle fullscreen | Document (ignora si foco en input/textarea/select) |
| `Esc` | Salir fullscreen · cerrar dropdown abierto · cerrar menu Cabecera · vaciar/desenfocar buscador | Document |

---

## Contrato de `SB.register(def)`

```js
window.SB.register({
  id:        "btn",                       // string único
  name:      "Btn",                       // nombre en el sidebar
  group:     "Atoms",                     // grupo del sidebar (Atoms/Molecules/Organisms)
  overview:  `<div class="cb-docs__inner">...</div>`,   // HTML de la página Docs

  // — Plano —
  argTypes:  [...],                       // controls del panel (ver tabla abajo)
  args:      { /* defaults */ },          // valores iniciales
  stories:   [                            // bookmarks directos en el sidebar
    { id, name, hint?, kind, full?, render, argTypes?, args? }
  ],

  // — Anidado (opcional) —
  subgroups: [                            // grupos plegables (ej. "Galleries", "Markup")
    { id, name, hint?, collapsed?, argTypes?, args?, stories: [...] }
  ]
});
```

### Story

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | ID único dentro del componente |
| `name` | string | Nombre en el sidebar |
| `hint` | string? | Hint pequeño junto al nombre (p.ej. `.ft-btn-nav`) |
| `kind` | `"interactive"` \| `"gallery"` \| `"docs"` \| `"page"` | `interactive` lleva args (Controls activos); `gallery` es catálogo fijo; `docs` salta a Overview; **`page`** = página completa hecha a mano (el iframe NAVEGA a `src`, sin markup ni controles) |
| `full` | boolean? | `true` = canvas en bloque (componente ocupa todo el ancho). Para layouts/organismos. Default `false` = flex-wrap arriba-izquierda |
| `render` | `(args) => string` (interactive) o `() => string` (gallery) | Función que devuelve HTML (no aplica a `page`) |
| `code` | `string \| (args) => string` | Markup canónico para el panel `Code`. Si no existe, el motor usa el DOM renderizado |
| `src` | string? | **Solo `kind:"page"`**: ruta del fichero relativa a `index.html` (p.ej. `templates/template-noticia.html`). El iframe carga su propio `<head>`/CSS/JS. |
| `brandable` | boolean? | **Solo `kind:"page"`**: `true` = página multimarca (templates) → **Brand/Cabecera** conmutan marca+outlet en vivo (réplica de `showroom-init`); `false`/ausente = página por-marca (layouts…) → Brand/Cabecera grisados. **Oscuro siempre operativo** (dark universal del DS) en ambas; Fondo inerte en toda página. |
| `argTypes` | array? | Si la story tiene controls propios (override del componente) |
| `args` | object? | Defaults propios de la story |
| `codeAlt` | `{ label?, code, note? }` | Segundo bloque opcional de código (`Code AMP`, etc.) |

### argType

```js
{ key, control, desc, options?, min?, max?, step? }
```

| `control` | Renderizado | Notas |
|-----------|-------------|-------|
| `"text"` | `<input type="text">` | Para slots y strings libres |
| `"select"` | `<select>` con opciones | `options: [[value, label], ...]` |
| `"radio"` | Botones agrupados | Mismas options. **Solo para enumeraciones finitas** (left/right, primary/secondary…). Para counts usar `"number"`. |
| `"boolean"` | Toggle switch | Para flags |
| `"number"` | `<input type="number">` | Para counts/contadores. `min`/`max`/`step` opcionales. El render debe hacer su propio clamp. |

### Helpers

`window.SB.helpers`:
- `esc(str)` — HTML-escape (uso obligatorio para todo lo que vaya a render)
- `spec(label, html)` — fila de spec con etiqueta lateral
- `block(titulo, html)` — bloque con encabezado para galerías
- `changeBlock(def)` — registro fechado y categorizado de un cambio relevante dentro de un Overview

### loadMarkup (markup HTML del front)

```js
window.SB.loadMarkup(def, document.currentScript && document.currentScript.src, { full?: true });
```

Carga `<x>.html` con bloques `<template data-story="Nombre">`, los publica como subgrupo
**Markup** (plegado). Async vía `fetch` — si falla, el resto del storybook sigue normal.

```html
<!-- <x>.html -->
<template data-story="Anchor base">
  <a href="#" class="ft-btn" title="title" target="_self">btn</a>
</template>
<template data-story="Primary">
  <button type="button" class="ft-btn ft-btn--primary ft-btn--md">Primary</button>
</template>
```

---

## Estilos experimentales (`<style>` en `<x>.html`)

El motor admite **dos patrones** de CSS experimental dentro de `<x>.html` para que un
diseñador o front pueda iterar modificadores sin tocar SCSS. Una vez validado, el CSS se
promueve al parcial canónico y el `<style>` se borra.

| Patrón | Dónde | Alcance | Cuándo usarlo |
|--------|-------|---------|---------------|
| **Por story** | `<style>` DENTRO de un `<template data-story>` | Solo esa story de Markup | Override puntual de una variante concreta |
| **Compartido del componente** | `<style>` a NIVEL DE ARCHIVO (fuera de cualquier `<template>`) | TODAS las stories del componente (incl. las interactivas del `.js`: Base, Nav…) | Probar un modificador nuevo (`.ft-btn--rounded`) en varias stories a la vez |

### Cómo se ve en `<x>.html`

```html
<!-- Estilos experimentales del componente (compartidos por TODAS las stories de Btn) -->
<style>
  .ft-btn--rounded { border-radius: 999px; }
  .ft-btn--shadow  { box-shadow: 0 2px 8px rgba(0,0,0,.2); }
</style>

<template data-story="Primary rounded">
  <button class="ft-btn ft-btn--primary ft-btn--md ft-btn--rounded">Primary rounded</button>
</template>

<template data-story="Primary shadow override">
  <!-- Style scoped a esta story: pisa al compartido solo aquí -->
  <style>
    .ft-btn--shadow { box-shadow: 0 0 12px magenta; }
  </style>
  <button class="ft-btn ft-btn--primary ft-btn--md ft-btn--shadow">Shadow override</button>
</template>
```

### Cómo funciona

- **Por story**: el `<style>` viaja dentro del `innerHTML` del `<template>` → al inyectar
  el markup en el canvas, el navegador del iframe lo parsea como CSS normal. Cero
  cambios en el motor.
- **Compartido**: en `loadMarkup`, el motor extrae los `<style>` top-level (fuera de
  `<template>`) y los guarda en `def._sharedStyle`. El renderer inyecta un
  `<style data-cb-shared>` como primer hijo del stage en **cada** story del componente.
  El snippet del panel **Code** lo excluye (no es markup canónico).

### Banner de aviso

Mientras `_sharedStyle` exista en un componente, el panel **Code** muestra un banner
ámbar avisando que hay CSS experimental sin promocionar. Se va automáticamente al
borrar el `<style>` del `.html`.

### Workflow de promoción

```
1. Editar <x>.html → añadir/modificar <style> y testear en vivo en el storybook.
2. Validar en múltiples stories + marcas + dark mode + viewports.
3. Copiar las reglas al SCSS canónico:
   - Modificador nuevo del componente:   scss/fourties/<nivel>/<x>/_<x>.scss
   - Variante específica de una marca:   scss/fourties/<nivel>/<x>/<x>-<marca>.scss
4. Recompilar con Prepros (auto al guardar).
5. Borrar el <style> del <x>.html → el banner desaparece.
```

> **Avisos**:
> - Sin promocionar al SCSS, los estilos viven SOLO en el storybook — los consumidores
>   del paquete `@design/42ds` no los reciben.
> - El `<style>` compartido aplica también a las stories interactivas del `.js`, no solo
>   a las de Markup — eso es lo que queremos para validar el modificador "en vivo" con
>   controls. Recordarlo cuando se borre.

---

## Convenciones

### Naming

- **`Base`** — la **pieza fundamental** del componente es la primera story plana y se
  llama SIEMPRE `Base` (con `hint` a la clase raíz, ej. `.ft-btn`). Es la story de
  aterrizaje.
- **Variantes planas** — cada familia/variante es una story plana **interactiva** con sus
  propios controls; cada eje/modificador del SCSS se expone como un operador.
- **Galerías** — los ejes discretos extensos (muchos iconos, redes, colores…) se enumeran
  en stories `gallery` dentro de un `subgroup` (típicamente `Galleries`).
- **Markup** — `subgroup` plegado con `collapsed: true`, ejemplos canónicos copiables.

### Dos superficies complementarias (no son redundantes)

| Superficie | Qué es | Para qué | Quién la mantiene |
|------------|--------|----------|-------------------|
| **Stories dinámicas** (`*.js`: Base, Nav…) | builders + `args` → render en vivo | Jugar con los controls y explorar la API (kind, size, icono…) | Quien sabe el formato de stories |
| **Markup** (`*.html`) | bloques `<template>` de HTML fijo | Catálogo de HTML copiable, fuente de verdad del markup | Cualquier front, en HTML plano |

Regla práctica: lo que necesite **manipularse en vivo** va en stories dinámicas; los
**ejemplos canónicos** que el front quiere mantener como HTML van en el `.html`. Una
variante nueva solo hace falta añadirla en la superficie donde aporte.

### Layout del canvas (`full?`)

Default = **flex-wrap arriba-izquierda**: átomos inline tilean con `gap`, nunca se esconde
la alineación interna.

`full: true` = canvas en bloque, componente ocupa todo el ancho. Para componentes de
**layout** (`.ft-mol-btnGroup` con su `justify-content`, organismos contenedores…). En
las stories de Markup se hereda con `SB.loadMarkup(def, src, { full: true })`.

### Overview (Docs)

Es **solo documentación técnica**: texto y tablas (anatomía, modificadores,
dependencias, fuente). **No incrusta el componente renderizado** — eso vive en stories
(Base, Nav…) y en el subgrupo Markup, para no duplicar superficies.

Patron editorial recomendado al inicio del `Overview`:

1. `h1` del item.
2. `cb-docs__lead` tecnico y corto: que es, clase raiz, contrato o dependencia principal.
3. un bloque breve mas coloquial de uso: para que sirve visual y funcionalmente, cuando reutilizarlo, con que suele combinarse.
4. avisos antes del desarrollo tecnico especifico: JS/runtime, branding, accesibilidad critica, `Deprecated`, `Removed` o limitaciones relevantes.
5. despues, secciones y tablas de detalle.

El renderer de Docs normaliza esa estructura en runtime cuando encuentra `h1` + `cb-docs__lead`:

- inserta un bloque breve de `Uso recomendado`
- intenta que ese bloque explique la pieza real, no solo su nivel atomico o su papel abstracto
- y adelanta los avisos fuertes (`warn`, `Deprecated`, `Removed`) para que queden antes del desarrollo tecnico denso

Cada Overview debe tener una sección **Dependencias** con `cb-deps`/`cb-table`
indicando qué necesita un proyecto consumidor para renderizar el componente
(`setting.css` primero, CSS compilado por nivel, parcial SCSS, JS si aplica).

No todas las tablas del Overview deben comunicar igual. Criterio recomendado:

- `cb-table`: dependencias, anatomia y relaciones simples
- `cb-table--dense`: inventarios cortos o metadata compacta
- `cb-table--matrix`: comparativas y ownership
- `cb-table--timeline`: trazabilidad cronologica o hitos de soporte

Si algo se depreca, debe aparecer en un bloque-alerta diferenciado y con fecha exacta,
no solo en una nota suelta. El objetivo es mantener traza documental de cambios
importantes dentro del propio Overview.

Si algo ha sido retirado de verdad y esa retirada afecta a la comprension del contrato
actual, debe documentarse con un bloque especifico de `Removed`, tambien con fecha exacta.
No sustituye al bloque `Deprecated`: se usa cuando la retirada ya es efectiva.

### Registro estándar de cambios en Overview

Los cambios relevantes que ayuden a entender la evolución o integración de un componente se
documentan bajo un único `<h2>Registro de cambios</h2>` mediante `changeBlock({...})`. Si hay
varios, se apilan del más reciente al más antiguo. No se escribe el HTML `.cb-change` a mano.

Campos mínimos: `type`, `date` (`YYYY-MM-DD`), `title` y `summary`. Campos opcionales:
`scope`, `impact`, `files[]` y `note`. Categorías admitidas: `added`, `changed`, `fixed`,
`accessibility`, `docs` y `breaking`.

```js
${changeBlock({
    type: "accessibility",
    date: "2026-08-11",
    title: "Área de cierre y foco",
    summary: "Descripción breve del cambio y su propósito.",
    scope: "Pieza o variantes afectadas.",
    impact: "Qué debe saber front, desarrollo o QA.",
    files: ["scss/fourties/atoms/tooltip/_tooltip.scss"]
})}
```

El bloque registra cambios a nivel de componente; no sustituye `SB_META.changes` (señal visual
NEW/UPD) ni `storybook/data/changelog-data.js` (historial de releases). No se usa para ajustes
internos triviales que no cambian consumo, comportamiento, accesibilidad o contrato documental.

En el Changelog, `DEPRECATED` y `REMOVE` no significan lo mismo:

- `DEPRECATED`: la pieza, selector o contrato sigue teniendo traza y requiere migracion o alternativa.
- `REMOVE`: la retirada ya se ha ejecutado de verdad y no debe presentarse como algo aun vigente.

---

## Reglas no-negociables (para la IA y para los humanos)

1. **Clases `.ft-*` REALES** — nunca inventar API. Si una clase no existe en el SCSS, no
   se usa. Cualquier story que ponga `.ft-btn--ultra-mega` falsifica el DS y se descarta.
2. **`overview` es DOCUMENTACIÓN** — no incrustar el componente vivo. Tablas y texto
   técnico solamente (anatomía, modificadores, dependencias).
3. **Una story = un estado** — sin estados equivalentes duplicados. Si dos stories
   renderizan visualmente igual, sobra una.
4. **`Base` siempre primero** — convención: la pieza fundamental (no "Default", no
   "Plain"; siempre **`Base`**).
5. **`group:` fija el sidebar** — la carpeta es solo ergonomía de código. Mantener
   consistencia: átomos en `Atoms`, moléculas en `Molecules`, organismos en `Organisms`.
6. **No tocar `scss/abstracts/`** ni hacer cambios MAJOR/MINOR de versión (CLAUDE.md
   raíz lo prohíbe explícitamente).
7. **El chrome `.cb-*` y el componente `.ft-*` no se mezclan** — el chrome tematiza con
   sus propios tokens (`--cb-bg`, `--cb-text-secondary`…) y el componente con los del DS
   (`--color-primary`, `--font-stack`…).
8. **Servidor obligatorio** para canvas + CSV + markup async; degradación grácil si no.

---

## Para migrar del showroom a esta arquitectura

El showroom está **DECOMISIONADO**: su código está archivado en `fourty/__old-showroom/` como
backup y no se referencia en runtime. El storybook es hoy la **única** documentación visual viva.

Al migrar, el origen es `fourty/__old-showroom/<nivel>/<nivel>-<x>.html` (solo como referencia de
markup). La **fuente de verdad** del contrato de un componente es siempre su SCSS:
`scss/fourties/<nivel>/<x>/_<x>.scss`.

**Receta general**:

1. Leer el SCSS canónico del componente (`scss/fourties/<nivel>/<x>/_<x>.scss`).
2. Listar los modificadores reales (`--primary`, `--md`, `--has-icon`…).
3. Crear `storybook/js/<nivel>/<x>/<x>.js` con un `DATA` que refleje esos modificadores
   1:1. Cero invención.
4. Argumentar cada eje del SCSS como un `argType`.
5. Una story **interactiva `Base`** + una story **`gallery`** por eje grande (iconos,
   redes…).
6. **Overview** con: descripción de 1 línea, tabla de modificadores, tabla de anatomía,
   tabla de dependencias.
7. (Opcional) `<x>.html` con ejemplos canónicos copiables que el front pueda editar sin
   tocar JS.
8. Dar de alta `storybook/js/<nivel>/<x>/<x>.js` en el array `PHASES` de
   `storybook/js/bootstrap-lazy.js` (fase del nivel, orden alfabético).
9. Actualizar `storybook/js/meta.js` (`SB_META.changes`: `"<id>": "new" | "updated"`) y, si procede,
   añadir la entrada de release en `storybook/data/changelog-data.js`.
10. Cargar el storybook y verificar visualmente todas las stories.

Ver la receta específica del nivel en sus respectivos READMEs:

- [`js/atoms/README.md`](js/atoms/README.md)
- [`js/molecules/README.md`](js/molecules/README.md)
- [`js/organisms/README.md`](js/organisms/README.md)
