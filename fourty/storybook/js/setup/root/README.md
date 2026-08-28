# Setup · Root — ficha de contexto

Ficha para agentes. **Indexa** el módulo; la documentación completa vive en el `overview`
de [`root.js`](root.js).

---

## Identidad

| Campo | Valor |
|-------|-------|
| `id` | `root` |
| `name` | `Root` |
| `group` | `Setup` |
| Clase raíz | — *(no es un componente: no tiene clase `.ft-*`)* |
| Señales | `js` — la story se rellena en `onMount` leyendo el CSSOM del iframe |
| Markup (`root.html`) | **No tiene, y es deliberado** — ver §Por qué no hay markup |

---

## Qué documenta

El bloque `:root` de la **marca activa**: los custom properties (design tokens) que declara
`cds-statics/css/brands/<marca>/setting.css` y que consume todo el DS vía `var(--…)`.

---

## SSOT — se lee EN VIVO, no hay lista hardcodeada

`readRootTokens(frameDoc)` recorre `frameDoc.styleSheets`, se queda con las reglas cuyo selector
es **exactamente** `:root` (excluye `:root[data-theme="dark"]`, que no es la declaración base) y
resuelve el valor vigente con `getComputedStyle(documentElement)`.

**Por qué no puede ser una lista fija**: cada marca declara un set distinto.

| Marca | Fichero | Tokens en `:root` |
|-------|---------|-------------------|
| `ux` | `brands/ux/setting.css` | 113 |
| `ep` | `brands/ep/setting.css` | 118 |
| `epe` | `brands/epe/setting.css` | 117 |
| `sport` | `brands/sport/setting.css` | 148 |
| `regionales` | `brands/regionales/setting.css` | 260 |
| `revistas` | `brands/revistas/setting-{cuore,stilo,viajar,woman}.css` | por submarca (woman: 118) — `setting.css` **no** declara tokens |

> Conteos **solo del bloque `:root`** (que es lo que ve el CSSOM), no de todos los `--x:` del
> fichero: un `grep` ingenuo sobre `setting.css` da cifras infladas porque cuenta también las
> declaraciones de otros selectores y media queries. La cifra buena es siempre la de la cabecera
> del canvas, calculada en vivo.

---

## Carrera con la carga del CSS (no tocar sin entenderla)

`mountFrame()` hace `doc.write()` y llama a `renderCanvas()` de forma **síncrona**
(`core/storybook.js`). Cuando corre el `onMount`, los `<link>` del `setting.css` de la marca
**recién seleccionada** todavía no han cargado: leer el CSSOM ahí devuelve 0 tokens (o los de la
marca anterior).

Por eso `mount()` espera con `requestAnimationFrame` hasta que ningún `<link rel=stylesheet>` tenga
`.sheet === null` (techo de ~3 s), y devuelve un `unmount` que cancela el polling en vuelo — si no,
dos cambios rápidos de marca dejarían dos bucles compitiendo y el resultado de uno pisaría al otro.

---

## Filtrado (in-canvas, no en Controls)

**Tres facetas en AND: texto × categoría × dark.** Todas viven en la barra del canvas y actúan
sobre el DOM ya pintado.

| Faceta | Qué hace |
|--------|----------|
| **Texto** | Casa por **nombre Y por valor**: `#111` encuentra todos los tokens que valen ese color, `gradient` los degradados. Resalta la coincidencia con `<mark>` |
| **Categoría** | Chips con **contador facetado** (cuántos casarían con el texto y el dark actuales). Los que quedan a 0 se atenúan. Re-clic en el activo = quitar filtro |
| **Dark** | Toggle. Los `-dm` ocultos por defecto |

| Atajo | Acción |
|-------|--------|
| `/` | Enfocar el buscador (el atajo del chrome vive en el documento **padre** y no llega al iframe: este es propio) |
| `Esc` | Limpiar (con `stopPropagation`, para no cerrar dropdowns del chrome) |
| Clic en el nombre | Copiar `var(--token)` |

### Por qué NO son Controls

Un control del panel dispara un `renderCanvas()` **completo**: reconstruiría los 266 nodos de
`regionales` solo para ocultar unos cuantos, y el input perdería el foco a cada tecla. En Controls
queda solo `view` (tabla/swatches), que es lo único que cambia el **markup**.

### Eficiencia del filtro

Todo lo caro se hace **una vez**, al cablear:

- **Índice precomputado**: nombre y valor ya en minúsculas + referencia al nodo. Una pulsación
  **no consulta el DOM** ni una vez (ni `getAttribute`, ni `toLowerCase`, ni `querySelectorAll`).
- **Secciones con sus items en un array propio** → contar visibles es un bucle, no un
  `querySelectorAll(":not([hidden])")` por sección (que era O(secciones × items) **por tecla**).
- **`el.hidden` solo se escribe si cambia** → sin invalidaciones de layout inútiles.
- El resaltado `<mark>` solo se recalcula en items **visibles** y con query de ≥2 caracteres.

La query se guarda en `uiQuery` (módulo) para sobrevivir a un cambio de vista o de marca.

---

## Stories

## Categorías (`CATEGORIES` en `root.js`)

**Derivadas de los nombres reales** del inventario de los seis `setting.css`, no inventadas. La
tabla se agrupa por ellas, en este orden:

| id | Regla |
|----|-------|
| `font-family` | `--font-*` que no es métrica |
| `font-metric` | `--font-size-*` · `--font-height-*` |
| `color-scale` | Los 7 ordinales: `primary` → `septenary` |
| `color-neutral` | `black` · `white` · greys · `degraded1..3` |
| `color-functional` | Prefijo `functional-` |
| `color-social` | Lista cerrada de 12 redes |
| `color-game` | Pasatiempos (`sudoku`, `wordle`, `crucigrama`…) |
| `color-product` | `paywall` · `subscription` · `form` · `tag` · `section` · `illustrations` · `premium` |
| `color-other` | Lo que no encaja |
| `other` | Sin prefijo `--color`/`--font` |

> **`color-other` no es dejadez.** En `regionales` el grueso son los **colores de cabecera por
> medio** (faro, levante, empordà, regio7, oviedo…): ~100 tokens cuya lista cambia cada vez que
> entra o sale un medio. Enumerarlos aquí sería crear una lista que caduca sola.

---

## Eje dark mode (`-dm`) — ORTOGONAL, no una categoría

El sufijo `-dm` marca la variante de dark mode de un token (`--color-primary` → `--color-primary-dm`).

**Es casi la mitad del catálogo**: 54 de 115 en `ux`, 129 de 266 en `regionales`.

Cruza todas las categorías, así que **no** está en el selector de categoría sino en su propio
control `dark` (boolean), **desactivado por defecto**: con él encendido cada token aparece
duplicado y la tabla se vuelve ilegible. Cuando hay tokens ocultos, la story lo avisa en vez de
callárselo.

> Esto matiza —sin contradecirlo— lo de abajo: el dark **no redefine** el `:root`; declara tokens
> **aparte** con sufijo `-dm` y los consume bajo `[data-theme="dark"]`. La paleta oscura **convive**
> con la clara, no la sustituye.

---

## Stories

| Story | Kind | Qué muestra |
|-------|------|-------------|
| `base` | `interactive` | Todo el catálogo agrupado por categoría. Único control: `view` (tabla/swatches). El acotado va en la barra del canvas |
| `galleries/colors` | `gallery` | Todos los `--color-*` como swatches (incluye gradientes: `--color-instagram`) |
| `galleries/fonts` | `gallery` | Todos los `--font-*`; las familias se renderizan **con su propia fuente**, las métricas van en tabla |
| `galleries/all` | `gallery` | Tabla completa: token · declarado · computado |

---

## Declarado vs computado

Las dos columnas no son redundantes:

- **Declarado** — el valor literal de `setting.css`. Puede ser una referencia
  (`--font-secondary: var(--font-stack)`), y entonces difiere del computado.
- **Computado** — lo que el navegador resuelve, con la marca activa.

> ⚠️ **El toggle Oscuro NO cambia esta tabla, y es correcto.** El dark del 42DS **no redefine
> tokens**: `scss/base/_dark.scss` no declara ni un custom property (verificado) — sobreescribe
> propiedades directamente bajo `[data-theme="dark"]`. El `:root` es idéntico en claro y en oscuro.
> `isRootSelector()` excluye de todos modos los selectores tipo `:root[data-theme="dark"]` por si
> algún día los hubiera.

---

## Por qué no hay `root.html`

El resto de piezas del storybook tienen un `<x>.html` con `<template data-story>` de markup
canónico copiable. Aquí **no aplica**: los tokens son CSS, no HTML. No existe markup `.ft-*` que
copiar, y fabricar uno sería inventar superficie. Por eso el módulo **no llama a
`SB.loadMarkup`** y no aparece el subgrupo *Markup*.

## El panel `Code` y la regla 9

El canvas de esta story es un **inspector**, con clases propias `sbr-*` (ni `.ft-*` del DS ni
`.cb-*` del chrome). Si dejáramos que el motor derivase el snippet del DOM, el panel `Code`
enseñaría ese harness — lo que **prohíbe la regla 9 del `CLAUDE.md`**.

Por eso las cuatro stories declaran un **`code` explícito** (la constante `CODE`) con lo que un
consumidor copia de verdad: los dos `<link>` (con `setting.css` primero) y un ejemplo de consumo
con `var(--…)`.

---

## Dependencias del inspector

- **Servidor obligatorio.** Con `file://` el CSS del DS no carga, el `:root` sale vacío y la story
  lo dice explícitamente en vez de fallar en silencio.
- No necesita nada de `cds-statics/js/`.

---

## Extensión pendiente

No hay matriz **cross-marca** (comparar los seis `setting.css` de golpe). Exigiría `fetch` de los
otros ficheros y parseo del CSS en crudo, porque el CSSOM solo expone la marca cargada en el
iframe. Hoy se compara cambiando Brand.

---

## Trazabilidad

| Qué | Dónde |
|-----|-------|
| Fuente de los tokens | `cds-statics/css/brands/<marca>/setting.css` |
| SCSS que los genera | `scss/brands/<marca>-setup.scss` |
| Mapa marca → `setting.css` | `BRAND_MAP` en `fourty/storybook/js/core/storybook.js` |
| API del motor usada | `onMount({ stageEl, frameDoc, args })` |
