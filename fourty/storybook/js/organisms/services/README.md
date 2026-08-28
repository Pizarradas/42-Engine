# Storybook · Organisms / Services

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`services.js`](services.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `services` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-services` |
| **Señales** | `—` |
| **Módulo** | [`services.js`](services.js) · [`services.html`](services.html) |

## Qué es

Organismo del 42DS (`.ft-org-services`): franja de servicios del medio — accesos a utilidades (esquelas, tiempo, tráfico, pasatiempos…) en una sección compacta.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Markup verbatim, `full` |

## Dependencias clave

- `brands/[marca]/setting.css` (primero) + `brands/[marca]/organism/services.css`.
- Iconos de servicio (assets) los aporta el medio.
- Solo CSS del DS; sin JS.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/services/_services.scss`
- **Showroom legacy:** `fourty/organisms/organism-services.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
