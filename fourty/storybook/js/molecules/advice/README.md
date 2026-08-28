# Storybook · Molecules / Advice

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`advice.js`](advice.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `advice-mol` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-advice` |
| **Señales** | `—` |
| **Módulo** | [`advice.js`](advice.js) · [`advice.html`](advice.html) |

## Qué es

Barra de aviso a ancho completo con texto (título + subtítulo) a la izquierda y un botón `.ft-btn` a la derecha. Caso típico: «márcanos como medio preferente». No confundir con el átomo `.ft-advice`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | full-width; controla título, subtítulo, texto del botón y `--only` |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- Compone el átomo Btn (`.ft-btn`).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/advice/_advice.scss`
- **Showroom legacy:** `fourty/molecules/molecule-advice.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
