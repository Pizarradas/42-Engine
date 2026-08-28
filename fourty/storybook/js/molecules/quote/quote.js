/* ════════════════════════════════════════════════════════════════════════
   molecules/quote/quote.js — Molecules / Quote
   Casuística REAL de scss/fourties/molecules/quote/_quote.scss (.ft-mol-quote*).
   Markup tomado de fourty/molecules/molecule-quote.html. Cero invención de API.

   Cita destacada (<blockquote>) con comilla decorativa (:before) y autor. El offset
   horizontal lo aporta el helper global .ft-helper-spacer-hoffset-[xs|sm|md|lg|xlg],
   que tira la cita a la izquierda para alinear la comilla con el texto del artículo.

   Estructura: una story plana interactiva "Base" (controls: variante · hoffset · texto ·
   autor · cargo) + un subgrupo "Markup" cargado async desde quote.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _quote.scss + helper hoffset ▼ */
    const DATA = {
        // .ft-mol-quote--[variante]
        variants: [
            ["", "destacada (defecto · fondo gris)"],
            ["basic", "básica (--basic · borde sup/inf, sin comilla)"]
        ],
        // helper global de offset horizontal (.ft-helper-spacer-hoffset-*) — base/helpers/_spacers.scss
        hoffsets: [
            ["", "sin offset"],
            ["ft-helper-spacer-hoffset-xs", "xs (−1rem ≥768px)"],
            ["ft-helper-spacer-hoffset-sm", "sm (−3rem ≥768px)"],
            ["ft-helper-spacer-hoffset-md", "md (−5rem ≥768px)"],
            ["ft-helper-spacer-hoffset-lg", "lg (−7rem ≥768px)"],
            ["ft-helper-spacer-hoffset-xlg", "xlg (−9rem ≥768px)"]
        ]
    };

    /* ─── BASE — .ft-mol-quote ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de la cita (.ft-mol-quote--basic).", options: DATA.variants },
        { key: "hoffset", control: "select", desc: "Offset horizontal (helper .ft-helper-spacer-hoffset-*).", options: DATA.hoffsets },
        { key: "text", control: "text", desc: "Texto de la cita (.ft-mol-quote__text)." },
        { key: "name", control: "text", desc: "Nombre del autor (.ft-mol-quote__author--name)." },
        { key: "status", control: "text", desc: "Cargo / estatus del autor (.ft-mol-quote__author--status)." }
    ];
    const baseArgs = {
        variant: "",
        hoffset: "",
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        name: "Lorem ipsum",
        status: "Director de Lorem ipsum"
    };

    function live(a) {
        const cls = ["ft-mol-quote"];
        if (a.variant === "basic") cls.push("ft-mol-quote--basic");
        if (a.hoffset) cls.push(a.hoffset);
        return '<blockquote class="' + cls.join(" ") + '">' +
            '<h3 class="ft-mol-quote__text">' + esc(a.text) + "</h3>" +
            '<div class="ft-mol-quote__author">' +
                '<p class="ft-mol-quote__author--name">' + esc(a.name) + "</p>" +
                '<p class="ft-mol-quote__author--status"> — ' + esc(a.status) + "</p>" +
            "</div>" +
        "</blockquote>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Quote</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-quote</code>): cita destacada en <code>&lt;blockquote&gt;</code> con comilla decorativa y atribución de autor.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/quote.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>assets/img/icons/bloquote_*.svg</code></td><td>Icono comilla (por marca)</td><td>Variante destacada (<code>:before</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. La comilla decorativa es un <code>:before</code> con un SVG distinto por marca (<code>bloquote_black</code>, <code>bloquote_sport</code>, <code>bloquote_ep</code>…). La variante <code>--basic</code> no la dibuja.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>fondo gris claro, comilla decorativa arriba-izquierda</td></tr>
                <tr><td><code>--basic</code></td><td>fondo transparente, borde sup/inf, centrada, sin comilla</td></tr>
            </tbody>
        </table>

        <h2>Helper de offset</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto (≥768px)</th></tr></thead>
            <tbody>
                <tr><td><code>.ft-helper-spacer-hoffset-xs</code></td><td>margin-left −1rem</td></tr>
                <tr><td><code>.ft-helper-spacer-hoffset-sm</code></td><td>margin-left −3rem</td></tr>
                <tr><td><code>.ft-helper-spacer-hoffset-md</code></td><td>margin-left −5rem</td></tr>
                <tr><td><code>.ft-helper-spacer-hoffset-lg</code></td><td>margin-left −7rem</td></tr>
                <tr><td><code>.ft-helper-spacer-hoffset-xlg</code></td><td>margin-left −9rem</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">El offset solo aplica en pantallas <code>≥768px</code>; tira la cita a la izquierda para alinear la comilla con el texto del artículo.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-quote</code> (<code>&lt;blockquote&gt;</code>)</td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-quote__text</code></td></tr>
                <tr><td>Autor</td><td><code>.ft-mol-quote__author</code></td></tr>
                <tr><td>Nombre</td><td><code>.ft-mol-quote__author--name</code></td></tr>
                <tr><td>Cargo</td><td><code>.ft-mol-quote__author--status</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th><th>Diferencias</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code></td><td><code>quote-ux.scss</code></td><td>comilla negra</td></tr>
                <tr><td><code>ep</code></td><td><code>quote-ep.scss</code></td><td>comilla El Periódico</td></tr>
                <tr><td><code>epe</code></td><td><code>quote-epe.scss</code></td><td>comilla El Periódico de España</td></tr>
                <tr><td><code>regionales</code></td><td><code>quote-regionales.scss</code></td><td>comilla negra</td></tr>
                <tr><td><code>revistas</code></td><td><code>quote-revistas.scss</code></td><td>centrada, itálica, comilla doble (apertura + cierre)</td></tr>
                <tr><td><code>sport</code></td><td><code>quote-sport.scss</code></td><td>comilla Sport</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong>: en <code>revistas</code> la cita cambia de forma (itálica, centrada, doble comilla).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/quote/_quote.scss</code> · markup: <code>fourty/molecules/molecule-quote.html</code></p>
    </div>`;

    const Q = {
        id: "quote",
        name: "Quote",
        group: "Molecules",
        overview,
        stories: [
            // full: la cita ocupa el ancho (width:100%) y el offset/centrado dependen de él.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(Q);

    /* Markup original (HTML plano editable por el front) en quote.html → subgrupo "Markup". */
    window.SB.loadMarkup(Q, document.currentScript && document.currentScript.src, { full: true });
})();
