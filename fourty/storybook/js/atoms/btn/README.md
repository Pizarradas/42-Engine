# Storybook · Atoms / Btn

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`btn.js`](btn.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `btn` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-btn` (+ familias `.ft-btn-nav`, `.ft-btn-rrss`, `.ft-btn-txt`, `.ft-btn-help`) |
| **Señales** | `—` |
| **Módulo** | [`btn.js`](btn.js) · [`btn.html`](btn.html) |

## Qué es

Átomo de acción del 42DS. La pieza base `.ft-btn` cubre jerarquía, tamaño, icono, badge, disabled, squared, `--hue-grey` y la variante flotante `--scrollUp`. El mismo SCSS define las familias nav, rrss, txt y help.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: `label, kind, size, tag, withIcon, iconPosition, iconPrimal, squared, badge, disabled, hueGrey, onDark` |
| ScrollUp | interactive | Controls: `label, hueGrey, onDark` |
| Nav | interactive | Controls: `icon, shape, size, primary, bordered, shadow, active, checked, disabled, label` |
| RRSS | interactive | Controls: `network, primary, label` |
| Txt | interactive | Controls: `label, close` |
| Help | interactive | Controls: `label` |
| Kinds | gallery | 3 jerarquías |
| Sizes | gallery | 6 tamaños |
| States | gallery | button y anchor disabled |
| Icon, badge and squared | gallery | icono, primal, badge, squared |
| On dark | gallery | sobre fondo oscuro |
| Hue grey | gallery | modificador cromático base |
| ScrollUp preview | gallery | variante flotante |
| All icons | gallery | 28 iconos nav |
| Shapes and sizes | gallery | default, circle, square |
| States (nav) | gallery | bordered, primary, active, checked |
| All networks | gallery | 15 redes |
| Outline | gallery | variante `--primary` |

**Subgrupos:** `Base Galleries`, `Nav Galleries`, `RRSS Galleries`.

## Dependencias clave

- Base, Nav, RRSS, Txt y Help son CSS puro del DS.
- `--scrollUp` requiere `cds-statics/js/scroll/fourty-js-scrollUp.js` + jQuery.
- Iconos de nav/help/rrss--primary dependen de rutas absolutas `/cds-statics/…` (requieren servidor).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/btn/_btn.scss`
- **Showroom legacy:** `fourty/__old-showroom/atoms/atom-btn.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
