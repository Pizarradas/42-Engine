# Design System de Sport (Prensa Ibérica)

> Derivado del DS 42DS: `cds-statics/css/brands/sport/setting.css` + `scss/brands/sport-setup.scss`. Clave de marca: `sport` · clase de body: `ft-brand-sport`.

## 0. Reglas por defecto (overridables)

> Son los **defaults** al generar con este `DESIGN.md`. Si el usuario pide explícitamente lo contrario en su invocación, **prevalece su petición**.

1. **Tipografía** — usa siempre las fuentes de marca del DS, nunca familias inventadas. Cuerpo/UI por defecto con `var(--font-stack)`. **En Sport, los `H1` y `H2` usan por defecto `var(--font-secondary)`** = Media Sans condensada (`"MediaSans-Semi--Regular"`), la voz de titular de la marca.
2. **Botones** — usa los botones del DS (`.ft-btn` con sus tamaños/modificadores) y las especificaciones de Sport (pill); no crees botones ad hoc.
3. **Border-radius** — radio por defecto `0.5rem` (`.5rem`), en línea con el DS. Excepción: componentes con radio propio del DS (tags, botón pill de Sport, etc.) conservan el suyo.
4. **Mayúsculas** — los textos **no** van en `uppercase` por defecto.
5. **Bordes** — evita el abuso de `border`: equilibra el diseño para que no parezca "todo cajas". Prefiere separar por espaciado, fondos sutiles o divisores finos antes que encajar cada bloque en un recuadro, salvo que el usuario lo pida.

## 1. Visual Theme & Atmosphere

Sport es el diario deportivo de Prensa Ibérica: una identidad **urgente, enérgica y de alto contraste**, construida sobre el rojo de marca y la tipografía condensada para titulares de impacto. La atmósfera es la de un quiosco deportivo — densa en información, jerárquica, con titulares que gritan y secciones cromáticamente codificadas por deporte. Fondo blanco, texto casi negro (`#111`), y el rojo `#ec0918` como detonante visual de marca, enlaces, etiquetas premium y llamadas a la acción.

El diseño es **plano y editorial** (prensa digital): poca sombra, mucha retícula, divisores finos y bloques de noticia muy compactos. La personalidad la aportan la condensada de titulares y el uso decidido del rojo sobre negro.

**Características clave:**
- Rojo Sport `#ec0918` como color de marca, acción y premium.
- Titulares en condensada (`MediaSans-Semi--Regular`) para máxima densidad e impacto.
- Negro `#111` sobre blanco como base de lectura de alto contraste.
- Codificación cromática por deporte (motor, baloncesto, balonmano, tenis…).
- Botones tipo "pill" (radio 30px) con borde de 2px.
- Superficies planas, profundidad mínima (estética de prensa).

## 2. Color Palette & Roles

### Marca y acción
- **Rojo Sport** (`#ec0918`): `--color-primary`. Marca, enlaces, CTA, premium, "caso abierto".
- **Negro** (`#000`): `--color-secondary`. Refuerzos, fondos de sección branded/motor.
- **Gris oscuro texto** (`#333`): `--color-tertiary`.
- **Gris medio texto** (`#666`): `--color-quaternary`.
- **Granate** (`#9a2c37`): `--color-quinary`.
- **Verde oscuro** (`#2d5342`): `--color-senary`.
- **Rojo claro** (`#f53036`): `--color-septenary`.

### Premium / efemérides
- **Premium** (`#ec0918`): `--color-premium`.
- **Oro 45 aniversario** (`#b5a169`): `--color-premium-aniversario`, `--color-45-aniversario`.

### Neutros (base compartida del DS)
- **Negro** (`#111`): `--color-black`. Texto principal.
- **Blanco** (`#fff`): `--color-white`. Fondo.
- **Gris oscuro** (`#999`): `--color-darkGrey`.
- **Gris medio** (`#ccc`): `--color-mediumGrey`.
- **Gris claro** (`#f2f2f2`): `--color-lightGrey`. Fondos sutiles, divisores.

### Funcionales
- **Éxito** `#00bd3e` · **Info** `#03a9f4` · **Aviso** `#eeb218` · **Error** `#fd3700`.
- **Paywall** `#FEDE00` (primary) / `#F9F0AB` (secondary).

### Acentos por deporte (`--color-section-*`)
Motor `#111` · Baloncesto `#ff6100` · Balonmano `#002ec8` · Natación `#03a3bd` · Pádel `#bafe3e` · Tenis `#c94d26` · Hockey `#8bbed3` · Ciclismo `#ffb222` · Golf `#68b460`.

### Degradados
- `--color-degraded2`: `linear-gradient(to right, #fea101, #ec0918)` (naranja→rojo, el más "Sport").
- `--color-degraded1`: `linear-gradient(to right, #00bd3e, #055da8)`.

## 3. Typography Rules

- **Primaria / titulares** — `var(--font-primary)`: stack de sistema sans (`-apple-system, BlinkMacSystemFont, "avenir next"…`), peso **bold/500**, para titulares de noticia.
- **Secundaria / impacto deportivo** — `"MediaSans-Semi--Regular"` (condensada): titulares de marca, portadas y módulos de gran impacto. Es la voz tipográfica diferencial de Sport.
- **Branded / editorial** — `var(--font-branded)`: stack serif (Iowan Old Style, Baskerville…) para piezas editoriales puntuales.
- **Base**: `--font-size-basis: 1.8rem` · `--font-height-basis: 2.2rem`.

Escala (helpers del DS, derivados de la base):
- Titulares: `ft-helper-fontSize-heading-[XXL · XL · L · M · S · XS · XXS]`.
- Cuerpo: `ft-helper-fontSize-body-[XL · L · M · S · XS]`.
- Pesos: `ft-helper-fontWeight-[300 · 400 · 600 · 700 · 800]`.

Regla: titulares condensados y compactos (poco interlineado relativo) para densidad; cuerpo en sans de sistema para legibilidad.

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

> `[TYPESCALE]` **no cambia la familia tipográfica**: sólo afecta a tamaños/escala. En Sport, los `H1`/`H2` siguen en Media Sans (`--font-secondary`, sección 0) y el botón conserva su forma pill; el modificador sólo reescala.

## 4. Component Stylings

### Botón (`.ft-btn`)
- Forma **pill**: `border-radius: 30px`, borde `0.2rem solid`, fondo transparente, `font-weight: bold`.
- Tamaños: `--xs` (pad `.28rem 1rem`, body-S) · `--sm` (`.38rem 1.5rem`, body-M) · `--md` (`.88rem 2rem`, body-L) · `--lg` (`1.38rem 2rem`, body-XL).
- **`--primary`**: borde y fondo `--color-primary` (`#ec0918`), texto blanco; en hover/active invierte hacia `--color-secondary`.
- Secundario: usa `--color-secondary` (negro).

### Enlaces
Color `--color-primary` (rojo Sport). Selección de texto: fondo `--color-darkGrey`; selección sobre enlace: fondo rojo, texto blanco.

### Tags / etiquetas
Estado: `--color-tag-status-primary` `#fcddc7`, `--color-tag-status-secondary` `#c7e8ed`. Premium en rojo/oro.

### Tarjetas de noticia
Planas, sobre blanco, separadas por divisores `--color-lightGrey`; el color entra por etiqueta de sección/deporte y por el rojo de marca.

## 5. Layout Principles

- **Retícula**: 12 columnas flexbox (`ft-layout-grid-flex`), muy usada para parrillas de noticias.
- **Espaciado** (`ft-helper-spacer-*`, escala rem, crece en pantallas grandes): `xxs ~1` · `xs ~1.5` · `sm ~2` · `md ~3` · `lg ~6` · `xlg ~7` · `xxlg ~10`.
- Densidad alta: bloques compactos, poco aire entre módulos, jerarquía por tamaño/peso de titular y por color.
- Breakpoints: `Xs` (móvil, base) · `Sm` 600px · `Md` 800px · `Lg` 1024px · `Xl` 1200px.

## 6. Depth & Elevation

Estética de prensa: **plana**. Profundidad mínima — se confía en divisores finos (`#f2f2f2`), bordes y fondos de gris claro más que en sombras. Las superficies elevadas (modales, dropdowns) usan sombra suave puntual. Scrollbar de marca: track `--color-lightGrey`, thumb `--color-mediumGrey` redondeado (radio 20px).

**Dark mode** (`data-theme`): fondo `#181a1b` (`--color-white-dm`), texto `#cdc9c3` (`--color-black-dm`); el rojo de marca se atenúa a neutros claros en UI secundaria.

## 7. Do's and Don'ts

**Do**
- Usa el rojo `#ec0918` para marca, acción y premium; mantenlo dominante pero no invasivo.
- Reserva la condensada para titulares e impacto; cuerpo en sans de sistema.
- Codifica secciones deportivas con su acento (`--color-section-*`).
- Mantén superficies planas y densidad alta de información.

**Don't**
- No introduzcas sombras pesadas ni gradientes decorativos fuera de los `--color-degraded*`.
- No uses azules de otras cabeceras (eso es El Periódico de España / regionales).
- No redondees botones a algo que no sea el pill de 30px.
- No bajes el contraste del texto por debajo de `#111` sobre blanco.

## 8. Responsive Behavior

- Mobile-first; la parrilla colapsa a 1 columna en `Xs` y se expande con `Md`/`Lg`/`Xl`.
- Targets táctiles cómodos en botones (`--md`/`--lg`).
- Titulares condensados escalan con la base (`1.8rem`) y los helpers de tamaño.
- Imágenes y módulos de portada priorizan impacto en `Xs` (1 col) antes de densificar en desktop.

## 9. Agent Prompt Guide

**Hex de referencia rápida:** primary `#ec0918` · secondary/negro `#000`/`#111` · texto `#111` · grises `#999`/`#ccc`/`#f2f2f2` · premium oro `#b5a169` · error `#fd3700`.

**Tipografía:** titulares en condensada (estilo `MediaSans` condensed) + sans de sistema; serif solo en editorial.

**Prompts de ejemplo:**
- `Usa prensa-iberica/sport/DESIGN.md. Diseña una portada deportiva HF: titulares condensados, rojo #ec0918 como acento, parrilla densa de noticias, botón pill.`
- `[MODE: UI]\nMaqueta un módulo de directo de partido inspirado en Sport (DESIGN.md adjunto): alto contraste, rojo de marca, codificación por deporte.`
- `[MODE: 42DS+HF]\nPOC de tarjeta de suscripción premium de Sport con clases 42DS y la clase de marca ft-brand-sport.` (para 42DS real, el color lo aporta `setting.css` de sport, no CSS inventado).
