# Mode: STORYBOOK+MIGRATE — Migración showroom → storybook POC

Modo **operacional** para migrar componentes existentes del showroom de 42DS
(`fourty/__old-showroom/atoms/`, `fourty/__old-showroom/molecules/`, `fourty/__old-showroom/organisms/`) a la arquitectura del
**storybook POC zero-toolchain** ubicado en `fourty/storybook/`. Toma como fuente de
verdad el SCSS canónico del componente y el markup del showroom, y produce el módulo
`storybook/js/<nivel>/<x>/<x>.js` (+ opcional `<x>.html`) listo para ser consumido por
el motor (`fourty/index.html`).

> **Ámbito**: este modo opera **exclusivamente** sobre el storybook POC interno
> (`fourty/storybook/`). NO se refiere al producto upstream Storybook
> (`@storybook/*` / CSF / MDX), que es dominio de `mode-storybook.md`.
>
> **Suffix-spec, no combinador**: `+MIGRATE` es una **especialización** del modo
> STORYBOOK del 42DS POC, NO una composición con otro mode. No se combina con `+UX`,
> `+UI` ni con modes de la familia 42DS. Excepción al sistema `+` del `governance.md §3` —
> ver §1 (dominios `mode-storybook-migrate`).
>
> **AI-agnostic**: esta spec funciona como system prompt en cualquier runtime (Claude,
> Codex, GPT, Gemini…). El "documento raíz del repo" es **`AGENTS.md` y/o `CLAUDE.md`**
> (espejados): usa el que cargue tu runtime. Los pasos de shell/búsqueda/borrado están
> descritos de forma neutra (el repo se desarrolla en Windows; no asumas `bash`/`rm`).

> **Dos clases de target**: (1) **componentes** del showroom (`fourty/atoms|molecules|
> organisms/`) → se traducen a una story parametrizada (este flujo, §process). (2)
> **niveles-página** (`fourty/templates|layouts|widgets|pocs|recursos/`) → NO son
> componentes (no tienen API ni modificadores): son **páginas completas hechas a mano**
> que se **INDEXAN** como stories `kind:"page"`, no se parametrizan. Ver §«Niveles-página»
> en rules. La capacidad `kind:"page"` del motor (navegar el iframe por URL) es del
> dominio `[MODE: STORYBOOK+DOC]` (engine); este modo solo escribe el **índice**.

---

## meta

```
rol:          Ingeniero de migración — traduce un componente del showroom a una story
              del storybook POC sin inventar API
scope:        Produce storybook/js/<nivel>/<x>/<x>.js (+ <x>.html opcional);
              da de alta la ruta en el array PHASES de storybook/js/bootstrap-lazy.js
              y marca el chivato en storybook/js/meta.js (SB_META.changes)
modos:        generativo (la auditoría de stories ya migradas la hace [MODE: STORYBOOK+DOC])
agent_tags:   storybook-poc, 42ds, front, migration
combinable:   NO — modo operacional standalone, fuera del sistema de composición con `+`
no hace:      inventar clases .ft-* que no existan en el SCSS canónico ·
              modificar scss/, cds-statics/ ni fourty/__old-showroom/<nivel>/<nivel>-<x>.html del showroom ·
              tocar fourty/storybook/css/, /assets/, /data/ ni /js/core/ (eso es [MODE: STORYBOOK+DOC]) ·
              importar un módulo de storybook desde otro (cero acoplamiento) ·
              cambiar MAJOR/MINOR de versión (regla del documento raíz del repo: AGENTS.md / CLAUDE.md)
```

---

## knowledge

### Storybook POC interno — primario (orden de lectura)

| Módulo | Cuándo cargar |
|--------|---------------|
| `fourty/storybook/README.md` | Siempre — overview, contrato `SB.register`, reglas no-negociables |
| `fourty/storybook/js/README.md` | Siempre — jerarquía JS, orden de carga, API `window.SB`, antipatrones |
| `fourty/storybook/js/core/README.md` | Siempre — motor, ciclo de vida del iframe, qué estado vive dónde |
| `fourty/storybook/js/atoms/README.md` | Si el target es atom — receta de migración + plantilla |
| `fourty/storybook/js/molecules/README.md` | Si el target es molecule — receta + diferencias vs atom |
| `fourty/storybook/js/organisms/README.md` | Si el target es organism — receta + datasets realistas |
| `fourty/storybook/js/templates/README.md` | Si el target es un **nivel-página** (templates/layouts/widgets/pocs/recursos) — patrón índice `kind:"page"` + `brandable` |
| `fourty/storybook/css/README.md` | Solo si la migración expone un caso que toca el chrome (raro) |
| `fourty/storybook/data/README.md` | Solo si el componente depende del CSV de marcas (p.ej. masthead, header) |
| `fourty/storybook/assets/README.md` | Solo si necesitas añadir un icono Phosphor nuevo |
| `mode-storybook-doc.md` § "Regla de la ficha README de componente" | Siempre al cerrar — contrato y plantilla de la ficha `js/<nivel>/<x>/README.md` que este modo debe crear (paso 5.3) |

### Referencia canónica de stories ya migradas (mirar antes de escribir)

| Nivel | Ejemplo canónico | Cuándo replicarlo |
|-------|------------------|-------------------|
| Atom | `fourty/storybook/js/atoms/btn/btn.js` + `btn.html` | Componente con múltiples familias y galerías (iconos, redes) |
| Molecule | `fourty/storybook/js/molecules/btngroup/btngroup.js` | Componente con layout interno + `control: "number"` para count |
| Organism | `fourty/storybook/js/organisms/authors/authors.js` | Componente con datasets realistas + count cíclico |

### 42DS — fuente de verdad del componente

| Recurso | Para qué |
|---------|----------|
| `scss/fourties/<nivel>/<x>/_<x>.scss` | **Catálogo canónico** de modificadores. Cero invención. |
| `scss/fourties/<nivel>/<x>/<x>-<marca>.scss` (si existen) | Variantes por marca — detectar si el componente difiere visualmente entre `ux`/`ep`/`sport`/etc. |
| `fourty/__old-showroom/<nivel>/<nivel>-<x>.html` | Markup canónico del showroom, familias en uso, ejemplos copiables |
| `cds-statics/js/.../*<x>*.js` (si existe) | Dependencia JS opcional (p.ej. `fortty-js-dropdown-simple.js`). Documentar en Overview y, si gobierna el comportamiento real, anadir `Integracion Vue / React`. |
| `cds-statics/csv/storybook__bodyclass.csv` | Solo para componentes brand-aware (cabecera, masthead) |

### Conceptual (refuerzo, no bloqueo)

| Módulo | Tag |
|--------|-----|
| `mind-system/knowledges/42ds/atomic-design` | 42ds — distinción atom/molecule/organism |
| `mind-system/knowledges/front/html-semantics` | front — para validar el markup migrado |
| `mind-system/knowledges/front/component-patterns` | front — API mínima, props semánticas |
| Documento raíz del repo (`AGENTS.md` / `CLAUDE.md`) | Reglas no-negociables del repo (PATCH only, no tocar `scss/abstracts/`) |

---

### Regla adicional — componentes JS-driven en migracion

Si el componente migrado necesita runtime JS propio, JS del consumidor o vendor tercero para comportarse de verdad, el `Overview` resultante debe incluir `Integracion Vue / React`:

- despues de `Dependencias`
- centrado en ownership del estado, montaje, cleanup, SSR/hydration y updates
- sin convertir el storybook en tutorial largo ni duplicar la documentacion del runtime
- y el `window.SB.register(...)` final debe marcar `signals: ["js"]` para activar la senaletica del sidebar

### Regla adicional - tablas y deprecaciones en migracion

Al migrar un showroom a Storybook, el `Overview` no debe resolver toda la comunicacion con la misma tabla base:

- `cb-table`: dependencias, anatomia, relaciones simples
- `cb-table--dense`: listados compactos, inventarios cortos, metadata
- `cb-table--matrix`: comparativas, diferencias por marca, ownership o contratos paralelos
- `cb-table--timeline`: trazabilidad de cambios, hitos o soporte temporal

Si la migración necesita conservar la traza de cambios relevantes del componente, usar el helper
canónico `window.SB.helpers.changeBlock({...})` bajo un único
`<h2>Registro de cambios</h2>`, ordenado del registro más reciente al más antiguo. El contrato
mínimo es `type`, `date` ISO (`YYYY-MM-DD`), `title` y `summary`; admite además `scope`,
`impact`, `files[]` y `note`. Tipos válidos: `added`, `changed`, `fixed`, `accessibility`,
`docs`, `breaking`. No escribir `.cb-change` a mano ni usar este bloque como sustituto de
`SB_META.changes` o del changelog de releases.

Si durante la migracion detectas algo deprecado en el showroom o en el SCSS vigente:

- documentarlo en un bloque-alerta de deprecacion
- incluir fecha exacta de cuando se deprecio
- explicar alcance, alternativa y posible retirada
- no enterrarlo en notas sueltas ni solo en captions de stories

Si detectas una retirada ya efectiva y sigue siendo importante para entender el contrato vigente:

- documentarla con un bloque especifico de `Removed`
- incluir fecha exacta de la retirada
- explicar que queda vigente en su lugar
- no mezclarla con `Deprecated` por comodidad

Si ademas tocas el changelog durante esa migracion:

- usar `DEPRECATED` cuando algo siga teniendo traza o compatibilidad residual, pero ya no deba usarse
- usar `REMOVE` cuando la retirada ya sea efectiva
- no mezclar ambas categorias por comodidad

### Regla adicional - tono editorial de titulares y lead

Al migrar un `Overview`, no copies literalmente la entradilla del showroom si suena plana o demasiado tecnica.

- el `h1` debe mantenerse rotundo, en bold
- la `cb-docs__lead` debe resumir primero utilidad y contexto de uso
- los detalles de implementacion bajan a tablas, callouts o secciones posteriores
- si una frase tiene demasiados parentesis, ejemplos o excepciones, dividirla

### Regla adicional - secuencia de arranque del `Overview`

Cuando migres una ficha, intenta normalizar este orden al inicio:

1. `h1`
2. `lead` tecnico corto para front/desarrollo
3. bloque breve de uso mas coloquial para diseno/producto
   - debe explicar de forma muy corta que hace la pieza en terminos visuales y funcionales
4. avisos relevantes antes del desarrollo denso (`JS`, `Deprecated`, `Removed`, branding, limites)
5. despues, tablas y secciones tecnicas

La idea no es rigidizar todos los componentes, sino dar una lectura clara por capas para perfiles distintos. Evita bloques de uso demasiado genericos si no ayudan a entender la pieza real.

## inputs

| Input | Fuente | Obligatorio |
|-------|--------|-------------|
| Target del showroom (p.ej. `fourty/__old-showroom/atoms/atom-link.html`) | Usuario | Sí |
| SCSS canónico (`scss/fourties/<nivel>/<x>/_<x>.scss`) | Repo | Sí (auto-derivado del target) |
| Familias / variantes a cubrir | Inferido del SCSS · usuario puede limitar | No (default: todas las del SCSS) |
| Ejemplos canónicos para `<x>.html` | Markup del showroom + usuario | No (omitir el archivo si no aporta) |
| Variantes por marca | Archivos `<x>-<marca>.scss` | No (auto-detectar) |

> Si el target NO existe en `scss/fourties/`, abortar y avisar: el storybook documenta el
> DS real, no atom/molecule/organism candidatos. Para eso → `[MODE: STORYBOOK+DOC]`
> (operación "add new") o `[MODE: 42DS+SCSS]` (construirlo en el DS primero).

---

## process

### Flujo lineal (6 pasos)

```
1. ANCLAJE
   1.1 Resolver target → derivar nivel (atoms/molecules/organisms) del prefijo de clase
        (.ft-* → atom · .ft-mol-* → molecule · .ft-org-* → organism).
   1.2 Verificar que existe scss/fourties/<nivel>/<x>/_<x>.scss → abortar si no.
   1.3 Verificar que NO existe ya storybook/js/<nivel>/<x>/<x>.js → si existe,
        derivar a [MODE: STORYBOOK+DOC] (operación "modify").

2. INVENTARIO (lectura única, en paralelo si se delega)
   2.1 Leer _<x>.scss completo → listar TODOS los modificadores reales
        (`--primary`, `--md`, `--has-icon`, …).
   2.2 Leer fourty/__old-showroom/<nivel>/<nivel>-<x>.html → identificar familias canónicas
        (Base, Nav, RRSS, Txt…), markup real, y atributos HTML usados.
   2.3 Detectar variantes por marca (<x>-<marca>.scss) → si existen, documentar en Overview.
   2.4 Detectar dependencia JS (cds-statics/js/.../*<x>*.js) → si existe, documentar en
        Overview en tabla de Dependencias.
   2.5 Si la pieza depende de JS del DS, JS del consumidor o vendor tercero, preparar
        tambien un bloque `Integracion Vue / React` dentro del Overview.
   2.6 Si la dependencia JS es real en produccion, planear tambien `signals: ["js"]`
       en el registro del componente para que el sidebar lo identifique como dinamico.

3. DECISIÓN ARQUITECTURAL
   3.1 ¿El componente tiene FAMILIAS? (sí → una story plana interactiva por familia;
        no → una sola story `Base`)
   3.2 ¿Algún eje tiene 10+ opciones? (sí → galería en subgroup; no → control select/radio)
   3.3 ¿Hay un eje "número de items"? (sí → control:"number" con min/max/clamp)
   3.4 ¿Es layout (flex/justify-content)? (sí → full: true en stories de layout)
   3.5 ¿Vale la pena un <x>.html con markup canónico? (regla práctica: si el front quiere
        ejemplos copiables que mantenga sin tocar JS, sí; si todo se cubre con stories
        dinámicas, no).

4. CONSTRUCCIÓN (orden estricto dentro del módulo)
   4.1 Cabecera comentada (catálogo SSOT, fuente del SCSS, regla DATA-driven)
   4.2 DATA SSOT (arrays 1:1 con los modificadores del SCSS, cero invención)
   4.3 Constructores de markup (helpers internos del módulo: `atom`, `mol`, `org`…)
   4.4 Stories planas: BASE primero (SIN hint de clase — la clase vive en el Overview),
        después familias.
        Cada una con sus argTypes + args + render.
   4.5 Galerías en subgroups (si aplica): `Galleries` con `collapsed: true`.
   4.6 Overview HTML: descripcion de 1 linea + tablas segun necesidad real
        (Dependencias, Modificadores, Anatomia, comparativas, timeline...)
        + bloque `Integracion Vue / React` si la pieza es JS-driven
        + bloque de deprecacion con fecha exacta si algo queda deprecado
        + `<p class="cb-src">Fuente: …</p>`. CERO componente vivo.
   4.7 `window.SB.register(X)` + opcional `window.SB.loadMarkup(X, …)`.
       Si la pieza es JS-driven, `X` debe incluir `signals: ["js"]`.

5. INTEGRACIÓN
   5.1 Crear (si hace falta) <x>.html con <template data-story="…">.
   5.2 DAR DE ALTA "storybook/js/<nivel>/<x>/<x>.js" en el array PHASES de
        storybook/js/bootstrap-lazy.js, en la fase de su nivel y en posición alfabética.
        ⚠ NO se añade ningún <script defer> a fourty/index.html: el shell solo carga 8
        scripts fijos y todo el catálogo llega diferido por fases desde bootstrap-lazy.js.
        Un módulo que no esté en PHASES NO se registra: la story no aparece.
   5.3 Crear la FICHA del componente storybook/js/<nivel>/<x>/README.md (ficha de
        contexto para agentes: identidad, clase raíz, señales, stories, dependencias,
        trazabilidad — indexa el .js, NO duplica el overview) y añadir su fila al
        ÍNDICE DE COMPONENTES del README de nivel (storybook/js/<nivel>/README.md).
        Contrato y plantilla de la ficha: ver [MODE: STORYBOOK+DOC] § "Regla de la
        ficha README de componente".

6. VERIFICACIÓN (manual, lo reporta el usuario al servir el storybook)
   [ ] Sidebar: aparece bajo el grupo correcto (Atoms/Molecules/Organisms)
   [ ] Base renderiza el componente
   [ ] Cada control modifica el preview en vivo (sin recarga)
   [ ] Cambio de Brand → componente se re-renderiza con su CSS
   [ ] Toggle Oscuro → respeta dark mode REAL del DS (no fake)
   [ ] Galerías muestran TODOS los modificadores listados en el SCSS
   [ ] Overview: tablas correctas para el tipo de informacion, sin componente vivo incrustado
   [ ] Deprecaciones: si existen, llevan bloque-alerta y fecha exacta
```

### Cuándo PARAR y pedir aclaración al usuario

- Hay modificadores del SCSS que el showroom no usa → preguntar si incluirlos.
- El componente requiere datos externos (CSV, JSON) que el storybook no carga aún →
  proponer extensión del `data/` layer (eso ya es trabajo de `[MODE: STORYBOOK+DOC]`).
- El componente requiere JS de runtime con efectos colaterales (modal, dropdown,
  swiper…) → confirmar si se documenta el HTML estático o si se quiere intentar
  re-inicializar tras cada re-render (riesgoso).
- **Prefiere el mecanismo NATIVO si existe** (`<details>`/`<summary>` para «leer más»/
  acordeón, `<label for>`+input para toggles, ancla `#id`): cero JS y funciona tras cada
  re-render. El motor **respeta su acción por defecto** (excluye `<summary>` del
  `preventDefault` del logger). Si una pieza nativa «no responde» en el canvas, sospecha
  del chrome, no del componente (ver `mode-storybook-doc.md` § «Gotchas del motor»).
- El componente tiene 6+ familias muy distintas → confirmar si se migra entero en
  una pasada o por fases (Base + 2 familias primero, resto luego).

---

## rules

### Reuse-first absoluto

- **Clases REALES o nada**: cada clase del módulo debe existir literal en
  `scss/fourties/<nivel>/<x>/_<x>.scss` o en parciales sibling. Si no aparece, no se usa.
- **DATA SSOT**: los modificadores viven en arrays al principio del módulo. Añadir o
  quitar variantes = editar el array. NO duplicar listas en builders.
- **Cero acoplamiento entre componentes**: si la molécula `btngroup` renderiza
  `.ft-btn`s, REPLICA el markup de `.ft-btn` (no `import` ni referencia al módulo de
  `btn`). Ambos quedan consistentes porque ambos consumen el SCSS canónico.
- **Markup REAL, no demo abstracto**: cuando el componente ES un asset (SVG geográfico
  como `svgmap`, ilustración, mapa…), trae el markup **verbatim del showroom**
  (`fourty/__old-showroom/atoms/atom-<x>.html`); es canónico y zero-invención. NO lo sustituyas por
  shapes/placeholders abstractos «para no inflar el módulo»: el storybook documenta el DS
  real, y un placeholder hace que «no se vea» como en el showroom.
  - Activos pesados (decenas-cientos de KB): embébelos como **constante** en el `.js`
    (sin backticks ni `${` → verifícalo) y/o como `<template>` en el `<x>.html` (subgrupo
    Markup, fetch async). Extráelos con un script para no manipular el blob a mano y
    limpia atributos de runtime que no apliquen (`onclick`, `id=""`).
  - Variantes muy pesadas que solo cambian geometría (p.ej. mapa de provincias ~110KB
    frente al de comunidades): incrusta UNA en el Base e indica en la nota/Overview que
    el control alterna el **skin** sobre esa geometría; deja las otras geometrías en
    Markup/showroom en vez de duplicar el blob. Di explícitamente lo que se simplifica.
- **Familias compuestas: verbatim PERO interactivo** (componentes con muchas familias
  ricas, p.ej. `list`: `-photoinfo`, `-counter`, `-box`, `-block`, `-gridded`, `--add`…).
  No las dejes solo en Markup ni las reconstruyas a mano: **parametriza el markup real**.
  - Cada familia compuesta = **su propia story interactiva** bajo `Galleries` (entradas de
    primer nivel en el sidebar, como las familias de `btn`), no una sola galería-catálogo.
  - Patrón «parse + repeat»: del markup verbatim extrae el `<ul/ol>` raíz y el **PRIMER
    `<li>` como plantilla**; el `render` repite el ítem `count` veces (control `number`) e
    inyecta modificadores como clases en la raíz (`open.replace(/class="([^"]*)"/, …)`).
    Cero invención: la estructura del ítem es la real.
  - **Toggles que absorben sub-variantes**: si dos familias solo difieren en un modificador
    (`box` vs `box--tight`, `block` vs `block--col`), NO hagas dos stories; una story con un
    control `boolean` que añade/quita la clase. Menos ruido en el sidebar.
  - La pieza textual/parametrizable común sigue en la story `Base` (con su `select` de
    variante); Markup mantiene el markup copiable de todas.

### Organismos: controles MÍNIMOS, fidelidad por MARKUP

Los organismos son secciones de página: su markup es grande, anidado y compone muchas
moléculas con estructura heterogénea. **No los parametrices pieza a pieza.** El criterio
es inverso al de átomos/moléculas:

- **Prima el markup sobre los controles.** Cada variante del organismo debe ser la
  **construcción literal del showroom** (las moléculas internas tal cual, con sus
  clases, comentarios estructurales y datos reales). Si para «hacerlo configurable» hay
  que recortar o reescribir el markup, NO se recorta: se trae verbatim.
- **Un solo control de variante.** Lo habitual es UN `control: "select"` que recorre las
  variantes/familias del showroom (tipo 1 / tipo 2, base / --updates, base / --curved…),
  cada opción mapeada a su markup verbatim en un objeto `VARIANTS`. Si el organismo tiene
  una sola construcción → **cero controles** (story `Base` que devuelve el markup).
- **Nada de `count` / `text` / `boolean` por defecto** en organismos. Solo añade un control
  fino (p.ej. `count` cíclico tipo `authors`) cuando el organismo es un **contenedor
  homogéneo de N moléculas idénticas** y repetir aporta valor real. En cuanto el contenido
  es heterogéneo, gana el select de variantes verbatim.
- **Extracción con script** (no a mano): un generador node lee `organism-<x>.html`, toma el
  INNER balanceado de cada panel `data-showroom-view="html5"` (salta los AMP), retira solo
  el andamiaje del showroom (`<div class="code-container">` + sus comentarios
  `code highlighted` / `data-id deben coincidir`) **y todo `<script>…</script>`** (el iframe
  no ejecuta scripts inyectados por innerHTML, y son comportamiento, no construcción CSS;
  además evita backticks/`${}` que romperían el template-literal del módulo). **Conserva**
  los comentarios propios del componente (`<!-- Comienzo Molécula… -->`, `<!-- org: footer
  -->`). Normaliza rutas de asset (`../../cds-statics` → `/cds-statics`, raíz del server).
  Como red de seguridad, aborta si tras limpiar queda algún `` ` ``/`${` en el markup.
  Bórralo al terminar.
- **Panels con varios ejemplos apilados** (p.ej. `--updates` + `--is-highlighted` en el
  mismo panel) → tráelos juntos en esa variante, tal cual el showroom. No los separes.
- **Showrooms «página-layout»** (cabeceras, masthead, layouts): algunos organismos NO usan
  paneles `overviewPanelOrganisms`/`rendered-content`; son páginas-layout donde el
  componente es el primer `<header>`/`<section>`/`<footer class="ft-org-…">` tras `<body>`, y
  las **variantes viven en ficheros separados** (`organism-<x>-ep.html`,
  `organism-<x>-login.html`…). Ahí el extractor hace balanced-walk de ESE elemento raíz por
  fichero, y el `select` recorre los ficheros. La raíz puede llevar helpers
  (`ft-helper-bgColor-primary ft-org-header`) y no coincidir con el nombre de la carpeta
  SCSS (`header-multibrand` → clase `.ft-org-header`).
- **⚠ Organismo JS-driven — el `innerHTML` NO ejecuta scripts.** Si la *razón de ser* del
  componente es comportamiento de runtime (menú lateral que abre con `cds-statics/js/headers/
  masthead.js`, selector de idioma, sticky on-scroll, sliders/mapas con su propio JS), el render
  por markup deja el botón **inerte** y, peor, el markup que el runtime revela suele **faltar en
  el fragmento** (el panel `.ft-org-masthead--side` ni se extrae con la raíz). Dos salidas
  faithful — elige según si el estado «abierto» se puede congelar en CSS:
  - **(A) Estado abierto estático vía control `boolean`** (preferida si el comportamiento es
    *mostrar/ocultar* un elemento que el CSS ya posiciona con una clase, p.ej. `.active`).
    Mantienes el **Base interactivo con `select` de variantes** + un toggle que **añade el
    elemento revelado en su estado abierto** (inyectando la clase `.active`/`open` verbatim del
    SCSS). Cero JS, controles limpios, el menú es inspeccionable. **Caso canónico: `masthead`** —
    `select` (App · 2º nivel · Externo · Logueado · Login) + `menuOpen` que añade el
    `.ft-org-masthead--side.active` de cada variante (extraído del showroom, una entrada por
    variante). Limitación honesta a documentar: no «desliza» ni el acordeón interno expande
    (eso sí necesita JS). Es la variante de la fila «Revelado por interacción» de §«Harness».
  - **(B) `kind:"page"` a la página real** (cuando el runtime NO se puede congelar: mapas
    Leaflet, SDKs, sliders con medición — `hiperlocalmap`). El iframe NAVEGA al fichero del
    showroom → corre su propio JS, fidelidad total, pero arrastra el chrome del showroom y pierde
    los controles. `brandable:true` si el fichero trae `#brandStyles-root`/`#brandStyles`
    conmutables; `brandable:false` si fija la marca con los `<link>` comentados. Una story por
    estado. Ver §«Niveles-página» y la tabla de §«Harness por caso».
- **Dedupe obligatorio**: agrupa las variantes por hash del markup y descarta las
  byte-idénticas. Si dos «variantes» del showroom producen el mismo markup raíz (su
  diferencia es de skin/promo/body-class, que gobiernan Brand/Cabecera, no el markup),
  colapsa en una y dilo en el Overview. No infles el `select` con duplicados.
- `full: true` SIEMPRE. La fidelidad final se valida con **Brand / Cabecera (CSV)**, que
  aplica logos y colores reales sin tocar el módulo.

> Resumen: en organismos, el «control» es elegir entre construcciones reales, no fabricar
> la construcción desde props. Menos API, más showroom.

- **EXCEPCIÓN sancionada — builder paramétrico (cuando se pide «controles lo más completos
  posible»).** El usuario puede pedir explícitamente exponer TODA la API del organismo como
  controles (no el `select` mínimo). Entonces la story **Base** pasa a ser un *builder*: un
  `render(a)` que **recompone fragmentos VERBATIM del showroom** (label, score, figcaption,
  writer, date, related…) y aplica **clases reales del SCSS** según los controles. Sigue siendo
  cero invención — recomposición, no fabricación. Reglas:
  - **Ejes exclusivos → `select`** (tamaño `--xs…--xlg`, tipo destacado, layout `--row/--col/
    --reverse`); **flags de contexto y piezas internas → `boolean`**. Modela el anidamiento real
    (p.ej. `date` ⊂ `writer`: la fecha solo aparece si la firma está activa).
  - **SSOT del inventario = el parcial SCSS, con la cadena `&` RESUELTA** (no un `grep '&--'`
    plano: eso pierde o malinterpreta los **modificadores internos/de elemento**). Resuelve el
    anidamiento `&` para obtener los nombres de clase reales completos — distingue **bloque**
    (`--lg`, `--featured`, `--hideImage`, `--showDate`, `--branded__noMark`) de **elemento**
    (`__main--alignCenter`, `__mainRelated--premium`, `__mediaVideo/Audio`). Cruza con las
    **combinaciones reales del showroom** (`grep 'class="ft-org-<x>[^"]*"'`) y marca en el
    Overview qué clases **cura el showroom** y cuáles son **solo-SCSS** (existen pero sin markup
    propio: se aplican como clase real sobre la maqueta estándar; no son inventadas). Revisa
    SIEMPRE los modificadores internos además de los de bloque (el usuario lo pedirá).
  - **Distingue «variante CSS sobre markup idéntico» de «markup nuevo».** Antes de descartar una
    clase por no estar en el showroom, mira el SCSS: si la diferencia la pinta el **CSS** sobre el
    MISMO markup (icono vía `::after { background-image }`, color, layout) → es un **intercambio
    de clase seguro**, exponlo aunque el showroom no lo cure (`__mediaGallery`/`__mediaVideo`/
    `__mediaAudio` comparten `<picture>`; solo cambia el icono CSS). Solo es **fabricación
    prohibida** si la variante exige **markup estructural nuevo** que no existe (un reproductor de
    vídeo real, un slot que el runtime rellena): eso no se inventa.
  - **Conserva los markups verbatim canónicos** en el subgrupo **Markup** (`loadMarkup`): el
    builder es para explorar combinaciones; el Markup es la referencia fiel curada.
  - **`Code` debe ser copiable como DS real**: si la story necesita wrappers de layout, harness
    visual o contenedores del chrome/canvas para verse bien, esos wrappers no pueden contaminar
    el tab `Code`. Usa `story.code` para publicar el HTML canónico exacto del componente, y
    reserva `story.codeAlt` para códigos alternativos explícitos. Nunca exponer clases `cb-*`,
    `sb-*` ni estilos inline de demo como parte del markup que el front debe copiar.
  - Valida con un smoke-test del `render` (default == la base original; combos producen las
    clases esperadas y omiten las piezas desactivadas). **Caso canónico: `cardhome`** (17
    controles: tamaño·destacado·layout·branded·premium·discover·full·textonly + 9 piezas).

### Niveles-página (templates · layouts · widgets · pocs · recursos) — INDEXAR, no parametrizar

Estos niveles **no son componentes**: son **páginas completas hechas a mano** (composiciones
de organismos/moléculas/átomos para un tipo de página). No tienen modificadores ni API → **no
hay controles**. No se migran traduciendo markup al stage; se **indexan** y se cargan enteras.

- **Render = story `kind:"page"`** (capacidad del motor, ver `core/README.md`). La story NO
  devuelve markup: lleva `src` (ruta relativa a `index.html`). El iframe **NAVEGA**
  al fichero (`elFrame.src = src`) → la página corre su **propio `<head>`/CSS/JS** (fidelidad
  total, scripts incluidos). Es lo contrario al render de componentes (`innerHTML`, que
  descarta scripts e impone el `<head>` del chrome). Forma: `{ id, name, kind:"page", src }`.
- **NO extraer markup, NO `loadMarkup`, NO `<x>.html`**: la página ES la fuente; se carga tal
  cual. Cero invención, cero transcripción.
- **Índice AUTOGENERADO, no a mano**: son cientos de ficheros (85 templates, 164 layouts…).
  Un generador node temporal (`.tmp_gen_<nivel>.js`, se borra al terminar) enumera la carpeta,
  deriva el **nombre** del fichero (único dentro de su grupo), clasifica por **familia/tipo** y
  emite `storybook/js/<nivel>/<nivel>.js`: un array `PAGES` SSOT + un bucle que registra **una
  "componente" por familia** (`group:"<Nivel>"`, p.ej. `"Templates"`; el motor coloca los
  grupos no-canónicos tras Organisms). Cada familia lleva su Overview (tabla de páginas +
  fuente). Un solo módulo dado de alta en `PHASES`. Patrón verificado en
  `fourty/storybook/js/templates/` (+ su README).
- **Sub-agrupar por marca/tipo** cuando el volumen lo pide: templates por familia (Noticia,
  Portada, Cerca, Pasatiempos…); **layouts por marca** (ep/epe/regionales/revistas/sport/amp),
  porque son `layout-[marca]-[tipo]` y son 164.
- **Orden ALFABÉTICO de las familias/sub-grupos** en el sidebar (aplica a **TODOS** los niveles:
  templates, **layouts** —marcas—, widgets, recursos, pocs). **Lo garantiza el MOTOR**: `buildTree`
  ordena los componentes de cada grupo por nombre (`localeCompare 'es'`) → no depende del orden de
  registro. Por eso el generador puede registrar en cualquier orden; aun así ordénalas con
  `Object.keys(byFam).sort((a,b)=>a.localeCompare(b,'es'))` (redundante pero claro) y NO uses un
  `FAM_ORDER` editorial fijo. «Varios»/«General» caen por su letra. Las páginas dentro de cada
  familia van alfabéticas (el generador ordena los ficheros con `localeCompare`).
- **`brandable` — la distinción CLAVE template vs layout**:
  - **Templates** son composiciones **multimarca** (cargan `ux-index.css` + los `<link>`
    conmutables `#brandStyles-root`/`#brandStyles`): su gracia es **elegir marca y ver el
    cambio de estilos**. Sus page-stories llevan **`brandable: true`** → el toolbar **Brand**,
    **Cabecera** (outlet del CSV = marca + clases de medio) y **Oscuro** SÍ aplican (el motor
    conmuta los `<link>` + clases `ft-brand-*`/cabecera del `<body>` de la página, réplica de
    `showroom-init.js`). Solo **Fondo** queda inerte (es helper del canvas, no de la página).
  - **Layouts** son páginas **por marca** (bloqueadas a una): **`brandable: false`** (o
    ausente) → Brand/Cabecera se grisan (la página ya es de su marca). **Oscuro SIEMPRE
    operativo** (dark = `data-theme`, universal del DS); Fondo inerte en toda página;
    Viewport·Visión·Fullscreen siempre operativos.
- **Requiere SERVIDOR** (el iframe carga ficheros por URL). Sin servidor, degrada en silencio.
- **Frontera**: añadir/ajustar la capacidad `kind:"page"`/`brandable` en `core/storybook.js`
  es `[MODE: STORYBOOK+DOC]` (engine). Este modo solo escribe `storybook/js/<nivel>/<nivel>.js`
  (el índice) + 1 línea en `index.html`.

### AMP — subgrupo "AMP" por componente (modelo unificado, NO grupo aparte)

Muchos componentes (átomos, moléculas, organismos) tienen su **propio código AMP** en el showroom.
Se integra **aislado** en `fourty/storybook/js/amp/` (sin tocar los módulos de componente ni `core/`,
salvo las APIs genéricas del engine — ver `mode-storybook-doc.md`). Modelo **único** para los 3
niveles: cada componente con AMP gana un **subgrupo `"AMP"` DENTRO de sí mismo** (plegable, como
`Galleries`/`Markup`) vía `window.SB.attachSubgroup(id, subgroup)`. **NO** un grupo top-level
paralelo, **NO** un toggle global, **NO** stories sintéticas (todo eso se probó y descartó).

El subgrupo reúne la **UNIÓN** de dos fuentes del showroom:

- **A) Variantes inline** — paneles `data-showroom-view="amp"` dentro de la página de showroom del
  componente (`atom-<x>.html` / `molecule-<x>.html` / `organism-<x>.html`). Cada panel = una story
  por variante. SSOT verbatim extraído con `amp-data.gen.js` → `amp-data.json` (array
  `{ comp, level, panels:[{ name, cls, html, ampEl }] }`; `comp` = id REAL del storybook, resuelto
  leyendo el primer `id:` del `.js` del componente + matching showroom↔folder por nombre normalizado).
  Render del canvas = **solo el elemento, sin chrome** (sin section/header/badge). **TODAS** las
  variantes (planas y con `<amp-*>`) se pintan en un **iframe-sandbox estilado** (`previewIframe` →
  `ampDoc(markup,{styled:true})`): documento AMP con el **CSS REAL del DS** (`setting.css` +
  `amp-<marca>-index.css`) + `v0.js` + `<script custom-element>` por extensión, **sin boilerplate**
  (evita el ocultado de 8 s). Así las clases AMP-only (`.ft-mol-tab-amp`, `.ft-tooltip-amp`) se ven
  **como en el showroom** y el runtime upgradea `amp-img`/`amp-selector`/… No es AMP estrictamente
  válido (CSS externo) pero renderiza fiel.
  - **Brand-aware**: la marca del preview sigue al toolbar Brand vía `window.SB.currentBrand()`
    (`ampBrand()` deriva el slug del *key*; **ux → fallback `sport`**, no hay `amp-ux`). `mountFrame`
    re-renderiza al cambiar Brand → recarga el bundle.
  - El **código del elemento** y la **validez** van al panel inferior **"Code AMP"** (`story.codeAlt`,
    ver DOC). La validez se calcula con el validador oficial `validator_wasm.js` (1 vez en el doc
    principal) sobre un doc AMP **CANÓNICO aparte** (`ampDoc(markup,{spacer})`: boilerplate, SIN CSS
    externo → juzga el código del elemento, no el wrapper; `spacer` empuja ≥600px para `amp-iframe`).
- **B) Página AMP completa** — `fourty/{molecules,organisms}/amp-*.html` (mapa `PAGE_BY_COMP`). Se
  añade como story `{ kind:"page", brandable:false }` "Página AMP" en el mismo subgrupo (el iframe
  navega → runtime/CSS AMP propios). Componentes sin paneles inline (footerbasic, breadcrumb-org)
  tienen el subgrupo solo con esta story.

Reglas: extracción SIEMPRE con `amp-data.gen.js` (no a mano), `comp` debe resolver a un id real
(cross-check headless contra los `id:` del storybook), `amp.js` carga tras todos los módulos. Frontera:
`amp.js` + `amp-data.*` (catálogo/generador/render/validación) = **este modo**; las APIs **genéricas**
del engine que consume (`attachSubgroup`, tab "Code AMP"/`story.codeAlt`, `window.SB.currentBrand()`,
filtros faceted) = **`[MODE: STORYBOOK+DOC]`**.

### Patrón canónico del módulo

```js
(function () {
    "use strict";
    const { esc, spec, block } = window.SB.helpers;

    /* ── SSOT: refleja 1:1 _<x>.scss ── */
    const DATA = {
        kinds: ["primary", "secondary", "tertiary"],
        sizes: ["xs", "sm", "md", "lg"]
    };

    /* ── Constructor del markup ── */
    const atom = (mods, label) =>
        `<button type="button" class="${["ft-<x>"].concat(mods).join(" ")}">${esc(label)}</button>`;

    /* ── Base (siempre primero; NO añadir hint de clase: el motor oculta hints-selector) ── */
    const baseArgTypes = [
        { key: "kind", control: "select", desc: "Jerarquía (.ft-<x>--[kind]).",
          options: DATA.kinds.map(k => [k, k]) },
        { key: "size", control: "select", desc: "Tamaño (.ft-<x>--[size]).",
          options: DATA.sizes.map(s => [s, s]) },
        { key: "label", control: "text", desc: "Slot textual." }
    ];
    const baseArgs = { kind: "primary", size: "md", label: "Text" };
    const liveBase = (a) => atom(
        [`ft-<x>--${a.kind}`, `ft-<x>--${a.size}`].filter(Boolean),
        a.label
    );

    /* ── Overview: DOCS, no componente vivo ── */
    const overview = `<div class="cb-docs__inner">…</div>`;

    /* ── Registro ── */
    const X = {
        id: "<x>", name: "<Name>", group: "Atoms", overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ]
    };
    window.SB.register(X);
    window.SB.loadMarkup(X, document.currentScript && document.currentScript.src);
})();
```

### Decisión de `control` por arg

| Eje del SCSS | Control recomendado | Notas |
|--------------|---------------------|-------|
| Enumeración finita (kind, size, align, shape) | `"select"` | `options: arr.map(v => [v, v])` |
| Enumeración finita y CORTA (left/right, on/off semántico) | `"radio"` | Solo 2-4 opciones; el usuario verá las opciones todas. NUNCA para counts. |
| Flag (disabled, hasIcon, isLoading) | `"boolean"` | Toggle switch |
| Texto libre (slot, label, href, title) | `"text"` | |
| Número de items (count) | `"number"` | `min`/`max` razonables del DS. Clamp obligatorio en el render: `Math.max(min, Math.min(maxDuro, parseInt(a.count, 10) \|\| 1))`. Cuando count > variantes disponibles, **ciclar** con `i % DATA.kinds.length`. |

### Layout (`full?`) y harness de visualización

El `render` no devuelve solo el markup del componente: devuelve el **harness** que lo hace
visible y legible en el canvas. Elige el patrón por la naturaleza del átomo (detalle y casos
en `mode-storybook-doc.md` → «Harness de visualización por caso»):

- **Inline** (btn, tag, link, advice, check…): NO `full` (default flex-wrap del canvas).
- **Layout/bloque** (date, list, btngroup, organismos): `full: true` en la story Y en
  `loadMarkup` (`{ full: true }`).
- **Media** (img, embed): **NO a sangre completa**. Envolver en `max-width` realista
  (~480px) para que no llenen el canvas; el aspect-ratio/`width:100%` del SCSS actúa dentro.
  Placeholders de terceros = caja etiquetada (icono/▶ + nombre), NO un bloque opaco.
- **Blanco-sobre-oscuro** (timer `--inline`): envolver en fondo oscuro para que se vea.
- **Revelado por interacción** (skiplink `:focus`, tooltip hover/popover, readMore
  `<details>`, tour `__message`, **drawer del masthead** `.ft-org-masthead--side`): forzar
  visibilidad inyectando el estado abierto que el SCSS ya define (`.active`/`open`), idealmente
  tras un **control `boolean`** (`menuOpen`) para poder abrir/cerrar; + `padding` si el popup se
  recorta; nota corta de la limitación (no anima ni el sub-JS funciona). Es la **opción (A)** de
  «organismo JS-driven».
- **JS-driven / 3rd-party** (scrollbar lib, tour JS, embed SDK, mapas): si el estado se puede
  **congelar en CSS** (un drawer/menú con clase `.active`) → **opción (A)**: control `boolean`
  que añade el elemento abierto (caso `masthead`, mantiene Base + controles). Si el runtime NO se
  congela (mapa Leaflet, SDK, slider con medición) y **existe la página real** del showroom →
  **opción (B) `kind:"page"`** a ese fichero (corre su JS; caso `hiperlocalmap`). Si no hay
  página ni estado congelable → demo estático honesto + documentar la dependencia; nunca falsear
  el DOM que genera el runtime. (Detalle de A/B en §«Organismo JS-driven».)
- **Excepción**: un atom con comportamiento de ancho (raro; p.ej. `.ft-divider`) → `full: true`.

### Overview = solo documentación

Estructura obligatoria:

```html
<div class="cb-docs__inner">
    <h1>Nombre</h1>
    <p class="cb-docs__lead">Descripción de 1 línea.</p>

    <h2>Dependencias</h2>
    <table class="cb-table"><!-- setting.css · core.css · _<x>.scss · JS (si aplica) --></table>

    <h2>Modificadores</h2>
    <table class="cb-table"><!-- 1 fila por modificador real del SCSS --></table>

    <h2>Anatomía</h2>
    <table class="cb-table"><!-- bloque, __elementos --></table>

    <p class="cb-src">Fuente: <code>scss/fourties/<nivel>/<x>/_<x>.scss</code> ·
       markup: <code>fourty/__old-showroom/<nivel>/<nivel>-<x>.html</code></p>
</div>
```

**Prohibido**: incrustar `<button class="ft-btn">` u otro componente vivo dentro del
overview. Eso duplica con las stories y rompe la regla "una story = un estado".

### Naming

- ID del componente = `id` (kebab-case, igual al nombre de la carpeta).
- `name` = visible en sidebar (PascalCase corto, p.ej. `"Btn"`, `"BtnGroup"`, `"Authors"`).
- `group` = `"Atoms"` · `"Molecules"` · `"Organisms"` (fija el sidebar).
- Primera story siempre `id: "base"`, `name: "Base"`. **NO añadir `hint` con el nombre de
  la clase** (`.ft-*`/`[attr]`): el motor los oculta en el sidebar y la clase ya vive en el
  Overview. El `hint` se reserva para descripciones cortas en galerías/subgrupos
  («4 variantes», «offset cabecera fija»).
- Subgrupo de galerías siempre `id: "galleries"`, `name: "Galleries"`, `collapsed: true`.
- Subgrupo de markup (si `loadMarkup`) se publica automáticamente con `name: "Markup"`.

### Variantes por marca

Si el componente tiene `<x>-<marca>.scss`, documentarlo en Overview con una
**tabla por marca**:

| Marca | Archivo | Diferencias |
|-------|---------|-------------|
| `ep` | `<x>-ep.scss` | Tipografía custom |
| `sport` | `<x>-sport.scss` | Color primario diferente |

El motor ya cambia la marca activa (toolbar Brand) → el componente se ve solo con
recargar el iframe. NO duplicar stories por marca; el switch de Brand es el operador.

### Reglas no-negociables (heredadas de `fourty/storybook/README.md §10`)

1. Clases `.ft-*` REALES, nunca inventadas.
2. Overview es DOCS, no componente vivo.
3. Una story = un estado (sin duplicados visuales).
4. `Base` siempre primero.
5. `group:` fija sidebar (la carpeta es solo ergonomía).
6. No tocar `scss/abstracts/`. PATCH only.
7. `.cb-*` (chrome) y `.ft-*` (componente) no se mezclan.
8. Servidor obligatorio para verificar (canvas + CSV + markup async).

---

## checklist

```
Anclaje
[ ] Target del showroom existe en fourty/__old-showroom/<nivel>/<nivel>-<x>.html
[ ] SCSS canónico existe en scss/fourties/<nivel>/<x>/_<x>.scss
[ ] El componente NO está ya migrado en storybook/js/<nivel>/<x>/

Inventario
[ ] Modificadores listados desde el SCSS (no del showroom)
[ ] Familias identificadas (Base + … si aplica)
[ ] Variantes por marca detectadas (<x>-<marca>.scss)
[ ] Dependencias JS detectadas (cds-statics/js/...)

DATA SSOT
[ ] Cada modificador del SCSS aparece en algún array de DATA
[ ] Cero clases inventadas (cero `.ft-<x>--<modificador-no-en-scss>`)
[ ] Si el componente es un asset (SVG/ilustración/mapa): markup VERBATIM del showroom, no demo abstracto

Stories
[ ] `Base` primero, SIN hint de clase (hint solo para descripciones cortas)
[ ] Una story plana por familia (interactiva con sus argTypes)
[ ] Galerías para ejes con 10+ opciones
[ ] `full: true` SOLO en componentes de layout
[ ] `control: "number"` para counts (no radio), con clamp en render
[ ] Familias compuestas (markup verbatim) → story INTERACTIVA propia en Galleries (parse del
    markup real + repeat por count + toggles de modificador), no solo plantillas en Markup
[ ] ORGANISMOS: controles mínimos (un select de variante sobre markup VERBATIM del showroom;
    cero count/text/boolean salvo contenedor homogéneo). Markup extraído con script, sin
    andamiaje del showroom, con rutas /cds-statics. `full: true`.

Overview
[ ] Descripción de 1 línea
[ ] Tabla Dependencias completa (setting.css, core.css, SCSS, JS si aplica)
[ ] Tabla Modificadores (1 fila por modificador real)
[ ] Tabla Anatomía (bloque + __elementos)
[ ] Línea `cb-src` con rutas SCSS + showroom
[ ] CERO componente vivo incrustado

Integración
[ ] storybook/js/<nivel>/<x>/<x>.js creado
[ ] (opcional) storybook/js/<nivel>/<x>/<x>.html con bloques <template>
[ ] Ruta dada de alta en el array PHASES de storybook/js/bootstrap-lazy.js (fase del nivel, orden alfabético)
[ ] storybook/js/meta.js actualizado: SB_META.changes["<id>"] = "new" (o "updated")
[ ] 0 líneas añadidas a fourty/index.html
[ ] FICHA storybook/js/<nivel>/<x>/README.md creada + fila añadida al índice del README de nivel
[ ] 0 escrituras en scss/, cds-statics/, fourty/__old-showroom/<nivel>/<nivel>-<x>.html del showroom

Verificación (manual, post-deploy)
[ ] Sidebar muestra el componente bajo grupo correcto
[ ] Base + cada story renderizan
[ ] Controls actualizan preview en vivo
[ ] Switch de Brand re-renderiza con su CSS
[ ] Toggle Oscuro respeta dark mode real
```

---

## outputs

```
storybook/js/<nivel>/<x>/<x>.js              ← módulo principal (obligatorio)
storybook/js/<nivel>/<x>/<x>.html            ← markup canónico (opcional)
storybook/js/<nivel>/<x>/README.md           ← ficha de contexto del componente (obligatorio)
storybook/js/<nivel>/README.md               ← +1 fila en el índice de componentes del nivel
storybook/js/bootstrap-lazy.js               ← +1 ruta en el array PHASES (ALTA DEL MÓDULO)
storybook/js/meta.js                         ← +1 entrada en SB_META.changes (chivato NEW/UPD)
```

> **Frontera estricta**: este modo SOLO escribe en `fourty/storybook/js/<nivel>/<x>/`
> (módulo + ficha README), añade 1 fila al índice de `fourty/storybook/js/<nivel>/README.md`
> y 1 línea en `fourty/index.html`. Cualquier cambio en `core/`,
> `css/`, `assets/`, `data/`, o en el SCSS / showroom / `cds-statics` es FUERA DE
> ÁMBITO — derivar a `[MODE: STORYBOOK+DOC]` (chrome/engine) o `[MODE: 42DS+SCSS]` (DS real).

### Formato de reporte final

```
## [MODE: STORYBOOK+MIGRATE] — Migración: <Name> (<nivel>)

### Archivos creados/modificados
- storybook/js/<nivel>/<x>/<x>.js   (nuevo, N líneas)
- storybook/js/<nivel>/<x>/<x>.html (nuevo, M bloques <template>)   [si aplica]
- storybook/js/bootstrap-lazy.js (+1 ruta en PHASES)
- storybook/js/meta.js           (+1 chivato en SB_META.changes)

### DATA SSOT (resumen)
- kinds:  [primary, secondary, …]   ← N variantes (1:1 con _<x>.scss)
- sizes:  [xs, sm, md, lg]          ← M tamaños
- …

### Stories generadas
- Base (interactive · hint .ft-<x>)
- <Familia2> (interactive)
- Galleries → Kinds (gallery), All icons (gallery), …
- Markup (subgroup async desde <x>.html, collapsed)

### Modificadores omitidos (si los hay) y razón
- `--experimental` → marcado WIP en _<x>.scss · no incluir

### Variantes por marca detectadas
- ep · sport · regionales (documentado en Overview)

### Dependencias JS
- cds-statics/js/.../<componente>.js (documentado, no integrado en el chrome)

### Verificación pendiente (manual)
- [ ] Sirve y revisa /fourty/index.html

### Para escalar
- Si esta migración expone una carencia del motor (un control nuevo, un decorator…)
  → escalar a [MODE: STORYBOOK+DOC] (operación "engine").
```

---

## invocation

```
[MODE: STORYBOOK+MIGRATE] <target del showroom> [+ alcance opcional]
```

### Ejemplos

```
[MODE: STORYBOOK+MIGRATE] Migra fourty/__old-showroom/atoms/atom-link.html.

[MODE: STORYBOOK+MIGRATE] Migra fourty/__old-showroom/molecules/molecule-tabs.html con todos los
modificadores del SCSS y un <x>.html con 3 ejemplos canónicos.

[MODE: STORYBOOK+MIGRATE] Migra fourty/__old-showroom/organisms/organism-authors.html. Para count
usa control number con min 1, max 12, y ciclo de roles desde un DATA realista.

[MODE: STORYBOOK+MIGRATE] Migra el atom `.ft-tag` (fourty/__old-showroom/atoms/atom-tag.html).
Solo Base + galería de colores; el showroom no usa el resto de modificadores y son WIP
en el SCSS.

# Nivel-página (índice, no parametrización)
[MODE: STORYBOOK+MIGRATE] Indexa fourty/templates/ como stories kind:"page" agrupadas
por familia, brandable:true. Genera storybook/js/templates/templates.js con un script.

[MODE: STORYBOOK+MIGRATE] Indexa fourty/layouts/ por marca (ep/epe/regionales/revistas/
sport/amp), brandable:false (son páginas por-marca).
```

### Anti-ejemplos (lo que NO es STORYBOOK+MIGRATE)

```
# ✗ "Crea un atom nuevo desde cero, no existe en el showroom"
#   → [MODE: STORYBOOK+DOC] (operación add-new) o [MODE: 42DS+SCSS] (construirlo en el DS)

# ✗ "Refactoriza btn.js para usar un control nuevo"
#   → [MODE: STORYBOOK+DOC] (operación modify)

# ✗ "Añade un addon panel nuevo al storybook"
#   → [MODE: STORYBOOK+DOC] (operación engine)

# ✗ "Documenta el componente en MDX y CSF"
#   → [MODE: STORYBOOK] (el upstream, distinto)
```
