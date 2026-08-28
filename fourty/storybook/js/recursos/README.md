# storybook/js/recursos — Índice de recursos (kind:"page")

Los **Recursos** (utilidades y páginas de apoyo) se publican como stories `kind:"page"` (el
iframe navega al fichero → su propio `<head>`/CSS/JS). Patrón y mecanismo: ver
[`../templates/README.md`](../templates/README.md) y `js/core/storybook.js` (§ páginas completas).

## Las páginas viven DENTRO del storybook (`pages/`)

La carpeta original `fourty/recursos/` se movió a `__old-showroom` (backup) → las stories
quedaban en 404. Siguiendo la directiva **«no redirigir al backup; el código en su subcarpeta»**,
cada recurso se **extrajo del `rendered-content`** del showroom (descartando el andamiaje
`overview-panel`/`code-container`) y se guardó como página limpia en [`pages/`](pages/), con las
rutas de assets normalizadas a `/cds-statics`. En **runtime no se referencia ninguna ruta externa**.

- **`brandable: false`** (standalone). Útiles: Viewport · Visión · Fullscreen.
- Grupo `group:"Recursos"`. Mantenido **a mano** (`recursos.js`); el `src` apunta a
  `storybook/js/recursos/pages/<fichero>` (relativo a `fourty/index.html`).
- La landing **«Home»** del showroom (índice de sección con nav) se **descartó**: el sidebar del
  storybook ya cumple esa función de navegación.
