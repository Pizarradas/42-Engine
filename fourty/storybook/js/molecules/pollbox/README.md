# Storybook · Molecules / Poll Box

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`pollbox.js`](pollbox.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `pollbox` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-pollbox` |
| **Señales** | `—` |
| **Módulo** | [`pollbox.js`](pollbox.js) · [`pollbox.html`](pollbox.html) |

## Qué es

Caja de encuesta/votación: una pregunta y una lista de respuestas con control (radio o checkbox) y medidor de resultados (barra + porcentaje + votos), total, aviso de "ya has votado" y botón de envío.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Story plana con controles |
| Markup | (subgrupo) | HTML plano editable, cargado via `SB.loadMarkup` |

## Dependencias clave

- JavaScript del consumidor — rellena resultados y envía el voto (no lo aporta el DS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/pollbox/_pollbox.scss`
- **Showroom legacy:** —
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
