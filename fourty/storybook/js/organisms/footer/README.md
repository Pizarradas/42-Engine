# Storybook · Organisms / Footer

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`footer.js`](footer.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `footer` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-footer` |
| **Señales** | `—` |
| **Módulo** | [`footer.js`](footer.js) · [`footer.html`](footer.html) |

## Qué es

Organismo del 42DS (`.ft-org-footer`): pie de página de medio — logo, RRSS, navegación por columnas, legal y sellos. Fuertemente dependiente de la marca (cada medio tiene su tipo 1 / tipo 2).

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Select de variante: ep/epe/reg/sport (tipo 1 y 2) + `lite-ep` |

**Subgrupos:** `Lite`.

## Dependencias clave

- CSS de marca (`setting.css` primero) + `organism/footer.css`.
- Logos / iconos RRSS los aporta el medio (assets).
- JS de acordeón (despliegue de columnas en móvil) en producción; aquí estático.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/organism/footer/_footer.scss`
- **Showroom legacy:** `fourty/organisms/organism-footer.html`
- **Contrato Footer Lite:** [`../../../data/footer-lite.json`](../../../data/footer-lite.json) · generado desde los datos de `footer.js` mediante `scripts/generate-footer-lite-json.js`.
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
