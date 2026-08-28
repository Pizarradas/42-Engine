# Storybook · Organisms / Game

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`game.js`](game.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `game` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-game` |
| **Señales** | `—` |
| **Módulo** | [`game.js`](game.js) · [`game.html`](game.html) |

## Qué es

Organismo del 42DS (`.ft-org-game`): tablero de pasatiempo — cita/criptograma con letras, campo de entrada, alertas de validación y teclado en pantalla.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Sin controles; markup verbatim (criptograma, tablero, teclado QWERTY, archivo, field) |

## Dependencias clave

- CSS de marca (`setting.css` primero) + `organism/game.css`.
- JS del juego (input, teclado, validación) en producción; aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/game/_game.scss`
- **Showroom legacy:** `fourty/organisms/organism-game.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
