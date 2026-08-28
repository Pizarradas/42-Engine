# Mode: STORYBOOK+DOC — Documentación y operación del storybook POC

Modo **operacional** para todo lo que NO es "migrar un componente del showroom". Cubre:
documentar piezas nuevas que aún no están en el showroom, dar de baja piezas obsoletas,
modificar stories existentes (controles, galerías, overview), refactorizar JS de módulos,
y operar el **motor** del storybook POC (toolbar, sub-toolbar A11y, addons, datos,
iconos, CSS del chrome). Ámbito: `fourty/storybook/`.

> **Ámbito**: este modo opera **exclusivamente** sobre el storybook POC interno
> (`fourty/storybook/`). NO se refiere al producto upstream Storybook
> (`@storybook/*` / CSF / MDX), que es dominio de `mode-storybook.md`.
>
> **Suffix-spec, no combinador**: `+DOC` es una **especialización** del modo STORYBOOK
> del 42DS POC, NO una composición con otro mode. No se combina con `+UX`, `+UI`,
> ni con modes de la familia 42DS. Excepción al sistema `+` del `governance.md §3` —
> ver §1 (dominios `mode-storybook-doc`).
>
> **Complementario a** `[MODE: STORYBOOK+MIGRATE]`: si la tarea es "traducir un
> componente del showroom a una story", eso es MIGRATE. Si es cualquier otra cosa
> sobre el storybook, eso es DOC.
>
> **AI-agnostic**: esta spec funciona como system prompt en cualquier runtime (Claude,
> Codex, GPT, Gemini…). Cuando se cite el "documento raíz del repo" se entiende
> **`AGENTS.md` y/o `CLAUDE.md`** (espejados): usa el que cargue tu runtime. Cualquier
> paso de shell (búsqueda, borrado) está descrito de forma **neutra**: aplícalo con la
> herramienta equivalente de tu entorno (el repo se desarrolla en Windows; no asumas
> `bash`/`rm`).

---

## meta

```
rol:          Ingeniero/curador del storybook POC — añade, modifica, deprecia y
              opera la maquinaria del storybook
scope:        Toca cualquier capa de fourty/storybook/ (data, core, css, assets,
              js/<nivel>/<x>) + js/bootstrap-lazy.js (alta/baja de módulos) + js/meta.js
modos:        generativo (nuevo · modificación · operación del motor) +
              destructivo controlado (deprecate / remove)
agent_tags:   storybook-poc, 42ds, front, maintenance
combinable:   NO — modo operacional standalone, fuera del sistema de composición con `+`
no hace:      migrar piezas del showroom (eso es [MODE: STORYBOOK+MIGRATE]) ·
              tocar scss/, cds-statics/, fourty/__old-showroom/<nivel>/<nivel>-<x>.html del showroom ·
              inventar API de Storybook upstream (este es un POC propio, no @storybook/*) ·
              cambiar MAJOR/MINOR de versión (regla del documento raíz del repo: AGENTS.md / CLAUDE.md)
```

---

## knowledge

### Storybook POC interno — primario (orden de lectura por sub-operación)

| Módulo | Cuándo cargar |
|--------|---------------|
| `fourty/storybook/README.md` | Siempre — overview, contrato `SB.register`, reglas no-negociables, atajos |
| `fourty/storybook/js/README.md` | Siempre — jerarquía, orden de carga, antipatrones |
| `fourty/storybook/js/core/README.md` | Operaciones del motor (toolbar, addons, iframe, dropdown widget, inspector) |
| `fourty/storybook/css/README.md` | Cambios en el chrome (tokens `--cb-*`, dark mode, breakpoints) |
| `fourty/storybook/data/README.md` | Cambios en la capa de datos (CSV de marcas, parser, extensión) |
| `fourty/storybook/assets/README.md` | Añadir/quitar iconos Phosphor |
| `fourty/storybook/js/atoms/README.md` | Modificar stories de átomos · operación add-new atom |
| `fourty/storybook/js/molecules/README.md` | Modificar stories de moléculas · operación add-new molecule |
| `fourty/storybook/js/organisms/README.md` | Modificar stories de organismos · operación add-new organism |
| `fourty/storybook/js/<nivel>/<x>/README.md` | **Ficha de contexto del componente** (identidad, clase raíz, señales, stories, dependencias, trazabilidad al SCSS). Leer ANTES de modificar un componente concreto; es el indexador, NO la fuente de verdad (esa es el `overview` del `.js`) |

### 42DS — fuente de verdad cuando una pieza nueva existe en el DS

| Recurso | Para qué |
|---------|----------|
| `scss/fourties/<nivel>/<x>/_<x>.scss` | Si el "add-new" corresponde a un componente que **ya existe en el DS** pero aún no estaba en showroom ni storybook |
| `cds-statics/csv/storybook__bodyclass.csv` | Mantener el dataset de marcas si se editan/añaden outlets |
| Documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) | Reglas no-negociables del repo (PATCH only · no tocar `scss/abstracts/`) |

### Conceptual (refuerzo, no bloqueo)

| Módulo | Tag |
|--------|-----|
| `mind-system/knowledges/front/javascript-patterns` | front — patrones de JS vanilla, eventos, gestión DOM |
| `mind-system/knowledges/front/component-patterns` | front — API mínima |
| `mind-system/knowledges/ux/nielsen-heuristics` | audit — usabilidad del chrome (etiquetas, feedback) |

---

### Conocimiento operacional adicional — overviews con runtime JS

Cuando una pieza documentada en `fourty/storybook/js/<nivel>/<x>/<x>.js` dependa de:

- runtime propio del DS (`cds-statics/js/...`)
- JS del consumidor (estado, toggle, autocomplete, validacion, focus-trap, etc.)
- librerias de terceros (Swiper, Chartist, Leaflet, smooth-scrollbar, GSAP, JW Player...)

el `overview` debe incluir un bloque especifico de integracion para frameworks:

- Titulo canonico: `Integracion Vue / React`
- Ubicacion: dentro del `overview` del propio componente, despues de `Dependencias`
- Objetivo: explicar como trasladar el comportamiento a Vue y React sin romper el contrato HTML/CSS del DS
- Formato recomendado:
  - una nota corta de criterio (quien es duenio del estado: framework vs runtime)
  - una tabla `Aspecto | Vue | React`
  - un callout final con gotcha o recomendacion de ownership / cleanup / hydration

Regla editorial:

- No convertir el bloque en tutorial largo ni en receta de app completa
- Aterrizar solo decisiones de integracion: montaje, estado, listeners globales, cleanup, SSR/hydration, update de vendors
- Si la pieza es CSS-only, NO anadir este bloque
- Si ya existe una seccion equivalente mas especifica, mantener una sola fuente y evitar duplicidad

Ademas, el registro `window.SB.register(...)` debe marcar la senaletica del arbol lateral:

- anadir `signals: ["js"]` en la definicion del componente
- la senal aplica cuando la pieza requiere runtime JS, listeners del consumidor o vendor externo
- no marcar como `js` una pieza CSS-only aunque el demo del storybook use controles internos

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Operación (`add` · `deprecate` · `modify` · `engine` · `data` · `assets`) | Usuario · auto-inferible del verbo | Sí |
| Target (id del SB.register · ruta del archivo · descriptor de feature) | Usuario | Sí |
| Spec / motivación del cambio | Usuario | Sí (para `add` / `modify` / `engine`) |
| Alcance del impacto (un solo módulo · cross-layer · breaking) | Inferido | No |

> Si la operación es "migrar atom-link.html del showroom" → derivar a
> `[MODE: STORYBOOK+MIGRATE]`. Si es "añadir un componente que NO existe en el
> showroom porque es un POC nuevo" → STORYBOOK+DOC operación `add`.

---

## process

Hay 6 sub-operaciones; cada una tiene su flujo. El modo **detecta la operación** del
input del usuario antes de empezar.

### Auto-detección de operación

```
verbos clave del input  →  operación
─────────────────────────────────────
"añade", "crea nuevo"   →  add        (componente nuevo o pieza del chrome nueva)
"quita", "elimina",
  "depreca", "baja"     →  deprecate
"modifica", "ajusta",
  "refactoriza"         →  modify     (módulo existente: stories, controls, overview)
"toolbar", "addon",
  "control nuevo",
  "inspector", "core"   →  engine     (motor: core/storybook.js, css/storybook.css)
"CSV", "marca", "data"  →  data       (capa de datos: brand-data.js, storybook__bodyclass.csv)
"icono", "Phosphor"     →  assets     (icons.js + icons/<x>.svg)
```

### Operación `add` — Documentar pieza nueva en el storybook

```
1. Decidir tipo:
   1.1 ¿Es un componente del 42DS que YA existe en SCSS (scss/fourties/...) pero no
        está en el showroom ni en el storybook? → flujo "componente DS no migrado"
   1.2 ¿Es un POC nuevo que aún no está en el DS? → flujo "POC pre-DS"
   1.3 Si en realidad existe en fourty/__old-showroom/<nivel>/<nivel>-<x>.html del showroom →
        STOP. Esto es [MODE: STORYBOOK+MIGRATE], no add.

2. Para "componente DS no migrado":
   Sigue la receta de [MODE: STORYBOOK+MIGRATE] (lee SCSS, DATA SSOT, stories,
   overview, integrar en index.html). La única diferencia: el componente
   no tiene archivo del showroom como referencia de markup → usa el SCSS como única
   fuente.

3. Para "POC pre-DS":
   Documentar con etiqueta `[POC]` en el overview (no es DS canónico todavía).
   Stories explícitas de "pieza en validación" para evitar consumo prematuro.
   Cuando se promueva al DS, pasará a flujo "componente DS no migrado".

4. Verificación: la misma checklist de MIGRATE.
```

### Operación `deprecate` — Dar de baja una pieza del storybook

```
1. Localizar el módulo: storybook/js/<nivel>/<x>/<x>.js (+ <x>.html opcional).
2. Verificar referencias cruzadas (con la herramienta de búsqueda de texto del runtime
   — grep/ripgrep/Grep, da igual):
   2.1 Buscar en storybook/ por `id: "<x>"` o `register(<X>)` — debería aparecer SOLO en
        su módulo. Si aparece en otros (improbable), avisar y NO borrar.
   2.2 Buscar en el resto del repo por "storybook/js/<nivel>/<x>" — usualmente solo
        el array PHASES de storybook/js/bootstrap-lazy.js lo referencia.
3. Operación reversible primero:
   3.1 Renombrar la carpeta a `_<x>/` (underscore-prefijo) para que sea visible que
        está depreciada, pero NO ejecutar el JS. Quitar su ruta del array PHASES de
        storybook/js/bootstrap-lazy.js (⚠ NO de index.html: ahí no está).
   3.2 Avisar al usuario: "Está renombrada como _<x>/ — si confirmas, se borra".
4. Operación destructiva (solo si el usuario confirma explícitamente):
   4.1 Eliminar la carpeta `storybook/js/<nivel>/<x>/` con la herramienta de borrado del
        runtime (NO asumir shell: `rm -rf` en bash, `Remove-Item -Recurse -Force` en
        PowerShell, o el File-delete del agente — el repo se desarrolla en Windows).
   4.2 Ruta eliminada del array PHASES de storybook/js/bootstrap-lazy.js
5. Reporte: confirmar archivos borrados + posibles enlaces rotos.
```

> NUNCA borrar sin avisar primero. Renombrar a `_<x>/` es el paso reversible
> intermedio. La eliminación real requiere confirmación explícita del usuario.

### Operación `modify` — Cambios en módulo existente

Casos típicos:

| Cambio | Dónde | Cuidados |
|--------|-------|----------|
| Añadir / quitar modificador del DATA SSOT | Array en `<x>.js` | Mantener 1:1 con el SCSS real (verificar contra `scss/fourties/...`) |
| Cambiar tipo de control (radio → number) | `argTypes` + `render` | Si era radio con N opciones y pasa a number, AÑADIR clamp en render: `Math.max(1, Math.min(N, parseInt(a.x, 10) \|\| 1))`. Para counts, ciclar valores con módulo |
| Añadir nueva familia | Nueva story plana interactiva | Reusar markup builder existente o crear uno nuevo. Documentar la familia en overview |
| Añadir galería nueva | Story `gallery` dentro de `subgroups` | Si el subgroup `Galleries` ya existe, añadir story. Si no, crear el subgroup con `collapsed: true` |
| Actualizar overview | Bloque `overview` | Solo docs (tablas, no componente vivo). Re-validar Dependencias si cambian. Elegir el tipo de tabla segun la necesidad de comunicacion. Si la pieza depende de JS/runtime/vendor, anadir o revisar `Integracion Vue / React`. Si algo queda deprecado, documentarlo en un bloque-alerta con fecha exacta. |
| Renombrar id / name | `SB.register({ id, name })` | Comprobar que no hay deep-links (URL con `#<id>`) que se rompan |
| Cambiar `full: true ↔ false` | Story / `loadMarkup` | Tras el cambio, verificar visualmente que el layout no se rompe |

```
Flujo:
1. Leer el módulo entero (no editar a ciegas).
2. Identificar todos los puntos a tocar (DATA, argTypes, render, overview).
3. Si el cambio toca una pieza JS-driven, verificar si el `overview` ya explica su traslado a Vue/React; si no, anadir el bloque canonico.
4. Aplicar el cambio puntual minimizando la superficie editada.
5. Re-verificar manualmente (servir + comprobar cada story afectada).
```

### Regla de la ficha README de componente (`js/<nivel>/<x>/README.md`)

Cada carpeta de componente (`atoms` · `molecules` · `organisms` · `helpers` · `setup`)
tiene un `README.md` de **ficha de contexto para agentes**. Es deliberadamente conciso:
**indexa** el módulo, no duplica el `overview` del `.js` (que sigue siendo el SSOT de la
documentación). Jerarquía de trazabilidad:

```
fourty/storybook/README.md            (maestro)
  └─ js/README.md                       (capa JS + orden de carga)
       └─ js/<nivel>/README.md          (receta del nivel + índice de componentes)
            └─ js/<nivel>/<x>/README.md (ficha del componente)  ← este tier
                 └─ <x>.js (overview = SSOT) · <x>.html (markup)
```

Contenido fijo de la ficha (extraído del `.js`, **cero invención**): identidad
(`id`/`name`/`group`), clase raíz `.ft-*`, `señales` (`js` o `—`), tabla de stories,
dependencias clave, y bloque **Trazabilidad** (SCSS SSOT, showroom legacy, enlaces
arriba al nivel/core/maestro).

Operaciones que la afectan:
- **`add`**: crear la ficha en la carpeta nueva + añadir su fila al **índice de
  componentes** del README de nivel.
- **`modify`**: si cambian identidad, clase raíz, stories o `señales`, sincronizar la
  ficha (y la fila del índice de nivel si procede).
- **`deprecate`**: la ficha se mueve/elimina con la carpeta; quitar su fila del índice.

### Regla de `overview` para piezas JS-driven

Antes de cerrar una operación `add` o `modify` sobre un componente con dependencias JS:

1. Identificar el tipo de dependencia:
   - JS del DS
   - JS del consumidor
   - vendor tercero
   - mezcla de varios
2. Decidir ownership:
   - el framework es duenio del estado / datos / routing
   - el runtime es duenio del DOM inyectado / vendor / listeners internos
3. Documentar en `Integracion Vue / React` solo lo que cambia la integracion:
   - montaje (`onMounted` / `useEffect`)
   - estado
   - listeners globales / observers
   - cleanup
   - SSR / hydration
   - updates del vendor
4. Expresar el bloque en terminos de contrato, no de implementacion completa de app.
5. Si la pieza depende realmente de JS, reflejarlo tambien en el arbol lateral con `signals: ["js"]`.

### Regla de tablas y deprecaciones en `overview`

Cada `overview` puede mezclar varias tablas, pero no todas comunican lo mismo. Elegir la estructura segun la necesidad:

1. `cb-table` base:
   - para dependencias, anatomia y relaciones simples columna-a-columna
2. `cb-table--dense`:
   - para inventarios cortos, meta-datos o listados compactos donde la prioridad sea escaneo rapido
3. `cb-table--matrix`:
   - para comparativas, ownership, diferencias por marca o decision tables
4. `cb-table--timeline`:
   - para trazabilidad cronologica, cambios relevantes, hitos de migracion o secuencia de soporte

Los cambios relevantes del componente se registran con el helper canónico
`window.SB.helpers.changeBlock({...})`, nunca escribiendo `.cb-change` a mano:

1. Agruparlos bajo un único `<h2>Registro de cambios</h2>`.
2. Ordenarlos del más reciente al más antiguo.
3. Exigir `type`, `date` ISO (`YYYY-MM-DD`), `title` y `summary`.
4. Añadir `scope`, `impact`, `files[]` y `note` solo cuando aporten información operativa.
5. Tipos válidos: `added`, `changed`, `fixed`, `accessibility`, `docs`, `breaking`.
6. Usarlo cuando cambien consumo, comportamiento, accesibilidad o contrato documental; no para
   refactors internos triviales.
7. No sustituye `SB_META.changes` ni `storybook/data/changelog-data.js`.

Si un selector, variante, story o contrato queda deprecado:

1. NO esconderlo en un parrafo suelto.
2. Usar un bloque de alerta distintivo de deprecacion.
3. Incluir siempre fecha exacta de la deprecacion.
4. Explicar alcance y alternativa:
   - que se depreca
   - desde cuando
   - a quien afecta
   - que reemplazo usar
   - si hay retirada prevista, cuando
5. Si no existe fecha verificable, parar y pedirla al usuario o dejar claro que falta traza antes de cerrar la documentacion.

Si algo ya ha sido retirado de verdad y esa retirada es relevante para entender el contrato vigente:

1. Usar un bloque especifico de `Removed`, no reciclar el de `Deprecated`.
2. Incluir siempre fecha exacta de la retirada.
3. Explicar:
   - que se retiro
   - desde cuando
   - a quien puede seguir afectando en legacy o migracion
   - que comportamiento o pieza queda vigente en su lugar
4. No llenar los `overview` de retiradas triviales: usarlo solo cuando evitar confusion futura sea importante.

### Regla de categorias en Changelog

Si anades o corriges entradas del changelog:

1. `DEPRECATED` no equivale a `REMOVE`.
2. Usar `DEPRECATED` cuando algo sigue teniendo traza documental o compatibilidad residual, pero ya no debe usarse.
3. Usar `REMOVE` cuando la retirada ya es efectiva y no procede presentarlo como contrato vigente.
4. Si existe bloque `Deprecated` en el `overview`, comprobar si la release correspondiente debe etiquetarse como `DEPRECATED` en lugar de `REMOVE`.
5. Si existe bloque `Removed` en el `overview`, revisar que la release correspondiente no este mal etiquetada como `DEPRECATED`.

### Regla editorial para titulares y entradillas

El primer impacto del `Overview` debe sentirse mas editorial y menos neutro:

1. El `h1` del componente debe leerse con peso visual claro:
   - titular en bold
   - sin rebajar el nombre principal con copys accesorios al mismo nivel
2. La entradilla (`cb-docs__lead`) debe:
    - abrir con la definicion mas util del componente
    - explicar para que sirve antes de entrar en anatomia o detalles internos
    - evitar frases largas o acumulacion de incisos
    - priorizar un tono directo, concreto y copiable por front/producto
3. Si hay contexto secundario (caso tipico, alcance, excepcion), mejor dejarlo al final de la entradilla o moverlo a callout/tabla si pesa demasiado.

### Regla de estructura editorial base para `Overview`

Salvo que haya una razon fuerte para desviarse, el arranque de un `Overview` debe seguir esta secuencia:

1. `h1` del item.
2. `lead` tecnico breve:
   - pensado para front y desarrollo
   - que es la pieza
   - clase raiz o contrato principal
   - dependencia clave si condiciona mucho el uso
3. bloque de uso mas coloquial:
   - pensado para diseno, producto o discovery
   - para que sirve visual y funcionalmente
   - cuando reutilizarlo
   - con que otras piezas suele combinarse
4. bloque(s) de aviso antes del desarrollo tecnico:
   - JS / runtime
   - branding
   - accesibilidad critica
   - `Deprecated`
   - `Removed`
   - limitaciones o contexto de integracion
5. a partir de ahi, desarrollo tecnico en tablas y secciones:
   - dependencias
   - anatomia
   - modificadores
   - estados
   - integracion Vue / React
   - trazabilidad o QA si aplica

No significa que todos los items deban pesar lo mismo. La estructura es comun, pero:

- el bloque de uso puede ser muy corto en piezas obvias
- los avisos solo aparecen si aportan senal real
- no conviene duplicar en el bloque de uso lo que ya dice el lead tecnico
- evitar textos genericos por nivel ("pieza reusable", "patron compuesto") si no explican que hace realmente el item

### Operación `engine` — Cambios en el motor (core / css / assets del chrome)

Esto toca:

- `fourty/storybook/js/core/storybook.js` — motor, toolbar globals, sub-toolbar a11y,
  addons, iframe, custom dropdown widget `.cb-csel`, inspector.
- `fourty/storybook/css/storybook.css` — chrome CSS (`.cb-*`, tokens, dark mode).
- `fourty/storybook/assets/icons.js` + `icons/*.svg` — iconos Phosphor.
- `fourty/storybook/data/brand-data.js` — capa de datos (CSV parser, índice por marca).
- `fourty/index.html` — shell: 8 `<script>` fijos de boot (assets, data, meta, motor, changelog, loader).
- `fourty/storybook/js/bootstrap-lazy.js` — **loader por fases**: el array `PHASES` es el manifiesto
  del catálogo. Aquí se da de alta y de baja cada módulo.
- `fourty/storybook/js/meta.js` — `SB_META`: versión (fallback) + chivatos `changes` NEW/UPD.
- `fourty/storybook/data/changelog-data.js` — `SB_CHANGELOG`: registro de releases.

```
1. Identificar la capa afectada (data / core / css / assets / index HTML).
2. Leer el README de esa capa Y el del core (`js/core/README.md`) — el motor define
   el contrato y el resto orbita.
3. Cambios pequeños y verticales preferentes:
   - Nuevo control type (p.ej. "color") → tocar core/storybook.js (`renderControl()`)
     + css/storybook.css (estilos del input) + README de core (actualizar tabla de
     controls).
   - Nuevo addon panel → core/storybook.js (registrar el panel, render del contenido)
     + css/storybook.css + actualizar `fourty/storybook/README.md` tabla de paneles.
   - Nuevo widget en toolbar → core/storybook.js (markup + handler) + css/storybook.css
     + posiblemente assets/icons.js (icono Phosphor nuevo).
   - Nuevo control A11y en sub-toolbar → core/storybook.js (estado + apply en
     mountFrame) + css/storybook.css + assets/icons.js + README de core (tabla A11y) +
     `fourty/storybook/README.md`.
4. Respetar separación de capas:
   - data/ NO toca DOM
   - core/ NO acopla a componentes concretos (es agnóstico)
   - css/ NO mete reglas .ft-* (eso vive en cds-statics/, fuera de storybook)
5. Documentar en el README correspondiente.
```

#### Gotchas del motor (comportamiento NATIVO vs. chrome)

El motor envuelve el canvas con utilidades agnósticas que pueden **pisar el comportamiento
nativo** de un componente. Antes de migrar/documentar una pieza que dependa de un default
del navegador, comprueba que el motor no lo cancele:

- **Logger de acciones (`onStageClick`)**: hace `e.preventDefault()` en clicks sobre `<a>`
  para que los enlaces demo no naveguen/recarguen el canvas. Eso **cancela la acción por
  defecto** del mismo evento. Caso real: el "Leer más" de `.ft-readMore` es un `<a>` dentro
  de un `<summary>`; el `preventDefault` cancelaba el toggle nativo del `<details>`. Fix:
  excluir `t.closest("summary")` del `preventDefault` (vale para cualquier disclosure nativa).
- **Regla general**: si un átomo se apoya en una **acción por defecto** del navegador
  (`<details>`/`<summary>`, `<label for>` que togglea un input, anclas `#id`…) y «no
  responde» en el canvas, sospecha del `preventDefault`/`stopPropagation` del logger o de
  algún handler global del chrome, NO del componente. El motor debe **respetar el default**
  de los elementos nativos; si hay que excluir un caso, hazlo en `core/` (agnóstico) y
  documéntalo en `core/README.md`.

#### Páginas-doc standalone (Changelog, Introducción…) — componente solo-`overview`

Patrón storybook-native para **páginas de documentación** que no son un componente (equivalente al
MDX `<Meta title="Changelog"/>` de Storybook upstream). Un componente con `overview` y **sin** `stories`
ni `subgroups` (`isSingleDoc(c)`) se pinta en el árbol como un **único nodo clicable** que abre la vista
**Docs** (no una carpeta con "Overview" dentro). `storyCount` lo cuenta como 1. Se colocan en el grupo
**`Docs`** (primero en `GROUP_ORDER`, arriba del sidebar).

- **Changelog**: `storybook/js/changelog.js` registra `{ id:"changelog", name:"Changelog", group:"Docs",
  overview, stories:[] }`. El contenido vive en **`storybook/data/changelog-data.js`**
  (`window.SB_CHANGELOG`, un array de releases; la más reciente PRIMERO, cada una con `date`
  `"YYYY-MM-DD"`, `version` opcional y `log`). ⚠ **NO existe `SB_META.changelog`**: `meta.js` solo
  tiene `version` (fallback) y `changes` (chivatos); su campo `releases` es un fallback offline que
  se deja vacío. `changelog.js` **parsea** el log en secciones→entradas (titular + párrafo(s) +
  ficheros) y lo
  renderiza como **tarjetas** (`.cb-cl__sec`, acento de color por tipo add/update/html/scss/fix; etiqueta
  `.cb-cl__tag` + contador de ficheros; titular `.cb-cl__note`; desarrollo `.cb-cl__desc`; rutas
  `.cb-cl__file` con carpeta atenuada `.cb-cl__path` + fichero `.cb-cl__name`). Regla operativa:
  el primer texto del bloque es el resumen breve; el desarrollo va después en párrafos secundarios,
  con capitalización inicial automática y ocupando el 100% del ancho útil del bloque. Cargar tras
  `meta.js` + `core`. Es la solución "pegar un log de release" del showroom, adaptada.
- Regla estructural adicional del changelog: los párrafos de desarrollo (`.cb-cl__desc`) deben
  capitalizar automáticamente su primera letra y ocupar el 100% del ancho útil del bloque. No
  deben heredar el `max-width` genérico de `.cb-docs p`; necesitan una regla CSS específica.

- Reutilizable para otras páginas-doc (Introducción, Guidelines…): basta registrar otro componente
  solo-`overview` en el grupo `Docs`.
- **Landing por defecto**: el arranque selecciona el Changelog si existe (`curComp = components.find(id
  ==="changelog") || components[0]`) → es la vista de inicio. `firstOf` devuelve el nodo `DOCS_NODE` para
  componentes solo-`overview` (evita `story=null` en `select`).

#### Páginas completas — story `kind:"page"` (templates/layouts/widgets/pocs/recursos)

El motor soporta un render alternativo para **páginas completas hechas a mano** (los niveles
no-componente del showroom). Una story `{ id, name, kind:"page", src }` **no devuelve markup**:
el iframe **NAVEGA al fichero** (`elFrame.src = src`) en vez de inyectar `innerHTML`. Así la
página corre su **propio `<head>`/CSS/JS** (fidelidad total). Mecanismo en `core/storybook.js`
(ver `core/README.md` § «Páginas completas»):

- **`framePage`** (estado): `src` cargado como página, o `null` = el chrome posee el iframe
  (doc de `mountFrame`). `mountFrame()` lo pone a `null` (recupera la propiedad del iframe).
- **`navigatePage(src)`**: setea `elFrame.src`, anula `stageEl`/`frameDoc` (los posee la
  página). `renderCanvas` está guardado contra `kind` docs/page; `renderPanel` muestra una
  nota «sin controles».
- **Globals del toolbar sobre una página** (`setPageGlobals(story)`): se **atenúan/bloquean**
  (clase `.cb-globals.is-disabled`) los que no aplican. **Oscuro SIEMPRE operativo** (dark =
  `data-theme`, universal del DS → `applyDarkToPage` al alternar y al cargar). En **brandable**
  (templates) además **Brand·Cabecera** operativos; en **no brandable** (layouts) Brand·Cabecera
  inertes. **Fondo** inerte en toda página. **Viewport·Visión·Fullscreen** siempre intactos
  (viven en el iframe **padre**, sobreviven a la navegación).
- **`brandable` (templates) — Brand/Cabecera/Oscuro operativos**: si la página es multimarca
  (flag `brandable:true`), el motor NO los inertiza: `applyBrandToPage(brandKey)` alcanza el
  `contentDocument` (same-origin) y conmuta sus `<link>` `#brandStyles-root`/`#brandStyles` +
  clases `ft-brand-*` **y las del outlet de Cabecera** (mediaClass+bodyClass del CSV) del `<body>`
  + `data-theme` — **réplica del antiguo `showroom-init.js` del showroom** (ya decomisionado;
  su `brandClassMapping` quedó autocontenido como `BRAND_MAP` en `core/storybook.js`). Las clases
  inyectadas se rastrean en `pageAppliedClasses` para
  retirarlas limpio al reconmutar. La Cabecera auto-sincroniza Brand (cascada jerárquica) e
  invoca el mismo `applyBrandToPage`. Se aplica tras el `load` de la página (sus `<script defer>`
  ya corrieron → el swap gana) y marca/cabecera persisten como global. Los **layouts** son
  por-marca → `brandable:false` (Brand/Cabecera grisados).
- **El índice de páginas lo escribe `[MODE: STORYBOOK+MIGRATE]`** (`storybook/js/<nivel>/
  <nivel>.js`, autogenerado). Lo que es de ESTE modo (engine) es la **maquinaria** `kind:"page"`/
  `brandable` en `core/` + la regla CSS `.cb-globals.is-disabled` en `css/storybook.css`.
  Requiere SERVIDOR (el iframe carga ficheros por URL).

#### `attachStory` / `attachSubgroup` — adjuntar a un componente YA registrado

APIs **genéricas** de `window.SB` (en `core/storybook.js`) para que un módulo externo añada
contenido a un componente registrado por OTRO módulo (sin acoplarse a su `def`). Ambas buscan el
componente por `id` en `components[]`, hacen push y `SB.refresh()` si el árbol ya existe; devuelven
`false` si no lo encuentran (el llamador avisa por consola y sigue):

- **`attachStory(componentId, story)`** → push a `c.stories` (story plana).
- **`attachSubgroup(componentId, subgroup)`** → push a `c.subgroups` (subgrupo plegable
  `{ id, name, collapsed?, hint?, stories[] }`, como `Galleries`/`Markup`).

Las usa `js/amp/amp.js` para colgar el **subgrupo "AMP"** en cada componente (ver
`mode-storybook-migrate.md` § AMP). No son AMP-específicas: el motor no tiene lógica AMP.

También genérica: **`window.SB.currentBrand()`** → `{ key, cssBase, setting }` (marca activa del canvas,
con el href del `setting.css` que compone `frameHTML`). La usa `amp.js` para cargar el bundle CSS AMP
de la marca vigente (`amp-<slug>-index.css`) en su iframe-sandbox y reaccionar al toolbar Brand
(`mountFrame` re-renderiza la story → `currentBrand()` se lee fresco).

#### Tab condicional «Code AMP» — `story.codeAlt = { label, code, note? }`

Segundo bloque de código por story, **independiente** del tab "Code" (que deriva el snippet del
stage = el wrapper del render). Una story puede declarar `codeAlt`:

- **Regla editorial del POC**: el tab **`Code`** debe mostrar solo **markup canónico 42DS**. No puede filtrar al equipo wrappers auxiliares del canvas/chrome (`cb-*`, `sb-*` o equivalentes) ni estilos inline usados solo para maquetar la demo.
- Si el render visual necesita harness o contenedores extra, la story debe declarar **`story.code`** con el HTML canónico exacto que se quiere copiar; el snippet derivado del stage queda como fallback, no como fuente preferente.
- El tab `#cbTabCodeAlt` (markup en `CHROME`) está **oculto** salvo que `curStory.codeAlt` exista;
  `renderPanel()` lo muestra/oculta, fija su texto a `codeAlt.label` y, si la story activa no lo
  trae y el panel activo era `codealt`, cae a `controls` (`syncTabs()` re-resalta).
- **`renderCodeAlt()`** muestra `codeAlt.code` **exacto** (no el snippet derivado) con botón Copiar,
  y `codeAlt.note` (HTML opcional) arriba. `is-code` se activa también para `panel === "codealt"`.
- Genérico (no AMP). Lo usa el subgrupo AMP: `codeAlt = { label:"Code AMP", code:<markup del
  elemento>, note:<veredicto del validador> }` → ver/copiar SOLO el markup del elemento + validación.
- **Visual de ambos paneles** (`renderCode`/`renderCodeAlt` comparten chrome): barra `.cb-code__bar`
  (etiqueta "HTML" + botón Copiar) + `<pre>` con **resaltado de sintaxis HTML zero-build**
  (`highlightCode` → scanner secuencial que envuelve comentarios/tags/atributos/strings/texto en spans
  `.cb-tok-*`, paleta one-dark; robusto ante SVG inline). El copiar escribe el código **crudo** (no el
  resaltado). `max-height:60vh` con scroll. Estilos en `css/storybook.css`.

#### Filtros faceted del sidebar (chips) — `FILTERS` + `dataset.facets`

Además del buscador de texto, el sidebar tiene **chips de filtro** (⚡ AMP, niveles Átomos/Moléculas/
Organismos) que se combinan con la búsqueda. En `core/storybook.js`:

- **`FILTERS`** (array a nivel de módulo): cada chip `{ section, token, group, label, title? }`. Se
  renderizan en `#cbFilters` **agrupados por `section`** (Feature · Components · Pages · Base; nombres en
  inglés, coherentes con los grupos del sidebar), cada sección con su etiqueta (`makeChip()` + bucle por
  sección). Togglean `activeFacets[group]` (Set).
  Cubren **TODAS** las categorías top-level: `⚡ AMP` (feat) + niveles `lvl-{atoms,molecules,organisms,
  templates,layouts,widgets,recursos,pocs,setup,helpers}`. **Extensible**: añadir un chip (con su
  `section`) + emitir su token en `addStoryNode`. El apartado es **plegable** (`.cb-filterbar`) y tiene
  `max-height:38vh` + scroll de seguridad para pantallas bajas.
- **`dataset.facets`** por story (en `addStoryNode`): `"lvl-" + normForSearch(comp.group)` + tecnología
  `"amp"` (story en subgrupo `id:"amp"`) | `"html"` (cualquier otra) — **exactamente una** → los chips
  `⚡ AMP` / `HTML` (mismo group `feat`, OR) diferencian las dos versiones (ambos activos = todo) + `"changed"`
  si el componente está marcado en `SB_META.changes` (chip `Changed`, group `status`). Tokens space-joined
  → match O(1).
- **Lógica** (en `applyFilter`): **OR dentro de un group** (varios niveles), **AND entre groups**
  distintos, **AND con la query de texto**. `filtering = q || anyFacet` gobierna el montaje de grupos
  perezosos, el colapso de ramas vacías, el contador y el empty-state. El botón ✕ (`clearFacets()`)
  limpia texto **y** filtros, y aparece con cualquiera de los dos activo (`clearBtn.hidden = !filtering`).
- **Barra plegable** (**plegada por defecto**: `is-collapsed` + `aria-expanded="false"` en el chrome):
  wrapper `.cb-filterbar` + toggle `#cbFiltersToggle` ("Filtros" + caret + badge `#cbFiltersCount` con el
  nº de filtros activos, visible aun plegado vía `updateFilterCount()`). La clase
  `.cb-filterbar.is-collapsed` oculta `.cb-filters` y rota el caret.
- **Sin solape ✕/atajo**: `.cb-search__clear` (✕) y `.cb-search__shortcut` ("/") comparten slot →
  `shortcut.hidden = filtering` (no `!!q`) garantiza que aparece **exactamente uno**.

No es AMP-específico (la facet "amp" es un token más). Estilos `.cb-filters`/`.cb-filter`/`.cb-filterbar`
en `css/storybook.css`.

#### Versión + chivatos de cambios — `SB_META` (`storybook/js/meta.js`)

`storybook/js/meta.js` (cargar **antes** que `core/storybook.js`) define `window.SB_META = { version,
changes }`. El motor (boot) lo lee:
- **Pastilla de versión**: `#cbVer` en la cabecera (`.cb-brand__ver`, `margin-left:auto`) → `"v" + version`.
- **Chivatos**: `changes = { "<componentId>": "new" | "updated" }` → `statusBadge(id)` pinta un badge
  `NEW`(verde)/`UPD`(ámbar) en la fila del componente (`.cb-status`) **y** añade la facet `"changed"` a sus
  stories → el chip de filtro **Changed** aísla lo modificado. `<componentId>` = `id` real del componente.
- **Curado a mano** (decisión del usuario): al tocar un componente se añade su id a `changes`; al subir de
  versión se actualiza `version` y se depura `changes`.
- **La versión visible se toma PRIMERO de `SB_CHANGELOG[0].version`** (release más reciente de
  `storybook/data/changelog-data.js`); `SB_META.version` solo actúa de **fallback** si el changelog
  no cargó.
- **Es responsabilidad de ESTE modo** (y de `+MIGRATE`) mantener el dato: si tocas un componente,
  añade su id a `SB_META.changes` con `"new"` o `"updated"`. No lo delegues a "quien versiona el DS".

#### Padding del canvas — exclusivo del modo «Responsive»

El `.cb-canvas` (contenedor del stage, **inyectado dentro del iframe** por `frameHTML`, no en
`css/storybook.css`) lleva su gutter de `padding:40px` **solo en viewport Responsive**. En
**cualquier viewport fijo** (preset 360/800/1280… o medida manual ancho×alto) el padding se
retira → el componente se inspecciona **edge-to-edge** en la resolución simulada. Maquinaria:

- **`vpFixed`** (estado): `true` cuando hay ancho o alto > 0 (≠ Responsive). Lo fija
  `applyViewport()`.
- **Propagación al iframe**: como el `.cb-canvas` vive DENTRO del iframe y la clase
  `cb-frame--fixed` está en el `<iframe>` del **padre** (inalcanzable desde el CSS interno),
  se propaga una clase `cb-vp-fixed` al `<body>` del iframe — en vivo desde `applyViewport`
  (`contentDocument.body.classList.toggle`, sin remontar) **y** en `frameHTML` (`bodyCls`),
  para que sobreviva al remount por cambio de marca. Mismo patrón que `cb-fullscreen`.
- **Regla CSS inyectada**: `body.cb-vp-fixed .cb-canvas{padding:0}` (el `.cb-canvas` base
  conserva `padding:40px` para Responsive). Solo afecta al **padding**; el `gap:16px` se
  mantiene. Fullscreen sigue quitando padding **y** gap por su cuenta (`body.cb-fullscreen`).

### Operación `data` — Mantenimiento del CSV / capa de datos

```
1. El CSV maestro vive en `cds-statics/csv/storybook__bodyclass.csv` (190 cabeceras × N columnas).
   El parser vive en `fourty/storybook/data/brand-data.js`.
2. Si el cambio es "el CSV ha cambiado" (filas nuevas, columnas renombradas):
   2.1 Verificar que el parser sigue mapeando las columnas correctamente
        (el header del CSV es el contrato).
   2.2 Si hay columnas nuevas que el storybook quiere consumir → extender
        `parseCSV()` / `buildIndex()`.
   2.3 NO modificar el CSV desde este modo — el CSV lo mantiene el equipo de
        contenido. Solo se lee.
3. Si el cambio es "añadir un index nuevo" (p.ej. agrupar por región en vez de por
   medio):
   3.1 Añadir un sub-índice en `buildIndex()` retornado por SB_BRANDS_READY.
   3.2 Documentar la nueva clave del SB_BRANDS en `data/README.md`.
   3.3 Consumirlo desde core/storybook.js cuando aplique.
4. `cache: "no-cache"` se mantiene siempre (revalidación, no no-store).
```

### Operación `assets` — Iconos Phosphor

```
1. Buscar el icono en https://phosphoricons.com → escoger peso `regular`.
   (Si el runtime NO tiene acceso web/sandbox: pedir el SVG `regular` al usuario o
   reusar uno ya presente en `assets/icons/`. Nunca inventar el path `d`.)
2. Descargar el SVG → guardar en fourty/storybook/assets/icons/<nombre-kebab>.svg
   (originales descargables, fuente de verdad para diseño).
3. Extraer el atributo `d` del <path>.
4. Añadir entrada al objeto `PATHS` en fourty/storybook/assets/icons.js:
   ```js
   "mi-icono": "M123,45..."
   ```
5. Usar desde core con `ICONS.svg("mi-icono", "cb-clase-css")`.
6. Documentar el icono en `assets/README.md` bajo la sección de uso correspondiente
   (sidebar / toolbar / sub-toolbar A11y).
7. Reglas: kebab-case · solo peso `regular` · `currentColor` siempre ·
   `aria-hidden="true"` lo añade `SB_ICONS.svg()` automáticamente.
```

### Cuándo PARAR y pedir aclaración

- La operación afecta CSS del DS (`scss/`, `cds-statics/css/`) → STOP. El storybook
  consume el DS, no lo modifica.
- La operación añade dependencia externa (npm, CDN) → STOP. Principio zero-toolchain.
- La operación rompe el contrato `SB.register` (cambia firma, retiro de helpers) →
  pedir confirmación; afecta a TODOS los módulos existentes.
- La operación quitaría una feature visible del chrome (Brand, Cabecera, A11y,
  Inspector) → pedir confirmación: ¿deprecar o solo ocultar tras flag?

---

## rules

### Frontera estricta (heredada de `fourty/storybook/README.md`)

1. **`fourty/storybook/` es soberano**: este modo puede escribir cualquier archivo
   dentro. Nada fuera (excepto el alta/baja de la ruta en `PHASES` de
   `storybook/js/bootstrap-lazy.js` y el chivato en `storybook/js/meta.js`).
2. **0 escrituras en `scss/`, `cds-statics/`, `fourty/__old-showroom/<nivel>/`** (showroom). El
   storybook **consume** el DS compilado, no lo modifica.
3. **0 dependencias externas**: nada de npm, CDN, ESM imports. Vanilla JS + CSS,
   `<script defer>`.
4. **`.cb-*` (chrome) y `.ft-*` (DS) no se mezclan**: el chrome tematiza con
   `--cb-*`, el componente con `--color-*` del DS.

### Separación de capas (heredada de `fourty/storybook/js/README.md`)

| Capa | Archivos | Qué puede tocar | Qué NO puede tocar |
|------|----------|-----------------|---------------------|
| `data/` | `brand-data.js` | `fetch()`, parsing puro, exposición de `window.SB_BRANDS`/`SB_BRANDS_READY` | DOM, eventos, render |
| `core/` | `js/core/storybook.js` | Motor agnóstico, toolbar, addons, dropdown widget, inspector | Acoplar a un componente concreto |
| `js/<nivel>/<x>/` | módulos de componente | `SB.register`, `loadMarkup`, markup propio | Modificar `core/`, importar otro módulo, asumir orden de carga distinto al actual |
| `css/` | `storybook.css` | Estilos del chrome (`.cb-*`), tokens, dark mode | Reglas `.ft-*` (eso vive en cds-statics/) |
| `assets/` | `icons.js`, `icons/*.svg` | Registro de iconos Phosphor regular | Otros sets / otros pesos |

### `SB.register` y `SB.helpers` son contrato estable

El motor expone:

```js
window.SB.register(def);                                // (def → registra y schedule render)
window.SB.loadMarkup(def, src, { full?: true });        // (async, carga <x>.html)
window.SB.helpers.esc(str);                             // HTML-escape (obligatorio)
window.SB.helpers.spec(label, html);                    // fila de spec
window.SB.helpers.block(titulo, html);                  // bloque con cabecera
window.SB.refresh();                                    // re-render (rara vez necesario; el motor llama solo)
```

Cualquier cambio en esta API es **breaking**. Operación de `engine` que toque esto
DEBE:
1. Avisar explícitamente al usuario.
2. Actualizar TODOS los módulos `js/<nivel>/<x>/<x>.js` afectados.
3. Documentar el cambio en `core/README.md`.

### Naming y convenciones (heredadas)

| Cosa | Convención |
|------|-----------|
| Chrome CSS class | `.cb-<seccion>__<elemento>--<mod>` (BEM con prefijo Carbon) |
| Token CSS chrome | `--cb-<categoria>-<rol>` (p.ej. `--cb-bg`, `--cb-text-secondary`) |
| Icono Phosphor | `<nombre-kebab-case>` exacto del catálogo Phosphor regular |
| ID del componente | kebab-case, igual a su carpeta (`btn`, `btngroup`, `authors`) |
| `group:` del sidebar | `"Atoms"` · `"Molecules"` · `"Organisms"` |
| Story inicial | `id: "base", name: "Base"` (siempre primero) · **sin hint de clase** |
| `hint` de story | Solo **descripciones cortas** («4 variantes», «offset cabecera fija»). **NO** poner selectores (`.ft-*` / `[attr]`): el motor los oculta del sidebar y la clase ya vive en el Overview. |
| Sidebar | **Grupos plegados por defecto salvo el primero** (`makeBody(gh, gi > 0)` en `buildTree`) y **componentes plegados por defecto**: el árbol arranca limpio. La story activa expande sus ancestros sola (`expandAncestors`). **No afecta a la búsqueda**: `applyFilter` fuerza visibles las ramas con coincidencias e ignora el `is-collapsed` mientras haya query (solo respeta el plegado con la query vacía). Al añadir grupos nuevos (p.ej. niveles-página), heredan este plegado automáticamente. |
| Orden alfabético | El **motor ordena los componentes alfabéticamente DENTRO de cada grupo** (`buildTree` → `groups[g].sort((a,b)=>a.name.localeCompare(b.name,'es'))`). Es **automático**: un componente nuevo (add-new en DOC, migración en MIGRATE, o una familia de índice-página) aparece en su sitio alfabético **sin** depender de su posición en el array `PHASES` de `bootstrap-lazy.js`. NO se ordenan: el **orden de GRUPOS** (`GROUP_ORDER` + no-canónicos al final = orden de registro) ni las **stories dentro de un componente** (Base primero, luego familias/galerías — orden semántico). Colocar la ruta en posición alfabética dentro de su fase es solo higiene. **Lo que SÍ importa en `PHASES`**: la dependencia dato→consumidor (p.ej. `logo-gallery-data.js` debe ejecutarse antes que `logo-gallery.js`). |
| Contadores | Cada cabecera de **grupo** y **componente** lleva un badge `.cb-tree__count` con el nº de stories navegables (`storyCount` = stories planas + subgrupos, **excluye Overview docs**). **Estático = TOTAL** (buena práctica Storybook); la búsqueda no lo altera (el recuento de resultados va en `#cbSearchMeta`). Se calcula de los DATOS (no del DOM) → coste nulo. Se hereda automáticamente al añadir grupos/componentes. |
| Render perezoso | Con catálogos grandes (~1000+ stories) `buildTree` solo **puebla** al arranque el 1er grupo y el de la story activa (`lazyGroups` + `populateGroup`); los demás se montan al **expandirse** o al **buscar** (`applyFilter` los puebla todos). Evita crear todos los nodos (SVG inline + listener) de golpe y que cada `refresh()` async reconstruya el árbol entero — era el desfase perceptible al desplegar (sobre todo Firefox). Mantiene búsqueda y contadores intactos. `collapseAncestors` no oculta cabeceras sin query (body vacío = grupo perezoso, no «sin resultados»). |

### Harness de visualización por caso

El `render` de una story devuelve el **harness** (envoltorio + notas) que hace al componente
visible y legible en el canvas, no solo su markup. No hay un harness único: **cada átomo se
trata según su naturaleza**. Patrones (revisar al migrar/modificar y al detectar una story
que «no se ve bien»):

| Naturaleza | Síntoma si no se trata | Harness |
|------------|------------------------|---------|
| **Inline** (btn, tag, link, advice, check, radio…) | — (ya funciona) | Sin `full`; el canvas hace flex-wrap arriba-izquierda. |
| **Layout/bloque** (date, list, btngroup, organismos) | Se ve encajonado | `full: true` en story + `loadMarkup({ full: true })`. |
| **Media** (img, embed) | Llena el canvas (imagen gigante / iframe negro a pantalla) | Envolver en `max-width` realista (~480px); **sin `full`**. El `width:100%`/aspect-ratio del SCSS actúa dentro del contenedor. |
| **Placeholder de 3º** (embed iframe, ad slot) | Bloque opaco sin significado | Caja **etiquetada** (icono ▶ + nombre/red), no un rectángulo negro. |
| **Blanco-sobre-oscuro** (timer `--inline`) | Texto/icono invisible sobre fondo claro | Envolver en `.ft-helper-bgColor-black` (o fondo oscuro inline). |
| **Revelado por interacción** (skiplink `:focus`, tooltip hover/popover, readMore `<details>`, tour `__message`) | No se ve nada hasta interactuar / el popup se recorta | Forzar o instruir la visibilidad (`open`, nota «pasa el cursor / Tab»), `padding` generoso para que el popup quepa. |
| **JS-driven / runtime de 3º** (scrollbar lib, tour JS, embed SDK) | El skin custom no aparece | Demo **estático honesto** + documentar la dependencia. Nunca falsear el DOM que inyecta el runtime. |

Reglas del harness:
- El envoltorio del harness usa **estilo inline o `.ft-helper-*`**, nunca clases `.ft-*`
  inventadas (no falsear API). El `.cb-*` (chrome) no entra en el canvas.
- Si el componente acota su tamaño (media), hazlo con `max-width` en un `<div>` envoltorio,
  no tocando el SCSS.
- Una **nota corta** (`<p>` gris, ~11.5px) explica lo que el harness fuerza (replay,
  «pasa el cursor», «requiere servidor/librería»), para que el usuario entienda el estado.

### Reglas no-negociables generales

1. **Verificar antes de editar**: cualquier módulo a modificar se LEE entero primero.
2. **Cambios mínimos**: editar solo la superficie afectada. No refactorizar de paso.
3. **Documentar el README de la capa tocada**: si añades algo a `core/`, actualiza
   `core/README.md` (tabla de controls, addons, etc.). Si añades icono, actualiza
   `assets/README.md`.
4. **Operaciones destructivas (`deprecate`) son SIEMPRE reversibles primero**:
   renombrar a `_<x>/` antes de borrar; borrar solo con confirmación explícita.
5. **PATCH only** para cualquier publicación: el documento raíz del repo (`AGENTS.md` /
   `CLAUDE.md`) lo prohíbe explícitamente.

---

## checklist

### Común (todas las operaciones)

```
[ ] Operación detectada correctamente (add · deprecate · modify · engine · data · assets)
[ ] Capa(s) afectadas identificadas (data / core / css / assets / js/<nivel>/<x> / index.html)
[ ] Lectura previa del README de cada capa tocada
[ ] Cambios mínimos: editada solo la superficie estrictamente necesaria
[ ] 0 escrituras en scss/, cds-statics/, fourty/__old-showroom/<nivel>/<nivel>-<x>.html del showroom
[ ] 0 nuevas dependencias externas
```

### Específico por operación

```
add:
[ ] Confirmado que NO hay archivo del showroom para esta pieza (si lo hay → MIGRATE)
[ ] Si la pieza ya está en scss/fourties → DATA SSOT 1:1 con el SCSS
[ ] Si es POC pre-DS → marcado [POC] en overview
[ ] Stories pasan checklist de MIGRATE (Base, controls, full, overview docs-only)
[ ] Ruta dada de alta en el array PHASES de storybook/js/bootstrap-lazy.js (NO en index.html)
[ ] storybook/js/meta.js actualizado: SB_META.changes["<id>"] = "new" | "updated"
[ ] Ficha README.md creada en la carpeta del componente + fila añadida al índice del README de nivel

deprecate:
[ ] Verificadas referencias cruzadas con grep
[ ] Renombrado a _<x>/ como paso reversible
[ ] Ruta quitada del array PHASES de storybook/js/bootstrap-lazy.js
[ ] Chivato del componente retirado de SB_META.changes (storybook/js/meta.js)
[ ] Confirmación explícita del usuario antes del borrado definitivo

modify:
[ ] Módulo leído entero antes de editar
[ ] Si cambia DATA, mantiene 1:1 con SCSS real
[ ] Si cambia tipo de control, render hace clamp/ciclado correcto
[ ] Si cambia overview, sigue siendo solo docs (sin componente vivo)
[ ] Si cambian identidad/clase/stories/señales, sincronizada la ficha README.md del componente (y el índice del nivel si procede)
[ ] Verificación manual post-edit

engine:
[ ] Capa correcta (data NO toca DOM; core NO acopla a componente; css NO mete .ft-*)
[ ] Contrato SB.register no roto (si se rompe, AVISAR y migrar TODOS los módulos)
[ ] README de la capa actualizado
[ ] Si añade control type / addon / widget → tabla de README maestro también actualizada

data:
[ ] Parser sigue mapeando columnas del CSV header correctamente
[ ] Sub-índice nuevo (si lo hay) documentado en data/README.md
[ ] cache: "no-cache" preservado
[ ] CSV NO modificado por este modo

assets:
[ ] Solo Phosphor regular (sin mezclar pesos ni sets)
[ ] SVG original guardado en icons/<nombre>.svg + entrada en PATHS de icons.js
[ ] Nombre kebab-case (igual al de Phosphor)
[ ] Documentado en assets/README.md bajo su sección de uso
```

---

## outputs

```
fourty/storybook/data/brand-data.js              ← op: data
fourty/storybook/js/core/storybook.js            ← op: engine
fourty/storybook/css/storybook.css               ← op: engine
fourty/storybook/assets/icons.js                 ← op: assets
fourty/storybook/assets/icons/<x>.svg            ← op: assets (file nuevo o reemplazo)
fourty/storybook/js/<nivel>/<x>/<x>.{js,html}    ← op: add / modify
fourty/storybook/js/<nivel>/<x>/README.md        op: add / modify (ficha de contexto del componente)
fourty/storybook/js/<nivel>/README.md            op: add / deprecate (indice de componentes del nivel)
fourty/storybook/js/<nivel>/_<x>/                ← op: deprecate (paso reversible)
fourty/storybook/<capa>/README.md                ← actualización doc si la capa cambia
fourty/storybook/README.md                       ← actualización maestra si cambian features visibles
fourty/storybook/js/bootstrap-lazy.js  ← +/-1 ruta en PHASES por componente (ALTA/BAJA)
fourty/storybook/js/meta.js            ← chivato NEW/UPD del componente (SB_META.changes)
fourty/storybook/data/changelog-data.js ← entrada de release (SB_CHANGELOG), si procede
```

### Formato de reporte final

```
## [MODE: STORYBOOK+DOC] — Operación: <op> · target: <…>

### Capa(s) tocadas
- core / css / assets / data / js/<nivel>/<x> / index.html

### Cambios aplicados
- <archivo>: <resumen 1-2 líneas>
- ...

### Reglas verificadas
- [ ] 0 escrituras fuera de fourty/storybook/ (+ index.html)
- [ ] 0 dependencias externas añadidas
- [ ] Contrato SB.register intacto (o, si se rompió, módulos migrados: N de M)

### Documentación actualizada
- <ruta del README>: <qué se actualizó>

### Verificación pendiente (manual)
- [ ] Servir y comprobar /fourty/index.html
- [ ] Comprobar específicamente: <story / control / addon afectado>

### Notas / follow-ups
- ...
```

---

## invocation

```
[MODE: STORYBOOK+DOC] <verbo> <target / descripción del cambio>
```

### Ejemplos

```
# add
[MODE: STORYBOOK+DOC] Añade el atom .ft-divider al storybook. Existe en
scss/fourties/atoms/divider/_divider.scss pero no hay archivo en fourty/__old-showroom/atoms/.

# add (POC pre-DS)
[MODE: STORYBOOK+DOC] Añade un molecule POC `comment-thread` que aún no está en el
DS, marcado como [POC] en el overview, con 2 stories: Base y Threaded.

# deprecate
[MODE: STORYBOOK+DOC] Depreca el atom `disqus` del storybook (ya no se usa en
producción).

# modify
[MODE: STORYBOOK+DOC] En authors.js, el control `count` está como radio con 1-6.
Pásalo a number con min 1, max 20, y cicla NAMES con módulo.

[MODE: STORYBOOK+DOC] En btn.js, añade una galería "All sizes" con los 4 tamaños
del SCSS dentro del subgroup Galleries.

# engine
[MODE: STORYBOOK+DOC] Añade un nuevo control type "color" al motor. Debe renderizar
<input type="color"> y pasar el valor hex al render.

[MODE: STORYBOOK+DOC] Añade un addon panel "Snippets" debajo del canvas que muestre
todos los <template> del <x>.html como snippets copiables.

# data
[MODE: STORYBOOK+DOC] El CSV ha incorporado una columna "is_amp_only". Añade un
sub-índice en brand-data.js que liste solo los outlets AMP.

# assets
[MODE: STORYBOOK+DOC] Añade el icono Phosphor `gauge` para usarlo en un nuevo control
de performance simulada en la sub-toolbar A11y.
```

### Anti-ejemplos (lo que NO es STORYBOOK+DOC)

```
# ✗ "Migra fourty/__old-showroom/atoms/atom-link.html al storybook"
#   → [MODE: STORYBOOK+MIGRATE]

# ✗ "Cambia el color primario de la marca sport en el SCSS"
#   → [MODE: 42DS+SCSS] (esto vive en scss/brands/, fuera del storybook)

# ✗ "Crea una página MDX y CSF de Card en este proyecto"
#   → [MODE: STORYBOOK] (upstream, otro modo)

# ✗ "Optimiza el bundle del storybook con Vite"
#   → fuera de ámbito por principio zero-toolchain
```
