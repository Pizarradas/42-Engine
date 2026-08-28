# Storybook · Atoms / Timer

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`timer.js`](timer.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `timer` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-timer` |
| **Señales** | `—` |
| **Módulo** | [`timer.js`](timer.js) · [`timer.html`](timer.html) |

## Qué es

Átomo de cuenta atrás / cronómetro (`.ft-timer`): un display `MM:SS` con botones de iniciar/pausar. El átomo aporta el esqueleto visual; la cuenta atrás la mueve el JavaScript del proyecto.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `inline`, `mm`, `ss` |
| Variantes | gallery | base · inline |

**Subgrupos:** `Galleries`.

## Dependencias clave

- JS de cuenta atrás obligatorio para el conteo real (lo aporta el proyecto); el átomo solo pinta un valor estático.
- `--inline` pinta el display en blanco con iconos play/pause SVG `data:` inline (se muestra sobre fondo oscuro).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/timer/_timer.scss`
- **Showroom legacy:** `fourty/atoms/atom-timer.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
