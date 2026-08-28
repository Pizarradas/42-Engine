# Storybook · Molecules / Subscribe Read

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`subscribeRead.js`](subscribeRead.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `subscriberead` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-subscribeRead` |
| **Señales** | `—` |
| **Módulo** | [`subscribeRead.js`](subscribeRead.js) · [`subscribeRead.html`](subscribeRead.html) |

## Qué es

Bloque de suscripción a revista: contenido, portada del ejemplar y CTA con botonera.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- Solo CSS del DS; sin JS. Usa `.ft-btn` (átomo Btn) en el CTA; la portada (`__image`) la aporta el consumidor.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/subscribeRead/_subscribeRead.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
