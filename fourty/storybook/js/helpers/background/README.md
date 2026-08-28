# Storybook · Helpers / Background

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`background.js`](background.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `background` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-bg*` |
| **Señales** | `—` |
| **Módulo** | [`background.js`](background.js) · [`background.html`](background.html) |

## Qué es

Familia `.ft-helper-bg*` del 42DS, la más extensa de los helpers. Cubre brand, neutrales, greys, alertas, gradients, opacity, transparent (responsive), social y juegos.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector único de tokens más usados + texto demo |
| Brand | gallery | primary…septenary + opacity (set-brand) |
| Neutrales + opacidad | gallery | Black/white, opacity ::before y overlays rgba |
| Greys + degradados | gallery | Background greys + degraded1..3 |
| Alertas funcionales | gallery | success/info/warning/error |
| Gradient fade | gallery | linear-gradient black/white por dirección |
| Transparent (responsive) | gallery | bgTransparent por breakpoint |
| Redes sociales | gallery | Colores oficiales por red |
| Juegos | gallery | Paleta de pasatiempos |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_backgrounds.scss`
- **Showroom legacy:** `fourty/helpers/helper-background.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
