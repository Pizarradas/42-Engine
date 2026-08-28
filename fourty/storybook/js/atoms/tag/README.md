# Storybook · Atoms / Tag

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`tag.js`](tag.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `tag` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-tag` |
| **Señales** | `js` |
| **Módulo** | [`tag.js`](tag.js) · [`tag.html`](tag.html) |

## Qué es

Átomo de etiqueta/píldora (`.ft-tag`) con cuatro familias documentadas en el SCSS: visualización base, variantes clicables `--link`/`--linkBasis`, la familia interactiva `--chip` y la variante compacta `--chip-tiny` para filtros y sugerencias.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `size`, `style`, `marker`, `name`, `value` |
| Link | interactive | Controls: `mode`, `size`, `label`, `withMarker`, `withValue` |
| Chip | interactive | Controls: `state`, `size`, `controlTag`, `label`, `pulse` |
| Chip tiny (Cerca) | interactive | Controls: `state`, `controlTag`, `label` |
| Sizes | gallery | base · sm · md · lg |
| Styles | gallery | filled · secondary · status |
| Clickable variants | gallery | --link · --linkBasis |
| Chip states | gallery | 8 estados reales |
| Chip controls | gallery | button · link · pulse |
| Chip tiny gallery | story | patrón horizontal de filtros |
| Chip tiny + helper-scroll | story | requiere JS del organismo |

**Subgrupos:** `Galleries · Visual`, `Galleries · Chip`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/tag.css`.
- JS de producto solo para flujos de `--chip` (estado, loading, analytics).
- `cds-statics/js/organisms/suggestions-chips/fourty-js-suggestions-chips-chip-tiny-helper-scroll.js`: JS opcional para sincronizar `data-tag-state`/`aria-pressed` en hileras `.ft-helper-scroll`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/tag/_tag.scss`
- **Showroom legacy:** `fourty/__old-showroom/atoms/atom-tag.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
