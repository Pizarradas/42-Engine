# SCSS Patterns (42DS)

## meta
- domain: scss-patterns
- source: "Repositorio 42DS · scss/abstracts/README.md · scss/fourties/*/README.md · parciales reales (_btn.scss, _spacers.scss, *-setup.scss, *-core.scss)"
- goal: construir e insertar SCSS del 42DS de forma consistente — anatomía de parciales, colocación del código, **estilo y formato (indentación, comentarios, anidación, espaciado)**, uso de mixins y variables, variantes por marca y registro en cores. Objetivo explícito: reducir la disparidad entre parciales fijando UN patrón canónico
- agent_tags: [front, ds, 42ds, scss]
- scope: knowledge OPERATIVO de cómo se escribe el SCSS de este repo. Complementa `css-architecture` (principios CSS agnósticos) y `component-patterns`; no los repite. **Fuente primaria de `[MODE: 42DS+SCSS]` (mode-ds)**, que construye parciales canónicos del DS en `scss/fourties/`. La variante SCSS de `mode-poc` (`[MODE: 42DS+HF+SCSS]`, parciales `.poc-` en `scss/pocs/`) reutiliza las **convenciones generales** de aquí (BEM, media queries inline, `var(--…)`, mobile-first) pero **NO** importa `abstracts` ni registra en cores — eso es exclusivo de los parciales del DS.
- precondición: **nunca modificar `scss/abstracts/`** sin aprobación; **nunca editar `cds-statics/`** (artefactos compilados); versiones **PATCH only**.

---

## concepts

> **Frontera con `knowledges/42ds/scss-pipeline`.** `scss-pipeline` (dominio 42ds) explica
> **cómo compila** el DS (flujo abstracts→base→brands→fourties, Bourbon, Prepros, versionado):
> el *porqué* y la *maquinaria*. **Este knowledge** explica **cómo se escribe el parcial**: el
> *cómo* operativo (anatomía, colocación, estilo, estados, mixins, registro). Se complementan,
> no se solapan: para entender el pipeline → `scss-pipeline`; para escribir SCSS → aquí.

### Pipeline y puntos de entrada

El SCSS se compila por **archivos core de marca** en la raíz `scss/` (`sport-core.scss`,
`ep-core.scss`, `ux-core.scss`, `amp-<marca>-core.scss`…). Cada core es el que **fija la
marca** y orquesta los imports en este orden:

```scss
// <marca>-core.scss
$brand: sport;                       // 1. marca activa (gobierna los @if $brand de los parciales)
@import "abstracts/abstracts";       // 2. functions → maps → mixins → variables
@import "vendors/bourbon/bourbon";   // 3. librería de mixins box-model
@import "base/base";                 // 4. reset + helpers + dark
@import "brands/sport-setup";        // 5. resets y helpers GENERADOS para esta marca
@import "layout/grid";               // 6. grid flexbox (+ grid_legacy)
@import "fourties/atoms/btn/btn";    // 7. un import por componente (el parcial _btn.scss)
// …
```

`abstracts/abstracts.scss` es el único agregador de la base: `@import "functions" → "maps"
→ "mixins" → "variables"`. **No tiene CSS**, solo declara la maquinaria. El hex real de los
colores NO vive en SCSS: vive en `setting.css` (variables CSS de marca); el SCSS solo
consume `var(--color-*)`.

### Anatomía de un parcial de componente (`_<x>.scss`)

Todo componente vive en `scss/fourties/<nivel>/<x>/_<x>.scss` y empieza **siempre** igual:

```scss
// ABSTRACTS
// ================================================
@import "../../../abstracts/abstracts.scss";   // profundidad: 3 niveles desde fourties/<nivel>/<x>/
@import "../../../vendors/bourbon/bourbon";
// ================================================

.ft-btn {                 // bloque = clase raíz (.ft- · .ft-mol- · .ft-org- según nivel)
  $self: &;               // referencia BEM al selector padre (para #{$self}__x anidados)
  // … (ver "Colocación del código")
}
```

- **Un bloque por archivo**: `.ft-<x>` (atom) · `.ft-mol-<x>` (molecule) · `.ft-org-<x>`
  (organism). Sin clases sueltas fuera del patrón.
- `$self: &;` se declara como primera línea del bloque y permite referirse al propio
  selector desde contextos anidados (`#{$self}__icon`, combinaciones con behaviors).
- Los atoms **no anidan** otros atoms; cada parcial es autocontenido.

### Colocación del código DENTRO del bloque (orden canónico)

El cuerpo del bloque sigue un orden estable que hace los parciales predecibles:

1. **Mixins de caja Bourbon** primero (`position`, `border-*`, `transition-button`…).
2. **Propiedades base** (display, background, color con `var(--…)`, font-weight…).
3. **Condicional de marca** irreducible: `@if $brand == revistas { … }`.
4. **Behaviors contextuales** (`@include behavior-ft-helper-bg(...) { … }`).
5. **`@mixin` internos** del componente para escalas reutilizables (p.ej. `btn-size-md`),
   declarados antes de los modificadores que los usan.
6. **Elementos BEM** `&__elemento { … }`.
7. **Modificadores BEM** `&--modificador { … }` (consumen los `@mixin` internos).

```scss
.ft-btn {
  $self: &;
  @include position(relative, null null null null);
  @include border-top-radius(30px);
  @include transition-button(100ms, 50ms, 100ms);
  display: inline-block;
  color: var(--color-black);

  @if $brand == revistas { text-transform: uppercase; }

  @mixin btn-size-md { @include padding(0.88rem 2rem); @include font--body-L; @include fontBold; }

  &--md { @include btn-size-md; }
  &--primary {
    @include border-color(var(--color-primary));
    color: var(--color-white);
    background-color: var(--color-primary);
  }
}
```

### Media queries: INLINE en cada selector, mobile-first

Las media queries de tamaño van **dentro del selector al que afectan**, con
`@include min-screen($px)` / `@include max-screen($px)`. **No** se agrupan en bloques
`@media` sueltos al final del archivo. Patrón base mobile, override hacia arriba:

```scss
&--sm-md {
  @include btn-size-sm;                 // base = móvil
  @include min-screen(768px) {          // override en tablet+
    @include btn-size-md;
  }
}
```

Esto vale tanto para componentes como para helpers (ver `_spacers.scss`: cada tamaño
mete su `@include min-screen(768px)` dentro del propio selector).

### Estilo y formato (origen de la disparidad — fijar UN canon)

El repo tiene parciales construidos por manos distintas y hay deriva real en
indentación, comentarios y espaciado. El parcial canónico de referencia es
`scss/fourties/atoms/btn/_btn.scss` (y `_card.scss`, `_spacers.scss`). El estándar es:

| Aspecto | Canon | Disparidad observada (a normalizar en código nuevo/editado) |
|---------|-------|-------------------------------------------------------------|
| **Indentación** | **2 espacios. Sin tabs.** | Tabs en `_cardHome.scss`, `_svgMap.scss`, `_dropdown.scss`; bloques sueltos a 4 espacios |
| **Comentario de línea** | `//` **con un espacio**: `// &--primary` | `//&__edition` (pegado) |
| **Divisor de sección** | `// ` + fila de `=` sobre/bajo el rótulo (la longitud exacta no importa; respeta la del archivo) | longitudes y estilos mezclados |
| **Etiqueta por bloque** | comentario breve con el selector que viene, justo antes: `// &__icon`, `// &--md` | bloques sin etiqueta |
| **Comentario de bloque `/* */`** | **solo** si debe sobrevivir en el CSS compilado; nunca anidar (no meter `*/` dentro) | `/* */` usado como comentario normal en ~27 parciales |
| **Operadores en `@if`** | espacios a ambos lados: `@if $brand == revistas` | `$brand ==revistas` (pegado) domina en legacy — **no** copiarlo |
| **Tras `:` en declaración** | un espacio: `color: var(--color-black)` | — |
| **Listas de args** | coma + espacio: `@include margin(0 null 0 null)` | — |
| **Selectores múltiples** | uno por línea (coma al final de cada uno) | listas en una sola línea larga |
| **Líneas en blanco** | 1 entre bloques hermanos; bloque de imports separado por divisor; sin dobles en blanco; sin trailing whitespace; newline final | dobles líneas y trailing sueltos |

**Profundidad de anidación**: objetivo **≤ 3 niveles** desde el bloque raíz. Para
"componente según su contexto/ancestro" usa los mixins `behavior-*` (generan el selector
plano `.ancestro &`) **en vez de anidar** `.ancestro { .ft-… {} }`. Para elementos usa
`&__elemento` y sub-elementos `&-sufijo` (p.ej. dentro de `&__edition` → `&-logo` genera
`.ft-mol-card__edition-logo`), no reescribas el selector completo.

**`@include` multiargumento**: cuando un mixin tiene muchos parámetros (`resets-custom`,
`behavior-ft-btn--pulse`…), **un argumento por línea con comentario inline** de su rol —
legibilidad sobre compacidad (patrón real en `_btn.scss` y `*-setup.scss`).

**CSS custom properties locales**: se pueden declarar a nivel de componente/elemento para
tematizar sub-piezas (`--color-edition-bg-1: var(--color-darkGrey);` en `_card.scss`);
kebab-case y derivadas de `var(--color-*)`, nunca de un hex.

> **Diff mínimo**: el canon aplica a **código nuevo o al bloque que editas**. NO reformatees
> archivos legacy enteros solo por estilo (genera ruido y rompe el `blame`); normaliza lo que
> tocas. La consistencia se gana incrementalmente.

### Mixins de abstracts (usar mixin antes que propiedad cruda)

Cuando existe un mixin, se usa el mixin en lugar de la propiedad directa. Dos familias:

| Familia | Ejemplos | Para qué |
|---------|----------|----------|
| **Box-model (Bourbon)** | `position()`, `margin()`, `padding()`, `border-style/width/color()`, `border-top-radius()` | Shorthands con `null` para omitir lados sin pisar los demás |
| **DS (abstracts/mixins)** | `min-screen($px)` / `max-screen($px)`, `min-click-area()`, `hide-visually`, `transition-button()`, `font--body-L` / `fontBold`, `behavior-*()` | Responsive, accesibilidad táctil/lectores, tipografía y comportamiento contextual del DS |

Breakpoints del DS (vía `min-screen`/`max-screen`): phablet 600px · tablet 800px ·
laptop 1024px · desktop ~1120px (70em). En componentes es habitual ver `768px` literal.

**Mixin-first (no `@extend`)**: el DS comparte estilo con **mixins**, no con `@extend`,
`%placeholders` ni `map-get` en componentes (uso casi nulo, verificado en el repo). Para
reutilizar un patrón usa un `@mixin` —interno del bloque (p.ej. `btn-size-md`) o de
`abstracts/`— e inclúyelo. `@extend` queda prohibido en parciales de componente: agrupa
selectores de forma impredecible y rompe el control de cascada/peso. Para maps/functions de
`abstracts/` (iconos, logos, branding como `functionBrandSet()`) consúmelos vía sus mixins,
no repliques su lógica.

### Mixins `behavior-*` — estilar por contexto sin variantes nuevas

En vez de crear archivos de variante para cada matiz, el DS usa mixins de comportamiento
(en `abstracts/mixins/_behaviors.scss`) que generan el selector contextual:

| Mixin | Genera | Cuándo |
|-------|--------|--------|
| `behavior-brand($name)` | `.ft-brand-<name> &` | ajuste pequeño solo en una marca |
| `behavior-parent($class…)` | `.<class> &` (ancestro) | el componente cambia según su contenedor |
| `behavior-parent-nested($class…)` | `&.<class>` (mismo elemento) | modificador en el propio elemento |
| `behavior-parent-selector($sel…)` / `behavior-in-ancestors($sel)` | selectores compuestos / varios ancestros | cabeceras/medios concretos |
| `behavior-ft-helper-bg(<color>)` | reacción a un helper de fondo aplicado encima | invertir color sobre fondos del DS |

Regla: **diferencia pequeña → `behavior-brand()`**; **diferencia significativa → archivo
de variante de marca**.

### Estados y pseudo-clases (`:hover`, `:focus-visible`, `:disabled`, `[aria-*]`)

Es el patrón más frecuente del repo (cientos de usos). Convenciones:

- **Anidados con `&`** dentro del bloque/elemento/modificador al que pertenecen, con su
  comentario-etiqueta: `// &:focus-visible` → `&:focus-visible { … }`. Nunca como regla
  suelta repitiendo el selector completo.
- **Foco: `:focus-visible`** (no `:focus` a secas) para no mostrar el anillo en click de
  ratón. Cuando hover y foco comparten estilo, agrúpalos con `&:where(:hover, :focus-visible)`
  (patrón real del repo; `:where()` mantiene la especificidad a 0 y no la escala).
- **Deshabilitado**: estiliza el estado real del DOM — `&[disabled]` / `&:disabled` para
  controles nativos, `&[aria-disabled="true"]` para los no nativos. Mismo criterio para
  hooks de estado ARIA: `&[aria-expanded="true"]`, `&[aria-current="page"]`…
- **Botones**: los estados de `.ft-btn` (hover/focus/active/disabled, móvil y desktop) NO se
  escriben a mano estado por estado; se canalizan por **`@include behavior-ft-btn--pulse(...)`**
  (un argumento por línea con su comentario). Reusa ese mixin en vez de duplicar bloques de estado.
- **Orden** dentro del selector: declaraciones base → estados (`:hover`/`:focus-visible` →
  `:active` → `:disabled`) → media queries inline. No mezclar estados entre medias.

```scss
&__action {
  color: var(--color-black);

  // &:where(:hover, :focus-visible)
  &:where(:hover, :focus-visible) {
    color: var(--color-primary);
  }

  // &[disabled]
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

### Variables: CSS de marca vs SCSS

- **`var(--…)` (CSS custom properties)** para todo lo *tematizable*: color, tipografía,
  espaciados de marca (`var(--color-primary)`, `var(--font-stack)`). Su valor vive en
  `setting.css` por marca. **Nunca** hex/rgb hardcodeado en un componente.
- **`$variables` SCSS** solo para lo *estructural de compilación*: `$brand` (marca activa),
  `$images-path` (`#{$images-path}/icons/x.svg`), `$fonts-path`. Definidas en
  `abstracts/variables/`.

### Nomenclatura real, assets y dark mode (realidades del repo)

- **Naming legacy mixto**: parte del inventario usa **camelCase** en carpeta/archivo y clase
  (`btnGroup/_btnGroup.scss` → `.ft-mol-btnGroup`, `cardHome`, `dataSheed`, `modNews`) junto a
  kebab-case (`az-list`, `sticky-panel`). **Regla: respeta el nombre existente** de cada
  componente, no lo "corrijas"; para uno **nuevo**, kebab-case salvo que extienda una familia
  camelCase ya establecida. La clase BEM puede ser camelCase porque así existe en el HTML real.
- **Assets**: referencia imágenes/logos/iconos con `url(#{$images-path}/logos/logo-x.svg)` —
  nunca rutas absolutas hardcodeadas. `$images-path` resuelve a `/cds-statics/assets/img`.
- **Dark mode**: vive **global** en `scss/base/_dark.scss` (se dispara con `data-theme="dark"`
  en `<html>`, mecanismo nativo del DS). Es **raro** estilarlo por componente; no crees un
  `_dark` por pieza salvo excepción justificada — la mayoría hereda del dark global vía las
  `var(--color-*)`, que ya cambian con el tema.

### Variantes por marca (dos piezas)

1. **Diferencias dentro del parcial base** con `@if $brand == <marca> { … }` (para matices
   irreducibles; p.ej. `revistas` en mayúsculas).
2. **Archivo de variante** `scss/fourties/<nivel>/<x>/<x>-<marca>.scss` cuando la marca
   diverge de forma significativa. El archivo de variante es **mínimo**: fija la marca y
   reimporta el parcial base (que resuelve sus `@if $brand`), añadiendo overrides si hace
   falta:

```scss
// advice-sport.scss
$brand: sport;
@import "advice";
```

Solo se crean las variantes que el encargo pida (default: solo `ux`). No generar variantes
de marca no solicitadas.

### Helpers: mixins generadores invocados por marca

Los helpers (`.ft-helper-*`) NO viven en `fourties/`: viven en `scss/base/helpers/_*.scss`
como **`@mixin` generadores** (`@mixin ft-helper-spacers() { … }`) y se **invocan desde el
setup de marca** (`scss/brands/<marca>-setup.scss`), igual que `resets-global`,
`resets-custom`, `ft-helper-backgrounds`, `ft-helper-fonts`… Por eso son brand-aware sin
duplicar archivos. Un helper nuevo = un mixin en `base/helpers/` + su invocación en el setup.

### AMP

Pipeline paralelo: entrada `abstracts/amp-abstracts.scss`, parciales `_amp-<x>.scss` /
archivos `amp-<x>.scss` en la **raíz** de `fourties/` (no en la carpeta del componente),
setups `amp-<marca>-setup.scss` y cores `amp-<marca>-core.scss`. Algunos mixins tienen
versión AMP alternativa.

### Compilación y registro

- **Compila Prepros al guardar** (`prepros.config`). **No compilar SCSS a mano** ni dar por
  hecho un build manual; el output va a `cds-statics/css/` y **no se edita** ahí.
- Un componente nuevo solo "existe" cuando su `@import "fourties/<nivel>/<x>/<x>"` está en
  los `<marca>-core.scss` afectados (y su carpeta tiene `_<x>.scss`).
- Tras crear/editar, actualizar el inventario en `scss/fourties/<nivel>/README.md`.

---

## rules

> **Delta, no duplicado.** Las reglas **genéricas de CSS** (especificidad, `!important`,
> anidación BEM básica, mobile-first, color hardcodeado) viven en `css-architecture` y NO se
> repiten aquí. Este bloque contiene solo el **delta SCSS-del-DS**: hooks `var(--…)`/setting.css,
> mixins del sistema (`min-screen`, `behavior-*`), `$self`, estados, formato y pipeline.

### Estructura del parcial
```
check: partial_imports_header
target: [scss_partial]
rule: file_in scss/fourties/ AND NOT starts_with(@import abstracts + bourbon) → issue
output:
  problem: Parcial de componente sin la cabecera de imports de abstracts/bourbon
  recommendations:
    - Empieza con @import "../../../abstracts/abstracts.scss"; y @import "../../../vendors/bourbon/bourbon";
    - Ajusta la profundidad ../ según la ubicación real del archivo

check: self_reference
target: [scss_block]
rule: block_uses #{$self} AND NOT declares ($self: &) → issue
output:
  problem: Uso de #{$self} sin declarar $self: & al inicio del bloque
  recommendations:
    - Declara $self: &; como primera línea del bloque raíz

check: one_block_per_file
target: [scss_partial]
rule: count(root_class_blocks) > 1 → warning
output:
  problem: Más de un bloque de componente en el mismo parcial
  recommendations:
    - Un parcial = un componente (.ft- / .ft-mol- / .ft-org-)
```

### BEM y nomenclatura
```
check: bem_prefix_by_level
target: [root_class]
rule: level==atom AND NOT match(.ft-<x>) OR level==molecule AND NOT match(.ft-mol-<x>) OR level==organism AND NOT match(.ft-org-<x>) → issue
output:
  problem: Prefijo de clase no corresponde al nivel atómico
  recommendations:
    - atom → .ft- · molecule → .ft-mol- · organism → .ft-org-

check: self_for_inner_block_reference
target: [scss_selector]
rule: rewrites full block selector inside a nested context instead of #{$self} → warning
output:
  problem: Selector del bloque reescrito a mano en vez de #{$self}
  recommendations:
    - Delta DS: usa #{$self}__otro para referenciar el bloque desde dentro
    - La anidación BEM básica (no &__x dentro de &__y) está cubierta en css-architecture
```

### Variables y valores
```
check: hardcoded_brand_value
target: [scss_declaration]
rule: color|background|font-family == hex|rgb|named_family AND theme_token_exists → issue
output:
  problem: Valor de marca hardcodeado en un componente
  recommendations:
    - Usa var(--color-*) / var(--font-stack); el hex vive en setting.css
    - $variables SCSS solo para $brand, $images-path, $fonts-path

check: raw_property_over_mixin
target: [scss_declaration]
rule: declares position|padding|margin|border-* manually AND bourbon_mixin_exists → warning
output:
  problem: Propiedad cruda donde existe un mixin del sistema
  recommendations:
    - Prefiere @include position()/padding()/margin()/border-*() (shorthands con null)
```

### Media queries y responsive
```
check: trailing_media_block
target: [scss_partial]
rule: has @media|@include min-screen agrupados al final fuera del selector que afectan → issue
output:
  problem: Media queries agrupadas al final en vez de inline
  recommendations:
    - Coloca @include min-screen($px) DENTRO del selector/modificador afectado (mobile-first)

check: raw_media_query
target: [scss_rule]
rule: uses @media(min-width|max-width) AND screen_mixin_exists → warning
output:
  problem: @media crudo en vez del mixin de breakpoints del DS
  recommendations:
    - Usa @include min-screen($px) / @include max-screen($px)
```

### Estilo y formato (consistencia)
```
check: indentation_tabs
target: [scss_file]
rule: line starts_with tab → issue
output:
  problem: Indentación con tabuladores
  recommendations:
    - Usa 2 espacios. Normaliza el bloque que edites (no reformatees el archivo entero)

check: indentation_unit
target: [scss_block]
rule: nesting_step != 2_spaces → warning
output:
  problem: Unidad de indentación distinta de 2 espacios
  recommendations:
    - Cada nivel de anidación = 2 espacios (canon de _btn.scss / _card.scss)

check: comment_slash_space
target: [scss_comment]
rule: matches ^//\S (sin espacio tras //) → warning
output:
  problem: Comentario de línea sin espacio tras //
  recommendations:
    - Escribe "// &--primary", no "//&--primary"

check: block_comment_reserved
target: [scss_comment]
rule: uses /* */ AND NOT must_survive_compiled → warning
output:
  problem: Comentario /* */ donde basta //
  recommendations:
    - Usa // (se elimina al compilar). Reserva /* */ solo para comentarios que deban quedar en el CSS
    - Nunca anides /* */ (no metas */ dentro de otro comentario): rompe el archivo

check: if_operator_spacing
target: [scss_at_if]
rule: matches "$brand ==\w" (operador pegado al valor) → warning
output:
  problem: Operador sin espacios en @if
  recommendations:
    - Escribe "@if $brand == revistas" (espacios a ambos lados), no "$brand ==revistas"

check: nesting_depth
target: [scss_selector]
rule: nesting_depth > 4 OR uses ".ancestro &" anidado manualmente → warning
output:
  problem: Anidación profunda o contexto anidado a mano
  recommendations:
    - Mantén ≤3 niveles desde el bloque; usa behavior-parent()/behavior-brand() para el contexto
    - Usa &__elemento y &-sufijo en lugar de reescribir el selector

check: one_selector_per_line
target: [scss_selector_list]
rule: multiple_selectors_same_line → warning
output:
  problem: Lista de selectores en una sola línea
  recommendations:
    - Un selector por línea, coma al final de cada uno

check: long_include_formatting
target: [scss_include]
rule: include_args_count > 4 AND single_line → warning
output:
  problem: @include multiargumento en una sola línea
  recommendations:
    - Un argumento por línea con comentario inline del rol (ver behavior-ft-btn--pulse en _btn.scss)
```

### Estados, mixins y assets (delta DS)
```
check: focus_visible_over_focus
target: [scss_selector]
rule: styles :focus (a secas) for keyboard ring AND NOT :focus-visible → warning
output:
  problem: Anillo de foco con :focus en vez de :focus-visible
  recommendations:
    - Usa &:focus-visible; agrupa hover+foco con &:where(:hover, :focus-visible)

check: state_nesting_with_ampersand
target: [scss_rule]
rule: pseudo_class|aria_state written as full standalone selector instead of nested & → warning
output:
  problem: Estado/pseudo-clase como regla suelta repitiendo el selector
  recommendations:
    - Anida con & dentro del bloque: &:hover, &:focus-visible, &[disabled], &[aria-expanded="true"]

check: button_states_manual
target: [scss_block]
rule: block == .ft-btn variant AND escribe estados a mano (hover/focus/active/disabled) en vez de behavior-ft-btn--pulse → warning
output:
  problem: Estados de botón escritos a mano
  recommendations:
    - Canaliza los estados con @include behavior-ft-btn--pulse(...) (un arg por línea)

check: no_extend_in_component
target: [scss_rule]
rule: uses @extend OR %placeholder OR map-get in scss/fourties component → issue
output:
  problem: @extend / placeholder / map-get en un componente
  recommendations:
    - El DS es mixin-first: comparte estilo con @mixin (interno o de abstracts), nunca @extend
    - Consume iconos/logos/branding por sus mixins de abstracts, no con map-get directo

check: hardcoded_asset_path
target: [scss_declaration]
rule: url() with absolute/relative literal path AND NOT #{$images-path} → warning
output:
  problem: Ruta de asset hardcodeada
  recommendations:
    - Usa url(#{$images-path}/...) — $images-path = /cds-statics/assets/img

check: per_component_dark
target: [scss_partial]
rule: defines dark styles per component AND NOT justified → warning
output:
  problem: Dark mode estilado por componente
  recommendations:
    - El dark vive global en base/_dark.scss (data-theme="dark"); deja que las var(--color-*) hereden
```

### Marca y variantes
```
check: brand_variant_minimal
target: [scss_variant_file]
rule: file matches <x>-<marca>.scss AND NOT (sets $brand AND @import "<x>") → warning
output:
  problem: Archivo de variante de marca no sigue el patrón mínimo
  recommendations:
    - Patrón: $brand: <marca>; @import "<x>"; + solo los overrides necesarios
    - Diferencia pequeña → usa behavior-brand() en el parcial base, no un archivo nuevo

check: unrequested_brand_variants
target: [scss_component]
rule: creates variant files for brands NOT requested → issue
output:
  problem: Variantes de marca no solicitadas
  recommendations:
    - Crea solo las variantes pedidas (default: solo ux)
```

### Pipeline, registro y frontera
```
check: component_registered_in_core
target: [scss_component]
rule: partial_exists AND NOT imported_in(<marca>-core.scss) → issue
output:
  problem: Componente no registrado en el core de su marca
  recommendations:
    - Añade @import "fourties/<nivel>/<x>/<x>" en cada <marca>-core.scss afectado
    - Actualiza scss/fourties/<nivel>/README.md

check: no_abstracts_edit
target: [scss_file]
rule: writes_in scss/abstracts/ AND NOT approved → issue
output:
  problem: Modificación de la base abstracts sin aprobación
  recommendations:
    - No tocar scss/abstracts/ (variables, mixins, functions) sin el equipo de diseño

check: no_compiled_edit
target: [css_file]
rule: writes_in cds-statics/css/ → issue
output:
  problem: Edición de un artefacto compilado
  recommendations:
    - Edita el SCSS fuente; Prepros recompila al guardar. Nunca toques cds-statics/css/
```

---

## checklist
- [ ] ¿El parcial está en `scss/fourties/<nivel>/<x>/_<x>.scss` y abre con `@import` de abstracts + bourbon?
- [ ] ¿`$self: &;` declarado y un solo bloque de componente por archivo?
- [ ] ¿Prefijo correcto por nivel (`.ft-` / `.ft-mol-` / `.ft-org-`) y BEM sin elementos anidados?
- [ ] ¿Colores/tipografía con `var(--…)` (nunca hex)? ¿`$` SCSS solo para `$brand`/paths?
- [ ] ¿Mixins del sistema en vez de propiedades crudas (position/padding/border/…)?
- [ ] **Estados**: ¿`&:focus-visible` (no `:focus`), estados anidados con `&` (`&[disabled]`, `&[aria-*]`), y estados de botón vía `behavior-ft-btn--pulse`?
- [ ] **Mixin-first**: ¿sin `@extend`/`%placeholder`/`map-get` en el componente? ¿reutilización vía `@mixin`?
- [ ] **Assets/naming/dark**: ¿`url(#{$images-path}/…)`? ¿respetado el naming existente (camelCase legacy incluido)? ¿sin `_dark` por componente (vive en `base/_dark.scss`)?
- [ ] ¿Media queries **inline** en cada selector con `min-screen`/`max-screen`, mobile-first?
- [ ] ¿Diferencias de marca: `@if $brand` o `behavior-brand()` para lo pequeño, archivo `<x>-<marca>.scss` mínimo para lo grande?
- [ ] ¿Solo las variantes de marca solicitadas (default `ux`)?
- [ ] ¿Helper nuevo creado como `@mixin` en `base/helpers/` e invocado en el setup de marca?
- [ ] ¿Componente registrado con `@import` en los `<marca>-core.scss` y README de nivel actualizado?
- [ ] **Formato**: ¿2 espacios (sin tabs)? ¿Comentarios `//` con espacio y etiqueta por bloque? ¿`/* */` solo si debe quedar en el CSS compilado?
- [ ] **Formato**: ¿Operadores espaciados (`@if $brand == revistas`)? ¿Un selector por línea? ¿`@include` largo con un arg por línea?
- [ ] **Formato**: ¿Anidación ≤3 niveles (contexto vía `behavior-*`, no `.ancestro &` anidado)? ¿Sin dobles líneas en blanco ni trailing whitespace?
- [ ] **Diff mínimo**: ¿solo normalizado el bloque editado, sin reformatear el archivo legacy entero?
- [ ] ¿Sin tocar `scss/abstracts/` ni `cds-statics/`? ¿Versión PATCH only? ¿Compila Prepros (no a mano)?
