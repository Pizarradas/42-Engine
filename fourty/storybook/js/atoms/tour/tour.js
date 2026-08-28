/* ════════════════════════════════════════════════════════════════════════
   atoms/tour/tour.js — Atoms / Tour
   Casuística REAL de scss/fourties/atoms/tour/_tour.scss (.ft-tour*).
   Markup tomado de fourty/atoms/atom-tour.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  JS-DRIVEN: .ft-tour marca contenido con data-tour-*; el JS construye  ║
   ║  el overlay (__dark, fixed fullscreen) y la tarjeta __message.         ║
   ╚══════════════════════════════════════════════════════════════════════╝

   El átomo .ft-tour es un MARCADOR sobre elementos con atributos data-tour-*
   (order, title, text…). El JavaScript del tour lee esos datos y genera el
   overlay oscuro (.ft-tour__dark, position:fixed a pantalla completa) y la
   tarjeta de mensaje (.ft-tour__message con --title/--text, triángulo y favicon
   de marca). Aquí se documenta la TARJETA (la pieza visible que estiliza el
   SCSS), forzada a visible; el overlay fijo NO se renderiza (taparía el iframe).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _tour.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Posición del pico de la tarjeta (triángulo): arriba (default) o abajo.
        positions: [["", "Top (pico arriba)"], ["bottom", "Bottom (pico abajo)"]]
    };
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    // El __message es position:absolute + opacity:0 por defecto (lo revela el JS);
    // para documentarlo se fuerza visible/relative con estilo inline en el demo.
    const message = (bottom, title, text) =>
        `<div class="ft-tour${bottom ? " ft-tour--bottom" : ""}" style="position:relative;display:inline-block;">
            <div class="ft-tour__message" style="position:relative;opacity:1;display:inline-block;">
                <h3 class="ft-tour__message--title">${esc(title)}</h3>
                <p class="ft-tour__message--text">${esc(text)}</p>
            </div>
        </div>`;

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-tour__message (tarjeta del tour)
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "bottom", control: "boolean", desc: "Pico de la tarjeta abajo (.ft-tour--bottom). Por defecto arriba." },
        { key: "title", control: "text", desc: "Título de la tarjeta (.ft-tour__message--title)." },
        { key: "text", control: "text", desc: "Texto de la tarjeta (.ft-tour__message--text)." }
    ];
    const baseArgs = {
        bottom: false,
        title: "¡Bienvenido!",
        text: "Desde hoy, la sección Economía se transforma. Te lo contamos en unos pasos."
    };
    function liveBase(a) {
        const note = `<p style="margin:0 0 12px;font:400 11.5px/1.45 'Inter',sans-serif;color:#6b6b6b;max-width:60ch;">El tour real lo construye el JS: <code>.ft-tour</code> marca contenido con <code>data-tour-*</code> y se generan el overlay oscuro (pantalla completa) y esta tarjeta. Aquí solo la tarjeta, forzada visible. El favicon de la esquina depende de la marca y se sirve desde <code>/cds-statics/…</code>.</p>`;
        return note + message(a.bottom, a.title, a.text);
    }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — posición del pico
       ══════════════════════════════════════════════════════════════════════ */
    const galleryPositions = () =>
        DATA.positions.map(p => spec(p[1], message(p[0] === "bottom", "Paso del tour", "Mensaje de ayuda contextual."))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Tour</h1>
        <p class="cb-docs__lead">Átomo de <strong>onboarding / tour guiado</strong> (<code>.ft-tour</code>): marca elementos con atributos <code>data-tour-*</code>; el JS genera un overlay oscuro a pantalla completa y una tarjeta de mensaje paso a paso.</p>

        <div class="cb-callout cb-callout--warn">Es <strong>JS-driven</strong>: <code>.ft-tour</code> es solo un marcador sobre el contenido (<code>data-tour-order</code>, <code>data-tour-title</code>, <code>data-tour-text</code>…). El overlay (<code>.ft-tour__dark</code>, <code>position:fixed</code> a pantalla completa) y la tarjeta (<code>.ft-tour__message</code>) los construye el script. Aquí se documenta solo la tarjeta, forzada visible.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/tour.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/tour/_tour.scss</code> + <code>tour-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>JS del tour</td><td><strong>JavaScript (obligatorio)</strong></td><td>Lee <code>data-tour-*</code> y construye overlay + tarjeta</td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">El favicon de la esquina de la tarjeta (<code>__message:after</code>) es el logo de la marca (SVG en <code>/cds-statics/…/logos/</code>) → cambia con el Brand y requiere servidor. El triángulo y la tarjeta son CSS.</div>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Marcador</td><td><code>.ft-tour</code> (sobre el contenido, con <code>data-tour-*</code>)</td></tr>
                <tr><td>Overlay</td><td><code>.ft-tour__dark</code> (fixed, generado por JS)</td></tr>
                <tr><td>Tarjeta</td><td><code>.ft-tour__message</code></td></tr>
                <tr><td>Título / texto</td><td><code>.ft-tour__message--title</code> · <code>--text</code></td></tr>
                <tr><td>Posición pico</td><td><code>.ft-tour--bottom</code> (default arriba)</td></tr>
                <tr><td>Cierre</td><td><code>.ft-btn-nav--close</code> dentro de la tarjeta</td></tr>
            </tbody>
        </table>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/tour/_tour.scss</code> · markup: <code>fourty/atoms/atom-tour.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const TOUR = {
        id: "tour",
        name: "Tour",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-tour__message", kind: "interactive", full: true,
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "positions", name: "Posición del pico", hint: "top · bottom", kind: "gallery", full: true, render: galleryPositions }
              ]
            }
        ]
    };
    window.SB.register(TOUR);
    window.SB.loadMarkup(TOUR, document.currentScript && document.currentScript.src, { full: true });
})();
