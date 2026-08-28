# Storybook · Helpers

Stories del **cuarto nivel** del storybook POC: los **helpers** del 42DS
(`.ft-helper-*`). No son componentes con DOM propio sino **familias de clases
utilitarias** (spacers, fontSize, display, etc.) que se aplican sobre cualquier
elemento para modular layout, tipografía, color, visibilidad, etc.

> El grupo `"Helpers"` aparece en el sidebar después de `"Organisms"` por orden
> canónico definido en `core/storybook.js` (`GROUP_ORDER`). No depende del orden
> de carga de los `<script defer>`.

---

## Índice de helpers

Cada categoría tiene su **ficha de contexto** (`<x>/README.md`): patrón de clase,
señales JS, stories y trazabilidad al SCSS base. Punto de entrada rápido para agentes
(la doc completa vive en el `overview` del `.js`).

| Categoría | Ficha | Señales | Patrón de clase |
|-----------|-------|---------|-----------------|
| Affix | [`affix/`](affix/README.md) | `js` | `.ft-helper-affix` · `.ft-helper-sticky-stack` |
| Align | [`align/`](align/README.md) | — | `.ft-helper-align-*` |
| Anchor | [`anchor/`](anchor/README.md) | — | `.ft-helper-anchor-spacer` |
| Animation | [`animation/`](animation/README.md) | — | `.ft-helper-animation-*` |
| Background | [`background/`](background/README.md) | — | `.ft-helper-bg*` |
| Branded | [`branded/`](branded/README.md) | — | `.ft-helper-branded` |
| Close News | [`closenews/`](closenews/README.md) | — | `.ft-helper-closenews` |
| Collapse | [`collapse/`](collapse/README.md) | `js` | `.ft-helper-collapse` |
| Display | [`display/`](display/README.md) | — | `.ft-helper-display*` |
| Divider | [`divider/`](divider/README.md) | — | `.ft-helper-divider*` |
| Font Color | [`fontcolor/`](fontcolor/README.md) | — | `.ft-helper-fontColor-*` |
| Font Size | [`fontsize/`](fontsize/README.md) | — | `.ft-helper-fontSize-*` |
| Font Type | [`fonttype/`](fonttype/README.md) | — | `.ft-helper-fontType--*` |
| Font Weight | [`fontweight/`](fontweight/README.md) | — | `.ft-helper-fontWeight-*` |
| Grids | [`grids/`](grids/README.md) | — | `.ft-helper-grid-*` |
| Hides | [`hides/`](hides/README.md) | — | `.ft-helper-hide*` |
| Images | [`images/`](images/README.md) | — | `.ft-helper-img-*` |
| Overlay | [`overlay/`](overlay/README.md) | — | `.ft-helper-overlay-modal` |
| Position | [`position/`](position/README.md) | — | `.ft-helper-position-*` |
| Property | [`property/`](property/README.md) | — | `.ft-helper-property*` |
| Scroll | [`scroll/`](scroll/README.md) | — | `.ft-helper-scroll*` |
| Show | [`show/`](show/README.md) | — | `.ft-helper-show*` |
| Size | [`size/`](size/README.md) | — | `.ft-helper-size-h-*` |
| Spacers | [`spacers/`](spacers/README.md) | — | `.ft-helper-spacer-*` |
| Text | [`text/`](text/README.md) | — | `.ft-helper-text-*` |
| UI Helpers | [`uihelpers/`](uihelpers/README.md) | — | `.ui-helper-hidden-accessible` |

---

## Cuándo crear una story aquí

Si la pieza:

- Vive en `scss/base/helpers/_<x>.scss` (no en `scss/fourties/`).
- Su clase tiene prefijo `.ft-helper-<x>-*`.
- Su uso es "aplicar la clase a un wrapper" — no tiene markup propio.

→ pertenece al nivel **Helpers**.

Si en cambio es un átomo / molécula / organismo con DOM propio → su lugar es
`atoms/`, `molecules/` u `organisms/` y la receta es `[MODE: STORYBOOK+MIGRATE]`.

---

## Estructura del módulo

Idéntica a los otros niveles:

```
storybook/js/helpers/
├── README.md           ← este archivo
└── <x>/
    ├── <x>.js          ← SB.register(...) (obligatorio)
    └── <x>.html        ← markup canónico copiable (opcional; solo si aporta valor real)
```

Patrón del `.js`:

```js
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* SSOT — refleja 1:1 _<x>.scss */
    const DATA = { /* ejes y tamaños reales */ };

    /* Visualizador genérico (inline styles, ni .cb-* ni .ft-*) */
    const FRAME = (inner) => `<div style="…">${inner}</div>`;

    /* Stories interactivas por intención de uso */
    const baseArgTypes = [ /* eje + tamaño + slot */ ];
    const baseArgs = { /* defaults */ };
    const liveBase = (a) => FRAME(/* renderiza con la clase elegida */);
    const codeBase = (a) => `... markup canónico sin harness ...`;

    /* Galerías por sub-familia (kind: "gallery") */
    function galleryX() { return /* todas las variantes en grid */ }

    /* Overview = DOCS, nunca componente vivo */
    const overview = `<div class="cb-docs__inner">…</div>`;

    /* Registro */
    const X = {
        id: "<x>", name: "<Name>", group: "Helpers", overview,
        stories: [{ id: "base", name: "Base",
                    kind: "interactive", full: true, argTypes: baseArgTypes,
                    args: baseArgs, render: liveBase, code: codeBase }],
        subgroups: [{ id: "galleries", name: "Galleries", collapsed: true,
                      stories: [ /* gallery stories */ ] }]
    };
    window.SB.register(X);
})();
```

---

## Diferencias respecto a atoms/molecules/organisms

| Aspecto | Atoms/Molecules/Organisms | Helpers |
|---------|---------------------------|---------|
| Fuente SCSS | `scss/fourties/<nivel>/<x>/_<x>.scss` | `scss/base/helpers/_<x>.scss` |
| Prefijo de clase | `.ft-`, `.ft-mol-`, `.ft-org-` | `.ft-helper-<x>-` |
| DOM propio | Sí (markup característico) | No (la clase modula un wrapper neutro) |
| Necesita visualizador | A veces (organismos contenedores) | **Casi siempre** — sin visualización, una clase utilitaria es invisible |
| `full: true` | Solo en layout/organisms | **Casi siempre** (la galería ocupa todo el ancho) |
| `hint` en la story principal | Sí (clase raíz: `.ft-btn`, `.ft-mol-tapbar`, etc.) | **No suele hacer falta** — el patrón de clase ya está en el overview y en los títulos de las galerías |
| Variantes por marca | A veces | Raras (los helpers son brand-agnostic salvo `_branded.scss` y `_amp-*.scss`) |
| `Code` | DOM renderizado suele bastar | Suele requerir `story.code` para no copiar el harness visual |

---

## Visualizador genérico

Los helpers son invisibles sin un contexto que los enmarque. Usamos un patrón
estándar de tres bandas (anterior · target · siguiente) con borde discontinuo
y fondo de patrón diagonal en el wrapper, fondo de marca en el target:

```js
const VIZ_BG = "background:repeating-linear-gradient(45deg,rgba(0,0,0,.04) 0 6px,transparent 6px 12px);";
const REF = (label) =>
    `<div style="background:rgba(0,0,0,.08);color:#555;font:500 11px/1.4 monospace;padding:6px 10px;border-radius:2px;">${esc(label)}</div>`;
const TARGET = (cls, label) =>
    `<div class="${esc(cls)}" style="background:var(--color-primary,#0050b3);color:#fff;font:600 12px/1.3 monospace;padding:10px 12px;border-radius:2px;">${esc(label)}</div>`;
const FRAME = (inner) =>
    `<div style="${VIZ_BG}border:1px dashed #999;border-radius:3px;padding:0;min-width:280px;">${inner}</div>`;
```

**Reglas del visualizador**:

1. **Inline styles SOLO** — ni `.cb-*` ni `.ft-*`. Es metadocumentación pura.
2. **Una sola convención por nivel** — no inventar visualizaciones nuevas en
   cada módulo; reusar la misma paleta y patrón para que el sidebar se sienta
   homogéneo.
3. **`var(--color-primary, fallback)`** — usar la variable de marca con fallback
   hardcoded para que la viz reaccione al switch de Brand del toolbar.
4. **Si el harness no es markup real, define `story.code`** — el tab `Code`
   debe enseñar HTML canónico del DS, no la metadocumentación usada para visualizar.

---

## Catálogo de categorías a migrar

26 categorías existentes en `scss/base/helpers/`:

| Categoría | SCSS | Showroom |
|-----------|------|----------|
| Affix | `_affixes.scss` | `helper-affix.html` |
| Align | `_align.scss` | `helper-align.html` |
| Anchor | `_anchors.scss` | `helper-anchor.html` |
| Animation | `_animations.scss` | `helper-animation.html` |
| Background | `_backgrounds.scss` | `helper-background.html` |
| Branded | `_branded.scss` | `helper-branded.html` |
| Close News | `_closenews.scss` | `helper-closenews.html` |
| Collapse | `_collapses.scss` | `helper-collapse.html` |
| Display | `_display.scss` | `helper-display.html` |
| Divider | `_dividers.scss` | `helper-divider.html` |
| Font Color | dentro de `_fonts.scss` | `helper-fontcolor.html` |
| Font Size | dentro de `_fonts.scss` | `helper-fontsize.html` |
| Font Type | dentro de `_fonts.scss` | `helper-fontType.html` |
| Font Weight | dentro de `_fonts.scss` | `helper-fontweight.html` |
| Grids | `_grids.scss` | `helper-grids.html` |
| Hides | `_hides.scss` | `helper-hides.html` |
| Images | `_images.scss` | `helper-images.html` |
| Overlay | `_overlays.scss` | `helper-overlay.html` |
| Position | `_position.scss` | `helper-position.html` |
| Property | `_properties.scss` | `helper-property.html` |
| Scroll | `_scrolls.scss` | `helper-scroll.html` |
| Show | `_shows.scss` | `helper-show.html` |
| Size | `_size.scss` | `helper-size.html` |
| **Spacers** | `_spacers.scss` | `helper-spacers.html` | ✅ migrado
| Text | `_texts.scss` | `helper-text.html` |
| UI Helpers | `_uihelper.scss` | `helper-uihelpers.html` |

> **AMP**: las variantes `_amp-*.scss` (backgrounds, dividers, fonts, hides,
> images, properties, shows, spacers, texts) son builds específicas y NO se
> documentan como entradas separadas en el storybook — son la misma familia
> compilada con otras restricciones. Si alguna diverge significativamente del
> non-AMP, mencionarlo en la sección **AMP** del overview de la categoría.

---

## Reglas no-negociables (heredadas de README maestro)

1. **Clases REALES o nada** — cada clase mostrada debe existir literal en
   `_<x>.scss`.
2. **DATA SSOT** — ejes y tamaños en arrays al principio del módulo.
3. **Overview = documentación**, no componente vivo.
4. **La primera story debe ser el caso principal de uso**; en helpers no hace
   falta `hint` si solo repite el patrón de clase.
5. **`full: true`** en stories y galerías que necesiten ancho. Usa `loadMarkup`
   solo si el `.html` contiene markup realmente copiable.
6. **No mezclar `.cb-*` con `.ft-*`** — el visualizador usa inline styles.
7. **No tocar `scss/abstracts/`** ni `scss/base/helpers/` desde el storybook.
   PATCH only para versiones.
