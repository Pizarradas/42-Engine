# Design System de los diarios Regionales (Prensa Ibérica)

> Derivado del DS 42DS: `cds-statics/css/brands/regionales/setting.css` + `scss/brands/regionales-setup.scss`. Clave de marca: `regionales` · clase de body: `ft-brand-regionales`. **Umbrella**: una sola arquitectura visual para decenas de cabeceras regionales (Faro de Vigo, La Nueva España, Levante-EMV, Diario de Mallorca, Información, La Provincia…), donde **el color primario cambia por cabecera**.

## 0. Reglas por defecto (overridables)

> Son los **defaults** al generar con este `DESIGN.md`. Si el usuario pide explícitamente lo contrario en su invocación, **prevalece su petición**.

1. **Tipografía** — usa siempre las fuentes de marca del DS, nunca familias inventadas. Cuerpo/UI por defecto con `var(--font-stack)`; titulares con la variable de display de la marca (`var(--font-primary)`).
2. **Botones** — usa los botones del DS (`.ft-btn` con sus tamaños/modificadores) y las especificaciones de esta marca; no crees botones ad hoc.
3. **Border-radius** — radio por defecto `0.5rem` (`.5rem`), en línea con el DS. Excepción: componentes con radio propio del DS (tags/botón pill, etc.) conservan el suyo.
4. **Mayúsculas** — los textos **no** van en `uppercase` por defecto.
5. **Bordes** — evita el abuso de `border`: equilibra el diseño para que no parezca "todo cajas". Prefiere separar por espaciado, fondos sutiles o divisores finos antes que encajar cada bloque en un recuadro, salvo que el usuario lo pida.

## 1. Visual Theme & Atmosphere

Los Regionales comparten **un mismo sistema de diario de proximidad**: sobrio, legible y de confianza, con tipografía de sistema y una base azul `#136496`. La particularidad es que es una **marca paraguas multi-cabecera**: cada periódico (Faro de Vigo, Levante, La Nueva España…) **sobrescribe el color primario** con el suyo (`--color-<cabecera>`), manteniendo idéntica la estructura, la tipografía, la retícula y los componentes. Así, un mismo layout sirve a todas las cabeceras y solo cambia el acento cromático.

Diseño **plano y editorial**, retícula de 12 columnas, jerarquía clara, base de lectura de alto contraste (`#111` sobre blanco). La identidad de cada diario es **cromática**, no tipográfica.

**Características clave:**
- Base azul `#136496`; **color primario por cabecera** (ver tabla §2).
- Tipografía de **sistema** (sin webfont de marca): neutra y legible.
- Oro `#936f06` como premium/suscripción común.
- Botones pill (radio 30px), superficies planas.
- Una arquitectura, N acentos: el layout no cambia entre cabeceras.

## 2. Color Palette & Roles

### Base de la marca paraguas
- **Azul regionales** (`#136496`): `--color-primary` por defecto (y color de La Nueva España).
- **Negro** (`#111`): `--color-secondary` · **Gris oscuro** (`#333`): tertiary · **Gris medio** (`#666`): quaternary.
- **Verde** (`#4a851c`): `--color-quinary`.
- **Oro** (`#936f06`): `--color-senary`, `--color-premium`, `--color-subscription-septenary`.
- **Rojo caso abierto** (`#e00009`): `--color-caso-abierto`.

### Color primario por cabecera (`--color-<cabecera>`) — selección representativa
| Cabecera | Hex |
|----------|-----|
| Faro de Vigo | `#1b6598` |
| La Nueva España | `#136496` |
| Levante-El Mercantil Valenciano | `#1b6598` |
| Diario de Mallorca | `#1567ac` |
| Información (Alicante) | `#006f9f` |
| La Provincia / Diario de Las Palmas | `#004884` |
| La Opinión de Málaga | `#00653e` |
| La Opinión de Murcia | `#c32e1d` |
| La Opinión A Coruña | `#0077ba` |
| El Periódico de Aragón | `#0b6c95` |
| El Periódico Extremadura | `#007977` |
| El Periódico Mediterráneo | `#184479` |
| Diario de Ibiza | `#0059a2` |
| Diario Córdoba | `#e22931` |
| El Día / La Opinión de Tenerife | `#1d64af` |
| Diari de Girona | `#d0021b` |
| Empordà | `#00597a` |
| Regió7 | `#3856a3` |
| El Correo de Andalucía | `#cb184f` |
| Mallorca Zeitung | `#00638e` |

> La paleta completa (más de 40 cabeceras y ediciones hiperlocales) vive en `regionales/setting.css` como variables `--color-<cabecera>`. Predominan los **azules** de proximidad; algunas cabeceras usan rojo (Diari de Girona, Diario Córdoba, La Opinión de Murcia) o verde (La Opinión de Málaga).

### Neutros y funcionales (base compartida del DS)
- Negro `#111` · Blanco `#fff` · Gris oscuro `#999` · Gris medio `#ccc` · Gris claro `#f2f2f2`.
- Éxito `#00bd3e` · Info `#03a9f4` · Aviso `#eeb218` · Error `#fd3700`. Paywall `#FEDE00` / `#F9F0AB`.

## 3. Typography Rules

- **Primaria** — `var(--font-stack)`: stack de **sistema** sans. Sin webfont de marca: la identidad es cromática.
- **Secundaria** — `var(--font-stack)` (la misma) para cuerpo y UI.
- **Branded / editorial** — `var(--font-branded)`: serif para piezas editoriales.
- **Base**: `--font-size-basis: 18px` · `--font-height-basis: 22px`.

Escala (helpers del DS): titulares `ft-helper-fontSize-heading-[XXL…XXS]`; cuerpo `ft-helper-fontSize-body-[XL…XS]`; pesos `ft-helper-fontWeight-[300…800]`.

Regla: misma tipografía para todas las cabeceras; lo único que cambia es el acento de color.

### 3.bis · Escala tipográfica modular — `[TYPESCALE: …]`

> Modificador **opcional y combinable** con cualquier `[MODE: …]`. Por defecto (sin él) se usa la rampa nativa del DS de la sección 3. Es *overridable*: si el usuario lo indica, manda su petición. Sirve para generar **diseños con jerarquías tipográficas distintas** desde el mismo `DESIGN.md`.

**Sintaxis**

```
[TYPESCALE: <preset>]            // base = --font-size-basis de la marca (1.8rem)
[TYPESCALE: <preset> @ <base>]   // base propia, p.ej. @ 1.6rem
```

Se encadena tras el mode: `[MODE: 42DS+HF+CSS] [TYPESCALE: perfect-fourth]`.

**Presets (ratios de typescale.com)**

| Preset | Ratio | Carácter |
|--------|-------|----------|
| `minor-second` | 1.067 | jerarquía muy plana |
| `major-second` | 1.125 | sobria, densa (prensa) |
| `minor-third` | 1.200 | equilibrada |
| `major-third` | 1.250 | editorial estándar |
| `perfect-fourth` | 1.333 | titulares con presencia |
| `augmented-fourth` | 1.414 | contraste alto |
| `perfect-fifth` | 1.500 | dramática |
| `golden` | 1.618 | máximo impacto display |

**Cómo se aplica según el contexto del mode**

- **Modos que emiten CSS/SCSS** (`UI`, `UX+UI`, `42DS+HF+CSS`, `42DS+HF+SCSS`, `42DS+REUSE+CSS`): calcula cada tamaño desde la base con `size(n) = base × ratioⁿ`. Mapeo de roles (exponente n): `body` = 0 · `H6` ≈ 1 · `H5` 2 · `H4` 3 · `H3` 4 · `H2` 5 · `H1`/display 6. `line-height` proporcional (≈ 1.1–1.2 en titulares, ≈ 1.4–1.6 en cuerpo); redondea a 1 decimal en `rem`. `[TYPESCALE]` sólo toca tamaños — familias y demás reglas de marca (secciones 0 y 3) se mantienen.
- **Modos DS-puro / reuse-only** (`42DS+LF`, `42DS+HF` sin CSS, `42DS+REUSE`, `42DS+REUSE-FIRST` reusando helpers): **remapeo de steps**, nunca tamaños inventados. La escala decide *qué step* de la rampa del DS recibe cada rol, comprimiendo o expandiendo la jerarquía sobre los helpers existentes (`ft-helper-fontSize-heading-*`, `-body-*`):

  | Ratio | Remapeo (H1 → H2 → H3 → cuerpo) |
  |-------|---------------------------------|
  | ≤ 1.125 (compacto) | `heading-L` → `heading-M` → `heading-S` → `body-M` |
  | 1.2–1.25 (estándar DS) | `heading-XXL/XL` → `heading-L` → `heading-M` → `body-M/L` |
  | 1.333–1.5 (amplio) | `display-S/M` → `heading-XXL` → `heading-L` → `body-M` |
  | ≥ 1.618 (dramático) | `display-L` → `heading-XL` → `heading-M` → `body-S/M` |

  Rampa del DS de menor a mayor: `body-XS · body-S · body-M · body-L · body-XL · heading-XXS · heading-XS · heading-S · heading-M · heading-L · heading-XL · heading-XXL · display-S · display-M · display-L`.

> `[TYPESCALE]` **no cambia la familia tipográfica**: sólo afecta a tamaños/escala; las familias y el resto de reglas de marca (secciones 0 y 3) se mantienen.

## 4. Component Stylings

### Botón (`.ft-btn`)
- Pill: `border-radius: 30px`, borde `0.2rem solid`, fondo transparente, `font-weight: bold`. Tamaños `--xs/--sm/--md/--lg`.
- **`--primary`**: fondo y borde `--color-primary` — que en cada cabecera resuelve a su `--color-<cabecera>`.

### Enlaces
Color primario de la cabecera activa. Premium/suscripción en oro `#936f06`.

### Tarjetas de noticia
Planas sobre blanco, divisores `#f2f2f2`; el color de cabecera ordena acción y sección. Cabeceras hiperlocales heredan el sistema y aplican su acento.

## 5. Layout Principles

- Retícula 12 columnas flexbox (`ft-layout-grid-flex`), idéntica entre cabeceras.
- Espaciado `ft-helper-spacer-*` (rem): `xxs ~1 · xs ~1.5 · sm ~2 · md ~3 · lg ~6 · xlg ~7 · xxlg ~10`.
- Densidad media, jerarquía sobria de diario de proximidad.
- Breakpoints: `Xs` base · `Sm` 600 · `Md` 800 · `Lg` 1024 · `Xl` 1200.

## 6. Depth & Elevation

Plano y editorial. Profundidad por divisores/bordes (`#f2f2f2`); sombras suaves solo en overlays. **Dark mode** (`data-theme`): fondo `#181a1b`, texto `#cdc9c3`; el color de cabecera se modera a neutros claros en UI secundaria.

## 7. Do's and Don'ts

**Do**
- Mantén estructura, tipografía y componentes idénticos entre cabeceras: **solo cambia el color primario**.
- Toma el primario de la cabecera concreta (`--color-<cabecera>`); por defecto, azul `#136496`.
- Usa oro `#936f06` para premium/suscripción de forma transversal.

**Don't**
- No inventes un color de cabecera: úsalo de la tabla / `setting.css`.
- No introduzcas webfonts de marca ni cambies la retícula por cabecera.
- No rompas el botón pill de 30px.

## 8. Responsive Behavior

Mobile-first; parrilla a 1 columna en `Xs`, expande con `Md`/`Lg`/`Xl`. Base de 18px (lectura cómoda). Misma respuesta para todas las cabeceras.

## 9. Agent Prompt Guide

**Hex de referencia rápida:** base `#136496` · premium oro `#936f06` · caso abierto `#e00009` · texto `#111` · grises `#999`/`#ccc`/`#f2f2f2`. **Color primario = el de la cabecera** (tabla §2). **Tipografía:** sistema.

**Prompts de ejemplo:**
- `Usa prensa-iberica/regionales/DESIGN.md. Diseña una portada de Faro de Vigo HF: primario #1b6598, tipografía de sistema, layout de diario regional.`
- `[MODE: UI]\nMaqueta la misma ficha de noticia para dos cabeceras (Levante #1b6598 y Diario Córdoba #e22931) cambiando solo el acento, según el DESIGN.md de Regionales.`
- `[MODE: 42DS+HF]\nPOC de cabecera regional con clases 42DS y ft-brand-regionales` (en 42DS real el color de cabecera lo aporta `setting.css`/la variable `--color-<cabecera>`).
