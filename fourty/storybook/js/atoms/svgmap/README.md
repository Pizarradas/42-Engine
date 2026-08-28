# Storybook · Atoms / SvgMap

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`svgmap.js`](svgmap.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `svgmap` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-svgmap` |
| **Señales** | `—` |
| **Módulo** | [`svgmap.js`](svgmap.js) · [`svgmap.html`](svgmap.html) |

## Qué es

Átomo de mapa SVG (`.ft-svgmap`): estiliza un `<svg>` de mapa (comunidades, provincias, capitales) con relleno base lightGrey, líneas blancas y estados por shape. La interacción es por `[onclick]`/`[data-url]` en los paths.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `map` |
| Tipos de mapa | gallery | 4 modificadores |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/svgmap.css`.
- SVG del mapa + handler de `[data-url]` (asset + JS): la navegación al clicar una región la resuelve el proyecto.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/svgmap/_svgmap.scss`
- **Showroom legacy:** `fourty/atoms/atom-svgMap.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
