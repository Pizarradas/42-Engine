# Storybook · Molecules / Multimedia

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`multimedia.js`](multimedia.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `multimedia` |
| **Grupo** | Molecules |
| **Clase raíz** | `.ft-mol-multimedia` |
| **Señales** | `—` |
| **Módulo** | [`multimedia.js`](multimedia.js) · [`multimedia.html`](multimedia.html) |

## Qué es

Contenedor de reproductor (vídeo/podcast) con póster, botón de play y pie, más un `<figcaption>` de crédito.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Player (jwplayer) + ad-schedule + tracking para reproducir; sin JS crítico del DS mismo.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/multimedia/_multimedia.scss`
- **Showroom legacy:** `fourty/molecules/molecule-multimedia.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
