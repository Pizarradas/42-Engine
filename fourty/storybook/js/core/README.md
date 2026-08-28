# storybook/js/core

**Motor** del Storybook. Reutilizable, agnóstico de componente. Monta el chrome (sidebar
+ canvas iframe + toolbar + sub-toolbar a11y + paneles addon + docs view) y consume los
componentes registrados con `window.SB.register(...)`.

```
core/
├── README.md
└── storybook.js     ← ~1000 líneas, una IIFE autocontenida
```

---

## Filosofía: agnóstico de componente

El motor **no conoce** `btn`, `btnGroup`, `authors` ni ningún componente concreto. Define
una API (`SB.register`) que los módulos del componente consumen. Esto permite:

- Añadir componentes sin tocar el motor.
- Eliminar componentes sin tocar el motor.
- Que el motor sea testable por sí solo (con un componente mock).

El motor solo conoce:
- **`BRAND_MAP`**: 8 marcas hardcoded del DS (showroom-brand-*, mapping a archivos CSS).
- **`BG_GROUPS`**: 3 grupos de helpers de fondo (Neutros, Marca, Degradados).
- **El árbol `window.SB_BRANDS`**: matriz CSV de medios reales (159 outlets) — solo si la
  capa de datos `brand-data.js` los cargó.

---

## API expuesta (`window.SB`)

```js
window.SB = {
  helpers: { esc, spec, block },
  register(def) { components.push(def); },
  loadMarkup(def, scriptSrc, opts?) { /* async fetch + add subgroup "Markup" */ },
  refresh() { /* re-mount sidebar tree (tras registro async) */ }
};
```

### Detalles

- **`register(def)`** — el módulo del componente pasa su definición. El motor la guarda
  en `components[]` (privado). El primer `buildTree()` la incorpora al sidebar.
- **`loadMarkup(def, scriptSrc, opts)`** — async. Hace `fetch(scriptSrc.replace(/\.js$/, ".html"))`, parsea con `DOMParser`, extrae `<template data-story="...">`, monta un subgroup
  "Markup" plegado, **agenda un refresco COALESCIDO** (`scheduleSidebarRefresh`, no un
  `refresh()` directo). Fallo silencioso si no hay servidor o el archivo no existe.

  Adicionalmente, **extrae los `<style>` top-level** del `.html` (fuera de cualquier
  `<template>`) y los almacena en `def._sharedStyle` como string concatenado. Los
  `<style>` DENTRO de un `<template>` viajan en su `innerHTML` y son scoped a su story
  (no requieren tratamiento). El renderer (`renderCanvas`) inyecta `_sharedStyle` como
  primer hijo del stage en cada story del componente, con `data-cb-shared` para que el
  snippet del panel Code lo excluya. Ver §"Estilos experimentales" en
  `fourty/storybook/README.md` para el workflow de promoción al SCSS.
- **`refresh()`** — re-monta el árbol del sidebar (`buildTree`) conservando la selección
  actual y la query del search. Idempotente. **Coalescing:** los disparadores async
  (`register`, `attachStory`, `attachSubgroup`, `loadMarkup`) NO lo llaman directo, sino vía
  `scheduleSidebarRefresh()` (coalesce por `requestAnimationFrame`): ≈180 `loadMarkup` que
  resuelven en cascada colapsan en ~1 rebuild por frame en vez de ~180 completos. Es loss-free
  (el rAF corre tras las inserciones síncronas del frame y lee `components[]` completo). Un
  llamador externo puede seguir invocando `refresh()` directo para un remonte inmediato.

---

## Estructura interna del motor (boot)

`boot()` se llama al `DOMContentLoaded`. Hace:

1. **`root.innerHTML = CHROME`** — inyecta el shell HTML (sidebar + main + resizers + solapa fullscreen + SVG defs de simulación de visión).
2. **Captura de referencias DOM** — `elTree`, `elFrame`, `elMain`, `elPanelBody`, `elDocs`.
3. **Inicialización del estado** — todas las `let` declaradas al principio del boot:
   ```js
   let frameDoc, stageEl;        // iframe doc + stage element
   let darkOn, curBg;            // theme + fondo
   let curBrandKey, curBrand;    // marca activa (key + objeto BRAND_MAP)
   let curCabecera;              // {bodyClass, brandGroup, label} | null — outlet del CSV (eje único)
   const curCombos;              // Set<body_class> — combinables (is_combinable) apilados (eje multi)
   let fsOn;                     // fullscreen on/off
   let curVision, curTextSize, curForcedColors;
   let reducedMotion, focusVisible, textSpacing, inspectOn;
   ```
4. **`snapshotDefaults()`** — captura snapshot inmutable de `args` por story (para el
   botón Reset del panel Controls).
5. **`buildTree()`** — recorre `components[]`, agrupa por `group:`, monta el árbol del
   sidebar con accordion plegable. **Orden ALFABÉTICO de componentes dentro de cada grupo**
   (`groups[g].sort((a,b)=>a.name.localeCompare(b.name,'es'))`): lo impone el motor, no el orden
   de `<script>` → todo componente nuevo (MIGRATE/DOC/índice-página) cae en su sitio alfabético
   solo. NO se ordenan el orden de GRUPOS (`GROUP_ORDER` + no-canónicos al final) ni las stories
   de un componente (Base primero — orden semántico). **Grupos plegados por defecto salvo el primero**
   (`makeBody(gh, gi > 0)`): el sidebar arranca limpio (solo cabeceras de grupo) y el primer
   grupo deja ver su contenido. **Render PEREZOSO** (`lazyGroups`): al arranque solo se POBLAN
   el 1er grupo y el de la story activa (`buildNow = gi === 0 || curComp.group === g` →
   `populateGroup`); los demás se registran como builders diferidos y se montan **al expandirse**
   (toggle en `makeBody`) o **al buscar** (`applyFilter` los puebla todos, una vez). Evita crear
   ~1000+ nodos (cada uno con SVG inline + listener) de golpe — y que cada `refresh()` async (un
   markup que llega) reconstruya el árbol entero; el coste se notaba al desplegar, sobre todo en
   Firefox. `collapseAncestors` NO oculta cabeceras sin query (un body vacío puede ser un grupo
   perezoso, no «sin resultados»). **Componentes plegados por defecto** (`makeBody(ch, true)`):
   el grupo muestra una lista limpia de nombres. La story activa expande sus ancestros (grupo
   + componente) con `expandAncestors()` — por eso al boot el grupo de la primera story queda
   abierto aunque no fuera el primero. **El plegado por defecto NO afecta a la búsqueda**:
   `applyFilter` fuerza visibles las ramas con coincidencias e ignora el `is-collapsed` cuando
   hay query (solo lo respeta con la query vacía). **Contadores de items**: cada cabecera de
   grupo y de componente lleva un badge `.cb-tree__count` con el nº de stories navegables
   (`storyCount(c)` = stories planas + las de subgrupos; **excluye el Overview docs**). Es
   **estático = TOTAL** (como Storybook); la búsqueda no lo altera — el recuento de resultados
   vive en `#cbSearchMeta`. Un `hint` que sea **selector** (`.clase`/
   `[attr]`) NO se renderiza como etiqueta (`isSelectorHint()`): el nombre de clase ya vive en
   el Overview; el `hint` se reserva para descripciones cortas. (Sigue indexándose para el buscador.)
6. **`mountFrame()`** — escribe el documento del iframe con `frameHTML()`.
7. **`select(curComp, sub, story)`** — selecciona la primera story por defecto.
8. **Wire de event listeners**: search, panel tabs, brand, viewport, cabecera, bg, dark,
   fullscreen, sub-toolbar a11y (visión, texto, contraste, motion, focus, spacing,
   inspect), resizers, atajos de teclado.

---

## El canvas es un IFRAME

**Decisión clave**: el preview se monta dentro de un `<iframe id="cbFrame">`, no en el
documento del padre.

**Motivo**: los componentes del DS usan media queries reales (`@include min-screen(768)`,
grid `colXs/Sm/Md`…) que responden al ancho de la ventana. Sin iframe, el "Viewport" del
toolbar solo encogería un `<div>`, no dispararía las media queries. Con iframe, cambiar
el ancho dispara `@media (max-width: ...)` de verdad, igual que un dispositivo real.

### `frameHTML()` — el HTML completo del documento del iframe

```js
function frameHTML() {
    const bodyCls = ["fourty", "ft-skin", "ft-skin--showroom"].concat(curBrand.classes);
    cabeceraClasses().forEach(c => bodyCls.push(c));   // outlet (medio+vertical) + combinables apilados
    if (darkOn) bodyCls.push("cb-dark");
    if (fsOn) bodyCls.push("cb-fullscreen");
    if (vpFixed) bodyCls.push("cb-vp-fixed");           // viewport ≠ Responsive → .cb-canvas sin padding
    if (curForcedColors) bodyCls.push("cb-a11y-fc-" + curForcedColors);
    if (reducedMotion) bodyCls.push("cb-a11y-rmotion");
    if (focusVisible) bodyCls.push("cb-a11y-focus");
    if (textSpacing) bodyCls.push("cb-a11y-spacing");
    return '<!DOCTYPE html><html lang="es" data-theme="' + (darkOn ? "dark" : "light") + '">'
        + '<head>'
        +   '<meta charset="utf-8">'
        +   '<base href="' + location.href + '">'        // resuelve rutas relativas
        +   '<link rel="stylesheet" href="' + cssBase + 'brands/' + curBrand.css + '">'
        +   '<link rel="stylesheet" href="' + cssBase + curBrand.index + '">'
        +   '<style>...</style>'                          // layout del stage + reglas a11y
        + '</head>'
        + '<body class="' + bodyCls.join(" ") + '">'
        +   '<div class="cb-canvas" id="cbStage" data-id="sb-canvas"></div>'
        + '</body></html>';
}
```

**Por qué `<base href="location.href">`**: el iframe se construye con `doc.open() + doc.write()`, no carga desde una URL. Sin `<base>`, las rutas relativas (`../cds-statics/...`) se resolverían contra `about:blank`. Con `<base>` apuntando a la URL del padre, las rutas se resuelven igual que en el padre.

**Padding del canvas = solo Responsive**: el `<style>` inyectado da al `.cb-canvas` un gutter de `padding:40px`, pero solo en viewport **Responsive**. La clase `cb-vp-fixed` (en `bodyCls` arriba) activa `body.cb-vp-fixed .cb-canvas{padding:0}` en **cualquier viewport fijo** (preset o medida manual) → inspección edge-to-edge en la resolución simulada. La propaga `applyViewport()` en vivo (`contentDocument.body.classList.toggle`, sin remontar) y `frameHTML` la reañade tras un remount. Solo el padding; el `gap:16px` se mantiene (fullscreen sí quita ambos).

### El iframe NO ejecuta JS de componente (solo CSS + markup)

El documento del iframe carga **únicamente** el CSS de la marca (`setting.css` + `*-index.css`)
y un `<style>` del chrome. **No** carga ningún JS de `cds-statics/js/*` ni vendors (Chartist,
Swiper, GSAP, smooth-scrollbar…). Además, el markup de cada story se inyecta con
`stageEl.innerHTML = body` y **los `<script>` insertados vía `innerHTML` no se ejecutan**
(spec del navegador). Es deliberado: principio *zero-toolchain* + el core es agnóstico de
componente.

**Consecuencia — convención para componentes JS-driven / data-driven**: si un componente
necesita un runtime de terceros para **pintar** su contenido (p.ej. `pie-chart` → Chartist
dibuja el SVG a partir de datos de producción keyados por `idgraph`), su story **no** puede
verse "como en el showroom". La regla del proyecto es:

- **Estado estático honesto**: reproducir el estado visible que sí es CSS (modal/dropdown/
  popover/accordion abiertos·activos, slides apilados, tab activa con `[hidden]` en los demás…).
- **Placeholder + eco de API** cuando el contenido lo pinta un runtime que el storybook no
  ejecuta: caja acotada y etiquetada (no una caja vacía que llene el canvas) + eco en vivo de
  la API real que controlan los controles (p.ej. el `data-config`). El markup verbatim
  completo vive en el subgrupo **Markup**.
- **Nunca** falsear el DOM que inyecta el runtime ni cargar el vendor en el iframe. El showroom
  es la demo de integración viva; el storybook documenta el **contrato** del componente
  (clases, modificadores, controles, markup). Son complementarios, no redundantes.

### `assets` — CSS extra por componente (organismos brand-specific)

Algunos organismos tienen su CSS **solo** en un fichero de marca (`brands/<marca>/organism/<x>.css`)
que **no** está en el bundle de la marca por defecto del canvas (`ux-index.css`): p.ej.
`header-revistas-woman` (revistas).
Inyectados sin ese CSS, salen **sin estilar**. La página de showroom los resolvía añadiendo un
`<link>` extra al CSS del componente sobre `ux-index.css`; el motor replica eso con el campo
**`assets`** en el `register`:

- `assets: ["/cds-statics/css/.../x.css", …]` — array de hrefs, **o**
- `assets: function(args){ return [href…] }` — **per-variante** (p.ej. multibrand devuelve el CSS
  de `ep` o `epe` según `args.variant`).

`renderCanvas` evalúa `assets` (array o función de `args`) y antepone los `<link rel="stylesheet"
data-cb-asset>` al markup en `stageEl`. **Un `<link>` insertado vía `innerHTML` SÍ carga y aplica**
(a diferencia de `<script>`), y al re-evaluarse en cada render, cambiar la variante recarga el CSS
de la marca correcta. Los `data-cb-asset` se excluyen del snippet del panel Code (como `_sharedStyle`).

### Excepción: páginas completas — story `kind:"page"`

Los niveles **no-componente** del showroom (templates, layouts, widgets, pocs, recursos) son
**páginas completas hechas a mano**, no fragmentos. Para ellas el render es el INVERSO del de
componentes: en vez de inyectar markup en `stageEl`, el iframe **navega al fichero** y carga su
**propio `<head>`/CSS/JS** (los scripts SÍ corren — es una navegación real, no `innerHTML`).

```js
story = { id, name, kind: "page", src }   // src relativo a index.html, p.ej. "templates/template-noticia.html"
```

Piezas del motor (todas en `storybook.js`):

- **`framePage`** — estado: `src` cargado como página, o `null` = el chrome posee el iframe
  (doc escrito por `mountFrame`). Es la fuente de verdad de «¿hay una página cargada?».
- **`navigatePage(src)`** — setea `elFrame.src = src`, anula `stageEl`/`frameDoc` (ahora los
  posee la página), devuelve si navegó de verdad (para enganchar el `load`). `mountFrame()` pone
  `framePage = null` al recuperar el iframe para el chrome.
- **`select()`** ramifica: `kind:"page"` → `navigatePage` + `setPageGlobals` + (si brandable)
  aplica marca tras `load` + **`applyPageArgs()`** (si la página tiene controles); al volver a un
  componente, si `framePage !== null` → `mountFrame()` reconstruye el doc del chrome. `renderCanvas`
  está **guardado** contra docs/page (no escribe en un `stageEl` inexistente); `renderPanel` muestra
  «sin controles» SALVO que la página declare `argTypes` (entonces la pestaña Controls los renderiza).
- **`applyPageArgs()`** — equivalente a `renderCanvas()` para páginas con controles: no reescribe
  markup (el iframe posee el doc) sino que **muta el documento vivo** (same-origin). Una story
  `kind:"page"` puede declarar `argTypes` + `args` igual que una interactiva, donde cada argType
  `boolean` lleva además **`bodyClass`**: el motor togglea esa clase en el `<body>` de la página
  según el arg. Caso real: `masthead` expone `minimal` (`bodyClass:"minimal-header"`) en sus cinco
  estados → conmuta el modificador de ancestro `.minimal-header .ft-org-masthead` sobre la página
  viva, conviviendo con su menú/scroll. Se invoca tras el `load` y en cada cambio de control
  (`renderControls` usa `applyPageArgs` en vez de `renderCanvas` para páginas). No colisiona con
  `applyBrandToPage` (estos modificadores no los captura `BRAND_BODY_RE` → sobreviven al swap de marca).
- **`setPageGlobals(story)`** — atenúa/bloquea (clase `.cb-globals.is-disabled`) los globals que
  no aplican. **Oscuro SIEMPRE operativo** (dark = `data-theme` en `<html>`, mecanismo universal
  del DS → toda página lo soporta; `applyDarkToPage` lo aplica al alternar y al cargar). En
  **brandable** (templates) además **Brand·Cabecera** operativos; en **no brandable** (layouts)
  Brand·Cabecera inertes. **Fondo** inerte en toda página. **Viewport·Visión·Fullscreen** siempre
  intactos (viven en el iframe **padre** → sobreviven a la navegación).
- **`brandable` + `applyBrandToPage(brandKey)`** — las **templates** son multimarca
  (`brandable:true`): el motor NO inertiza Brand/Cabecera/Oscuro; alcanza el `contentDocument`
  (same-origin) y conmuta `#brandStyles-root`/`#brandStyles` + clases `ft-brand-*` **y la del
  outlet de Cabecera** (`body_class` del CSV) del `<body>` + `data-theme`, **réplica de
  `cds-statics/js/showroom/showroom-init.js`** (`BRAND_MAP` == su `brandClassMapping`). Las
  clases inyectadas se rastrean en `pageAppliedClasses` para retirarlas limpio al reconmutar (la
  cabecera regional no la captura `BRAND_BODY_RE`). Se aplica tras el `load` (los `<script defer>`
  de la página ya corrieron → el swap gana); marca/cabecera persisten como global. **Layouts** son por-marca →
  `brandable:false` (Brand grisado).

> El **índice** de páginas (`storybook/js/<nivel>/<nivel>.js`, autogenerado) lo escribe
> `[MODE: STORYBOOK+MIGRATE]`. La **maquinaria** `kind:"page"`/`brandable` es del motor
> (`[MODE: STORYBOOK+DOC]`). Requiere SERVIDOR (el iframe carga ficheros por URL).

### `mountFrame()` — (re)monta el documento del iframe

```js
function mountFrame() {
    const doc = elFrame.contentDocument;
    doc.open(); doc.write(frameHTML()); doc.close();
    frameDoc = doc;
    stageEl = doc.getElementById("cbStage");
    if (stageEl) {
        if (curBg) stageEl.classList.add(curBg);
        stageEl.addEventListener("click", onStageClick);
    }
    // Re-aplicar estado que vive DENTRO del iframe doc (se pierde al reescribirlo)
    applyTextSize();
    refreshBgSwatches();
    if (inspectOn) activateInspect();
    if (curStory) renderCanvas();
}
```

**Cuándo se llama `mountFrame()`**:
- Al boot (primera carga).
- Al cambiar de marca (`#cbBrand` change).
- Al seleccionar una cabecera del CSV (`#cbCabecera` selection).

**Cuándo NO**:
- Al cambiar el fondo (solo añade clase a `stageEl`).
- Al activar dark mode (solo toggle `data-theme` y clase en body).
- Al cambiar la story (renderCanvas reescribe solo `stageEl.innerHTML`).

Distinción crítica: `mountFrame` es caro (reescribe el doc, recarga el CSS). Solo cuando
cambia algo que afecta a la cabecera del documento.

---

## Estado: qué vive dónde

| Estado | Dónde se almacena | Persiste al `mountFrame` | Persiste entre sesiones |
|--------|-------------------|--------------------------|-------------------------|
| `framePage` | Variable en boot() | **No** (`mountFrame` lo pone a `null`) | No |
| `curBrand` | Variable en boot() | Sí (lo lee `frameHTML` siguiente) | No |
| `curCabecera` | Variable en boot() | Sí (clases en bodyCls) | No |
| `curCombos` | Set en boot() | Sí (clases en bodyCls vía `cabeceraClasses()`) | No |
| `darkOn` | Variable + `localStorage["darkMode"]` | Sí | **Sí** (única persistencia) |
| `curBg` | Variable; clase en stageEl | No (se re-aplica tras mount) | No |
| Viewport (W×H) | `elFrame.style.width/height` (elemento padre) | Sí (vive en el padre) | No |
| `fsOn` | Variable + clase en body padre | Sí | No |
| `curVision` | Variable + `elFrame.style.filter` (padre) | Sí (vive en el padre) | No |
| `curTextSize` | Variable + `frameDoc.documentElement.style.fontSize` | No (se re-aplica) | No |
| `curForcedColors` | Variable; clase en bodyCls | Sí | No |
| `reducedMotion`/`focusVisible`/`textSpacing` | Variables; clases en bodyCls | Sí | No |
| `inspectOn` | Variable; listeners + overlay en frameDoc | No (se re-inyecta) | No |

**Patrón canónico** para "qué pasa al cambiar marca":
1. Lo que vive en el PADRE (filter, viewport, fullscreen class) sobrevive automático.
2. Lo que vive en el IFRAME (texto raíz, listeners, overlay del inspector) se pierde →
   hay que re-aplicar en `mountFrame()`.
3. Lo que es clase en `bodyCls` se incluye en `frameHTML()` desde el inicio → sobrevive.

---

## Toolbar principal (Canvas)

| Control | ID | Tipo | Maneja |
|---------|------|------|--------|
| Brand | `cbBrand` | `<select>` nativo | Cambio de marca → `mountFrame` con CSS nuevo |
| Cabecera | `cbCabecera` | `.cb-csel` custom | **2 ejes**: outlet (single → auto-sync Brand + `mountFrame`) · combinables (multi-toggle → apilados, no cierra menú, no toca Brand) |
| Viewport | `cbViewport` + `cbVpW` + `cbVpH` | `<select>` + 2 inputs | Cambia `elFrame.style.width/height`; mezcla presets del DS y resoluciones prototípicas |
| Fondo | `cbBg` | `.cb-csel` custom con swatches | Toggle clase en `stageEl` |
| Oscuro | `cbDark` | toggle | Coordina `data-theme` + `cb-dark` en root/iframe/padre |
| Fullscreen | `cbFullscreen` | `.cb-icobtn` | Toggle clase `cb-fullscreen` en body padre + solapa `cbExitFs` |

### Catálogo actual de viewport

- **Responsive** — ancho y alto automáticos.
- **Móvil compacto · Xs** — `320×640`
- **Móvil base · Xs** — `360×640`
- **Móvil ancho · Xs** — `375×667`
- **Móvil alto · Xs** — `390×844`
- **Móvil grande · Xs** — `412×915`
- **Phablet · Sm** — `600×960`
- **Tablet mini · Sm** — `768×1024`
- **Tablet base · Md** — `800×1280`
- **Portátil compacto · Lg** — `1024×768`
- **Escritorio base · Xl** — `1280×800`
- **Escritorio amplio · Xl** — `1440×900`
- **Personalizado** — el select deja de imponer valor y mandan los campos manuales.

Los presets etiquetados con `Xs/Sm/Md/Lg/Xl` señalan el breakpoint dominante por ancho.
Los intermedios sirven para probar casos reales de prototipado sin alterar la lógica del DS:
el motor sigue parseando cualquier preset como `ancho x alto`.

### Mapping Cabecera → Brand (`groupToBrand`)

El CSV (rediseño 02/2026) trae la marca del medio en la columna `ds__group`; el outlet la
expone como `brandGroup` y el motor la traduce a una key de `BRAND_MAP` con una tabla directa.
Sustituye al antiguo `mediaToBrand(mediaClass)` (la columna `media_associated_class` se retiró).

```js
const GROUP_BRAND = {
    EP: "showroom-brand-ep",
    EPE: "showroom-brand-epe",
    SPORT: "showroom-brand-sport",
    REGIONALES: "showroom-brand-regionales"
};
function groupToBrand(group, mediaSlug) {
    const g = (group || "").toUpperCase();
    if (GROUP_BRAND[g]) return GROUP_BRAND[g];
    if (g === "REVISTAS") {                       // marca-paraguas con varias submarcas
        const key = "showroom-brand-" + (mediaSlug || "").toLowerCase();
        return BRAND_MAP[key] ? key : "showroom-brand-showroom";
    }
    return "showroom-brand-showroom";
}
```

`EP·EPE·SPORT·REGIONALES` mapean directo (cada uno es marca de un solo medio; todos los
regionales caen en `showroom-brand-regionales`). **`REVISTAS`** es marca-paraguas con varias
submarcas: se resuelve por el **slug del medio** (= `body_class` de la principal → `parentClass`
en hijas, `bodyClass` en la principal): `cuore`→`showroom-brand-cuore`, `woman`, `stilo`,
`viajar`. El resultado se guarda en `curCabecera.brandKey` (lo usa la cascada Marca→Cabecera).
`ALL`/desconocido, o un slug de revista sin entrada en `BRAND_MAP` (p.ej. `esncial`) → showroom (ux).

---

## Sub-toolbar A11y

| Control | ID | Tipo | Mecanismo |
|---------|------|------|-----------|
| Visión | `cbVision` | `<select>` con 11 opciones | `elFrame.style.filter` (SVG `feColorMatrix` o CSS `grayscale/blur`) |
| Texto | `cbTextSize` | `<select>` con 6 escalas | `frameDoc.documentElement.style.fontSize` |
| Contraste | `cbForcedColors` | `<select>` con 4 opciones | Clase `cb-a11y-fc-*` en body iframe |
| Movimiento | `cbReducedMotion` | toggle | Clase `cb-a11y-rmotion` en body iframe |
| Foco | `cbFocusVisible` | toggle | Clase `cb-a11y-focus` en body iframe |
| Espaciado | `cbTextSpacing` | toggle | Clase `cb-a11y-spacing` en body iframe |
| Medidas | `cbInspect` | toggle | Listeners mousemove + overlay div dentro del iframe |

**Patrón uniforme** para los toggles a11y: helper `bindA11yToggle(id, clase, setter)` que
toggle la clase en `frameDoc.body` y actualiza el setter local. El inspector (`Medidas`)
es la excepción — requiere lógica procedural (listeners, rAF, overlay div).

---

## Paneles addon (debajo del canvas)

| Pestaña | Función | Estado |
|---------|---------|--------|
| Controls | Manipula `args` de la story activa | Lee `activeArgTypes()`, renderiza inputs |
| Actions | Log de clicks sobre button/a del canvas | Array `actions[]`. `onStageClick` hace `preventDefault` en `<a>` para no navegar en el canvas, **salvo** si el enlace está dentro de un `<summary>` (debe disparar el toggle nativo del `<details>`, p.ej. ReadMore). |
| Accessibility | Heurísticos básicos (nombre accesible, native, type, disabled) | Recorre `stageEl.querySelectorAll("button,a")` |
| Code | Snippet HTML del stage (SVGs colapsados) | Deriva de `stageEl.children` |

### Tipos de control disponibles

| `control` | Renderiza | Notas |
|-----------|-----------|-------|
| `"text"` | `<input type="text">` | Para slots y strings libres |
| `"select"` | `<select>` nativo | `options: [[value, label], ...]` |
| `"radio"` | Botones agrupados estilo segmented | Solo para enumeraciones finitas |
| `"boolean"` | Toggle switch | Para flags |
| `"number"` | `<input type="number">` | Para counts. `min`/`max`/`step` opcionales. El render del componente debe hacer su propio clamp. |

---

## Dropdown custom `.cb-csel`

Widget reutilizable que reemplaza a `<select>` nativo cuando necesitamos:
- Iconos en las opciones (no se puede en `<select>` nativo): en Cabecera, `.cb-csel__sw` es un
  checkbox de selección; en Visión, una muestra circular con el filtro aplicado.
- Search bar interno (filter en vivo).
- Group headers con count visible.
- Footer sticky.

Estructura HTML:

```html
<div class="cb-csel" id="cb<X>">
  <button class="cb-csel__trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
    <span class="cb-csel__sw"></span>
    <span class="cb-csel__lbl">label</span>
    <svg class="cb-csel__caret">...</svg>
  </button>
  <div class="cb-csel__menu" role="listbox" hidden>
    <!-- (Cabecera only) -->
    <div class="cb-csel__search"><input class="cb-csel__search-input"></div>
    <div class="cb-csel__active"><!-- chips de combinables activos (eliminables) --></div>

    <button class="cb-csel__opt cb-csel__opt--principal" role="option" data-value="..." aria-selected="false">
      <span class="cb-csel__sw"></span>                     <!-- checkbox -->
      <span class="cb-csel__opt-label">Nombre</span>
      <span class="cb-csel__opt-tag">principal</span>       <!-- solo la cabecera principal -->
      <span class="cb-csel__opt-region">Región</span>      <!-- chip -->
    </button>

    <div class="cb-csel__group">
      <span class="cb-csel__group-name">GROUP</span>
      <span class="cb-csel__group-count">9</span>           <!-- chip -->
    </div>

    <!-- (Cabecera only) -->
    <div class="cb-csel__footer">209 cabeceras</div>
  </div>
</div>
```

A11y: `aria-haspopup`, `aria-expanded`, `role="listbox"`, `role="option"`, `aria-selected`, `aria-live="polite"` en el counter del footer.

Comportamiento:
- Click trigger → toggle menu.
- Click outside → cierra (listener añadido al abrir, removido al cerrar).
- Esc → cierra y devuelve foco al trigger.
- Cabecera específico: filter en vivo con `data-search` (label + región + media +
  body_class normalizado accent-insensitive), grupos con todos los hijos ocultos se
  ocultan también, footer actualiza "X de N".

### Cabecera — dos ejes: outlet + combinables

El dropdown de Cabecera compone el `<body>` desde el CSV (`SB_BRANDS`) sobre **dos ejes
ortogonales**, replicando la composición real de producción (`ft-brand-ep ep badalona
noticia premium`):

1. **Outlet** (`data.byMedia`, **selección única**, `.cb-csel__opt`): cabecera del medio.
   Cada grupo de medio incluye su **cabecera principal** (la portada, fila
   `is_combinable=FALSE` + `is_associated=FALSE` del CSV → `isPrincipal`): va la **primera**,
   distinguida con la pastilla «principal» (`.cb-csel__opt--principal`); el resto son sus
   verticales/hyperlocales.
   Setea `curCabecera = {bodyClass, brandGroup, label}` y **auto-sincroniza Brand**
   (`groupToBrand(brandGroup)`, de `ds__group`). Cierra el menú al elegir. Una sola cabecera
   activa. Los bloques de medio
   van **ordenados por comunidad autónoma** (alfabético) y nombre de medio; outlets alfabéticos
   dentro (todo resuelto en `brand-data.js` → el render solo itera `data.byMedia`).
2. **Combinables** (`data.combinables`, **multi-selección**, `.cb-csel__opt--combo`):
   ítems `is_combinable=TRUE` del CSV (tipos de página y modificadores de body — `portada`,
   `noticia`, `premium`, `has-tapbar`, `tag`, `cerca`…). Son region ALL → **se APILAN**
   sobre el outlet/marca vigente, **sin tocar Brand** y **sin cerrar el menú** (toggle on/off).
   Estado en `const curCombos = new Set()`. Anclados en su **propio bloque al fondo** del
   selector, debajo de las cabeceras.

El icono izquierdo de cada opción (`.cb-csel__sw`) es un **checkbox check/no-check** dirigido por
`aria-selected` (mismo sistema visual para outlets y combinables; sustituye al antiguo swatch de
color de marca, ya sin dato en el CSV). CSS en `css/storybook.css` § «Cabecera: checkbox».

**Barra de combinables activos** (`.cb-csel__active`, sticky bajo el buscador): además del
contador `+N` del trigger, `renderActiveCombos()` pinta un **chip eliminable por cada combinable
apilado** (orden CSV; label leído de su opción). La ✕ del chip lo quita (desmarca la opción +
`curCombos.delete` + re-render). Se actualiza al togglear un combinable, al quitar un chip y al
construir el menú. Comunica **qué** se ha sumado, no solo cuántos, y agiliza retirarlo.

`cabeceraClasses()` es la **fuente única** que compone ambos ejes
(`[parentClass, bodyClass, ...combos]`; la marca `ft-brand-*` va por el eje Brand, no aquí). El
**`parentClass` es la traza**: al elegir una hija (vertical/hyperlocal) se añade también el
`body_class` de su medio principal (la página vive dentro del medio), p.ej. *Compras* de Cuore →
`cuore compras`. Al elegir la propia principal, `parentClass=""`. La consumen `frameHTML()` (componentes) y
`applyBrandToPage()` (páginas brandable). El reset por cascada Marca→Cabecera limpia **solo el outlet** (combinables son
brand-agnósticos y persisten). El footer cuenta "cabeceras" (outlets); los combinables se
reportan aparte al filtrar.

Implementación: ver el bloque `Toolbar: fondo` y `Toolbar: Cabecera` en
`core/storybook.js`.

---

## Inspector de medidas

Toggle en sub-toolbar A11y (`cbInspect`). Activado:

1. Inyecta `<div id="sb-inspect-overlay">` dentro de `frameDoc.body` (z-index máximo,
   pointer-events: none, contiene `.sb-inspect-box` + `.sb-inspect-tip`).
2. Escucha `mousemove` en `frameDoc` con throttle `requestAnimationFrame`.
3. Para el elemento bajo cursor: `getBoundingClientRect()` + `getComputedStyle()`.
4. Actualiza `.sb-inspect-box` (outline + tinte) y `.sb-inspect-tip` (selector + W×H +
   font-size + padding + margin).
5. Smart positioning del tooltip: debajo del elemento por defecto, arriba si no hay
   espacio, clamped al viewport horizontal.

Persistencia: al `mountFrame()`, el iframe doc se reescribe → overlay y listeners se
pierden. Reinyecta si `inspectOn === true`.

---

## Convenciones de naming

- IDs DOM: prefijo `cb` (`cbBrand`, `cbVision`, `cbInspect`…).
- Clases del chrome: prefijo `cb-` (`.cb-app`, `.cb-side`, `.cb-csel`…).
- Variables de estado: descriptivas, sin prefijo (`darkOn`, `curBrand`, `inspectOn`).
- Functions: descriptivas en camelCase (`mountFrame`, `applyVision`, `bindA11yToggle`).
- Helpers compartidos con módulos: vía `window.SB.helpers` (`esc`, `docsTable`, `frameworkBlock`, `changeBlock`, `deprecationBlock`, `removeBlock`...).
- El renderer de Docs (`renderDocs`) normaliza el arranque de cada `overview` con `h1` + `cb-docs__lead`: inserta un bloque automático de `Uso recomendado` (prioriza overrides por componente y, si no existen, deriva una frase breve desde la propia lead) y recoloca `warn` / `Deprecated` / `Removed` delante del desarrollo técnico.

### `changeBlock(def)` — registro de cambios en Overview

Genera una tarjeta semántica `<article>` para documentar cambios relevantes de un componente.
La fecha se recibe en ISO (`YYYY-MM-DD`) y se visualiza como `DD/MM/YYYY` dentro de `<time>`.

```js
changeBlock({
    type: "added" | "changed" | "fixed" | "accessibility" | "docs" | "breaking",
    date: "2026-08-11",       // obligatorio para una traza válida
    title: "Título breve",
    summary: "Descripción HTML breve.",
    scope: "Alcance HTML opcional.",
    impact: "Impacto HTML opcional.",
    files: ["ruta/uno", "ruta/dos"],
    note: "Nota HTML opcional."
})
```

`type`, `date`, `title` y `summary` forman el contrato mínimo editorial. Un tipo desconocido
degrada a `changed`; una fecha no ISO se muestra como «Fecha no documentada». Las rutas de
`files` se escapan y renderizan como `<code>`. `summary`, `scope`, `impact` y `note` admiten
HTML controlado del propio módulo, igual que los demás helpers documentales.

Uso: bajo un único `<h2>Registro de cambios</h2>`, con registros en orden descendente. No
sustituye al changelog de releases ni a los chivatos `SB_META.changes`.

---

## Patrón "feature opcional"

Cuando una feature depende de un recurso externo (CSV, iconos extra), se aplica el
patrón `try-and-degrade`:

```js
if (window.SB_BRANDS_READY) {
    window.SB_BRANDS_READY.then(data => {
        if (!data) { elWrap.style.display = "none"; return; }
        hidratarUI(data);
    });
} else {
    elWrap.style.display = "none";
}
```

El storybook arranca siempre, aunque alguna feature opcional falle. Nunca se bloquea el
boot por un fetch o un script externo.

---

## Reglas no-negociables

1. **El motor no conoce componentes concretos**. Si necesitas un caso especial para un
   componente, va en el módulo del componente, no aquí.
2. **Cero acoplamiento al DOM del componente**. El motor reescribe `stageEl.innerHTML`
   con lo que la story devuelva; no parsea el HTML resultante.
3. **`frameHTML()` autocontenido**: el `<style>` del iframe tiene todo lo que el iframe
   necesita (layout del stage, reglas a11y). El CSS del chrome (`storybook.css`) NO
   atraviesa el iframe.
4. **Función pública de `SB`** debe ser estable. Romper la API rompe todos los módulos de
   componente.
5. **Privados son privados**: `components[]`, `BRAND_MAP`, `BG_GROUPS` no se exponen.
   Si un módulo necesita acceder, se evalúa caso por caso y se añade a la API.
