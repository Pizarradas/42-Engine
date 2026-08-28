# Prensa Ibérica — DESIGN.md propios

Set de ficheros `DESIGN.md` (formato [Stitch](https://stitch.withgoogle.com/docs/design-md/format/), el mismo protocolo que el resto de `awesome-design`) que capturan la **design language real de cada marca de Prensa Ibérica**.

A diferencia de las referencias externas (`../awesome-design-md-main/design-md/`), estos **no se extraen de una web pública**: se derivan de la **fuente de verdad del propio Design System 42DS** — las variables CSS de cada marca en `cds-statics/css/brands/<marca>/setting.css`, sus `scss/brands/<marca>-setup.scss` y los helpers/átomos canónicos del DS.

> **Objetivo.** Que al pasarle a un agente el `DESIGN.md` de una marca, el resultado salga **acorde a las reglas estéticas reales de esa cabecera** (color, tipografía, voz, densidad), sin tener que leerse el SCSS.

## Marcas incluidas

| Carpeta | Marca | Clave DS | Color primario |
|---------|-------|----------|----------------|
| [`sport/`](sport/DESIGN.md) | Sport | `sport` | `#ec0918` (rojo) |
| [`el-periodico/`](el-periodico/DESIGN.md) | El Periódico | `ep` | `#f53036` (rojo) |
| [`el-periodico-de-espana/`](el-periodico-de-espana/DESIGN.md) | El Periódico de España | `epe` | `#0034dd` (azul) |
| [`regionales/`](regionales/DESIGN.md) | Regionales (umbrella: Faro de Vigo, Levante, La Nueva España, Diario de Mallorca, Información…) | `regionales` | `#136496` (azul) + color por cabecera |
| [`revistas/`](revistas/DESIGN.md) | Revistas (umbrella: Woman, Viajar, Cuore, Stilo) | `revistas` | color por revista |

> La clave `ux` del DS es el **showroom / base universal** (neutros, sin marca editorial), no una cabecera de consumo; no tiene `DESIGN.md` propio. Su fundación neutra es la base compartida que heredan todas las marcas y queda descrita dentro de cada fichero.

## Reglas por defecto (overridables)

Cada `DESIGN.md` abre con una sección **`## 0. Reglas por defecto (overridables)`** que fija los *defaults* de generación, alineados con el DS. Son anulables: si en la invocación el usuario pide lo contrario, manda su petición. En resumen:

1. **Tipografía**: fuentes de marca del DS (`var(--font-stack)` por defecto), nunca familias inventadas. *Excepción Sport*: `H1`/`H2` usan `var(--font-secondary)` (Media Sans).
2. **Botones**: siempre los del DS (`.ft-btn`) con las specs de cada marca.
3. **Border-radius**: `0.5rem` por defecto (los componentes con radio propio del DS conservan el suyo).
4. **Mayúsculas**: textos **no** en `uppercase` por defecto.
5. **Bordes**: evitar el abuso de `border`; equilibrar para que el diseño no parezca "todo cajas".

## Escala tipográfica modular — `[TYPESCALE: …]`

Modificador **opcional y combinable** con cualquier `[MODE: …]` para generar diseños con jerarquías tipográficas distintas desde el mismo `DESIGN.md` (inspirado en [typescale.com](https://typescale.com/)). Por defecto se usa la rampa nativa del DS; es *overridable*.

- **Sintaxis**: `[TYPESCALE: <preset>]` o `[TYPESCALE: <preset> @ <base>]`, encadenado tras el mode → `[MODE: 42DS+HF+CSS] [TYPESCALE: perfect-fourth]`.
- **Presets (ratio)**: `minor-second` 1.067 · `major-second` 1.125 · `minor-third` 1.200 · `major-third` 1.250 · `perfect-fourth` 1.333 · `augmented-fourth` 1.414 · `perfect-fifth` 1.500 · `golden` 1.618.
- **Comportamiento**: en modos que emiten CSS/SCSS calcula tamaños modulares (`base × ratioⁿ`); en modos DS-puro / reuse-only hace **remapeo de steps** sobre los helpers existentes (`ft-helper-fontSize-*`), sin inventar tamaños. Nunca cambia la familia tipográfica.

> La spec completa (mapeo de roles y tabla de remapeo por ratio) está en la sección **3.bis** de cada `DESIGN.md`.

## Cómo se usa

1. Elige la marca y abre su `DESIGN.md`.
2. Pásaselo al agente como guía de estilo: «usa `AI/tools/awesome-design/prensa-iberica/sport/DESIGN.md` y construye algo acorde a Sport».
3. Si el entregable final es **42DS real**, recuerda que la marca se activa con `setting.css` + la clase `ft-brand-<marca>` en el `<body>`; este `DESIGN.md` documenta el *lenguaje visual* (útil para mockups, briefs, o trabajo HF sin DS con `[MODE: UI]` / `[MODE: UX+UI]`). Para producir con el sistema mandan los modes `42DS+*` y el SCSS canónico.

## Fuente y mantenimiento

Derivado de (fuente de verdad, por marca):

- `cds-statics/css/brands/<marca>/setting.css` — variables CSS (`:root`): paleta y tipografías.
- `scss/brands/<marca>-setup.scss` — resets, pesos, scrollbars y helpers por marca.
- `scss/fourties/atoms/btn/_btn.scss`, helpers de `scss/base/helpers/` — componentes y escalas compartidas.
- `fourty/storybook/data/brand-data.js` / `cds-statics/csv/storybook__bodyclass.csv` — nombres canónicos de medios y outlets.

Si cambian los tokens de una marca en el DS, hay que **re-sincronizar** el `DESIGN.md` correspondiente (los hex y fuentes están copiados, no enlazados).
