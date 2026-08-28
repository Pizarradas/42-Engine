/* ════════════════════════════════════════════════════════════════════════
   organisms/author/author.js — Organisms / Author
   Casuística REAL de scss/fourties/organism/author/_author.scss (.ft-org-author).
   Markup tomado de fourty/organisms/organism-author.html. Cero invención de API.

   Organismo que distribuye fichas de firma .ft-mol-author en una rejilla
   (.ft-layout-grid-flex__nested). Modificadores de organismo --has-highlighted (una ficha
   destacada) y --is-scrollable (carrusel horizontal con .ft-helper-scroll). Compone la
   molécula author (la réplica, no la importa). id ÚNICO "author-org" (colisiona con la
   molécula author). Solo CSS.

   Story "Base" interactiva (variante de organismo · layout de ficha · nº de fichas ·
   destacar la 1ª) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Foto real del DS (.ft-mol-author__photo). El <base> del iframe la sirve. */
    const PHOTO = "https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _author.scss ▼ */
    const DATA = {
        // .ft-org-author--[variante]
        roots: [
            ["", "lista (defecto)"],
            ["ft-org-author--has-highlighted", "con destacado (--has-highlighted)"],
            ["ft-org-author--has-highlighted ft-org-author--is-scrollable ft-helper-scroll", "scrollable (--is-scrollable)"]
        ],
        // .ft-mol-author--[layout]
        layouts: [
            ["ft-mol-author--is-horizontal", "horizontal"],
            ["ft-mol-author--is-vertical", "vertical"]
        ],
        names: ["Francisco de Sert, conde de Sert", "Albert Sáez", "Lucía Romero", "Marc Vidal"],
        quotes: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.",
            "Estudiar historia en tiempo de inteligencia artificial.",
            "La fuerte identidad del audiovisual surcoreano.",
            "Novedades en el análisis de la jornada electoral."
        ]
    };

    /* Constructor de la ficha .ft-mol-author (réplica del markup del showroom). */
    function authorCard(layout, highlighted, name, quote) {
        const cls = ["ft-mol-author", layout];
        if (highlighted) cls.push("ft-mol-author--is-highlighted");
        return '<div class="ft-layout-grid-flex__colXs-12 ft-layout-grid-flex__colMd-4">' +
            '<div class="' + cls.join(" ") + '">' +
                '<a href="#" class="ft-mol-author__previous" title="title text">Lorem ipsum<span class="ft-mol-author__subcategory">Subcategory</span></a>' +
                '<a href="#" title="title" target="_self"><img src="' + PHOTO + '" width="60" height="60" class="ft-helper-img-rd ft-mol-author__photo" alt="' + esc(name) + '" title="' + esc(name) + '"></a>' +
                '<a href="#" class="ft-helper-fontColor-primary ft-mol-author__name" target="_self">' + esc(name) + "</a>" +
                '<h3 class="ft-mol-author__quote"><a href="#" title="title text" target="_self">&ldquo;' + esc(quote) + '&rdquo;</a></h3>' +
            "</div>" +
        "</div>";
    }

    const baseArgTypes = [
        { key: "root", control: "select", desc: "Variante del organismo (.ft-org-author--has-highlighted / --is-scrollable).", options: DATA.roots },
        { key: "layout", control: "select", desc: "Disposición de cada ficha (.ft-mol-author--is-horizontal / --is-vertical).", options: DATA.layouts },
        { key: "count", control: "number", desc: "Número de fichas (rango 1-12; ciclan los datos).", min: 1, max: 12 },
        { key: "firstHighlighted", control: "boolean", desc: "Destacar la primera ficha (.ft-mol-author--is-highlighted)." }
    ];
    const baseArgs = { root: "", layout: "ft-mol-author--is-horizontal", count: "3", firstHighlighted: true };

    function live(a) {
        const cls = ["ft-org-author"];
        if (a.root) cls.push(a.root);
        const n = Math.max(1, Math.min(12, parseInt(a.count, 10) || 1));
        let cards = "";
        for (let i = 0; i < n; i++) {
            const highlighted = i === 0 && a.firstHighlighted;
            // La ficha destacada se muestra vertical (como en el showroom).
            const layout = highlighted ? "ft-mol-author--is-vertical" : a.layout;
            cards += authorCard(layout, highlighted, DATA.names[i % DATA.names.length], DATA.quotes[i % DATA.quotes.length]);
        }
        return '<div class="' + cls.join(" ") + '"><div class="ft-layout-grid-flex__nested">' + cards + "</div></div>";
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Author</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-author</code>): distribuye fichas de firma <code>.ft-mol-author</code> en una rejilla, con destacado opcional y modo scrollable.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/author.css</code></td><td>CSS del organismo (rejilla + overrides)</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>molecules/author.css</code></td><td>CSS de la molécula interna</td><td>Siempre (contiene <code>.ft-mol-author</code>)</td></tr>
                <tr><td>Fotos (img)</td><td>Avatares de los autores</td><td>Las aporta el consumidor</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: el organismo reparte las fichas con <code>.ft-layout-grid-flex__nested</code> y, en <code>--is-scrollable</code>, las pone en carrusel horizontal (<code>.ft-helper-scroll</code>).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>rejilla de fichas en columnas</td></tr>
                <tr><td><code>--has-highlighted</code></td><td>contempla una ficha destacada (<code>.ft-mol-author--is-highlighted</code>)</td></tr>
                <tr><td><code>--is-scrollable</code> (+ <code>.ft-helper-scroll</code>)</td><td>carrusel horizontal con scroll</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-org-author</code></td></tr>
                <tr><td>Rejilla</td><td><code>.ft-layout-grid-flex__nested</code> &gt; <code>__colMd-4</code></td></tr>
                <tr><td>Ficha</td><td><code>.ft-mol-author</code> (<code>--is-vertical</code>/<code>--is-horizontal</code>/<code>--is-highlighted</code>/<code>--premium</code>)</td></tr>
                <tr><td>Piezas</td><td><code>__previous</code> · <code>__photo</code> · <code>__name</code> · <code>__quote</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>author-[marca].scss</code>). Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/author/_author.scss</code> · markup: <code>fourty/organisms/organism-author.html</code></p>
    </div>`;

    const AU = {
        id: "author-org",
        name: "Author",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AU);
    window.SB.loadMarkup(AU, document.currentScript && document.currentScript.src, { full: true });
})();
