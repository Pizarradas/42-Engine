# storybook/js/amp — AMP en el storybook

AMP en 42DS **no es un set de componentes nuevo**: es una **variante de entorno** (otro bundle CSS
+ runtime AMP) sobre los **mismos** componentes `.ft-*`. Se integra de forma **aislada y unificada**:
cada componente (átomo, molécula u organismo) que tiene su propio código AMP en el showroom gana un
**subgrupo `"AMP"` DENTRO de sí mismo** (plegable, igual que `Galleries`/`Markup`), sin lógica AMP en
el motor.

## Modelo unificado (`amp.js`)

El subgrupo `AMP` de un componente se monta con la API **genérica** del motor
**`window.SB.attachSubgroup(id, subgroup)`** (espeja `attachStory`; no es AMP-específica) a partir de
las **variantes inline** del showroom:

### Variantes inline → 1 story por variante

Paneles `data-showroom-view="amp"` **dentro** de la página de showroom del componente
(`atom-<x>.html` / `molecule-<x>.html` / `organism-<x>.html`). Cada panel = una story:

- **Datos**: `amp-data.json` (SSOT verbatim) — array `{ comp, level, panels:[{ name, cls, html, ampEl }] }`,
  donde `comp` es el **id real** del componente en el storybook. Se **genera** con `amp-data.gen.js`
  (committed): `node fourty/storybook/js/amp/amp-data.gen.js` (todos los niveles) o `… molecules`.
  El generador resuelve `comp` leyendo el primer `id:` de `js/<nivel>/<folder>/<folder>.js` y casando
  el nombre del fichero de showroom con el folder por nombre **normalizado** (cubre `dataSheed`→
  `datasheet`, `headercustom`→`header-custom`, `menu-anchor`…). Normaliza `../../cds-statics`→
  `/cds-statics` y marca `ampEl` si hay `<amp-*>`.
- **Canvas** = **solo el elemento, sin chrome** (sin `<section>`/header/badge): visualización limpia.
  TODAS las variantes (planas y con `<amp-*>`) se renderizan en un **iframe-sandbox estilado** con el
  **CSS AMP real del DS** — `setting.css` + `amp-<marca>-index.css`. Así `.ft-mol-tab-amp`/
  `.ft-tooltip-amp`… se ven **como en el showroom**, y el runtime oficial (`v0.js` + `<script
  custom-element>` por extensión) **upgradea** `amp-img`/`amp-selector`/`amp-youtube`…  El preview omite
  el boilerplate (evita el ocultado de 8 s) → no es AMP estrictamente válido (CSS externo), pero
  renderiza fiel.
  - **Brand-aware**: la marca del preview **sigue al toolbar Brand** vía `window.SB.currentBrand()`
    (genérico del motor). `ampBrand()` deriva el slug del *key* (`showroom-brand-<slug>`); `styleLinks()`
    arma `setting` + `amp-<slug>-index.css`. Al cambiar Brand, `mountFrame` re-renderiza la story →
    recarga el bundle de esa marca. **ux** no tiene bundle AMP → *fallback* a `sport`. Bundles AMP:
    `ep · epe · regionales · cuore · viajar · woman · stilo · sport`.
- **Panel inferior «Code AMP»** (tab condicional del motor): cada story expone
  `codeAlt = { label:"Code AMP", code:<markup del elemento>, note:<validación> }`. El motor muestra el
  tab solo si la story lo trae (`renderCodeAlt()` en `core/storybook.js`) y permite **ver y copiar SOLO
  el markup del elemento** (no el wrapper). La `note` lista el veredicto del **validador oficial**
  (`v0/validator_wasm.js`, ejecutado **una vez** en el documento principal y horneado en la story).
- `amp-iframe` exige ≥600px desde el top → al **validar** se empuja con un spacer (evita el falso
  positivo); el **preview** va sin spacer.

### (Retirado) Página AMP completa — story «Página AMP» (kind:page)

Antes, los ficheros `fourty/{molecules,organisms}/amp-*.html` (mapa `PAGE_BY_COMP`) se publicaban como
una story **`kind:"page"`** (`brandable:false`) DENTRO del subgrupo `AMP`: el iframe navegaba al fichero.
Esos ficheros se movieron a `__old-showroom` → las stories quedaban en 404. **Se retiraron** (decisión:
no redirigir; el código AMP relevante ya está extraído en las **variantes inline**). Consecuencia: los
componentes que **solo** tenían página AMP (`footerbasic`, `breadcrumb-org`) **ya no tienen subgrupo AMP**.

## Cobertura

42 componentes con paneles inline (7 átomos + 32 moléculas + 3 organismos) = **42 componentes con
subgrupo AMP**. (`menu-anchor` se descarta: su único panel AMP no tiene `rendered-content` extraíble.
`footerbasic` y `breadcrumb-org` ya no tienen subgrupo AMP tras retirar las stories `kind:page`.)

`amp.js` debe cargar **después de todos los módulos de componentes** (defer preserva el orden):
`attachSubgroup` los busca por `id`; si un id no existe, avisa por consola y sigue. **Requiere RED**
(runtime + validador): sin conexión, el preview degrada a vacío y la nota de «Code AMP» muestra
«validación no disponible»; el código siempre se ve.

## Fuera de este fichero (ya en otro grupo)

- `amp-layout-*.html` → **Layouts › AMP** (`js/layouts/layouts.js`).
- `WC-template-noticia-AMP.html` → **Templates › Noticia** (`js/templates/templates.js`).
- `amp-home.html` → landing del showroom AMP (chrome con `data-showroom="nav"`, CSS no-AMP), no un
  componente.

> **Frontera de modos**: las capacidades del motor (`attachSubgroup`, tab «Code AMP» / `story.codeAlt`,
> `renderCodeAlt`) son **`[MODE: STORYBOOK+DOC]`** (genéricas, en `core/`); el catálogo + generador +
> render/validación AMP de `amp.js`/`amp-data.*` es **`[MODE: STORYBOOK+MIGRATE]`**.
>
> Histórico (2026-06-02): se descartó (y sigue descartado) tanto un **toggle global** como **stories
> sintéticas**. Componentes cuya variante AMP es **solo CSS** sin panel AMP propio siguen sin AMP en el
> storybook (su CSS vive en `cds-statics/css/amp-[marca]-index.css`).
