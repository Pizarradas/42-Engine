# Storybook · Organisms / Paywall

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`paywall.js`](paywall.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `paywall` |
| **Grupo** | Organisms |
| **Clase raíz** | `.org-paywall` (prefijo NO estándar, sin `ft-`) |
| **Señales** | `—` |
| **Módulo** | [`paywall.js`](paywall.js) · [`paywall.html`](paywall.html) |

## Qué es

Organismo del 42DS (`.org-paywall`): muro de suscripción — reclamo «contenido Premium» con las cajas de oferta (web / web+papel) y CTAs. Usa el prefijo no estándar `.org-paywall` (sin `ft-`), como `cerca` o `mol-divider`.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/paywall.css`.
- JS de Piano / suscripción solo en producción (oferta real). Aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/paywall/_paywall.scss`
- **Showroom legacy:** `fourty/organisms/organism-paywall.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
