# Storybook · Atoms / Advice

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`advice.js`](advice.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `advice` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-advice` |
| **Señales** | `—` |
| **Módulo** | [`advice.js`](advice.js) · [`advice.html`](advice.html) |

## Qué es

Átomo de aviso: una píldora/etiqueta inline en negrita, fondo negro y texto blanco por defecto, con variantes de color y de tamaño. Útil para marcar estados o categorías cortas.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: color, size, label |
| Colores | gallery | 4 variantes |
| Tamaños | gallery | S · M · L |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- Respeta el dark mode (`[data-theme="dark"]` fuerza texto blanco).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/advice/_advice.scss`
- **Showroom legacy:** `fourty/atoms/atom-advice.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
