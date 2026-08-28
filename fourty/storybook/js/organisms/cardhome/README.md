# Storybook · Organisms / Card Home

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`cardhome.js`](cardhome.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `cardhome` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-cardHome` |
| **Señales** | `—` |
| **Módulo** | [`cardhome.js`](cardhome.js) · [`cardhome.html`](cardhome.html) |

## Qué es

Organismo del 42DS (`.ft-org-cardHome`): tarjeta de portada que compone imagen destacada, etiquetas, marcador, firma y titulares. Columna en desktop, fila en mobile (y al revés con `--featured`).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Builder paramétrico: ejes exclusivos (size/featured/layout/media) + flags de contexto + piezas internas |

**Subgrupos:** `Markup`.

## Dependencias clave

- Solo CSS del DS; sin JS.
- CSS del organismo + piezas internas `.ft-mol-figcaption`, `.ft-mol-label`, `.ft-mol-writer`, `.ft-mol-score` (según controles activos); imágenes/escudos los aporta el consumidor.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/cardhome/_cardHome.scss`
- **Showroom legacy:** `fourty/organisms/organism-cardHome.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
