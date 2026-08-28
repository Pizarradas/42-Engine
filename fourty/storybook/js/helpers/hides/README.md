# Storybook · Helpers / Hides

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`hides.js`](hides.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `hides` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-hide*` |
| **Señales** | `—` |
| **Módulo** | [`hides.js`](hides.js) · [`hides.html`](hides.html) |

## Qué es

Familia `.ft-helper-hide*` del 42DS: variantes para ocultar elementos — universal, responsive (5 breakpoints: `-mo/-xs/-sm/-md/-lg`) y a11y específicas (`-screenReader`, `Txt`, `-onScroll`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de variante + fila target/vecinos |
| Responsive | gallery | 5 breakpoints con tabla; usar Viewport del toolbar |
| A11y | gallery | hide / screenReader / hideTxt / onScroll |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. Excepción: `hide-onScroll` es plantilla CSS para JS de scroll del consumidor (el DS no lo aporta).

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_hides.scss`
- **Showroom legacy:** `fourty/helpers/helper-hides.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
