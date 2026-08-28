/* ════════════════════════════════════════════════════════════════════════
   molecules/sticky-panel/sticky-panel.js — Molecules / Sticky Panel
   Casuística REAL de scss/fourties/molecules/sticky-panel/_sticky-panel.scss
   (.ft-mol-sticky-panel*). Markup tomado de fourty/molecules/molecule-sticky-panel.html.
   Cero invención de API.

   Panel anclado al borde de la pantalla (position:fixed) que entra/sale con animación.
   Nace oculto (visibility:hidden; opacity:0) y un JS consumidor le añade --open para
   mostrarlo. En el storybook se renderiza CON --open para que sea visible; el cierre
   (botón) es inerte aquí. Modificadores de posición --top/--bttm y tamaño --short.

   Estructura: una story plana interactiva "Base" (controls: posición · corto · mensaje) +
   subgrupo "Markup" async desde sticky-panel.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _sticky-panel.scss ▼ */
    const DATA = {
        positions: [
            ["ft-mol-sticky-panel--top", "Superior (--top)"],
            ["ft-mol-sticky-panel--bttm", "Inferior (--bttm)"]
        ]
    };

    /* ─── BASE — .ft-mol-sticky-panel ─── */
    const baseArgTypes = [
        { key: "position", control: "select", desc: "Borde de anclaje (.ft-mol-sticky-panel--top / --bttm).", options: DATA.positions },
        { key: "short", control: "boolean", desc: "Versión estrecha (.ft-mol-sticky-panel--short, máx-width reducido)." },
        { key: "message", control: "text", desc: "Mensaje principal (.ft-mol-sticky-panel__message)." },
        { key: "body", control: "text", desc: "Texto del cuerpo (.ft-mol-sticky-panel__body)." }
    ];
    const baseArgs = {
        position: "ft-mol-sticky-panel--top",
        short: false,
        message: "Panel sticky superior",
        body: "Este es un ejemplo de panel sticky que se ancla en el borde de la pantalla."
    };

    function live(a) {
        // --open: requerido para que el panel sea visible (en producción lo añade el JS consumidor).
        const cls = ["ft-mol-sticky-panel", "ft-mol-sticky-panel--open"];
        if (a.position) cls.push(a.position);
        if (a.short) cls.push("ft-mol-sticky-panel--short");
        return '<div class="' + cls.join(" ") + '" data-sticky-panel="true">' +
            '<div class="ft-mol-sticky-panel__container">' +
                '<div class="ft-mol-sticky-panel__header">' +
                    '<p class="ft-mol-sticky-panel__message">' + esc(a.message) + "</p>" +
                "</div>" +
                '<div class="ft-mol-sticky-panel__body">' +
                    '<p class="ft-helper-fontSize-body-M">' + esc(a.body) + "</p>" +
                "</div>" +
                '<div class="ft-mol-sticky-panel__footer">' +
                    '<div class="ft-mol-sticky-panel__actions">' +
                        '<button class="ft-btn ft-btn--primary ft-btn--sm" title="Cerrar panel" type="button">Cerrar</button>' +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Sticky Panel</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-sticky-panel</code>): panel anclado al borde de la pantalla (<code>position:fixed</code>) que entra y sale con animación.</p>

        <div class="cb-callout"><strong>Visibilidad por JS.</strong> Nace oculto (<code>visibility:hidden; opacity:0</code>); un controlador del proyecto consumidor le añade <code>--open</code> para mostrarlo. Aquí se renderiza ya <strong>con <code>--open</code></strong> y el botón de cierre es inerte. Al ser <code>position:fixed</code>, se ancla al borde del lienzo.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/sticky-panel.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS del botón de cierre</td><td>Siempre (contiene <code>.ft-btn</code>)</td></tr>
                <tr><td>JavaScript del consumidor</td><td>Toggle de <code>--open</code></td><td>Siempre (abre/cierra el panel)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--open</code></td><td>panel visible (anima la entrada según posición)</td></tr>
                <tr><td><code>--top</code></td><td>anclado arriba (entra desde arriba)</td></tr>
                <tr><td><code>--bttm</code></td><td>anclado abajo (entra desde abajo)</td></tr>
                <tr><td><code>--short</code></td><td>ancho máximo reducido en escritorio</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-sticky-panel</code></td></tr>
                <tr><td>Contenedor</td><td><code>.ft-mol-sticky-panel__container</code></td></tr>
                <tr><td>Cabecera</td><td><code>__header</code> &gt; <code>__message</code></td></tr>
                <tr><td>Cuerpo</td><td><code>.ft-mol-sticky-panel__body</code> (puede llevar <code>__chips-list</code>)</td></tr>
                <tr><td>Pie</td><td><code>__footer</code> &gt; <code>__actions</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>sticky-panel-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/sticky-panel/_sticky-panel.scss</code> · markup: <code>fourty/molecules/molecule-sticky-panel.html</code></p>
    </div>`;

    const SP = {
        id: "sticky-panel",
        name: "Sticky Panel",
        group: "Molecules",
        overview,
        stories: [
            // full: el panel se ancla a lo ancho del lienzo (max-width centrado).
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(SP);

    /* Markup original (HTML plano editable por el front) en sticky-panel.html → subgrupo "Markup". */
    window.SB.loadMarkup(SP, document.currentScript && document.currentScript.src, { full: true });
})();
