# Abstracts – Variables, mixins, funciones

Base compartida por todo el proyecto SCSS. **No modificar sin coordinar con el equipo de diseño.**

## Estructura

```
abstracts/
├── abstracts.scss          # Punto de entrada HTML5
├── amp-abstracts.scss      # Punto de entrada AMP
├── variables/
│   ├── variables.scss      # Orquestador
│   ├── _measures.scss      # Espaciados y tamaños
│   ├── _paths.scss         # $images-path, $fonts-path
│   └── _brands.scss        # Variables por marca
├── mixins/
│   ├── mixins.scss         # Orquestador HTML5
│   ├── amp-mixins.scss     # Orquestador AMP
│   ├── _alignments.scss
│   ├── _backgrounds.scss
│   ├── _behaviors.scss     # behavior-brand, behavior-parent, behavior-parent-nested...
│   ├── _click-area.scss    # min-click-area (44px mínimo)
│   ├── _effects.scss
│   ├── _focus.scss
│   ├── _fonts.scss
│   ├── _grid.scss
│   ├── _hides.scss
│   ├── _masks.scss
│   ├── _media-queries.scss # min-screen, breakpoints
│   └── _transitions.scss
├── maps/
│   ├── maps.scss
│   ├── amp-maps.scss
│   ├── _filters.scss
│   ├── _icons.scss
│   ├── _logos.scss
│   ├── _animations.scss
│   ├── _amp-filters.scss
│   └── _amp-icons.scss
└── functions/
    ├── functions.scss
    └── _branding.scss
```

## Variables clave

| Variable | Ubicación | Valor |
|----------|-----------|-------|
| `$images-path` | `_paths.scss` | `/cds-statics/assets/img` |
| `$fonts-path` | `_paths.scss` | `../fonts` |
| `$brand` | core file raíz | Marca activa (ux, sport, ep…) |

## Mixins principales

| Mixin | Archivo | Uso | Caso de uso (cuándo usarlo) |
|-------|---------|-----|------------------------------|
| `@include position()` | Bourbon | position + top/right/bottom/left | Posicionar un elemento en una sola línea (`position(absolute, 0 null null 0)`) en vez de 4 propiedades. |
| `@include margin()` | Bourbon | margin shorthand | Margen con `null` para omitir lados concretos sin pisar los demás. |
| `@include padding()` | Bourbon | padding shorthand | Padding con `null` para omitir lados (igual que margin). |
| `@include min-screen($px)` | `_media-queries` | Media query `min-width` | Aplicar estilos a partir de un breakpoint (mobile-first); base de todo el responsive del DS. |
| `@include min-click-area()` | `_click-area` | Área mínima de clic (44px WCAG) | Garantizar que un icono o botón pequeño tenga zona táctil de 44px (accesibilidad). |
| `@include hide-visually` | `_hides` | Ocultar visualmente (accesibilidad) | Ocultar texto visualmente pero mantenerlo para lectores de pantalla (labels, contexto). |
| `@include behavior-brand($name)` | `_behaviors` | Estilos dentro de `.ft-brand-[name]` | Pequeño ajuste visual de un componente solo en una marca, sin crear archivo de variante. |
| `@include behavior-parent($class)` | `_behaviors` | Estilos cuando el ancestro tiene la clase | Cambiar un componente según el contenedor donde vive (ej. card dentro de un hero). |
| `@include behavior-parent-nested($class)` | `_behaviors` | Estilos cuando el mismo elemento tiene la clase | Aplicar un modificador que está en el propio elemento junto a la clase base. |
| `@include behavior-parent-selector($selector)` | `_behaviors` | Ancestro con selector CSS complejo | Igual que `behavior-parent` pero con selectores compuestos (clases múltiples, atributos). |
| `@include behavior-in-ancestors($selectors)` | `_behaviors` | Múltiples ancestros posibles | Mismo estilo para varias cabeceras/medios distintos posibles como ancestro. |
| `@include behavior-affix($container)` | `_behaviors` | Estilos cuando el elemento está en modo affix | Estilos del elemento cuando queda fijado (sticky) dentro de un contenedor. |
| `@include transition-button()` | `_transitions` | Transición estándar para botones | Transición consistente de hover/focus en botones y elementos clicables. |

## Media queries

| Nombre | Valor | Uso |
|--------|-------|-----|
| desktop | 70em (≈1120px) | `@include min-screen(70em)` |
| laptop | 64em (≈1024px) | `@include min-screen(1024px)` |
| tablet | 50em (≈800px) | `@include min-screen(800px)` |
| phablet | 37.5em (≈600px) | `@include min-screen(600px)` |
| mobileonly | max-width 37.5em | `@include max-screen(37.5em)` |

## Documentación de mixins de comportamiento (_behaviors.scss)

### `behavior-brand($name)`

Aplica estilos sólo cuando el contexto tiene la clase `.ft-brand-[name]` en un ancestro.

```scss
// Input
.ft-btn {
  @include behavior-brand(sport) {
    background-color: var(--color-primary);
  }
}

// Output CSS
.ft-brand-sport .ft-btn { background-color: var(--color-primary); }
```

**Parámetros**:
- `$name` — nombre de la marca (ux, sport, ep, epe, regionales, revistas)

---

### `behavior-parent-nested($class...)`

Aplica estilos cuando el propio elemento tiene la clase especificada (es decir, el modificador está en el mismo elemento). Acepta múltiples clases.

```scss
// Input
.ft-mol-tabs {
  @include behavior-parent-nested(ft-mol-tabs--mobileonly) {
    @include min-screen(768px) { display: none; }
  }
}

// Output CSS
.ft-mol-tabs.ft-mol-tabs--mobileonly { ... }
```

**Parámetros**:
- `$class...` — uno o más nombres de clase (sin punto). Se generará un selector por cada clase.

---

### `behavior-parent($class...)`

Aplica estilos cuando un ancestro (padre o superior) tiene la clase especificada.

```scss
// Input
.ft-mol-card__title {
  @include behavior-parent(ft-org-hero) {
    font-size: 2rem;
  }
}

// Output CSS
.ft-org-hero .ft-mol-card__title { font-size: 2rem; }
```

**Parámetros**:
- `$class...` — uno o más nombres de clase (sin punto).

---

### `behavior-parent-selector($selectors...)`

Como `behavior-parent` pero acepta selectores CSS complejos (con clases compuestas, atributos, etc.).

```scss
.ft-layout-header-regionales__container {
  @include behavior-parent-selector('.la-nueva-espana.riberadearriba') {
    background-color: red;
  }
}
```

---

### `behavior-in-ancestors($selectors)`

Aplica estilos cuando cualquiera de los selectores especificados es un ancestro del elemento.

```scss
.ft-org-footer__logo {
  @include behavior-in-ancestors('.diario-informacion') {
    background-image: url('logo-di.svg');
  }
}
```

---

### `behavior-ft-btn--pulse(...)`

Mixin complejo para el comportamiento interactivo de botones con efecto pulse. 15 parámetros (todos opcionales, `null` por defecto):

| Parámetro | Descripción |
|-----------|-------------|
| `$btn-pulse-behavior--hover-focus--mobile-background-color` | BG en hover/focus (móvil) |
| `$btn-pulse-behavior--hover-focus--mobile-text-color` | Color texto en hover/focus (móvil) |
| `$btn-pulse-behavior--hover-focus--border-color` | Color borde en hover/focus (desktop) |
| `$btn-pulse-behavior--hover-focus--desktop-text-color` | Color texto en hover/focus (desktop) |
| `$btn-pulse-behavior--hover-focus--desktop-background-color` | BG en hover/focus (desktop) |
| `$btn-pulse-behavior--focus--desktop-outline-width` | Ancho del outline en focus |
| `$btn-pulse-behavior--focus--desktop-outline-style` | Estilo del outline en focus |
| `$btn-pulse-behavior--focus--desktop-outline-color` | Color del outline en focus |
| `$btn-pulse-behavior--focus--desktop-outline-offset` | Offset del outline en focus |
| `$btn-pulse-behavior--active--mobile-background-color` | BG en active (móvil) |
| `$btn-pulse-behavior--active--border-color` | Color borde en active |
| `$btn-pulse-behavior--active--text-color` | Color texto en active |
| `$btn-pulse-behavior--active--desktop-background-color` | BG en active (desktop) |
| `$btn-pulse-behavior--disable--txt-color` | Color texto en disabled |
| `$btn-pulse-behavior--disable--background-color` | BG en disabled |

## Reglas para IA

1. **No modificar** abstracts sin aprobación; es la base de todo el DS
2. **Importar** siempre: `@import "../../../abstracts/abstracts.scss"` (ajustar profundidad de ruta)
3. **Usar mixins** en lugar de propiedades directas cuando existan (position, margin, padding)
4. **Variables CSS**: Los colores y tipografía se definen en `setting.css`; usar `var(--color-*)` siempre
5. **Paths**: Usar `#{$images-path}/icons/icon.svg` para imágenes
6. **AMP**: Usar `amp-abstracts.scss` en componentes AMP; tiene versiones alternativas de algunos mixins
7. **behavior-brand vs variante**: Usar `behavior-brand()` para diferencias pequeñas; crear archivo de variante para diferencias significativas
