# Storybook · Atoms / Ad

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`ad.js`](ad.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `ad` |
| **Grupo** | Atoms |
| **Clase raíz** | `.ft-ad` |
| **Señales** | `js` |
| **Módulo** | [`ad.js`](ad.js) · [`ad.html`](ad.html) |

## Qué es

Átomo contenedor de huecos publicitarios: centra el creativo, fija un `min-height` por formato (anti-CLS) y pinta la etiqueta «Publicidad» con un pseudo-elemento `:before`. Los formatos son modificadores.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Base | interactive | Controls: format, notext |
| Formatos | gallery | Todos los formatos inline |

**Subgrupos:** `Galleries`.

## Dependencias clave

- CSS: `setting.css` + `atoms/ad.css` (o `[marca]-core.css`).
- Runtime `cds-statics/js/sticking/fourty-ads_skys-sticky.js` solo con `.ft-ad--footer`.
- Ad-server externo (Google Ad Manager, Taboola…) inyecta el creativo real.

## Trazabilidad

- **SCSS (SSOT):** `scss/fourties/atoms/ad/_ad.scss`
- **Showroom legacy:** `fourty/atoms/atom-ad.html`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
