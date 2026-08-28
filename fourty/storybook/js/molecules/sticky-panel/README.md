# Storybook · Molecules / Sticky Panel

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`sticky-panel.js`](sticky-panel.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `sticky-panel` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-sticky-panel` |
| **Señales** | `—` |
| **Módulo** | [`sticky-panel.js`](sticky-panel.js) · [`sticky-panel.html`](sticky-panel.html) |

## Qué es

Panel anclado al borde de la pantalla (`position:fixed`) que entra y sale con animación.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- JavaScript del consumidor — toggle de `--open` (abre/cierra el panel).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/sticky-panel/_sticky-panel.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
