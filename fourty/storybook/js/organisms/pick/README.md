# Storybook · Organisms / Pick

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`pick.js`](pick.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `pick-org` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-pick` |
| **Señales** | `—` |
| **Módulo** | [`pick.js`](pick.js) · [`pick.html`](pick.html) |

## Qué es

Organismo del 42DS (`.ft-org-pick`): sección de pronósticos/porra — agrupa tarjetas de pronóstico de partidos. No confundir con la molécula homónima `.ft-mol-pick` (la tarjeta).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/pick.css`.
- `molecules/pick` (CSS de la tarjeta interna).
- JS (reloj en directo, pronóstico) solo en producción. Aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/pick/_pick.scss`
- **Showroom legacy:** `fourty/organisms/organism-pick.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
