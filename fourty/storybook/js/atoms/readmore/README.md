# Storybook · Atoms / ReadMore

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`readmore.js`](readmore.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `readmore` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-readMore` |
| **Señales** | `—` |
| **Módulo** | [`readmore.js`](readmore.js) · [`readmore.html`](readmore.html) |

## Qué es

Átomo «leer más / leer menos» (`.ft-readMore`) construido sobre el elemento nativo `<details>`/`<summary>`: recorta el texto y lo expande al clicar, sin JavaScript custom.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `text`, `open`, `higher`, `hasButton`, `notLess` |
| Modificadores | gallery | base + 3 |

**Subgrupos:** `Galleries`.

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/atoms/readMore.css`.
- Solo CSS del DS; sin JS (usa `<details>` nativo).
- El degradado de recorte (`:after`) usa `var(--color-white)`: asume fondo blanco.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/readmore/_readmore.scss`
- **Showroom legacy:** `fourty/atoms/atom-readMore.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
