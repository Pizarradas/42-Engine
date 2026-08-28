# Storybook · Atoms / Img

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`img.js`](img.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `img` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-img` |
| **Señales** | `—` |
| **Módulo** | [`img.js`](img.js) · [`img.html`](img.html) |

## Qué es

Átomo contenedor de imagen (`.ft-img`): un `<figure>` que envuelve un `<picture>` responsive (con sus `<source>`) y un `<figcaption>` opcional. Único modificador: `--mw` (max-width centrado).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `mw`, `rounded`, `caption` |
| Variantes | gallery | base · `--mw` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. (responsive nativo de `<picture>`; helper `.ft-helper-img-rd` para ancho completo)

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/img/_img.scss`
- **Showroom legacy:** `fourty/atoms/atom-img.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
