# Storybook · Molecules / A-Z List

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`az-list.js`](az-list.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `az-list` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-az-list` |
| **Señales** | `—` |
| **Módulo** | [`az-list.js`](az-list.js) · [`az-list.html`](az-list.html) |

## Qué es

Lista larga indexada A-Z con cabeceras por letra, título sticky, rail lateral tipo scrubber (estilo iOS Contacts) y estado vacío. Compone con el átomo `ft-list` (modificador `--add`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | full-width; controla título sticky, rail y estado vacío |

**Subgrupos:** `Markup`.

## Dependencias clave

- Componente JS-driven: controller del rail (drag-scroll, scroll-spy, búsqueda con `<mark>`, toggle de `__empty`). El storybook reproduce los estados sin ese JS.
- Compone el átomo List (`.ft-list--add`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/az-list/_az-list.scss`
- **Showroom legacy:** `fourty/molecules/molecule-az-list.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
