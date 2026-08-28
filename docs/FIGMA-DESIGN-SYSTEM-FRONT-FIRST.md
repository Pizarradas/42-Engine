# Propuesta Front-First de Figma para `PROJECT: 01 · Design System`

## 1. Objetivo

Esta propuesta mapea la arquitectura actual de frontend de 42DS a una estructura de proyecto en Figma que sea:

- fiel al Design System real ya implementado en código
- usable por diseño, producto y frontend
- organizada por familias de uso y producto, no solo por niveles de Atomic Design
- preparada para escalar con marcas, contextos editoriales y variantes por `body class`

## 2. Principio base

```text
Frontend = fuente técnica de verdad
Figma = fuente de verdad para diseño, composición, documentación visual y toma de decisiones
```

Esto implica que Figma no debe copiar literalmente el árbol del repositorio. Debe traducirlo.

## 3. Qué existe hoy en front

### Fuentes canónicas del frontend

- `scss/brands/` define los setups de marca y las variables CSS a nivel marca
- `cds-statics/css/brands/*/setting.css` contiene la salida de tokens más clara y más cercana a lo que consumen los productos
- `scss/fourties/atoms/`, `scss/fourties/molecules/`, `scss/fourties/organism/` son las capas canónicas de componentes
- `fourty/templates/` contiene estructuras genéricas de página
- `fourty/layouts/` contiene ejemplos reales de página por marca
- `cds-statics/csv/storybook__bodyclass.csv` documenta contextos por `body class`, verticales, sites y variantes regionales
- `cds-statics/assets/` contiene iconos, logos, placeholders, assets decorativos y ficheros de soporte visual
- `cds-statics/js/` contiene el comportamiento de los componentes interactivos

### Alcance real del DS detectado

- Marcas HTML/CSS: `ux`, `sport`, `ep`, `epe`, `regionales`, `revistas`
- Sub-settings de marca bajo `revistas`: `woman`, `viajar`, `stilo`, `cuore`
- También existen setups AMP en SCSS para `woman`, `viajar`, `stilo`, `cuore`
- Atoms: 31
- Molecules: 71
- Organisms: 35
- Templates: un set amplio de páginas editoriales, directos, galerías, paywall, newsletters, juegos y flujos de Cerca
- Layouts: muchos ejemplos reales por marca

## 4. Recomendación: estructura del proyecto Figma

Proyecto recomendado:

```text
PROJECT: 01 · Design System
```

Archivos recomendados:

```text
DS · 00 Foundations
DS · 01 Components
DS · 02 Patterns & Flows
DS · 03 Page Structures
DS · 04 Brand Examples
DS · 05 Icons & Assets
DS · 06 Documentation
DS · 90 Playground
DS · 99 Archive
```

Por qué esto es mejor que usar `Atoms / Molecules / Organisms` como navegación principal:

- diseño piensa en familias funcionales y composición de producto
- desarrollo puede seguir manteniendo Atomic Design como metadata interna
- las estructuras editoriales complejas encajan mejor en patrones y estructuras de página
- la realidad multi-marca queda separada y no contamina los masters base

## 5. Propuesta archivo por archivo

### `DS · 00 Foundations`

Objetivo: representar el sistema real de tokens emitido por frontend.

Páginas recomendadas:

```text
00 · Cover
01 · Changelog
02 · Token map
03 · Color
04 · Typography
05 · Spacing & sizing
06 · Grid & layout
07 · Radius
08 · Borders
09 · Shadows
10 · Z-index & layers
11 · Breakpoints
12 · Motion
13 · Themes
14 · Brands
15 · Body contexts
99 · Deprecated
```

#### Foundations encontradas realmente en código

Bien tokenizadas:

- colores vía variables CSS en `cds-statics/css/brands/*/setting.css`
- tipografía vía `--font-*`
- tamaño de texto base vía `--font-size-basis` y `--font-height-basis`
- breakpoints vía `scss/abstracts/mixins/_media-queries.scss`
- anchos máximos de grid vía `scss/abstracts/variables/_measures.scss`
- dark theme vía `[data-theme="dark"]`

Tokenización débil o muy hardcoded:

- radios
- sombras
- z-index
- algunas transiciones
- parte de las escalas de espaciado aplicadas a componentes

Recomendación:

- crear Variables de Figma para lo que sí está explícito hoy en frontend
- crear escalas documentadas, no variables source-of-truth, para radius, shadow y z-index hasta que frontend las formalice mejor

#### Mapeo token front → variable Figma

| Token front | Variable Figma propuesta | Notas |
| --- | --- | --- |
| `--color-primary` | `color.brand.primary` | acento principal de marca |
| `--color-secondary` | `color.brand.secondary` | énfasis secundario |
| `--color-tertiary` | `color.brand.tertiary` | tono de apoyo |
| `--color-black` | `color.text.default` | texto por defecto |
| `--color-white` | `color.surface.base` | superficie base / inversa |
| `--color-darkGrey` | `color.neutral.700` | neutro oscuro |
| `--color-mediumGrey` | `color.neutral.500` | neutro medio |
| `--color-lightGrey` | `color.neutral.100` | neutro claro |
| `--color-functional-success` | `color.feedback.success` | estados de éxito |
| `--color-functional-info` | `color.feedback.info` | estados informativos |
| `--color-functional-warning` | `color.feedback.warning` | estados de aviso |
| `--color-functional-error` | `color.feedback.error` | estados de error |
| `--color-paywall-primary` | `color.product.paywall.primary` | módulo de paywall |
| `--color-paywall-secondary` | `color.product.paywall.secondary` | apoyo de paywall |
| `--font-primary` | `font.family.primary` | familia principal o display |
| `--font-secondary` | `font.family.secondary` | familia de apoyo |
| `--font-stack` | `font.family.system` | fallback de sistema |
| `--font-size-basis` | `font.size.body.base` | tamaño base actual |
| `--font-height-basis` | `font.lineheight.body.base` | interlineado base actual |
| `$max-width-grid` | `layout.maxWidth.grid` | `1680px` |
| `$max-width-grid-p-less` | `layout.maxWidth.wide` | `1920px` |

#### Breakpoints a documentar en Figma

| Nombre front | Valor | Uso en Figma |
| --- | --- | --- |
| `phablet` | `600px` | móvil grande / tablet pequeño |
| `tablet` | `800px` | tablet |
| `laptop` | `1024px` | desktop pequeño |
| `desktop` | `1120px` | layouts editoriales desktop |

#### Themes y modes

Colecciones de variables recomendadas:

- `Core`
- `Brand`
- `Theme`
- `Context`

Modes recomendados:

- Modes de marca: `UX`, `Sport`, `El Periódico`, `El Periódico de España`, `Regionales`, `Revistas`
- Modes de sub-marca en ejemplos o extensión de marca: `Woman`, `Viajar`, `Stilo`, `Cuore`
- Modes de tema: `Light`, `Dark`

Importante:

- `woman`, `viajar`, `stilo` y `cuore` no deberían modelarse como marcas top-level del DS salvo que diseño quiera gobernarlas así
- en frontend hoy se comportan más como descendientes de `revistas` con settings y assets propios

#### Los body contexts necesitan página propia

`cds-statics/csv/storybook__bodyclass.csv` confirma que existe un sistema contextual amplio, no solo un sistema de marcas.

Figma debería documentar aparte estos contextos, sin mezclarlos con los modes de tokens:

- tipologías editoriales: `noticia`, `opinion`, `reportaje`, `premium`, `tag`, `portada`
- estados de producto: `ds-logged`, `has-tapbar`
- contextos funcionales: `cerca`, `cerca-feed`, `cerca-config`, `minimal-header`
- contextos de media: `videos`, `galeriah`, `galeriav`
- verticales y ediciones locales: muchas `body class` regionales/locales

Recomendación:

- modelarlos como matrices documentales y ejemplos visuales, no como modes globales de variables

### `DS · 01 Components`

Objetivo: masters reutilizables agrupados por familia funcional.

Páginas recomendadas:

```text
00 · Cover
01 · Changelog
02 · Actions
03 · Links & Navigation
04 · Selection Controls
05 · Text & Editorial
06 · Cards & Content Blocks
07 · Media
08 · Feedback & Status
09 · Data Display
10 · Overlays & Layers
11 · Social & Sharing
12 · Commerce & Subscription
13 · Product-Specific
99 · Deprecated
```

#### Mapeo de familias de componentes

| Familia Figma | Componentes front |
| --- | --- |
| Actions | `ft-btn`, `ft-mol-btnGroup`, `ft-mol-action-bar`, `ft-switch`, `ft-toogle` |
| Links & Navigation | `ft-link`, `ft-anchor`, `ft-mol-breadcrumb`, `ft-mol-pagination`, `ft-mol-tabs`, `ft-mol-tab`, `ft-mol-menuanchor`, `ft-mol-switcher`, `ft-mol-tapbar`, `ft-mol-toc`, `ft-mol-path` |
| Selection Controls | `ft-check`, `ft-radio`, `ft-switch`, `ft-mol-form`, `ft-mol-dropdown`, `ft-mol-sorting` |
| Text & Editorial | `ft-title`, `ft-text`, `ft-tag`, `ft-date`, `ft-trust`, `ft-mol-subtitle`, `ft-mol-label`, `ft-mol-quote`, `ft-mol-writer`, `ft-mol-figcaption`, `ft-mol-tagsNews` |
| Cards & Content Blocks | `ft-mol-card`, `ft-mol-card-newsletter`, `ft-mol-card-video-thumb`, `ft-mol-modNews`, `ft-mol-related`, `ft-mol-relatedSlider`, `ft-mol-lnkbox`, `ft-mol-promo`, `ft-mol-promoHeader`, `ft-mol-paper`, `ft-mol-boxInfo` |
| Media | `ft-img`, `ft-embed`, `ft-jwplayer`, `ft-carousel`, `ft-mol-carousel`, `ft-mol-gallery`, `ft-mol-gallery-img`, `ft-mol-swiper`, `ft-mol-slider`, `ft-mol-multimedia`, `ft-svgmap`, `ft-mol-marker` |
| Feedback & Status | `ft-advice`, `ft-tooltip`, `ft-timer`, `ft-readmore`, `ft-mol-advice`, `ft-mol-countdown`, `ft-mol-overlay-live`, `ft-mol-pollbox`, `ft-mol-popover` |
| Data Display | `ft-list`, `ft-mol-table`, `ft-mol-bar`, `ft-mol-number-highlighted`, `ft-mol-pie-chart`, `ft-mol-graphLegend`, `ft-mol-dataSheed`, `ft-mol-score`, `ft-mol-scoreboard`, `ft-mol-rankingNews`, `ft-mol-tracking` |
| Overlays & Layers | `ft-mol-modal`, `ft-tour`, `ft-animation`, `ft-scrollbar`, `ft-skin`, `ft-mol-sticky-panel`, `ft-mol-divider` |
| Social & Sharing | `ft-mol-rrss`, partes de `ft-mol-toolbar`, `ft-disqus` |
| Commerce & Subscription | `ft-mol-subscribeRead`, `ft-mol-card-newsletter` |
| Product-Specific | `cerca`, `ft-mol-pick`, `ft-mol-ticker`, `ft-mol-headband`, `ft-mol-subheader`, `ft-mol-toolbar` |

#### Regla de estado de publicación

- `Published`: estable, reutilizable, cross-brand, bien mapeado en SCSS y showroom
- `In review`: reutilizado, pero con demasiados overrides contextuales o API poco clara
- `WIP`: pieza muy ligada a iteración de producto
- `Deprecated`: legacy o componente preservado por compatibilidad histórica

#### Componentes que deberían arrancar como `Deprecated` o `In review`

| Componente front | Estado propuesto | Motivo |
| --- | --- | --- |
| `ft-toogle` | Deprecated | typo histórico y solapamiento con `switch` / `accordion` |
| `cerca` atom | In review | no sigue prefijo `ft-` y es muy específico de producto |
| `ft-org-header-showroom` | Deprecated en librería Figma | artefacto interno de documentación, no UI de producto |
| `organism/cds-statics/` | Excluir | no es un componente real |
| one-offs AMP legacy | In review | útiles como referencia, pero no como masters publicables de base |

### `DS · 02 Patterns & Flows`

Objetivo: patrones de composición demasiado contextuales para la librería base de componentes.

Páginas recomendadas:

```text
00 · Cover
01 · Editorial headers
02 · Search & autocomplete
03 · Live & direct coverage
04 · Newsletter capture
05 · Paywall & subscription
06 · Rankings, scoreboards & games
07 · Cerca flows
08 · Regional/local discovery
09 · Multimedia storytelling
10 · Navigation systems
99 · Deprecated
```

Aquí deberían mapearse:

- `ft-org-search-autocomplete`
- `ft-org-paywall`
- `ft-org-newsletter`
- `ft-org-directNews`
- `ft-org-scoreboard`
- `ft-org-pick`
- `ft-org-overview-panel`
- templates de Cerca y flujos relacionados de búsqueda

### `DS · 03 Page Structures`

Objetivo: templates y arquitectura de página, no componentes publicables.

Páginas recomendadas:

```text
00 · Cover
01 · Home
02 · Article
03 · Opinion
04 · Live / Direct
05 · Gallery
06 · Multimedia report
07 · Newsletter
08 · Search
09 · Paywall
10 · Games
11 · Corporate / legal
12 · Landing / branded
99 · Deprecated
```

#### Grupos de templates realmente encontrados

| Grupo de template | Referencias front |
| --- | --- |
| Home / portada | `template-home.html`, `template-portada-*`, muchos `layout-*-portada-*` |
| Article | `template-noticia*.html`, `layout-*-noticia*.html` |
| Opinion | `template-opinion.html`, `layout-*-opinion*.html` |
| Live / direct | `template-directo-noticia*.html`, `template-directos.html`, `layout-sport-directos.html` |
| Gallery | `template-galeria-vertical*.html`, `layout-*-galeria-*` |
| Multimedia report | `template-reportaje-multimedia*.html`, `layout-regionales-reportaje-multimedia-kurios.html` |
| Newsletter | `template-newsletter-revistas.html`, `layout-*-newsletter-*` |
| Search / autocomplete | `layout-epe-cerca*.html`, `layout-ep-cerca-fase-2*`, `template-cerca-fase-2*` |
| Games | `template-pasatiempos-*`, `layout-pasatiempos-*` |
| Legal / corporate | `template-quienes-somos-revistas.html`, `layout-*-aviso-legal.html`, `layout-*-politica-*` |
| Branded / special | `template-noticia-branded.html`, layouts de aniversario y campañas |

### `DS · 04 Brand Examples`

Objetivo: páginas reales por marca y ejemplos de alta confianza.

Páginas recomendadas:

```text
00 · Cover
01 · UX / Showroom
02 · El Periódico
03 · El Periódico de España
04 · Sport
05 · Regionales
06 · Revistas
07 · Woman
08 · Viajar
09 · Stilo
10 · Cuore
11 · Dark mode
12 · Contextual body classes
99 · Archive
```

#### Cómo usar este archivo

- aquí no deberían crearse masters salvo necesidad muy justificada
- sirve para capturas canónicas, validación visual y ejemplos de composición
- debe mostrar pares responsive desktop/mobile
- debe mostrar cambios por contexto disparados por `body class`

#### Notas por marca

| Marca/grupo | Evidencia front | Notas para Figma |
| --- | --- | --- |
| `ux` | marca showroom | baseline documental |
| `sport` | setup dedicado y muchos colores de sección | la más especializada semánticamente en color |
| `ep` | setup dedicado y muchas variantes locales/de sección | probablemente necesita el bloque de ejemplos más rico |
| `epe` | setup dedicado con variantes editoriales | mantener separado de `ep` |
| `regionales` | marca paraguas con muchas ediciones locales | ejemplos centrados en overrides por `body class` |
| `revistas` | familia paraguas | usar como capa de documentación madre |
| `woman` / `viajar` / `stilo` / `cuore` | sub-settings y assets propios | los ejemplos deben vivir aquí aunque la gobernanza de tokens siga bajo `revistas` |

### `DS · 05 Icons & Assets`

Objetivo: gobernanza de assets, no solo almacenamiento de media.

Páginas recomendadas:

```text
00 · Cover
01 · UI Icons
02 · Social Icons
03 · Product Icons
04 · Logos
05 · Local Edition Logos
06 · Brand Recirculation Assets
07 · Placeholders & Templates
08 · Flags & Shields
09 · Motion / Lottie references
99 · Deprecated
```

#### Grupos de assets detectados

| Grupo | Ruta front | Notas |
| --- | --- | --- |
| UI icons | `cds-statics/assets/img/icons/` | set amplio con pares dark/light |
| Logos | `cds-statics/assets/img/logos/` | logos master, sub-marcas, favicons y marcas cobranded |
| Avatares | `cds-statics/assets/img/avatars/` | defaults de autor/newsletter y ejemplos |
| Placeholders / templates | `cds-statics/assets/img/templates/` | assets de soporte visual y demo |
| Spinners | `cds-statics/assets/img/spinners/` | estados de carga |
| Team shields | `cds-statics/assets/img/team-shields/` | assets específicos de deportes |
| Decorativos / banners / fondos | `cds-statics/assets/img/decorative/`, `banners/`, `bgs/` | assets editoriales o de campaña |
| Lotties | `cds-statics/assets/img/lotties/` | referencias de animación |

Recomendación:

- separar iconos en Figma por propósito, no por nombre de fichero
- preservar la lógica dark/light como propiedad de componente
- separar logos de UI chrome frente a logos editoriales, de evento o campaña

### `DS · 06 Documentation`

Objetivo: gobernanza del sistema dentro de Figma.

Páginas recomendadas:

```text
00 · Cover
01 · How to use this project
02 · Front-to-Figma mapping
03 · Naming conventions
04 · Variant policy
05 · Brands and modes
06 · Body contexts
07 · Accessibility rules
08 · Responsive rules
09 · Publish criteria
10 · Deprecation policy
11 · Component request process
12 · Handoff to frontend
13 · Change log
```

Documentación que debería existir explícitamente:

- cómo se usa Atomic Design como metadata, no como navegación principal
- cuándo algo pertenece a Components frente a Patterns o Page Structures
- cómo funcionan las variantes de marca
- cómo funcionan los contextos de `body class`
- cuál es la ruta front canónica de cada pieza Figma
- qué piezas son legacy y por qué

### `DS · 90 Playground`

Usos recomendados:

- exploraciones
- rediseños en progreso
- candidatos previos a librería
- comparativas entre marcas
- ejercicios de migración antes de publicar

Regla:

- nada aquí es source of truth

### `DS · 99 Archive`

Usos recomendados:

- masters deprecated
- templates reemplazados
- referencias AMP legacy
- campañas puntuales que convenga mantener a nivel histórico

## 6. Mapeo de organisms para Figma

Estas piezas deberían vivir sobre todo en `DS · 02 Patterns & Flows`, no en la librería base de Components.

| Área Figma | Organisms front |
| --- | --- |
| Editorial chrome | `masthead`, `header-custom`, `header-regionales`, `header-revistas`, `toolbar`, `footer`, `footer-multibrand`, `breadcrumb` |
| Editorial hero / page intro | `hero`, `cardhome`, `currentNews`, `path` |
| Authoring & reading | `author`, `authors`, `comments` |
| Search / discovery | `search-autocomplete`, `suggestions-chips`, `services`, `container` |
| Subscription / CRM | `newsletter`, `paywall`, `boxfeatures` |
| Live / sports / games | `directNews`, `scoreboard`, `pick`, `game`, `accordion` |
| Multimedia / inmersivos | `mediareport`, `mediaviewer`, `object`, `multibox`, `overview-panel` |

Estados iniciales recomendados:

- `Published`: `masthead`, `footer`, `newsletter`, `paywall`, `search-autocomplete`
- `In review`: `container`, `overview-panel`, `mediareport`, `mediaviewer`
- `WIP`: flujos ligados a iteración activa de Cerca/juegos
- `Deprecated` o fuera de librería: piezas solo del showroom y carpetas-artefacto

## 7. Huecos previsibles entre front y Figma

Huecos inferidos:

1. Figma probablemente infra-representa el comportamiento contextual disparado por `body class`.
2. Figma probablemente documenta poco las variantes regionales y locales.
3. Front hoy tiene más cobertura real de templates y layouts que la documentación habitual de Figma.
4. Front tiene dark mode explícito por tokens, pero no necesariamente está modelado en Figma como modes bien estructurados.
5. Radius, shadow y z-index no están tokenizados de forma homogénea en front, así que Figma podría estar “inventando” una escala más limpia de la que realmente existe en código.
6. Sistemas como Cerca, pasatiempos, autocomplete y módulos de directos necesitan documentación a nivel patrón, no solo a nivel componente.
7. `revistas` frente a `woman/viajar/stilo/cuore` necesita una gobernanza más clara en Figma que una lista plana de marcas.

## 8. Riesgos de deprecated, legacy o duplicidad

Riesgos principales detectados:

- `toogle` preservado por typo histórico
- `cerca` como naming no estándar
- UI interna del showroom entrando por error en la librería de producto
- ejemplos repetidos de templates/layouts generando duplicidad en diseño si se convierten en components
- referencias AMP que son útiles históricamente, pero flojas como línea principal publicable
- variación por `body class` documentada hoy más como CSV que como sistema visual accesible

## 9. Orden recomendado de migración

### Fase 1

- Foundations
- Modes de marca
- Dark mode
- documentación de body contexts

### Fase 2

- Components base por familia funcional
- publicar solo atoms y molecules claramente reutilizables

### Fase 3

- Organism patterns
- paywall, newsletter, masthead, footer, search

### Fase 4

- Page Structures
- Brand Examples

### Fase 5

- limpieza de deprecated y legacy
- definición del workflow de gobernanza

## 10. Metadata mínima que debería llevar cada componente Figma

Spec recomendada:

```text
Figma name
Atomic level
Front class
Canonical frontend path
Brands supported
Body-context dependencies
States
Variants
Responsive notes
Accessibility notes
Tokens used
Status: Published / In review / WIP / Deprecated
```

Formato sugerido de naming:

```text
Family / Component / Variant
```

Ejemplos:

- `Actions / Button / Primary`
- `Editorial / Tag / Premium`
- `Cards / Article Card / Default`
- `Navigation / Tabs / Scrollable`

## 11. Recomendación fuerte

No usar como navegación principal de Figma:

```text
Atoms / Molecules / Organisms
```

Usar navegación funcional, manteniendo Atomic Design como metadata interna en descripción o documentación.

Eso aporta:

- mejor encontrabilidad para diseño
- alineación más directa con casos de uso de producto
- suficiente rigor estructural para frontend

## 12. Siguiente paso práctico

La ruta más rápida y fiable de implantación sería:

1. construir `DS · 00 Foundations`
2. construir `DS · 01 Components` solo para piezas estables y reutilizables
3. mover módulos editoriales complejos a `DS · 02 Patterns & Flows`
4. reservar `DS · 04 Brand Examples` para validación real por marca

Si quieres, el siguiente paso puede ser ampliar este documento con:

- inventario componente a componente de los 31 atoms, 71 molecules y 35 organisms
- blueprint de páginas Figma con nombres exactos y orden interno
- matriz de estado de publicación por componente
- checklist de migración front → Figma para la primera ola
