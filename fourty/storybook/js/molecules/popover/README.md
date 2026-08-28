# Storybook · Molecules / Popover

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`popover.js`](popover.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `popover` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-popover` |
| **Señales** | `—` |
| **Módulo** | [`popover.js`](popover.js) · [`popover.html`](popover.html) |

## Qué es

Globo flotante anclado a un disparador: un botón `.ft-btn-nav` abre un `__content` posicionado en una de cuatro direcciones, con texto y un enlace, y un botón de cierre lo oculta.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Controller de popover (toggle de `.ft-helper-hide`) — para abrir/cerrar en producción.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/popover/_popover.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
