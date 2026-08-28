# Storybook · Organisms / Search Autocomplete

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`search-autocomplete.js`](search-autocomplete.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `search-autocomplete` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-search-autocomplete` |
| **Señales** | `js` |
| **Módulo** | [`search-autocomplete.js`](search-autocomplete.js) · [`search-autocomplete.html`](search-autocomplete.html) |

## Qué es

Organismo del 42DS (`.ft-org-search-autocomplete`): buscador con sugerencias — campo de búsqueda y panel de resultados/autocompletado.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/search-autocomplete.css`.
- `molecules/form` (CSS del campo de búsqueda).
- JS (autocompletado real) solo en producción. Aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/search-autocomplete/_search-autocomplete.scss`
- **Showroom legacy:** `fourty/organisms/organism-search-autocomplete.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
