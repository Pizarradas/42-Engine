# storybook/js/pocs — Índice de POCs (kind:"page")

Los **POCs** (`fourty/pocs/`: prototipos y experimentos, muchos versionados) se indexan como
stories `kind:"page"` (el iframe navega al fichero → su propio `<head>`/CSS/JS). Patrón y
mecanismo: ver [`../templates/README.md`](../templates/README.md) y `js/core/storybook.js`
(§ páginas completas).

- **`brandable: false`** (standalone). Útiles: Viewport · Visión · Fullscreen.
- Grupo `group:"POCs"`, **una "componente" por carpeta-proyecto** (`PI-379-…`, `test__…`,
  `teams-cards-mockup`…) + **General** para los `pocs/*.html` de raíz. El nombre de cada story
  conserva la subruta dentro del proyecto.
- **Exclusión honesta**: las carpetas `index_files/` son artefactos de «guardar página» del
  navegador (`3pc.html`, `saved_resource.html`, hashes…), **no** POCs → se excluyen del índice
  (lo reporta el generador por consola; no es un cap silencioso).
- SSOT autogenerado por `fourty/storybook/.tmp_gen_pages.js` (temporal, se borra). **No editar
  a mano**; regenerar tras cambios en `fourty/pocs/`.
