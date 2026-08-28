/* ════════════════════════════════════════════════════════════════════════
   molecules/ticker/ticker.js — Molecules / Ticker
   Casuística REAL de scss/fourties/molecules/ticker/_ticker.scss (.ft-mol-ticker*).
   Markup tomado de fourty/molecules/molecule-ticker.html. Cero invención de API.

   Cinta de última hora con desplazamiento automático (animación CSS "move", sin JS):
   un rótulo (__heading) + una pista (__scroll) con titulares enlazados (__item > __txt).
   Variantes de color --is-primary/--is-secondary/--is-tertiary y la familia --news.

   Estructura: una story plana interactiva "Base" (controls: variante · rótulo · nº de
   titulares · texto) + subgrupo "Markup" async desde ticker.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _ticker.scss ▼ */
    const DATA = {
        variants: [
            ["ft-mol-ticker--is-primary", "primary (--is-primary)"],
            ["ft-mol-ticker--is-secondary", "secondary (--is-secondary)"],
            ["ft-mol-ticker--is-tertiary", "tertiary (--is-tertiary)"],
            ["ft-mol-ticker--news", "Es Noticia (--news)"]
        ],
        // titulares de ejemplo (ciclan si count los supera)
        headlines: [
            "Avisos por vientos de hasta 100 km/h, vuelos y trenes cancelados e incidencias en toda España.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id nisi id ipsum lobortis pretium.",
            "Última hora de la jornada con todos los resultados y la clasificación actualizada.",
            "El pleno aprueba los presupuestos tras una larga sesión de debate."
        ]
    };

    /* ─── BASE — .ft-mol-ticker ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de la cinta (.ft-mol-ticker--is-primary/-secondary/-tertiary/--news).", options: DATA.variants },
        { key: "heading", control: "text", desc: "Rótulo de la cinta (.ft-mol-ticker__heading)." },
        { key: "count", control: "number", desc: "Número de titulares (rango 1-8; ciclan).", min: 1, max: 8 },
        { key: "text", control: "text", desc: "Texto de cada titular (vacío = titulares de ejemplo)." }
    ];
    const baseArgs = { variant: "ft-mol-ticker--is-primary", heading: "Última hora", count: "2", text: "" };

    const item = (text) =>
        '<a href="#" class="ft-mol-ticker__item" title="' + esc(text) + '" target="_self"><strong class="ft-mol-ticker__txt">' + esc(text) + "</strong></a>";

    function live(a) {
        const cls = ["ft-mol-ticker"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));
        let items = "";
        for (let i = 0; i < n; i++) {
            const text = a.text || DATA.headlines[i % DATA.headlines.length];
            items += item(text);
        }
        return '<div class="' + cls.join(" ") + '" role="region" aria-label="' + esc(a.heading) + '">' +
            '<span class="ft-mol-ticker__heading" id="tickerHeading">' + esc(a.heading) + "</span>" +
            '<div class="ft-mol-ticker__scroll" aria-labelledby="tickerHeading" aria-live="polite" aria-atomic="true">' + items + "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Ticker</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-ticker</code>): cinta de última hora con desplazamiento automático de titulares.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/ticker.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (el desplazamiento es animación CSS)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el desplazamiento es una animación (<code>@keyframes move</code>, ~15s) sobre <code>__scroll</code>; se pausa al hacer hover.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--is-primary</code></td><td>rótulo en color primario</td></tr>
                <tr><td><code>--is-secondary</code></td><td>rótulo en color secundario</td></tr>
                <tr><td><code>--is-tertiary</code></td><td>rótulo en color terciario</td></tr>
                <tr><td><code>--news</code></td><td>variante "Es Noticia" (estilo y separadores propios)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-ticker</code></td></tr>
                <tr><td>Rótulo</td><td><code>.ft-mol-ticker__heading</code></td></tr>
                <tr><td>Pista</td><td><code>.ft-mol-ticker__scroll</code> (animada)</td></tr>
                <tr><td>Titular</td><td><code>.ft-mol-ticker__item</code> &gt; <code>.ft-mol-ticker__txt</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>ticker-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/ticker/_ticker.scss</code> · markup: <code>fourty/molecules/molecule-ticker.html</code></p>
    </div>`;

    const TK = {
        id: "ticker",
        name: "Ticker",
        group: "Molecules",
        overview,
        stories: [
            // full: la cinta ocupa todo el ancho; el rótulo queda fijo y los titulares se desplazan.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TK);

    /* Markup original (HTML plano editable por el front) en ticker.html → subgrupo "Markup". */
    window.SB.loadMarkup(TK, document.currentScript && document.currentScript.src, { full: true });
})();
