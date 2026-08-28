# storybook/js/templates — Índice de páginas (kind:"page")

Las **Templates** (y por el mismo patrón Layouts, Widgets, POCs, Recursos) **no son
componentes**: son **páginas completas hechas a mano** (composiciones de organismos/
moléculas/átomos para un tipo de página). No tienen API ni modificadores → **no hay
controles**. Por eso NO se migran como átomos/moléculas/organismos (markup parametrizado al
stage), sino que se **indexan** y se cargan enteras.

## Mecanismo: story `kind:"page"`

Una story de página no devuelve markup; lleva un `src`:

```js
{ id: "template-noticia-html", name: "Noticia", kind: "page", src: "templates/template-noticia.html" }
```

El motor (`js/core/storybook.js` → `select()` / `navigatePage()`) hace que el iframe del
canvas **NAVEGUE** al fichero (`elFrame.src = src`). La página carga su **propio
`<head>`/CSS/JS** → fidelidad total, scripts incluidos (mastheads, sliders, lenis…). Es lo
contrario al render de componentes, que inyecta markup vía `innerHTML` (y descarta scripts).

| | Componentes (atoms/molecules/organisms) | Páginas (templates/layouts…) |
|---|---|---|
| Render | `stageEl.innerHTML = markup` (chrome posee el doc) | `elFrame.src = fichero` (la página posee el doc) |
| Scripts | NO corren | **SÍ** corren |
| Marca/CSS | la fija el chrome (Brand/Cabecera) | la fija la propia página |
| Controles | sí (args) | **no** |
| Toolbar útil | todo | **Oscuro · Viewport · Visión · Fullscreen** siempre; **Brand · Cabecera** solo en templates (brandable); Fondo inerte en toda página |

## Templates `brandable` vs Layouts por-marca

**Templates** son composiciones **multimarca** (usan `ux-index.css` + los `<link>`
conmutables `#brandStyles-root` / `#brandStyles`): su gracia es **poder elegir la marca y
ver el cambio de estilos**. Por eso sus page-stories llevan **`brandable: true`** y el toolbar
**Brand**, **Cabecera** y **Oscuro** SÍ aplican: el motor (`applyBrandToPage`) alcanza el
`contentDocument` de la página (same-origin) y conmuta sus `<link>` de marca + clases
`ft-brand-*` **y la del outlet de Cabecera** (`body_class` del CSV) del `<body>`
+ `data-theme` — **réplica exacta de `cds-statics/js/showroom/showroom-init.js`** (marca y
cabecera son globals persistentes, como en el resto del storybook; la Cabecera auto-sincroniza
Brand). Las clases inyectadas se rastrean (`pageAppliedClasses`) para retirarlas limpio al
reconmutar. Solo **Fondo** queda inerte (helper del canvas, no de la página).

**Layouts** son páginas **por marca** (`layout-[marca]-[tipo]`, bloqueadas): allí
`brandable: false` → Brand/Cabecera grisados (la página ya es de su marca). **Oscuro siempre
operativo** (dark universal del DS); Fondo inerte.

## Organización del sidebar

Grupo de 1er nivel `group: "Templates"` (aparece tras Organisms — el motor añade los grupos
no canónicos al final). Dentro, **una entrada por FAMILIA/TIPO** (CardHome, Cerca, Directos,
Galería…), cada una con su **Overview** (tabla de páginas + fuente) y sus page-stories.

Las familias se listan en **orden ALFABÉTICO** (`localeCompare 'es'`, respeta acentos/ñ →
CardHome · Cerca · Directos · Galería · Institucional · Masthead · Modelos · Newsletter ·
Noticia · Objeto editorial · Opinión · Pasatiempos · Portada · Reportaje · RRSS · Varios ·
Writer); las páginas dentro de cada familia también van alfabéticas.

## SSOT autogenerado

`templates.js` está **autogenerado** por `fourty/storybook/.tmp_gen_templates.js` (script
temporal, se borra tras correr). **No editar `templates.js` a mano.** Para regenerar tras
añadir/quitar ficheros en `fourty/templates/`:

```bash
cd fourty/storybook && node .tmp_gen_templates.js   # vuelve a escribir js/templates/templates.js
```

El generador: enumera `fourty/templates/*.html`, deriva el **nombre** del fichero (único
dentro de su familia), clasifica la **familia** por prefijo del nombre, y emite el array
`PAGES` (SSOT) + un bucle que registra una "componente" por familia.

## Replicar para Layouts / Widgets / POCs / Recursos

Mismo patrón, otra carpeta y otro `group:` (`"Layouts"`, `"Widgets"`…). Layouts (164) pide
sub-agrupar por **marca** (ep/epe/regionales/revistas/sport/amp) además de por tipo. El motor
ya soporta `kind:"page"`; solo hace falta otro generador/módulo análogo a éste.
