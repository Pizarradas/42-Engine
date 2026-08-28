# Storybook · Organisms / Container

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`container.js`](container.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `container` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-container` |
| **Señales** | `—` |
| **Módulo** | [`container.js`](container.js) · [`container.html`](container.html) |

## Qué es

Organismo del 42DS (`.ft-org-container`): envoltorio de sección de ancho completo con fondo y bordes curvos opcionales — agrupa y separa bloques de portada.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Select de variante: base · curvado inferior (`--curved --curved-bottom`) · curvado superior (`--curved --curved-top`) |

## Dependencias clave

- Solo CSS del DS; sin JS. CSS de marca (`setting.css` primero) + `organism/container.css`.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/container/_container.scss`
- **Showroom legacy:** `fourty/organisms/organism-container.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
