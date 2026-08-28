# Storybook · Molecules / Card

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`card.js`](card.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `card` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-card` |
| **Señales** | `—` |
| **Módulo** | [`card.js`](card.js) · [`card.html`](card.html) |

## Qué es

Tarjeta de juego/pasatiempo con imagen decorativa, cabecera (título + fecha), texto y CTA. Tiene varios layouts y un set de colores temáticos por juego.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone átomos del DS (`.ft-img`, `.ft-btn`); sin JS.
- Variables temáticas por juego (`--color-<juego>`) en `setting.css`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/card/_card.scss`
- **Showroom legacy:** `fourty/molecules/molecule-card.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
