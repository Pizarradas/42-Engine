# SCSS Pipeline 42DS

## meta
- domain: 42ds-scss-pipeline
- source: "documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · scss/README.md · scss/abstracts/README.md · scss/brands/README.md · scss/fourties/README.md · prepros.config · package.json"
- goal: entender cómo funciona la compilación SCSS y qué herramientas y patrones rigen el DS
- agent_tags: [42ds, ds]

> **Frontera con `knowledges/front/scss-patterns`.** Este knowledge cubre el **cómo compila**
> (pipeline, abstracts, Bourbon, Prepros, versionado). Para el **cómo se escribe** un parcial
> (anatomía, colocación del código, estilo/formato, estados, mixins, registro en cores) →
> `knowledges/front/scss-patterns`. Complementarios, sin solape.

---

## concepts

### Flujo de compilación

```
abstracts (variables, mixins, maps, functions)
        ↓
vendors/bourbon (mixin library)
        ↓
base (reset, helpers, dark mode)
        ↓
brands/[marca]-setup (resets-custom, backgrounds, fonts, helpers)
        ↓
layout (grid flex, grid legacy)
        ↓
fourties/atoms → fourties/molecules → fourties/organism
        ↓
  Prepros (compilador)
        ↓
cds-statics/css/               ← Output compilado (NO modificar directamente)
  brands/[marca]/
    setting.css                ← CSS de custom properties (:root)
    [marca]-core.css           ← Bundle completo compilado
    atoms/[componente].css     ← Componentes individuales
    molecules/[componente].css
    organism/[componente].css
```

### Entry points — bundles estándar HTML5

| Archivo | Descripción |
|---------|-------------|
| `ux-core.scss` | Bundle showroom/universal |
| `sport-core.scss` | Bundle Sport |
| `ep-core.scss` | Bundle El Periódico |
| `epe-core.scss` | Bundle El Periódico de España |
| `regionales-core.scss` | Bundle Regionales |
| `revistas-core.scss` | Bundle Revistas |

### Variantes Piano (paywall)

Bundles alternativos para páginas con Piano (muro de pago). Incluyen los mismos componentes que el core estándar más estilos de paywall activos.

```
piano-sport-core.scss
piano-ep-core.scss
piano-epe-core.scss
piano-regionales-core.scss
piano-revistas-core.scss
```

**Regla**: Si un cambio afecta páginas con paywall, modificar también el bundle `piano-*-core.scss` correspondiente.

### Header extensions

Bundles adicionales solo con estilos del header (para carga independiente en algunos medios):
```
ux-header-ext.scss · sport-header-ext.scss · ep-header-ext.scss
epe-header-ext.scss · regionales-header-ext.scss · revistas-header-ext.scss
```

### Sistema AMP

Las páginas AMP tienen un sistema de compilación paralelo e independiente.

**Entry points AMP:**

| Archivo | Marca |
|---------|-------|
| `amp-sport-index.scss` | Sport |
| `amp-ep-index.scss` | El Periódico |
| `amp-epe-index.scss` | El Periódico de España |
| `amp-regionales-index.scss` | Regionales |
| `amp-viajar-index.scss` | Viajar |
| `amp-woman-index.scss` | Woman |
| `amp-stilo-index.scss` | Stilo |
| `amp-cuore-index.scss` | Cuore |

> Las marcas Viajar, Woman, Stilo y Cuore **solo existen en versión AMP**.

**Diferencias AMP vs HTML5:**

| Aspecto | HTML5 | AMP |
|---------|-------|-----|
| Entry abstracts | `abstracts/abstracts.scss` | `abstracts/amp-abstracts.scss` |
| Mixins | `mixins/mixins.scss` | `mixins/amp-mixins.scss` |
| Setup de marca | `brands/[marca]-setup.scss` | `brands/amp-[marca]-setup.scss` |
| Variable de marca | `$brand: sport` | `$brand: amp-sport` |
| Componentes AMP | Archivo en carpeta del componente | Archivo suelto en `fourties/[nivel]/amp-[nombre].scss` |

**No mezclar nunca** imports HTML5 con AMP. Son sistemas de compilación separados.

### Variables globales Sass

| Variable | Descripción | Valor |
|----------|-------------|-------|
| `$images-path` | Ruta base para imágenes | `/cds-statics/assets/img` |
| `$fonts-path` | Ruta base para fuentes | `../fonts` |
| `$brand` | Marca activa, define condicionales `@if $brand == ...` | `ux`, `sport`, `ep`… |

Uso de paths: `#{$images-path}/icons/icon.svg`

### abstracts/ — el núcleo del sistema

Contiene variables Sass globales, mixins y funciones que todos los componentes importan:

```scss
@import "../../../abstracts/abstracts.scss";  // siempre primera línea
@import "../../../vendors/bourbon/bourbon";   // segunda línea (librería de mixins)
```

**Regla crítica**: `scss/abstracts/` no se modifica sin aprobación explícita del equipo de diseño. Es la base del sistema — un cambio aquí afecta a todos los componentes de todas las marcas.

**Estructura de abstracts/:**
```
abstracts/
├── abstracts.scss           # Punto de entrada HTML5
├── amp-abstracts.scss       # Punto de entrada AMP
├── variables/
│   ├── _measures.scss       # Espaciados y tamaños
│   ├── _paths.scss          # $images-path, $fonts-path
│   └── _brands.scss         # Variables por marca
├── mixins/
│   ├── mixins.scss          # Orquestador HTML5
│   ├── amp-mixins.scss      # Orquestador AMP
│   ├── _alignments.scss
│   ├── _behaviors.scss      # behavior-brand, behavior-parent, behavior-parent-nested…
│   ├── _click-area.scss     # min-click-area (44px mínimo WCAG)
│   ├── _focus.scss
│   ├── _fonts.scss
│   ├── _hides.scss          # hide-visually (accesibilidad)
│   ├── _masks.scss
│   ├── _media-queries.scss  # min-screen, breakpoints
│   └── _transitions.scss
├── maps/
│   ├── _filters.scss
│   ├── _icons.scss
│   ├── _logos.scss
│   └── _animations.scss
└── functions/
    └── _branding.scss
```

### Behavior mixins (_behaviors.scss)

Mixins para aplicar estilos condicionales según contexto DOM o marca. Son el mecanismo preferido antes de crear variantes por archivo.

**`behavior-brand($name)`** — estilos dentro del contexto `.ft-brand-[name]`:
```scss
.ft-btn { @include behavior-brand(sport) { background-color: var(--color-primary); } }
// → .ft-brand-sport .ft-btn { ... }
```

**`behavior-parent($class...)`** — estilos cuando un ancestro tiene la clase:
```scss
.ft-mol-card__title { @include behavior-parent(ft-org-hero) { font-size: 2rem; } }
// → .ft-org-hero .ft-mol-card__title { ... }
```

**`behavior-parent-nested($class...)`** — estilos cuando el mismo elemento tiene el modificador:
```scss
.ft-mol-tabs { @include behavior-parent-nested(ft-mol-tabs--mobileonly) { display: none; } }
// → .ft-mol-tabs.ft-mol-tabs--mobileonly { ... }
```

**`behavior-parent-selector($selectors...)`** — como `behavior-parent` pero acepta selectores CSS complejos:
```scss
@include behavior-parent-selector('.la-nueva-espana.riberadearriba') { ... }
```

**`behavior-in-ancestors($selectors)`** — estilos cuando cualquiera de los selectores es ancestro:
```scss
@include behavior-in-ancestors('.diario-informacion') { ... }
```

**Criterio de uso**:
- Diferencias pequeñas → `behavior-brand()` dentro del mismo archivo
- Diferencias significativas → archivo `[componente]-[marca].scss` separado

### Media queries (abstracts/_media-queries.scss)

| Nombre | Valor | Mixin |
|--------|-------|-------|
| desktop | 70em (≈1120px) | `@include min-screen(70em)` |
| laptop | 1024px | `@include min-screen(1024px)` |
| tablet | 800px (50em) | `@include min-screen(800px)` |
| phablet | 600px (37.5em) | `@include min-screen(600px)` |
| mobileonly | max 37.5em | `@include max-screen(37.5em)` |

### Orden de imports en un core de marca

```scss
$brand: sport;

@import "abstracts/abstracts";
@import "vendors/bourbon/bourbon";
@import "base/base";
@import "brands/sport-setup";
@import "layout/grid";
@import "layout/grid_legacy";

// Atoms
@import "fourties/atoms/btn/btn";
// ... todos los atoms

// Molecules
@import "fourties/molecules/tabs/tabs";
// ... todas las molecules

// Organisms
@import "fourties/organism/masthead/masthead";
// ... todos los organisms

// Variantes de marca
@import "fourties/atoms/btn/btn-sport";
@import "fourties/molecules/tabs/tabs-sport";
```

### Bourbon
Librería de mixins SCSS que proporciona utilidades de posicionamiento, transiciones y más:

```scss
// Mixins más usados de Bourbon
@include position(relative);                    // position + top/right/bottom/left
@include padding(0.88rem 2rem);                 // shorthand de padding
@include transition-button(100ms, 50ms, 100ms); // transición estándar para botones
@include min-screen(768px) { ... }              // media query mobile-first
```

### Estructura de un componente SCSS

```scss
// scss/fourties/atoms/btn/_btn.scss

@import "../../../abstracts/abstracts.scss";
@import "../../../vendors/bourbon/bourbon";

.ft-btn {
    $self: &;  // referencia al selector padre

    // propiedades base con variables CSS de marca
    color: var(--color-black);
    background-color: transparent;

    // mixins de abstracts en lugar de propiedades directas
    @include position(relative);
    @include padding(0.88rem 2rem);

    // responsive con mixin de Bourbon
    @include min-screen(768px) {
        @include padding(1rem 2.5rem);
    }

    // variante por marca (solo si es irreducible con custom properties)
    @if $brand == revistas {
        text-transform: uppercase;
    }

    // elementos BEM
    &__icon {
        width: 1.5rem;
    }

    // modificadores BEM
    &--primary {
        background-color: var(--color-primary);
        color: var(--color-white);
    }

    // referencia a self para modificador que afecta a elemento
    &--loading {
        #{$self}__icon {
            animation: spin 1s linear infinite;
        }
    }
}
```

### brands/[marca]-setup.scss
Archivo de setup por marca. Define la variable `$brand` y los valores de las custom properties que se compilarán a `setting.css`:

```scss
// scss/brands/sport-setup.scss
$brand: sport;

:root {
    --font-stack: "Fuente Sport", sans-serif;
    --color-primary: #c00;
    --color-secondary: #333;
}
```

### Versiones y publicación
```
MAJOR.MINOR.PATCH → 1.150.1
```
- **MAJOR** y **MINOR**: solo equipo de diseño
- **PATCH**: los desarrolladores pueden incrementarlo
- Publicar en desarrollo: `npm run publish:dev`
- Publicar en producción: `git tag v.1.150.X && git push origin --tags`

---

## rules

### Imports
```
check: abstracts_import_present
target: [scss_component_file]
rule: no_import_abstracts → issue
output:
  problem: Componente SCSS sin import de abstracts
  recommendations:
    - Primera línea: @import "../../../abstracts/abstracts.scss";
    - Segunda línea: @import "../../../vendors/bourbon/bourbon";
    - Sin abstracts: las variables Sass globales y mixins no están disponibles

check: import_path_depth
target: [scss_import_path]
rule: path_to_abstracts != "../../../abstracts/abstracts.scss" → issue
output:
  problem: Ruta al import de abstracts incorrecta
  recommendations:
    - Desde scss/fourties/[nivel]/[nombre]/_[nombre].scss son 3 niveles arriba (../../../)
```

### CSS variables vs Sass variables
```
check: sass_variable_for_brand_color
target: [scss_declaration]
rule: uses_sass_variable_for_brand_value AND custom_property_alternative_exists → issue
output:
  problem: Variable Sass para valor de marca (debería ser custom property)
  recommendations:
    - Las variables de marca son custom properties CSS (var(--color-primary))
    - Las variables Sass ($variable) son para valores de compilación, no de tematización
    - ❌ color: $color-primary → ✅ color: var(--color-primary)
```

### abstracts modification
```
check: abstracts_modification
target: [file_path]
rule: path starts_with "scss/abstracts/" AND modified_without_approval → issue
output:
  problem: Modificación de scss/abstracts/ sin aprobación del equipo de diseño
  recommendations:
    - scss/abstracts/ es la base del sistema — un cambio afecta a todos los componentes
    - Proponer el cambio al equipo de diseño antes de implementar
    - Alternativa: crear variables locales al componente si el cambio es específico

check: cds_statics_direct_edit
target: [file_path]
rule: path starts_with "cds-statics/css/" AND manually_edited → issue
output:
  problem: Edición directa de un artefacto compilado
  recommendations:
    - Edita el SCSS fuente en scss/
    - cds-statics/ se regenera en el siguiente build de Prepros
```

### Version management
```
check: version_increment
target: [package.json_version]
rule: minor_or_major_changed AND not_design_team → issue
output:
  problem: Incremento de MAJOR o MINOR por desarrollador (solo equipo de diseño)
  recommendations:
    - Solo incrementa el tercer número (PATCH): 1.150.1 → 1.150.2
    - Usa npm run publish:dev para publicar en el registro local
```

---

## checklist
- [ ] ¿El componente empieza con `@import abstracts` y `@import bourbon`?
- [ ] ¿La ruta a abstracts es `../../../abstracts/abstracts.scss`?
- [ ] ¿Los valores de marca usan `var(--)`, no variables Sass?
- [ ] ¿`$self: &` está definido al inicio del bloque?
- [ ] ¿`scss/abstracts/` no se ha modificado sin aprobación?
- [ ] ¿Las modificaciones van en `scss/`, no en `cds-statics/`?
- [ ] ¿Solo se ha incrementado el PATCH de la versión?
- [ ] ¿Los componentes AMP usan `amp-abstracts.scss`, no `abstracts.scss`?
- [ ] ¿Si el cambio afecta a paywall, se ha actualizado también el bundle `piano-*-core.scss`?
- [ ] ¿Las diferencias pequeñas por marca usan `behavior-brand()` antes de crear archivos de variante?
- [ ] ¿Las rutas a imágenes usan `#{$images-path}/...`?
