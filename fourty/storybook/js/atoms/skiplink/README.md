# Storybook · Atoms / Skiplink

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`skiplink.js`](skiplink.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `skiplink` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-skiplink` |
| **Señales** | `—` |
| **Módulo** | [`skiplink.js`](skiplink.js) · [`skiplink.html`](skiplink.html) |

## Qué es

Átomo de accesibilidad (`.ft-skiplink`): un enlace «saltar al contenido» oculto fuera de pantalla que se revela al recibir foco (Tab). Debe ser la primera pieza enfocable de la página.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `label`, `href`, `withBtn` |
| Ejemplos | gallery | destinos canónicos |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/skiplink.css`.
- Solo CSS del DS; sin JS (revelado por `:focus` nativo).
- En el showroom se compone con `.ft-btn ft-btn--md` para el estilo visible.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/skiplink/_skiplink.scss`
- **Showroom legacy:** `fourty/atoms/atom-skiplink.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
