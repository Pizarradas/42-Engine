# Storybook · Atoms / Date

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`date.js`](date.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `date` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-date` |
| **Señales** | `—` |
| **Módulo** | [`date.js`](date.js) · [`date.html`](date.html) |

## Qué es

Átomo de fecha/firma temporal (`.ft-date`): flex en columna con el lugar, la hora de publicación y la marca de «actualizada». Tipografía pequeña en color `var(--color-quaternary)`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `variant`, `place`, `published`, `reload`, `extra` |
| Variantes | gallery | 5 alineaciones/estilos |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS. (gran parte del SCSS son comportamientos contextuales dentro de tarjetas; aquí se documenta el átomo aislado)

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/date/_date.scss`
- **Showroom legacy:** `fourty/atoms/atom-date.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
