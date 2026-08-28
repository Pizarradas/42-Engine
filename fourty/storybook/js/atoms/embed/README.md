# Storybook · Atoms / Embed

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`embed.js`](embed.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `embed` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-embed` |
| **Señales** | `—` |
| **Módulo** | [`embed.js`](embed.js) · [`embed.html`](embed.html) |

## Qué es

Átomo contenedor (`.ft-embed`) para incrustados de terceros (iframes de redes y players). El atributo `data-rrss-id` ajusta el aspect-ratio/altura del iframe a cada plataforma; `--ar-16-9` lo fuerza a 16/9.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `network`, `ar169` |
| Por red | gallery | aspect-ratio por `data-rrss-id` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- El átomo es solo CSS del DS; sin JS propio.
- El embed real requiere el SDK/JS del proveedor (no lo aporta el DS); los previews usan `<iframe srcdoc>` autocontenidos.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/embed/_embed.scss`
- **Showroom legacy:** `fourty/atoms/atom-embed.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
