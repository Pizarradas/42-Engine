# Storybook · Molecules / Dropdown

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`dropdown.js`](dropdown.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `dropdown` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-dropdown` |
| **Señales** | `js` |
| **Módulo** | [`dropdown.js`](dropdown.js) · [`dropdown.html`](dropdown.html) |

## Qué es

Menú desplegable accesible: un trigger (botón) y una lista de ítems que se abre por debajo. Soporta triggers `.ft-btn` o `.ft-btn-nav`, ítems con icono y submenús nativos (`<details>`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Necesita JS: `toggleDropdown` para apertura real, gestión de foco/ARIA y click-outside/Esc.
- Compone `.ft-btn` / `.ft-btn-nav`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/dropdown/_dropdown.scss`
- **Showroom legacy:** `fourty/molecules/molecule-dropdown.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
