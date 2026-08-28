/* ════════════════════════════════════════════════════════════════════════
   molecules/related/related.js — Molecules / Related
   Casuística REAL de scss/fourties/molecules/related/_related.scss (.ft-mol-related*).
   Markup tomado de fourty/molecules/molecule-related.html. Cero invención de API.

   Bloque de noticias relacionadas: una cabecera (__header) + una lista de enlaces
   (__item). Variantes --Hasimage (con miniatura + __group), --opinion (firma + pares
   sección/titular) y --numbered (lista numerada con chevron). El offset horizontal lo aporta el helper global
   .ft-helper-spacer-hoffset-[xs|sm|md|lg|xlg].

   Estructura: una story plana interactiva "Base" (controls: variante · hoffset ·
   cabecera · nº de ítems · titular) + subgrupo "Markup" async desde related.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Miniatura real del showroom (--Hasimage). El <base> del iframe resuelve /cds-statics. */
    const IMG = "/cds-statics/assets/img/templates/mol-related.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _related.scss + helper hoffset ▼ */
    const DATA = {
        // .ft-mol-related--[variante]
        variants: [
            ["", "lista (defecto)"],
            ["Hasimage", "--Hasimage · con miniatura"],
            ["opinion", "--opinion · firma + pares sección/titular"],
            ["numbered", "--numbered · lista numerada"]
        ],
        // helper global de offset horizontal (.ft-helper-spacer-hoffset-*)
        hoffsets: [
            ["", "sin offset"],
            ["ft-helper-spacer-hoffset-xs", "xs (−1rem ≥768px)"],
            ["ft-helper-spacer-hoffset-sm", "sm (−3rem ≥768px)"],
            ["ft-helper-spacer-hoffset-md", "md (−5rem ≥768px)"],
            ["ft-helper-spacer-hoffset-lg", "lg (−7rem ≥768px)"],
            ["ft-helper-spacer-hoffset-xlg", "xlg (−9rem ≥768px)"]
        ],
        // epígrafes de sección que cicla la variante --opinion (__header)
        sections: ["INTELIGENCIA ARTIFICIAL", "EL TREN DE LA HISTORIA", "TRIBUNA", "OPINIÓN"]
    };

    /* ─── BASE — .ft-mol-related ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del bloque (.ft-mol-related--Hasimage / --opinion / --numbered).", options: DATA.variants },
        { key: "hoffset", control: "select", desc: "Offset horizontal (helper .ft-helper-spacer-hoffset-*).", options: DATA.hoffsets },
        { key: "header", control: "text", desc: "Cabecera del bloque (.ft-mol-related__header; en --opinion es el .__title de la firma)." },
        { key: "count", control: "number", desc: "Número de enlaces relacionados (rango 1-8).", min: 1, max: 8 },
        { key: "headline", control: "text", desc: "Titular de cada enlace (.ft-mol-related__item > .ft-link)." }
    ];
    const baseArgs = {
        variant: "",
        hoffset: "",
        header: "Noticias relacionadas",
        count: "2",
        headline: "Guerra Rusia - Ucrania hoy: Última hora de la invasión de Putin, en directo"
    };

    const linkItem = (tag, headline) =>
        "<" + tag + ' class="ft-mol-related__item"><a href="#" class="ft-link ft-helper-fontColor-black" title="title text" target="_self">' + esc(headline) + "</a></" + tag + ">";

    function rootClass(a) {
        const cls = ["ft-mol-related"];
        if (a.variant === "Hasimage") cls.push("ft-mol-related--Hasimage");
        if (a.variant === "opinion") cls.push("ft-mol-related--opinion");
        if (a.variant === "numbered") cls.push("ft-mol-related--numbered");
        if (a.hoffset) cls.push(a.hoffset);
        return cls.join(" ");
    }

    function live(a) {
        const n = Math.max(1, Math.min(8, parseInt(a.count, 10) || 1));

        // --opinion: firma (__title) + por cada ítem un par epígrafe(__header) + titular(__item h4)
        if (a.variant === "opinion") {
            let body = '<h3 class="ft-mol-related__title">' + esc(a.header) + "</h3>";
            for (let i = 0; i < n; i++) {
                body += '<p class="ft-mol-related__header">' + esc(DATA.sections[i % DATA.sections.length]) + "</p>";
                body += linkItem("h4", a.headline);
            }
            return '<div class="' + rootClass(a) + '">' + body + "</div>";
        }

        // --Hasimage: miniatura + __group(cabecera + ítems como <p>)
        if (a.variant === "Hasimage") {
            let items = "";
            for (let i = 0; i < n; i++) items += linkItem("p", a.headline);
            return '<div class="' + rootClass(a) + '">' +
                '<img src="' + IMG + '" width="160" height="90" loading="lazy" class="ft-mol-related__img" alt="alt text" title="title text">' +
                '<div class="ft-mol-related__group">' +
                    '<p class="ft-mol-related__header">' + esc(a.header) + "</p>" + items +
                "</div>" +
            "</div>";
        }

        // base: cabecera + <ul class="ft-list"> con ítems <li>
        let items = "";
        for (let i = 0; i < n; i++) items += linkItem("li", a.headline);
        return '<div class="' + rootClass(a) + '">' +
            '<p class="ft-mol-related__header">' + esc(a.header) + "</p>" +
            '<ul class="ft-list">' + items + "</ul>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Related</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-related</code>): bloque de noticias relacionadas con lista de enlaces y variantes con miniatura, opinión y lista numerada.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/related.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/link.css</code> + <code>list.css</code></td><td>CSS de los átomos que compone</td><td>Siempre (contiene <code>.ft-link</code> y <code>.ft-list</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. En <code>sport</code> la variante base lleva un borde degradado a la izquierda; en <code>revistas</code> los ítems usan viñetas con iconos por cabecera (woman/cuore/viajar/stilo).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>cabecera + lista de enlaces con separadores</td></tr>
                <tr><td><code>--Hasimage</code></td><td>miniatura (<code>__img</code>) + contenido en <code>__group</code>, caja con sombra</td></tr>
                <tr><td><code>--opinion</code></td><td>firma (<code>__title</code>) + pares epígrafe (<code>__header</code>) / titular en negrita</td></tr>
                <tr><td><code>--numbered</code></td><td>lista ordenada visualmente con contador decimal y chevron de salida por ítem</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-related</code></td></tr>
                <tr><td>Firma</td><td><code>.ft-mol-related__title</code> (solo <code>--opinion</code>)</td></tr>
                <tr><td>Cabecera/epígrafe</td><td><code>.ft-mol-related__header</code></td></tr>
                <tr><td>Ítem</td><td><code>.ft-mol-related__item</code> &gt; <code>.ft-link</code></td></tr>
                <tr><td>Miniatura</td><td><code>.ft-mol-related__img</code> (solo <code>--Hasimage</code>)</td></tr>
                <tr><td>Grupo</td><td><code>.ft-mol-related__group</code> (solo <code>--Hasimage</code>)</td></tr>
            </tbody>
        </table>

        <h2>Helper de offset</h2>
        <p>El componente acepta el helper global <code>.ft-helper-spacer-hoffset-[xs|sm|md|lg|xlg]</code> (margin-left negativo, solo <code>≥768px</code>) para alinear el bloque con el texto del artículo.</p>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th><th>Diferencias</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code> · <code>ep</code> · <code>epe</code> · <code>regionales</code></td><td><code>related-[marca].scss</code></td><td>color de cabecera/título de la marca</td></tr>
                <tr><td><code>sport</code></td><td><code>related-sport.scss</code></td><td>borde degradado izquierdo; <code>--Hasimage</code> en caja</td></tr>
                <tr><td><code>revistas</code></td><td><code>related-revistas.scss</code></td><td>viñetas con icono por cabecera, tipografía propia</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong> para ver cada variante.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/related/_related.scss</code> · markup: <code>fourty/molecules/molecule-related.html</code></p>
    </div>`;

    const R = {
        id: "related",
        name: "Related",
        group: "Molecules",
        overview,
        stories: [
            // full: el bloque es flex 1 1 100% y --Hasimage reparte miniatura/grupo → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(R);

    /* Markup original (HTML plano editable por el front) en related.html → subgrupo "Markup". */
    window.SB.loadMarkup(R, document.currentScript && document.currentScript.src, { full: true });
})();
