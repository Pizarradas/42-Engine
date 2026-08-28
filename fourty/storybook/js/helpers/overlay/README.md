# Storybook · Helpers / Overlay

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`overlay.js`](overlay.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `overlay` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-overlay-modal` (+ `--visible`) |
| **Señales** | `—` |
| **Módulo** | [`overlay.js`](overlay.js) · [`overlay.html`](overlay.html) |

## Qué es

Pareja `.ft-helper-overlay-modal` + `--visible` del 42DS: backdrop a pantalla completa (negro, opacity 0.7, z-index 100) para usar bajo modales / menús full-screen. El consumidor lo togglea con JS.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Toggle del modificador `--visible` con contenido simulado debajo |
| Modal sobre overlay | gallery | Patrón canónico: diálogo (`role="dialog"`, z-index ≥ 101) encima del backdrop |

**Subgrupos:** `Galleries`.

## Dependencias clave

- JS del consumidor: necesario para togglear `--visible` y gestionar foco/teclado (Escape, focus trap, `aria-expanded`). El helper es solo el backdrop; para diálogos complejos preferir `.ft-mol-modal`.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_overlays.scss`
- **Showroom legacy:** `fourty/helpers/helper-overlay.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
