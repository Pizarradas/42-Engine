# Design System de El Periódico (Prensa Ibérica)

> Derivado del DS 42DS: `cds-statics/css/brands/ep/setting.css` + `scss/brands/ep-setup.scss`. Clave de marca: `ep` · clase de body: `ft-brand-ep`. Medio: **El Periódico** (diario generalista; cabecera con ediciones locales: Badalona, Castelldefels, Cornellà…).

## 0. Reglas por defecto (overridables)

> Son los **defaults** al generar con este `DESIGN.md`. Si el usuario pide explícitamente lo contrario en su invocación, **prevalece su petición**.

1. **Tipografía** — usa siempre las fuentes de marca del DS, nunca familias inventadas. Cuerpo/UI por defecto con `var(--font-stack)`; titulares con la variable de display de la marca (`var(--font-primary)`).
2. **Botones** — usa los botones del DS (`.ft-btn` con sus tamaños/modificadores) y las especificaciones de esta marca; no crees botones ad hoc.
3. **Border-radius** — radio por defecto `0.5rem` (`.5rem`), en línea con el DS. Excepción: componentes con radio propio del DS (tags/botón pill, etc.) conservan el suyo.
4. **Mayúsculas** — los textos **no** van en `uppercase` por defecto.
5. **Bordes** — evita el abuso de `border`: equilibra el diseño para que no parezca "todo cajas". Prefiere separar por espaciado, fondos sutiles o divisores finos antes que encajar cada bloque en un recuadro, salvo que el usuario lo pida.

## 1. Visual Theme & Atmosphere

El Periódico es un **diario generalista moderno y limpio**. Su identidad combina el **rojo de marca** `#f53036` con una tipografía sans contemporánea (**Inter**) que le da un aire actual, legible y ordenado. La atmósfera es la de un periódico digital de referencia: blanco dominante, texto casi negro `#111`, jerarquía clara, y el rojo como acento de marca, enlaces y elementos premium (junto a un oro `#936f06` para suscripción/premium).

Diseño **plano y editorial**, con retícula de 12 columnas, divisores finos y bloques de noticia ordenados. Frente al impacto condensado de Sport, El Periódico es más **sobrio y legible**.

**Características clave:**
- Rojo de marca `#f53036` para identidad, enlaces y acción.
- Tipografía **Inter** (`Google-Inter--Medium`) como primaria: moderna y muy legible.
- Oro `#936f06` como color de premium/suscripción.
- Base de lectura de alto contraste (`#111` sobre blanco).
- Botones pill (radio 30px), superficies planas.

## 2. Color Palette & Roles

### Marca y acción
- **Rojo El Periódico** (`#f53036`): `--color-primary`, `--color-premium`, `--color-caso-abierto`. Marca, enlaces, CTA, premium.
- **Negro** (`#111`): `--color-secondary`.
- **Gris oscuro texto** (`#333`): `--color-tertiary`.
- **Gris medio texto** (`#666`): `--color-quaternary`.
- **Oro / premium** (`#936f06`): `--color-quinary`. Suscripción y distinción premium.
- **Verde** (`#1e7e65`): `--color-senary`.
- **Gris** (`#555`): `--color-septenary`.

### Formularios y suscripción
- Form: `--color-form` `#333`; imagen de form `#dd2c39` / `#e4777f`.
- Suscripción secundaria `#7acbc5`, septenaria `#d4c59c`.

### Neutros (base compartida del DS)
- Negro `#111` (`--color-black`) · Blanco `#fff` (`--color-white`) · Gris oscuro `#999` · Gris medio `#ccc` · Gris claro `#f2f2f2`.

### Funcionales
- Éxito `#00bd3e` · Info `#03a9f4` · Aviso `#eeb218` · Error `#fd3700`. Paywall `#FEDE00` / `#F9F0AB`.

## 3. Typography Rules

- **Primaria** — `"Google-Inter--Medium"` (Inter), con fallback `Arial, sans-serif`. Titulares y UI: moderna, neutra, muy legible. Es la voz tipográfica diferencial de El Periódico.
- **Secundaria** — `var(--font-stack)` (stack de sistema sans) para cuerpo y textos largos.
- **Branded / editorial** — `var(--font-branded)`: serif (Iowan Old Style, Georgia, Baskerville…) para piezas editoriales.
- **Base**: `--font-size-basis: 16px` · `--font-height-basis: 20px`.

Escala (helpers del DS): titulares `ft-helper-fontSize-heading-[XXL…XXS]`; cuerpo `ft-helper-fontSize-body-[XL…XS]`; pesos `ft-helper-fontWeight-[300…800]`.

Regla: Inter para identidad y titulares; sistema para cuerpo. Jerarquía limpia, interlineado cómodo de lectura.

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
- Tamaños `--xs/--sm/--md/--lg` (de `.28rem 1rem` a `1.38rem 2rem`).
- **`--primary`**: fondo y borde `--color-primary` (`#f53036`), texto blanco; hover/active invierte hacia secondary.

### Enlaces
Color `--color-primary` (rojo). Premium/suscripción tiran del oro `#936f06`.

### Tags / etiquetas
Estado `#fcddc7` / `#c7e8ed`. Premium en oro.

### Tarjetas de noticia
Planas sobre blanco, divisores `#f2f2f2`; color por etiqueta y por rojo de marca; premium señalizado en oro.

## 5. Layout Principles

- Retícula 12 columnas flexbox (`ft-layout-grid-flex`).
- Espaciado `ft-helper-spacer-*` (rem): `xxs ~1 · xs ~1.5 · sm ~2 · md ~3 · lg ~6 · xlg ~7 · xxlg ~10`.
- Densidad media-alta, jerarquía clara, mucho blanco entre bloques principales.
- Breakpoints: `Xs` base · `Sm` 600 · `Md` 800 · `Lg` 1024 · `Xl` 1200.

## 6. Depth & Elevation

Plano y editorial. Profundidad por divisores y bordes (`#f2f2f2`), sombras suaves solo en overlays/dropdowns. **Dark mode** (`data-theme`): fondo `#181a1b`, texto `#cdc9c3`; el rojo se modera a neutros claros en UI secundaria; form en azul claro `#7dafff`.

## 7. Do's and Don'ts

**Do**
- Usa Inter para titulares y UI; sistema para cuerpo.
- Rojo `#f53036` para marca/acción; oro `#936f06` para premium/suscripción.
- Mantén jerarquía limpia y alto contraste.

**Don't**
- No uses la condensada de Sport ni el azul de El Periódico de España.
- No mezcles rojo de marca con el oro salvo en contextos premium.
- No abandones el botón pill de 30px.

## 8. Responsive Behavior

Mobile-first; parrilla a 1 columna en `Xs`, expande con `Md`/`Lg`/`Xl`. Targets táctiles cómodos. La base de 16px favorece la lectura en móvil. Imágenes y aperturas priorizan claridad antes que densidad.

## 9. Agent Prompt Guide

**Hex de referencia rápida:** primary `#f53036` · premium oro `#936f06` · texto `#111` · grises `#999`/`#ccc`/`#f2f2f2` · error `#fd3700`. **Tipografía:** Inter (titulares/UI) + sans de sistema (cuerpo).

**Prompts de ejemplo:**
- `Usa prensa-iberica/el-periodico/DESIGN.md. Diseña una home de diario generalista HF: Inter en titulares, rojo #f53036 de marca, premium en oro #936f06, retícula limpia.`
- `[MODE: UI]\nMaqueta una ficha de noticia inspirada en El Periódico (DESIGN.md adjunto): legible, sobria, alto contraste.`
- `[MODE: 42DS+HF]\nPOC de bloque de suscripción de El Periódico con clases 42DS y ft-brand-ep` (en 42DS real el color lo aporta `setting.css` de ep).
