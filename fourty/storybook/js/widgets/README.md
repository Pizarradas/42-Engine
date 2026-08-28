# storybook/js/widgets — Índice de widgets (kind:"page")

Los **Widgets** (elecciones, JJOO 2024…) son **piezas especiales standalone**, no componentes
del DS. Se publican como stories `kind:"page"` (el iframe navega al fichero → su propio
`<head>`/CSS/JS). Patrón y mecanismo: ver [`../templates/README.md`](../templates/README.md) y
`js/core/storybook.js` (§ páginas completas).

## Las páginas viven DENTRO del storybook (`pages/`)

La carpeta original `fourty/widgets/` se movió a `__old-showroom` (backup) → las stories
quedaban en 404. Siguiendo la directiva **«no redirigir al backup; el código en su subcarpeta»**,
cada widget se **extrajo del `rendered-content`** del showroom (descartando el andamiaje
`overview-panel`/`code-container`/banner) y se guardó como página limpia en
[`pages/`](pages/), con las rutas de assets normalizadas a `/cds-statics` (corrigiendo el typo
`/cs/js/` y los `src` relativos de los scripts de charts/mapas → así el widget **renderiza y
funciona**). En **runtime no se referencia ninguna ruta externa**.

- **`brandable: false`** — standalone (Brand/Oscuro grisados). Útiles: Viewport · Visión · Fullscreen.
- Grupo `group:"Widgets"`. Mantenido **a mano** (`widgets.js`); el `src` apunta a
  `storybook/js/widgets/pages/<fichero>` (relativo a `fourty/index.html`).
- La landing **«Home»** del showroom (índice de sección con nav) se **descartó**: el sidebar del
  storybook ya cumple esa función de navegación.

> Si algún widget resultara ser multimarca (conmuta `#brandStyles-root`), pásalo a
> `brandable:true` (como templates) — decisión por-pieza.
