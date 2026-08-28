# Storybook · Organisms / Suggestions Chips

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`suggestions-chips.js`](suggestions-chips.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `suggestions-chips` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-suggestions-chips` |
| **Señales** | `js` |
| **Módulo** | [`suggestions-chips.js`](suggestions-chips.js) · [`suggestions-chips.html`](suggestions-chips.html) |

## Qué es

Organismo del 42DS (`.ft-org-suggestions-chips`): tira de chips de sugerencia y accesos rápidos a temas o localidades relacionadas dentro de una fila horizontal.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Composición CSS sobre `.ft-tag`, `full` |
| Chip tiny + helper-scroll | story | Patrón `chip-tiny` + `.ft-helper-scroll` con JS opcional |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/suggestions-chips.css`.
- `atoms/tag` (CSS de los chips); la base no exige JS.
- Patrón `chip-tiny`: `.ft-helper-scroll` + JS opcional `cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js` (sincroniza estados/ARIA).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/suggestions-chips/_suggestions-chips.scss`
- **Showroom legacy:** `fourty/organisms/organism-suggestions-chips.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
