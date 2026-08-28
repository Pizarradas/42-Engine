# Brands – Configuración por marca

Setup específico de cada marca: resets, tipografía, colores, scrollbar y helpers. Cada marca tiene su archivo `[marca]-setup.scss`.

## Estructura

```
brands/
├── ux-setup.scss             # Marca UX (showroom / universal)
├── sport-setup.scss
├── ep-setup.scss
├── epe-setup.scss
├── regionales-setup.scss
├── revistas-setup.scss
│
├── amp-sport-setup.scss      # Variantes AMP
├── amp-ep-setup.scss
├── amp-epe-setup.scss
├── amp-regionales-setup.scss
├── amp-viajar-setup.scss
├── amp-woman-setup.scss
├── amp-stilo-setup.scss
└── amp-cuore-setup.scss
```

### Tabla de marcas y variantes AMP

| Marca | HTML5 | AMP |
|-------|-------|-----|
| UX (showroom) | `ux-setup.scss` | — |
| Sport | `sport-setup.scss` | `amp-sport-setup.scss` |
| El Periódico | `ep-setup.scss` | `amp-ep-setup.scss` |
| El Periódico de España | `epe-setup.scss` | `amp-epe-setup.scss` |
| Regionales | `regionales-setup.scss` | `amp-regionales-setup.scss` |
| Revistas | `revistas-setup.scss` | — |
| Viajar | — | `amp-viajar-setup.scss` |
| Woman | — | `amp-woman-setup.scss` |
| Stilo | — | `amp-stilo-setup.scss` |
| Cuore | — | `amp-cuore-setup.scss` |

## Estructura de un setup

Cada archivo de setup llama a cuatro bloques en este orden:

```
1. resets-global()        → Reset tipográfico base
2. resets-custom()        → Configuración completa de la marca
3. ft-helper-backgrounds() → Clases de color de fondo por marca
4. ft-helper-fonts()      → Clases de color de fuente por marca
5. helpers generales      → ft-helper-align, ft-helperAnchors, ft-helper-spacers…
```

## Casos de uso (qué tarea → dónde tocar)

| Quieres… | Dónde actuar |
|----------|--------------|
| Cambiar el color primario/secundario de una marca | Variables CSS en `setting.css` (`--color-primary`…), generadas desde el setup; no hardcodear en componentes. |
| Cambiar la fuente base de una marca | Parámetros de fuente de `resets-custom()` + variables `--font-*` en `setting.css`. |
| Ajustar el scrollbar de una marca | Parámetros 14–26 de `resets-custom()`. |
| Añadir un color de fondo reutilizable de marca | Parámetros de `ft-helper-backgrounds()` → genera `.ft-helper-bgColor-[marca]--*`. |
| Dar de alta una marca nueva | Copiar un `[marca]-setup.scss` existente y adaptar los parámetros posicionales (ver reglas). |
| Versión AMP de una marca | Crear/editar `amp-[marca]-setup.scss` (Viajar, Woman, Stilo, Cuore son **solo** AMP). |

## Documentación de mixins de setup

### `resets-global()` — 9 parámetros

Reset global de tipografía y fondo. Todos los valores deberían referenciar variables CSS.

| Posición | Descripción | Ejemplo |
|----------|-------------|---------|
| 1 | Font style | `normal` |
| 2 | Font variant | `normal` |
| 3 | Font weight | `normal` |
| 4 | Font family | `var(--font-stack)` |
| 5 | Font size | `var(--font-size-basis)` |
| 6 | Line height | `var(--font-height-basis)` |
| 7 | Font color | `var(--color-black)` |
| 8 | Letter spacing | `0` |
| 9 | Background color | `var(--color-white)` |

```scss
@include resets-global(
  normal,                     // font-style
  normal,                     // font-variant
  normal,                     // font-weight
  var(--font-stack),          // font-family
  var(--font-size-basis),     // font-size
  var(--font-height-basis),   // line-height
  var(--color-black),         // color
  0,                          // letter-spacing
  var(--color-white)          // background-color
);
```

---

### `resets-custom()` — 24 parámetros

Configuración completa de la marca: fuentes, colores de selección y scrollbar personalizado.

| Posición | Descripción | Ejemplo Sport |
|----------|-------------|---------------|
| 1 | Nombre de la marca | `sport` |
| 2 | Font family primary | `var(--font-primary)` |
| 3 | Font family primary regular | `null` |
| 4 | Font family secondary | `var(--font-stack)` |
| 5 | Font family tertiary | `null` |
| 6 | Font weight de la marca | `500` |
| 7 | Color primario (texto) | `var(--color-primary)` |
| 8 | Color septenary (texto) | `var(--color-white)` |
| 9 | Color octonary (texto) | `var(--color-black)` |
| 10 | Color de selección de texto | `var(--color-black)` |
| 11 | BG de selección de texto | `var(--color-darkGrey)` |
| 12 | Color de selección de links | `var(--color-white)` |
| 13 | BG de selección de links | `var(--color-primary)` |
| 14 | Scrollbar width (propiedad CSS) | `initial` |
| 15 | Scrollbar vertical size | `10px` |
| 16 | Scrollbar horizontal size | `10px` |
| 17 | Track border-radius top | `10px` |
| 18 | Track border-radius bottom | `10px` |
| 19 | Track background color | `var(--color-lightGrey)` |
| 20 | Thumb border-radius top | `20px` |
| 21 | Thumb border-radius bottom | `20px` |
| 22 | Thumb background color | `var(--color-mediumGrey)` |
| 23 | Thumb border style | `solid` |
| 24 | Thumb border width | `0` |
| 25 | Thumb border color | `var(--color-lightGrey)` |
| 26 | Thumb hover color | `var(--color-black)` |

---

### `ft-helper-backgrounds()` — 14 parámetros

Genera las clases `.ft-helper-bgColor-[marca]--[variante]` con colores de fondo.

| Posición | Descripción | Clase generada |
|----------|-------------|----------------|
| 1 | Nombre de la marca | (prefijo) |
| 2 | Primary | `--primary` |
| 3 | Secondary | `--secondary` |
| 4 | Tertiary | `--tertiary` |
| 5 | Quaternary | `--quaternary` |
| 6 | Quinary | `--quinary` |
| 7 | Senary | `--senary` |
| 8 | Septenary | `--septenary` |
| 9 | Dark grey | `--darkGrey` |
| 10 | Medium grey | `--mediumGrey` |
| 11 | Light grey | `--lightGrey` |
| 12 | Degraded 1 | `--degraded1` |
| 13 | Degraded 2 | `--degraded2` |
| 14 | Degraded 3 | `--degraded3` |

---

### `ft-helper-fonts()` — 8 parámetros

Genera las clases `.ft-helper-fontColor-[marca]--[variante]` con colores de texto.

| Posición | Descripción |
|----------|-------------|
| 1 | Nombre de la marca |
| 2 | Primary |
| 3 | Secondary |
| 4 | Tertiary |
| 5 | Quaternary |
| 6 | `--400` (peso 400) |
| 7 | `--500` (peso 500) |
| 8 | `--700` (peso 700, pasa la font family) |

## Variables CSS generadas

Los setups leen variables definidas en `setting.css` (generado por los abstracts). Variables clave:

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

## Reglas para IA

1. **No modificar** brands sin coordinar con diseño; es configuración crítica de cada medio
2. **Nueva marca**: Copiar un setup existente (p.ej. `sport-setup.scss`) y adaptar los 26 parámetros de `resets-custom()`
3. **AMP**: Usar `amp-[marca]-setup.scss` para versiones AMP; las marcas Viajar, Woman, Stilo y Cuore sólo tienen AMP
4. **Orden**: Brands se importa siempre después de `base/` y antes de `layout/` y `fourties/`
5. **Parámetros posicionales**: Los mixins son posicionales (no nombrados); respetar el orden exacto al modificar
6. **Variables CSS**: Usar siempre `var(--color-*)` y `var(--font-*)` en lugar de valores directos; los valores reales están en `setting.css`
