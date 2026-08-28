# Sistema de Marcas 42DS

## meta
- domain: 42ds-brand-system
- source: "documento raíz del repositorio (AGENTS.md y/o CLAUDE.md) · scss/README.md · scss/brands/README.md · cds-statics/css/brands/"
- goal: entender cómo funciona la tematización por marca y aplicarla correctamente
- agent_tags: [42ds, poc, ds]

---

## concepts

### Marcas HTML5

| Clave | Medio |
|-------|-------|
| `ux` | Universal — marca por defecto para POCs y desarrollo |
| `sport` | Marca Sport |
| `ep` | El Periódico (de Catalunya) |
| `epe` | El Periódico de España |
| `regionales` | Periódicos regionales |
| `revistas` | Revistas |

### Marcas AMP-only

Las siguientes marcas **solo existen en versión AMP** — no tienen bundle HTML5:

| Clave | Medio |
|-------|-------|
| `viajar` | Viajar |
| `woman` | Woman |
| `stilo` | Stilo |
| `cuore` | Cuore |

### Tabla completa de variantes (HTML5 vs AMP)

| Marca | Setup HTML5 | Setup AMP |
|-------|-------------|-----------|
| UX | `ux-setup.scss` | — |
| Sport | `sport-setup.scss` | `amp-sport-setup.scss` |
| El Periódico | `ep-setup.scss` | `amp-ep-setup.scss` |
| EPE | `epe-setup.scss` | `amp-epe-setup.scss` |
| Regionales | `regionales-setup.scss` | `amp-regionales-setup.scss` |
| Revistas | `revistas-setup.scss` | — |
| Viajar | — | `amp-viajar-setup.scss` |
| Woman | — | `amp-woman-setup.scss` |
| Stilo | — | `amp-stilo-setup.scss` |
| Cuore | — | `amp-cuore-setup.scss` |

### Arquitectura de archivos por marca

```
cds-statics/css/brands/[marca]/
├── setting.css          ← Variables CSS (:root). DEBE cargarse primero.
├── [marca]-core.css     ← Todos los componentes compilados de la marca.
├── atoms/               ← Componentes individuales compilados
├── molecules/
└── organism/
```

### setting.css — Variables CSS de marca
Cada marca define sus valores en `setting.css` usando custom properties en `:root`:

```css
:root {
  --font-stack:              "Nombre Fuente", sans-serif;
  --color-primary:           #hexcolor;
  --color-secondary:         #hexcolor;
  --color-black:             #000000;
  --color-white:             #ffffff;
  --color-background-light:  #f5f5f5;
}
```

Los componentes del DS consumen siempre estas variables, nunca valores hardcoded.

### Orden de carga obligatorio
`setting.css` SIEMPRE antes que cualquier otro CSS de la marca. Si se carga después, los componentes no tendrán los valores correctos de las custom properties.

```html
<!-- ✅ Correcto -->
<link rel="stylesheet" href=".../brands/ux/setting.css">
<link rel="stylesheet" href=".../ux-index.css">

<!-- ❌ Incorrecto -->
<link rel="stylesheet" href=".../ux-index.css">
<link rel="stylesheet" href=".../brands/ux/setting.css">
```

### Clase de marca en `<body>`
La clase `ft-brand-[marca]` en el `<body>` activa los estilos específicos de marca que dependen del contexto DOM (no de las custom properties):

```html
<body class="ft-brand-ux">
```

### Bundles Piano (paywall)

Para páginas con Piano, existen bundles paralelos que incluyen estilos del muro de pago:

```
piano-sport-core.scss · piano-ep-core.scss · piano-epe-core.scss
piano-regionales-core.scss · piano-revistas-core.scss
```

Si un cambio afecta a componentes visibles en páginas con paywall, actualizar también el bundle `piano-*-core.scss` correspondiente.

### Estructura de un setup de marca

Cada `[marca]-setup.scss` llama a cuatro bloques en este orden:

```
1. resets-global()         → Reset tipográfico base
2. resets-custom()         → Configuración completa de la marca
3. ft-helper-backgrounds() → Clases de color de fondo por marca
4. ft-helper-fonts()       → Clases de color de fuente por marca
5. helpers generales       → ft-helper-align, ft-helperAnchors, ft-helper-spacers…
```

**`resets-global()`** — 9 parámetros posicionales:
font-style, font-variant, font-weight, font-family, font-size, line-height, color, letter-spacing, background-color. Todos deben referenciar variables CSS.

**`resets-custom()`** — 26 parámetros posicionales (posición crítica):
1. Nombre de la marca | 2-5. Font families | 6. Font weight | 7-9. Colores de texto
10-11. Colores de selección de texto | 12-13. Colores de selección de links
14-26. Configuración del scrollbar personalizado

**`ft-helper-backgrounds()`** — genera `.ft-helper-bgColor-[marca]--[variante]`:
primary · secondary · tertiary · quaternary · quinary · senary · septenary · darkGrey · mediumGrey · lightGrey · degraded1 · degraded2 · degraded3

**`ft-helper-fonts()`** — genera `.ft-helper-fontColor-[marca]--[variante]`:
primary · secondary · tertiary · quaternary · `--400` · `--500` · `--700`

> **Los parámetros son posicionales**, no nombrados. Respetar el orden exacto al modificar.

### Variables CSS completas generadas en setting.css

```css
:root {
  --font-stack: "Nombre Fuente", sans-serif;
  --font-primary: "Fuente Principal", sans-serif;
  --font-size-basis: 16px;
  --font-height-basis: 1.5;
  --color-primary: #hexcolor;
  --color-secondary: #hexcolor;
  --color-tertiary: #hexcolor;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-darkGrey: #333333;
  --color-mediumGrey: #666666;
  --color-lightGrey: #cccccc;
}
```

### Variantes por marca en SCSS
Cuando un componente tiene diferencias visuales por marca que no se pueden resolver con custom properties, se crean archivos SCSS específicos:

```
scss/fourties/atoms/[componente]/
├── _[componente].scss         ← Base compartida
├── [componente]-ux.scss       ← Variante showroom
├── [componente]-sport.scss    ← Variante sport
└── [componente]-revistas.scss ← Variante revistas
```

La condición `@if $brand == revistas { ... }` en SCSS aplica estilos solo al compilar esa marca.

### cds-statics/ — solo artefactos compilados
Los archivos en `cds-statics/css/` son el output del compilador Prepros. **Nunca se modifican directamente**. Las modificaciones van en `scss/` y Prepros recompila.

---

## rules

### Loading order
```
check: setting_css_first
target: [html_head]
rule: loads_brand_css BEFORE setting_css → issue
output:
  problem: setting.css cargado después del CSS de componentes
  recommendations:
    - setting.css siempre es el primer CSS de marca que se carga
    - <link href=".../setting.css"> debe aparecer antes que <link href=".../[marca]-core.css">

check: setting_css_present
target: [html_head]
rule: loads_brand_css AND no_setting_css → issue
output:
  problem: CSS de componentes sin setting.css
  recommendations:
    - Todos los proyectos que usan 42DS deben cargar setting.css
    - Sin setting.css, las custom properties no están definidas y el diseño se rompe
```

### CSS variables
```
check: hardcoded_color_in_component
target: [scss_component]
rule: uses_hex_or_rgb_color AND custom_property_exists → issue
output:
  problem: Color hardcoded en componente cuando existe custom property de marca
  recommendations:
    - ❌ color: #C00; → ✅ color: var(--color-primary);
    - ❌ background: #F5F5F5; → ✅ background: var(--color-background-light);
    - Las custom properties permiten que el mismo componente funcione en todas las marcas

check: undefined_custom_property
target: [scss_component]
rule: uses_var(--X) AND --X_not_in_setting_css → issue
output:
  problem: Custom property usada en componente que no está definida en setting.css
  recommendations:
    - Añade la variable a todos los setting.css de marca, o
    - Usa un fallback: var(--X, #valor-seguro)
```

### Brand class
```
check: body_brand_class
target: [body]
rule: no_ft_brand_class → issue
output:
  problem: <body> sin clase ft-brand-[marca]
  recommendations:
    - Añade ft-brand-ux (showroom/POCs) o ft-brand-[marca] correspondiente
    - Sin esta clase, los estilos específicos de marca por DOM no se aplican

check: cds_statics_modification
target: [file_path]
rule: path starts_with "cds-statics/css/" AND file_modified → issue
output:
  problem: Modificación directa a un artefacto compilado
  recommendations:
    - Modifica el SCSS fuente en scss/ y deja que Prepros recompile
    - cds-statics/ es output, no source
```

---

## checklist
- [ ] ¿`setting.css` cargado ANTES que cualquier otro CSS de marca?
- [ ] ¿El `<body>` tiene `ft-brand-[marca]`?
- [ ] ¿Los componentes usan `var(--color-X)` en lugar de hex directos?
- [ ] ¿Las custom properties usadas están definidas en `setting.css`?
- [ ] ¿Las modificaciones van en `scss/`, no en `cds-statics/`?
- [ ] ¿Las variantes por marca usan `@if $brand == [marca]` en SCSS?
- [ ] ¿Las marcas AMP-only (viajar, woman, stilo, cuore) usan `amp-[marca]-setup.scss`?
- [ ] ¿Si el cambio afecta paywall, se actualizó también `piano-*-core.scss`?
- [ ] ¿Al añadir una nueva marca se respetó el orden posicional de los 26 parámetros de `resets-custom()`?
