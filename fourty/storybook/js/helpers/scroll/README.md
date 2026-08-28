# Storybook · Helpers / Scroll

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`scroll.js`](scroll.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `scroll` |
| **Grupo** | Helpers |
| **Clase / patrón** | `.ft-helper-scroll*` |
| **Señales** | `—` |
| **Módulo** | [`scroll.js`](scroll.js) · [`scroll.html`](scroll.html) |

## Qué es

Familia `.ft-helper-scroll*` del 42DS: contenedor con scroll horizontal estilizado (cursor de drag, scrollbar custom), modificadores de ancho de items y conmutación automática de tema bajo fondos oscuros.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Modificador de ancho + nº de items + tamaño de scrollbar |
| Modificadores de ancho | gallery | `--100` · `--100-mobileonly` · `--50` · `--25` |
| Tamaños de scrollbar | gallery | default (24px) vs `--small` (5px) |
| Stop + dark mode | gallery | `-stop` (overflow hidden) y conmutación bajo `bg-black` |

**Subgrupos:** `Galleries`.

## Dependencias clave

- Solo CSS del DS; sin JS (es solo el contenedor; snap/autoplay extra los añade el consumidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/base/helpers/_scrolls.scss`
- **Showroom legacy:** `fourty/helpers/helper-scroll.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*`/`.ft-helper-*` reales (cero invención), `overview` solo docs, sin tocar `scss/` ni `cds-statics/`.
