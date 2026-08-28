# Storybook · Molecules / Divider

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`divider.js`](divider.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `divider` |
| **Grupo** | Molecules |
| **Clase raíz** | `.mol-divider` (prefijo NO estándar, sin `ft-`) |
| **Señales** | `—` |
| **Módulo** | [`divider.js`](divider.js) · [`divider.html`](divider.html) |

## Qué es

Separador decorativo de fin de listado («esto es todo por ahora»): icono circular, dos bloques de texto unidos por líneas discontinuas y una etiqueta-badge central con CTA.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | — |

**Subgrupos:** `Markup`.

## Dependencias clave

- Compone `.ft-tag`, `.ft-img`, `.ft-link`; solo CSS (no necesita JS).

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/molecules/divider/_divider.scss`
- **Showroom legacy:** `fourty/molecules/molecule-divider.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases reales (cero invención; aquí el prefijo canónico es `.mol-divider`, sin `ft-`), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
