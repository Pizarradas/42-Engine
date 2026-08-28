/* ════════════════════════════════════════════════════════════════════════
   molecules/tagsNews/tagsNews.js — Molecules / Tags News
   Casuística REAL de scss/fourties/molecules/tagsNews/_tagsNews.scss
   (.ft-mol-tagsNews*). Markup tomado de fourty/molecules/molecule-tagsNews.html.
   Cero invención de API.

   Fila de temas relacionados: un título (__title) + una lista con scroll horizontal
   (__tags) de etiquetas .ft-tag enlazadas. Modificador --last (sin borde, tags más
   compactos). Solo CSS — compone el átomo .ft-tag.

   Estructura: una story plana interactiva "Base" (controls: variante · título · nº de
   etiquetas · texto) + subgrupo "Markup" async desde tagsNews.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _tagsNews.scss ▼ */
    const DATA = {
        variants: [
            ["", "base (con borde sup/inf)"],
            ["ft-mol-tagsNews--last", "última (--last, sin borde)"]
        ],
        // etiquetas de ejemplo (cuando count > las disponibles, ciclan)
        labels: ["Política", "Economía", "Deportes", "Cultura", "Sociedad", "Internacional"]
    };

    /* ─── BASE — .ft-mol-tagsNews ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de la fila (.ft-mol-tagsNews--last).", options: DATA.variants },
        { key: "title", control: "text", desc: "Título de la fila (.ft-mol-tagsNews__title)." },
        { key: "count", control: "number", desc: "Número de etiquetas (rango 1-12; con scroll-x).", min: 1, max: 12 },
        { key: "label", control: "text", desc: "Texto de cada etiqueta (vacío = etiquetas de ejemplo)." }
    ];
    const baseArgs = { variant: "", title: "Temas", count: "4", label: "" };

    const tag = (text) =>
        '<li class="ft-tag ft-tag--sm ft-tag--linkBasis">' +
            '<a href="#" class="ft-link ft-link--secondary" title="' + esc(text) + '"><span class="ft-tag__name">' + esc(text) + "</span></a>" +
        "</li>";

    function live(a) {
        const cls = ["ft-mol-tagsNews"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(1, Math.min(12, parseInt(a.count, 10) || 1));
        let tags = "";
        for (let i = 0; i < n; i++) {
            const text = a.label || DATA.labels[i % DATA.labels.length];
            tags += tag(text);
        }
        return '<div class="' + cls.join(" ") + '">' +
            '<h3 class="ft-mol-tagsNews__title">' + esc(a.title) + "</h3>" +
            '<ul class="ft-mol-tagsNews__tags">' + tags + "</ul>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Tags News</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-tagsNews</code>): fila de temas relacionados — un título y una lista de etiquetas con scroll horizontal.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/tagsNews.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/tag.css</code> + <code>link.css</code></td><td>CSS de los átomos que compone</td><td>Siempre (contiene <code>.ft-tag</code> y <code>.ft-link</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: la lista <code>__tags</code> tiene scroll horizontal cuando no caben las etiquetas. Compone el átomo <code>.ft-tag--linkBasis</code>.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>borde superior e inferior, etiquetas en mayúsculas</td></tr>
                <tr><td><code>--last</code></td><td>sin borde, título más pequeño, etiquetas más compactas</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-tagsNews</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-tagsNews__title</code></td></tr>
                <tr><td>Lista</td><td><code>.ft-mol-tagsNews__tags</code> (scroll-x)</td></tr>
                <tr><td>Etiqueta</td><td><code>.ft-tag.ft-tag--sm.ft-tag--linkBasis</code> &gt; <code>.ft-link</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>tagsNews-[marca].scss</code>); en <code>revistas</code> cambia tipografía. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/tagsNews/_tagsNews.scss</code> · markup: <code>fourty/molecules/molecule-tagsNews.html</code></p>
    </div>`;

    const TN = {
        id: "tagsnews",
        name: "Tags News",
        group: "Molecules",
        overview,
        stories: [
            // full: la fila reparte título + lista con scroll a lo ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(TN);

    /* Markup original (HTML plano editable por el front) en tagsNews.html → subgrupo "Markup". */
    window.SB.loadMarkup(TN, document.currentScript && document.currentScript.src, { full: true });
})();
