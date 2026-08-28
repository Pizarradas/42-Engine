/* ════════════════════════════════════════════════════════════════════════
   atoms/scrollbar/scrollbar.js — Atoms / Scrollbar
   Casuística REAL de scss/fourties/atoms/scrollbar/_scrollbar.scss
   (selector [data-scrollbar] + clases .scrollbar-track / .scrollbar-thumb).
   Markup tomado de fourty/atoms/atom-scrollbar.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DEPENDE DE LIBRERÍA: el skin custom (.scrollbar-track/.scrollbar-thumb)║
   ║  lo genera la librería smooth-scrollbar; el SCSS solo lo TEMATIZA.      ║
   ╚══════════════════════════════════════════════════════════════════════╝

   El átomo es el atributo [data-scrollbar] sobre un contenedor con overflow.
   La librería smooth-scrollbar (cds-statics/js/scroll/smooth-scrollbar/*.js)
   inyecta los nodos .scrollbar-track-y/-x y .scrollbar-thumb-y/-x, que el SCSS
   estiliza (carril fino, thumb con degradado). El storybook es zero-toolchain
   y NO carga esa librería: aquí se muestra el contenedor [data-scrollbar] con
   scroll HORIZONTAL nativo (overflow-x:auto del SCSS) y se documenta que el
   skin custom requiere la librería. No se falsea el markup del thumb.
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const frameworkBlock = window.SB.helpers.frameworkBlock;
    const { spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _scrollbar.scss  ▼▼▼
       Clases que genera la librería y que el SCSS tematiza.
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        parts: [
            ["[data-scrollbar]", "Contenedor scrollable (overflow-x:auto · overflow-y:hidden)"],
            [".scrollbar-track-y", "Carril vertical (6px)"],
            [".scrollbar-track-x", "Carril horizontal (6px, línea lightGrey)"],
            [".scrollbar-thumb-y", "Thumb vertical (degradado #555→#222, cuadrado)"],
            [".scrollbar-thumb-x", "Thumb horizontal (mediumGrey, redondeado)"]
        ]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    // Contenido más ancho que el contenedor → scroll horizontal nativo.
    const chips = Array.from({ length: 12 }, (_, i) =>
        `<div style="flex:0 0 auto;width:140px;height:90px;display:flex;align-items:center;justify-content:center;background:var(--color-primary,#111);color:var(--color-white,#fff);border-radius:6px;font:700 1.1rem/1 'Inter',sans-serif;">#${i + 1}</div>`
    ).join("");
    const scrollbarBox = () =>
        `<div data-scrollbar data-scrollbar-axis="x" data-scrollbar-wheel-to-x="true" role="scrollbar" aria-label="Barra de desplazamiento horizontal" tabindex="0" style="max-width:100%;padding:1rem 0;border:1px solid var(--color-lightGrey,#e0e0e0);border-radius:6px;">
            <div style="display:flex;gap:1rem;padding:0 1rem;width:max-content;">${chips}</div>
        </div>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — [data-scrollbar] (scroll horizontal nativo en este POC)
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [];
    const baseArgs = {};
    function liveBase() {
        const note = `<p style="margin:0 0 12px;font:400 11.5px/1.45 'Inter',sans-serif;color:#a8071a;max-width:60ch;">Skin custom desactivado: el storybook no carga la librería <code>smooth-scrollbar</code>. Se muestra el contenedor <code>[data-scrollbar]</code> con scroll <strong>horizontal nativo</strong>. Con la librería, el carril fino y el thumb con degradado del SCSS se aplican sobre los nodos <code>.scrollbar-track/.scrollbar-thumb</code> que ella inyecta.</p>`;
        return note + scrollbarBox();
    }

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Scrollbar</h1>
        <p class="cb-docs__lead">Átomo de <strong>barra de desplazamiento personalizada</strong>: el atributo <code>[data-scrollbar]</code> sobre un contenedor con overflow. El skin (carril + thumb) lo genera la librería <strong>smooth-scrollbar</strong> y el SCSS lo tematiza.</p>

        <div class="cb-callout cb-callout--warn">Requiere JavaScript de la librería <code>smooth-scrollbar</code> (<code>cds-statics/js/scroll/smooth-scrollbar/smooth-scrollbar-library.js</code> + <code>smooth-scrollbar-functions.js</code>), que inyecta los nodos <code>.scrollbar-track</code>/<code>.scrollbar-thumb</code>. El storybook es <strong>zero-toolchain</strong> y no la carga: el preview muestra <code>[data-scrollbar]</code> con scroll horizontal nativo.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/scrollbar.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/scrollbar/_scrollbar.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                    <tr><td><code>smooth-scrollbar-library.js</code> + <code>-functions.js</code></td><td><strong>JavaScript (obligatorio para el skin)</strong></td><td>Siempre que se quiera el thumb/carril custom</td></tr>
                </tbody>
            </table>
        </div>
        ${frameworkBlock({
            intro: `La libreria de scrollbar debe inicializarse solo en cliente y solo cuando el contenedor ya tenga un tamano util; el framework deberia seguir siendo duenio del contenido interno, no del DOM que inyecta el vendor.`,
            rows: [
                ["Inicializacion", `Usa <code>onMounted()</code> + <code>nextTick()</code> para montar la instancia cuando el contenedor ya mida bien.`, `Usa <code>useLayoutEffect()</code> o <code>useEffect()</code> sobre un <code>ref</code> cuando el contenedor ya tenga tamano estable.`],
                ["Instancia", `Guarda la instancia en un <code>ref</code> y llama a <code>update()</code> cuando cambie el contenido o el viewport.`, `Guarda la instancia en un <code>ref</code> y llama a <code>update()</code> cuando cambie el contenido o el viewport.`],
                ["Cleanup", `Destruye la instancia en <code>onBeforeUnmount()</code> para retirar listeners y nodos auxiliares.`, `Destruye la instancia en el cleanup del efecto para retirar listeners y nodos auxiliares.`]
            ],
            note: `Si la vista es SSR, mobile o de baja complejidad, prioriza scroll nativo: la mejora visual rara vez compensa el coste de hidratar un vendor extra.`
        })}

        <h2>Anatomía · clases de la librería</h2>
        <table class="cb-table">
            <thead><tr><th>Selector</th><th>Rol</th></tr></thead>
            <tbody>
                ${DATA.parts.map(p => `<tr><td><code>${p[0]}</code></td><td>${p[1]}</td></tr>`).join("")}
            </tbody>
        </table>

        <h2>Atributos del contenedor</h2>
        <table class="cb-table">
            <thead><tr><th>Atributo</th><th>Uso</th></tr></thead>
            <tbody>
                <tr><td><code>data-scrollbar</code></td><td>Activa la librería sobre el contenedor</td></tr>
                <tr><td><code>data-scrollbar-axis="x"</code></td><td>Eje principal del scroll</td></tr>
                <tr><td><code>data-scrollbar-wheel-to-x="true"</code></td><td>Rueda del ratón → scroll horizontal</td></tr>
                <tr><td><code>role="scrollbar"</code> · <code>aria-label</code></td><td>Semántica accesible</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/scrollbar/_scrollbar.scss</code> · markup: <code>fourty/atoms/atom-scrollbar.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const SCROLLBAR = {
        id: "scrollbar",
        name: "Scrollbar",
        group: "Atoms",
        signals: ["js"],
        overview,
        stories: [
            { id: "base", name: "Base", hint: "[data-scrollbar]", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ]
    };
    window.SB.register(SCROLLBAR);
    window.SB.loadMarkup(SCROLLBAR, document.currentScript && document.currentScript.src, { full: true });
})();
