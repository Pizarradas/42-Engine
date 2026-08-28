# Storybook · Molecules / Subheader

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`subheader.js`](subheader.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `subheader` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-subheader` |
| **Señales** | `—` |
| **Módulo** | [`subheader.js`](subheader.js) · [`subheader.html`](subheader.html) |

## Qué es

Cintillo de cabecera de pasatiempo: título + fecha y un icono, con fondo temático por juego.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/subheader/_subheader.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
