# Storybook · Atoms / Animation

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`animation.js`](animation.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `animation` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-animation-*` (clases utilitarias; no hay `.ft-animation` pelado) |
| **Señales** | `—` |
| **Módulo** | [`animation.js`](animation.js) · [`animation.html`](animation.html) |

## Qué es

Conjunto de 15 clases utilitarias de movimiento (`.ft-animation-*`) aplicables a cualquier elemento para darle una animación de una sola reproducción al aparecer: entradas, salidas y énfasis.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `animation`, `label` |
| Entradas | gallery | catálogo tipo `in` |
| Salidas | gallery | catálogo tipo `out` (acaban ocultas) |
| Énfasis | gallery | catálogo tipo `emphasis` (vuelven al inicio) |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. (la animación se dispara al montar; respeta `prefers-reduced-motion`)

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/animation/_animation.scss`
- **Showroom legacy:** `fourty/atoms/atom-animation.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
