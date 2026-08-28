# Design System de las Revistas (Prensa Ibérica)

> Derivado del DS 42DS: `cds-statics/css/brands/revistas/setting-{woman,viajar,cuore,stilo}.css` + `scss/brands/revistas-setup.scss`. Clave de marca: `revistas` · clase de body: `ft-brand-revistas`. **Umbrella** de revistas lifestyle: **Woman, Viajar, Cuore y Stilo**, cada una con su **color y su pareja tipográfica propios**.

## 0. Reglas por defecto (overridables)

> Son los **defaults** al generar con este `DESIGN.md`. Si el usuario pide explícitamente lo contrario en su invocación, **prevalece su petición**.

1. **Tipografía** — usa siempre las fuentes de marca del DS, nunca familias inventadas. Cuerpo/UI por defecto con `var(--font-stack)` (sans de la revista); titulares con el display propio de cada revista (`var(--font-primary)`: Playfair en Woman, Source Serif en Viajar, Oswald en Cuore, Karla en Stilo).
2. **Botones** — usa los botones del DS (`.ft-btn` con sus tamaños/modificadores) y las especificaciones de cada revista; no crees botones ad hoc.
3. **Border-radius** — radio por defecto `0.5rem` (`.5rem`), en línea con el DS. Excepción: componentes con radio propio del DS (tags/botón pill, etc.) conservan el suyo.
4. **Mayúsculas** — los textos **no** van en `uppercase` por defecto (incluso si la estética editorial de la revista la sugiere, solo se aplica si el usuario lo pide o lo marca el componente del DS).
5. **Bordes** — evita el abuso de `border`: equilibra el diseño para que no parezca "todo cajas". Prefiere separar por espaciado, fondos sutiles o divisores finos antes que encajar cada bloque en un recuadro, salvo que el usuario lo pida.

## 1. Visual Theme & Atmosphere

Las Revistas son el territorio **lifestyle y editorial** del grupo: más expresivo y "magazine" que la prensa diaria. Comparten arquitectura 42DS (retícula, helpers, componentes), pero **cada cabecera define su propia personalidad tipográfica y cromática** — aquí la fuente sí es identidad, a diferencia de los diarios. La atmósfera es elegante y visual: protagonismo de la imagen, titulares con carácter (serif de moda, condensada de impacto o sans moderna) y un color de marca vibrante.

Frente a la sobriedad de la prensa, las revistas admiten **más expresividad** manteniendo la base plana y limpia del DS.

**Características clave:**
- Una arquitectura 42DS común; **fuente + color propios por revista** (ver §2–§3).
- Base tipográfica más editorial (serif de display en Woman/Viajar).
- Colores de marca vibrantes (rosas, coral, azul).
- Botones pill (radio 30px), superficies planas, imagen protagonista.

## 2. Color Palette & Roles

### Color primario por revista (`--color-primary`)
| Revista | Hex | Carácter |
|---------|-----|----------|
| **Woman** | `#e2635e` (coral) | Moda y belleza, elegante y cálido |
| **Viajar** | `#288ad6` (azul) | Viajes, fresco y aspiracional |
| **Cuore** | `#da007a` (magenta) | Corazón/celebrities, desenfadado y pop |
| **Stilo** | `#e1127a` (rosa) | Tendencia y estilo, moderno |

### Neutros y funcionales (base compartida del DS)
- Negro `#111` (`--color-black`, texto) · Blanco `#fff` · Gris oscuro `#999` · Gris medio `#ccc` · Gris claro `#f2f2f2`.
- Éxito `#00bd3e` · Info `#03a9f4` · Aviso `#eeb218` · Error `#fd3700`. Paywall `#FEDE00` / `#F9F0AB`.

> El color secundario y los neutros son los del DS; lo que define cada revista es su **primario** + su **pareja tipográfica**.

## 3. Typography Rules

Cada revista combina una **primaria de display** (titulares, identidad) con una **secundaria de lectura**. Base común: `--font-size-basis: 1.8rem`.

| Revista | Primaria (display) | Secundaria (cuerpo) |
|---------|--------------------|---------------------|
| **Woman** | `"Playfair-Display--Regular"` (serif de moda) | `"Lato--Regular"` (sans humanista) |
| **Viajar** | `"SourceSerifPro--Regular"` (serif editorial) | `"Lato--Regular"` |
| **Cuore** | `"Oswald--Regular"` (sans condensada de impacto) | `"Lato--Regular"` |
| **Stilo** | `"Karla"` (grotesca moderna) | `"LibreFranklin"` (grotesca) |

Escala (helpers del DS): titulares `ft-helper-fontSize-heading-[XXL…XXS]`; cuerpo `ft-helper-fontSize-body-[XL…XS]`; pesos `ft-helper-fontWeight-[300…800]`.

Regla: la primaria de display marca el carácter (Playfair = moda elegante; Oswald = impacto pop; Karla = modernidad); Lato/Libre Franklin dan legibilidad neutra al cuerpo.

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

> `[TYPESCALE]` **no cambia la familia tipográfica**: sólo afecta a tamaños/escala. En Revistas, cada cabecera conserva su display propio (`--font-primary`: Playfair en Woman, Source Serif en Viajar, Oswald en Cuore, Karla en Stilo); el modificador sólo reescala.

## 4. Component Stylings

### Botón (`.ft-btn`)
- Pill: `border-radius: 30px`, borde `0.2rem solid`, fondo transparente, `font-weight: bold`. Tamaños `--xs/--sm/--md/--lg`.
- **`--primary`**: fondo y borde `--color-primary` — el de la revista (coral, azul, magenta o rosa).

### Enlaces
Color primario de la revista activa.

### Tarjetas / módulos editoriales
Planas sobre blanco, con la **imagen como protagonista**; divisores `#f2f2f2`; titulares con la display de la revista; el color de marca entra en etiquetas, enlaces y CTA.

## 5. Layout Principles

- Retícula 12 columnas flexbox (`ft-layout-grid-flex`); más respiración y peso visual de imagen que en prensa.
- Espaciado `ft-helper-spacer-*` (rem): `xxs ~1 · xs ~1.5 · sm ~2 · md ~3 · lg ~6 · xlg ~7 · xxlg ~10`.
- Breakpoints: `Xs` base · `Sm` 600 · `Md` 800 · `Lg` 1024 · `Xl` 1200.

## 6. Depth & Elevation

Plano y limpio, pero con más protagonismo de la imagen a sangre. Profundidad por divisores/bordes; sombras suaves solo en overlays. **Dark mode** (`data-theme`): fondo `#181a1b`, texto `#cdc9c3`; el color de revista se modera a neutros claros en UI secundaria.

## 7. Do's and Don'ts

**Do**
- Empareja **siempre** la display + secundaria correctas de la revista (tabla §3).
- Usa el primario de la revista (coral / azul / magenta / rosa) como acento.
- Da protagonismo a la imagen y a un titular con carácter.

**Don't**
- No uses la tipografía de una revista con el color de otra.
- No apliques las fuentes de revista a la prensa diaria (Sport/EP/EPE/regionales no las usan).
- No rompas el botón pill de 30px ni la base plana del DS.

## 8. Responsive Behavior

Mobile-first; módulos editoriales a 1 columna en `Xs`, expanden con `Md`/`Lg`/`Xl`. Base de 1.8rem; las display escalan con los helpers de tamaño. La imagen manda en móvil; el texto se jerarquiza por tamaño/peso.

## 9. Agent Prompt Guide

**Primario por revista:** Woman `#e2635e` · Viajar `#288ad6` · Cuore `#da007a` · Stilo `#e1127a`. **Neutros:** texto `#111`, grises `#999`/`#ccc`/`#f2f2f2`. **Tipografía:** ver tabla §3 (Playfair/Lato, Source Serif/Lato, Oswald/Lato, Karla/Libre Franklin).

**Prompts de ejemplo:**
- `Usa prensa-iberica/revistas/DESIGN.md (variante Woman). Diseña una portada de revista de moda HF: Playfair Display en titulares, Lato en cuerpo, coral #e2635e de marca, imagen protagonista.`
- `[MODE: UI]\nMaqueta un módulo de celebrities estilo Cuore (DESIGN.md adjunto): Oswald condensada, magenta #da007a, tono pop y desenfadado.`
- `[MODE: 42DS+HF]\nPOC de portada de Viajar con clases 42DS y ft-brand-revistas` (en 42DS real, color y fuentes los aporta el `setting-viajar.css`).
