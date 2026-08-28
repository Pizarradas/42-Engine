# Design System de El Periódico de España (Prensa Ibérica)

> Derivado del DS 42DS: `cds-statics/css/brands/epe/setting.css` + `scss/brands/epe-setup.scss`. Clave de marca: `epe` · clase de body: `ft-brand-epe`. Medio: **El Periódico de España** (diario nacional).

## 0. Reglas por defecto (overridables)

> Son los **defaults** al generar con este `DESIGN.md`. Si el usuario pide explícitamente lo contrario en su invocación, **prevalece su petición**.

1. **Tipografía** — usa siempre las fuentes de marca del DS, nunca familias inventadas. Cuerpo/UI por defecto con `var(--font-stack)`; titulares con la variable de display de la marca (`var(--font-primary)`).
2. **Botones** — usa los botones del DS (`.ft-btn` con sus tamaños/modificadores) y las especificaciones de esta marca; no crees botones ad hoc.
3. **Border-radius** — radio por defecto `0.5rem` (`.5rem`), en línea con el DS. Excepción: componentes con radio propio del DS (tags/botón pill, etc.) conservan el suyo.
4. **Mayúsculas** — los textos **no** van en `uppercase` por defecto.
5. **Bordes** — evita el abuso de `border`: equilibra el diseño para que no parezca "todo cajas". Prefiere separar por espaciado, fondos sutiles o divisores finos antes que encajar cada bloque en un recuadro, salvo que el usuario lo pida.

## 1. Visual Theme & Atmosphere

El Periódico de España es el diario **nacional** del grupo: una identidad **sobria, institucional y de confianza**, articulada sobre un **azul intenso** `#0034dd`. Frente al rojo de Sport y El Periódico, EPE adopta el azul como sello de seriedad y alcance estatal. La atmósfera es limpia y reposada: blanco dominante, texto casi negro `#111`, tipografía de sistema (sin fuente de marca propia) que prioriza neutralidad y legibilidad, y el azul como acento de marca, enlaces y formularios.

Diseño **plano y editorial**, retícula de 12 columnas, jerarquía clara. Es la cabecera más "neutra" tipográficamente del grupo: el carácter lo da el color.

**Características clave:**
- Azul de marca `#0034dd` como identidad, acción y enlaces.
- Tipografía 100% de **sistema** (sin webfont de marca): neutra, rápida, legible.
- Base de lectura de alto contraste (`#111` sobre blanco).
- Azules de apoyo (`#4176b3`) y verde (`#1e7e65`) como secundarios.
- Botones pill (radio 30px), superficies planas.

## 2. Color Palette & Roles

### Marca y acción
- **Azul EPE** (`#0034dd`): `--color-primary`, `--color-form`, `--color-caso-abierto`. Marca, enlaces, CTA, formularios.
- **Negro** (`#111`): `--color-secondary`.
- **Gris oscuro texto** (`#333`): `--color-tertiary`.
- **Gris medio texto** (`#666`): `--color-quaternary`.
- **Azul medio** (`#4176b3`): `--color-quinary`.
- **Verde** (`#1e7e65`): `--color-senary`.
- **Gris** (`#555`): `--color-septenary`.
- **Activos** (`#4c7175`): `--color-activos` (verticales económicas).

### Formularios
- Form `--color-form` `#0034dd`; imagen de form `#6280dd` / `#99aef1` (azules claros).

### Neutros (base compartida del DS)
- Negro `#111` · Blanco `#fff` · Gris oscuro `#999` · Gris medio `#ccc` · Gris claro `#f2f2f2`.

### Funcionales
- Éxito `#00bd3e` · Info `#03a9f4` · Aviso `#eeb218` · Error `#fd3700`. Paywall `#FEDE00` / `#F9F0AB`.

## 3. Typography Rules

- **Primaria** — `var(--font-stack)`: stack de **sistema** sans (`-apple-system, BlinkMacSystemFont, "avenir next"…`). No hay webfont de marca: la identidad es cromática, no tipográfica.
- **Secundaria** — `var(--font-stack)` (la misma): cuerpo y UI.
- **Branded / editorial** — `var(--font-branded)`: serif (Iowan Old Style, Baskerville…) para piezas editoriales puntuales.
- **Base**: `--font-size-basis: 1.6rem` · `--font-height-basis: 2rem`.

Escala (helpers del DS): titulares `ft-helper-fontSize-heading-[XXL…XXS]`; cuerpo `ft-helper-fontSize-body-[XL…XS]`; pesos `ft-helper-fontWeight-[300…800]`.

Regla: sistema en todo, jerarquía por tamaño y peso. Sobriedad y neutralidad como rasgo.

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
- Pill: `border-radius: 30px`, borde `0.2rem solid`, fondo transparente, `font-weight: bold`.
- Tamaños `--xs/--sm/--md/--lg`.
- **`--primary`**: fondo y borde `--color-primary` (`#0034dd`), texto blanco; hover/active invierte hacia secondary.

### Enlaces y formularios
Enlaces y campos de formulario en azul de marca `#0034dd`. Selección/acentos en azul.

### Tags / etiquetas
Estado `#fcddc7` / `#c7e8ed`.

### Tarjetas de noticia
Planas sobre blanco, divisores `#f2f2f2`; el azul de marca ordena la jerarquía de acción y sección.

## 5. Layout Principles

- Retícula 12 columnas flexbox (`ft-layout-grid-flex`).
- Espaciado `ft-helper-spacer-*` (rem): `xxs ~1 · xs ~1.5 · sm ~2 · md ~3 · lg ~6 · xlg ~7 · xxlg ~10`.
- Densidad media, jerarquía sobria, buen aire entre bloques principales.
- Breakpoints: `Xs` base · `Sm` 600 · `Md` 800 · `Lg` 1024 · `Xl` 1200.

## 6. Depth & Elevation

Plano y editorial. Profundidad por divisores/bordes (`#f2f2f2`); sombras suaves solo en overlays. **Dark mode** (`data-theme`): fondo `#181a1b`, texto `#cdc9c3`; el azul se modera a neutros claros en UI secundaria; form en azul claro `#99baff`.

## 7. Do's and Don'ts

**Do**
- Usa el azul `#0034dd` como sello de marca, acción y formularios.
- Mantén la tipografía de sistema; la identidad es cromática.
- Conserva un tono sobrio e institucional.

**Don't**
- No uses rojos de Sport/El Periódico como color de marca.
- No introduzcas webfonts de marca (EPE no tiene fuente propia).
- No rompas el botón pill de 30px ni bajes el contraste del texto.

## 8. Responsive Behavior

Mobile-first; parrilla a 1 columna en `Xs`, expande con `Md`/`Lg`/`Xl`. Base de 1.6rem; targets táctiles cómodos. Prioriza claridad y sobriedad en todos los tamaños.

## 9. Agent Prompt Guide

**Hex de referencia rápida:** primary `#0034dd` · azul medio `#4176b3` · texto `#111` · grises `#999`/`#ccc`/`#f2f2f2` · error `#fd3700`. **Tipografía:** stack de sistema (sin webfont de marca).

**Prompts de ejemplo:**
- `Usa prensa-iberica/el-periodico-de-espana/DESIGN.md. Diseña una portada de diario nacional HF: azul #0034dd de marca, tipografía de sistema, tono sobrio e institucional.`
- `[MODE: UI]\nMaqueta un formulario de suscripción inspirado en El Periódico de España (DESIGN.md adjunto): azul de marca en campos y CTA, mucha claridad.`
- `[MODE: 42DS+HF]\nPOC de cabecera de El Periódico de España con clases 42DS y ft-brand-epe` (en 42DS real el azul lo aporta `setting.css` de epe).
