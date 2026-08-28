# storybook/css

Chrome CSS del Storybook (sidebar, toolbar, addons panel, dropdowns, inspector). Prefijo
**`.cb-*`** (Carbon) para no colisionar nunca con las clases `.ft-*` del Design System.

```
css/
├── README.md          ← este archivo
└── storybook.css      ← chrome completo (~700 líneas, sin imports)
```

---

## Reglas no-negociables

1. **Cero clases `.ft-*` en este archivo**. El chrome es independiente del DS — usa solo
   sus propios tokens (`--cb-*`) y selectores propios (`.cb-app`, `.cb-side`,
   `.cb-csel`…).
2. **Tokens propios**: el chrome tiene sus propias variables CSS (`--cb-bg`, `--cb-text`,
   `--cb-interactive`…) declaradas en `:root` y reasignadas en `body.cb-host.cb-dark`.
   **No reutilizar** los tokens del DS (`--color-primary` etc.) — esos pertenecen al
   componente, no al chrome.
3. **Dark mode coordinado pero separado**: el toggle Oscuro activa el dark mode REAL del
   DS (`data-theme="dark"` en `<html>` del iframe → reglas de `_dark.scss`) Y tematiza el
   chrome con `body.cb-host.cb-dark` (reasigna `--cb-*`). Son dos efectos sincronizados,
   no uno solo.
4. **El chrome no aplica estilos al iframe**. El canvas vive en un `<iframe>`, y los
   estilos del padre no atraviesan ese límite. El motor (`core/storybook.js`) inyecta su
   propio `<style>` dentro de `frameHTML()` con las pocas reglas necesarias para el stage
   y para los toggles a11y (forced-colors, reduced-motion, focus, spacing, fullscreen
   edge-to-edge). Ver §A11y CSS injection.

---

## Estructura del archivo

`storybook.css` está organizado en secciones marcadas por comentarios de banner
`/* ═══ ... ═══ */`:

1. **Tokens (`:root` y `body.cb-host.cb-dark`)** — paleta Carbon (g10 light / g100 dark).
2. **Reset mínimo** — `box-sizing`, `html/body { height: 100% }`.
3. **Shell** — `.cb-app` (grid sidebar | main), `.cb-side` (sidebar), `.cb-main`
   (toolbar + sub-toolbar + canvas + panel).
4. **Sidebar** — brand, search, tree (group → component → story).
5. **Resizers** — `.cb-resize-x` (sidebar) y `.cb-resize-y` (addon panel).
6. **Toolbar + sub-toolbar A11y** — globals, separators, section pills.
7. **Botón-icono y modo fullscreen** — `.cb-icobtn`, `body.cb-fullscreen` overrides,
   solapa de recuperación `.cb-exit-fs`.
8. **Canvas wrap + iframe** — `.cb-canvas-wrap`, `.cb-frame`, `.cb-frame--fixed`.
9. **Code panel** — `.cb-code` con `pre/code` mono.
10. **Addons panel** — tabs (`.cb-ptab`), body, controls table (`.cb-args`), a11y rows.
11. **Docs view** — tipografía expresiva Carbon (h1 42px), tablas, callouts, deps box y registros `.cb-change`.
12. **Dropdown custom `.cb-csel`** — trigger + menu sticky-search + footer + opciones
    con checkbox de selección (`.cb-csel__sw` en Cabecera) + chip de región + chip contador.

---

## Tokens (`--cb-*`)

### Light theme (`:root`, tema "g10" de Carbon)

```css
--cb-bg:             #ffffff;     /* fondo del chrome (toolbar, panel, menu) */
--cb-side-bg:        #f5f8fd;     /* sidebar (azul muy pálido para diferenciar) */
--cb-layer:          #f4f4f4;     /* layer-01 — hover sobre claro */
--cb-layer-hover:    #e8e8e8;
--cb-field:          #f4f4f4;     /* fondo de inputs */
--cb-border-subtle:  #e0e0e0;
--cb-border-strong:  #8d8d8d;
--cb-text:           #161616;     /* primario */
--cb-text-secondary: #525252;     /* meta-info */
--cb-text-placeholder:#a8a8a8;
--cb-interactive:    #0f62fe;     /* azul Carbon — focus, active, links */
--cb-focus:          #0f62fe;
--cb-error:          #da1e28;
--cb-success:        #24a148;
--cb-warning:        #f1c21b;
--cb-docs-ico:       #a87900;     /* oro legible sobre sidebar claro */
--cb-sans:           "Inter", system-ui, sans-serif;
--cb-mono:           "JetBrains Mono", ui-monospace, monospace;
```

### Dark theme (`body.cb-host.cb-dark`, tema "g100")

Reasigna los mismos tokens a valores Carbon Gray 100. **Nunca usar dark mode con valores
hardcoded** — siempre tokens. Una nueva regla CSS solo debe usar `var(--cb-*)`, así el
dark mode se hereda automáticamente.

---

## Mecanismo de dark mode

Coordinación entre **3 capas**:

1. **HTML root**: `<html data-theme="dark">` (o `light`). Esto dispara las reglas del
   DS (`_dark.scss` compilado en `*-core.css`).
2. **Body del chrome**: `body.cb-host.cb-dark`. Esto reasigna los tokens `--cb-*` del
   chrome.
3. **Body del iframe**: también recibe `cb-dark` (propagado en `applyDark` del core).
   Necesario para que el stage del canvas tenga fondo oscuro y para reglas como
   `body.cb-dark .cb-spec__label`.

Estado persistido en `localStorage["darkMode"] = "enabled" | "disabled"` — **misma clave
que el showroom** (`cds-statics/js/showroom/showroom-core.js`). Compartir clave es
intencional: si el usuario activa dark en el showroom, el storybook lo recuerda y
viceversa.

---

## Patrón de hierarchy: tokens, no colores hardcoded

❌ **Mal** (rompe dark mode):

```css
.cb-csel__opt:hover { background: #f4f4f4; }
```

✅ **Bien** (tokenizado):

```css
.cb-csel__opt:hover { background: var(--cb-layer); }
```

Excepciones legítimas: colores que **no son tokenizables** porque deben ser idénticos en
ambos temas (p.ej. el azul de selección `#d0e2ff` / `#1f3a6b` se duplica explícitamente
porque la pareja exacta es informativa). En ese caso, declarar AMBAS reglas (light en
`:root` + override en `body.cb-host.cb-dark`).

---

## A11y CSS injection

Algunas reglas no pueden vivir aquí porque tienen que aplicarse **dentro del iframe**, no
en el padre. Las inyecta el motor (`core/storybook.js`) en el `<style>` autocontenido de
`frameHTML()`. Son:

- **Layout del stage** (`.cb-canvas`, `.cb-grid`, `.cb-spec`, `.cb-block`) — el motor lo
  pone porque depende de `100dvh` del iframe (no del padre).
- **Fullscreen edge-to-edge** (`body.cb-fullscreen .cb-canvas { padding: 0; gap: 0 }`).
- **Forced colors** (`body[class*="cb-a11y-fc-"]` + variantes BW/WB/YB).
- **Reduced motion** (`body.cb-a11y-rmotion *`).
- **Focus visible** (`body.cb-a11y-focus :focus`).
- **Text spacing WCAG 1.4.12** (`body.cb-a11y-spacing`).

Mantener esa frontera: **estilos del chrome aquí; estilos que afectan al componente
renderizado, dentro de `frameHTML()`**.

---

## Modificar / añadir UI

### Registro de cambios `.cb-change`

`changeBlock()` genera una tarjeta documental específica para la evolución de componentes:
acento lateral interactivo, etiqueta «Registro de cambio», chip de categoría, fecha semántica,
título, resumen y tabla compacta opcional. Usa exclusivamente tokens `--cb-*`, hereda modo
oscuro y repliega cabecera/fecha en viewports menores de `640px`.

La estructura `.cb-change*` pertenece al chrome documental. Los módulos no deben escribirla a
mano: deben consumir `window.SB.helpers.changeBlock` para conservar estructura y accesibilidad.

### Para un nuevo control en el toolbar

1. HTML en `CHROME` del motor (`core/storybook.js`), siguiendo el patrón `.cb-globals`:
   ```html
   <div class="cb-globals cb-globals--<x>">
     <label for="cb<X>">${ICONS.svg("<icon>", "")} Label</label>
     <select id="cb<X>" aria-label="...">...</select>
   </div>
   ```
2. (Opcional) Si necesita ancho específico: `.cb-globals--<x> select { max-width: Npx }`
   en este CSS.
3. La toolbar usa `gap: 8px` entre flex children — no hace falta separador entre items
   del mismo grupo conceptual. Para separar grupos, `<span class="cb-tool-sep">`.

### Para un nuevo dropdown custom estilo `.cb-csel`

El widget `.cb-csel` ya está implementado para **Fondo** y **Cabecera**, con variantes
específicas (`.cb-csel--cabecera` tiene search bar sticky + footer + chip de región).
Para reutilizarlo en otro control:

1. HTML del trigger + menu vacío (sigue el patrón de `cbBg` o `cbCabecera`).
2. JS para construir el menu (`menu.innerHTML = ...`) y enganchar el toggle open/close.
3. CSS solo si necesitas variantes específicas — la base ya está.

Ver `core/README.md` para el contrato detallado del widget.

### Para un nuevo modo a11y (toggle)

1. HTML del toggle en la sub-toolbar (sigue patrón de Movimiento/Foco/Espaciado).
2. Estado en boot() (`let mode = false`).
3. CSS de la regla, **dentro del `<style>` de `frameHTML()` en core**, NO aquí:
   ```css
   body.cb-a11y-<mode> ... { ... !important; }
   ```
4. Wire con `bindA11yToggle(id, clase, setter)`.

---

## Performance notes

- **Sin animaciones costosas** en hovers de elementos del menu (alta frecuencia). Las
  transitions usadas son cortas (.05s en el outline del inspector, 0.1s en
  `.cb-table tbody tr` hover) y solo en propiedades baratas (`background`).
- **`will-change` no se usa** — los redibujos del chrome no justifican el coste
  de promover capas.
- **Sticky positioning** (`position: sticky`) en search bar y footer de
  `.cb-csel--cabecera` — barato en navegadores modernos.

---

## Convenciones

- **Naming**: `cb-<bloque>__<elemento>--<modificador>` (BEM como el DS pero con prefijo
  `cb-`). Ej.: `cb-csel__opt--pinned`, `cb-toolbar--a11y`.
- **Specificity**: mantener selectores planos (clase única o `<padre> .<hijo>` máximo).
  Evitar selectores con `>` o anidamiento profundo.
- **Comentarios**: bloques `/* ═══ ... ═══ */` para secciones grandes, `/* ... */` para
  notas puntuales explicando decisiones (no qué hace el código, sino **por qué**).
