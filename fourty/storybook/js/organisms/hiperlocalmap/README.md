# Storybook · Organisms / Hiperlocal map

> Ficha de contexto para agentes. La **fuente de verdad** de la documentación es el bloque `overview` de [`hiperlocalmap.js`](hiperlocalmap.js) y el SCSS canónico; este README **indexa**, no duplica.

| Campo | Valor |
|-------|-------|
| **id** | `hiperlocalmap` |
| **Grupo** | Organisms |
| **Clase raíz** | `.ft-org-hiperlocalmap` |
| **Señales** | `js` |
| **Módulo** | [`hiperlocalmap.js`](hiperlocalmap.js) |

## Qué es

Mapa hiperlocal interactivo (Leaflet), showcase del showroom. `.ft-org-hiperlocalmap` NO es un organismo canónico del DS (sin SCSS): es una página JS-driven que se autoestila y se pinta en runtime.

## Stories registradas

| Story | kind | Notas |
|-------|------|-------|
| Local | page | Leaflet servido del propio DS; `brandable` |
| URL | page | Leaflet por CDN; `brandable` |
| Fullwidth | page | Leaflet por CDN; `brandable` |

## Dependencias clave

- `/cds-statics/js/vendors/maps/leaflet.js` (+ leaflet.css) — librería de mapa (variante Local); CDN para URL/Fullwidth.
- Script de init inline + `<style>` propio (el mapa se autoestila, sin SCSS canónico).
- Requiere servidor; las variantes URL/Fullwidth además requieren red (CDN).

## Trazabilidad

- **SCSS (SSOT):** `—`
- **Showroom legacy:** `—`
- **Nivel:** [`../README.md`](../README.md) · **Motor (`SB.register`):** [`../../core/README.md`](../../core/README.md) · **Maestro:** [`../../../README.md`](../../../README.md)

## Operación

Editar bajo `[MODE: STORYBOOK+DOC]` (op `modify`). Reglas: clases `.ft-*` reales (cero invención), `overview` solo docs, `Base` primero, sin tocar `scss/` ni `cds-statics/`.
