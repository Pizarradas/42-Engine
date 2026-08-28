# Storybook · Helpers / Animation

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`animation.js`](animation.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `animation` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-animation-*` |
| **Señales** | `—` |
| **Módulo** | [`animation.js`](animation.js) · [`animation.html`](animation.html) |

## Qué es

Familia `.ft-helper-animation-*` del 42DS: 6 animaciones predefinidas (5 fades direccionales + 1 scaleIn). Todas con `animation-fill-mode: both`, por lo que mantienen el estado final tras ejecutar.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Selector de animación + control `replay` que fuerza re-mount |
| Todas (replay al entrar) | gallery | Grid con todas las animaciones; se reproducen al entrar |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_animations.scss`
- **Showroom legacy:** `fourty/helpers/helper-animation.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
