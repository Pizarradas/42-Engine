/* ════════════════════════════════════════════════════════════════════════
   molecules/rankingNews/rankingNews.js — Molecules / Ranking News
   Casuística REAL de scss/fourties/molecules/rankingNews/_rankingNews.scss
   (.ft-mol-rankingNews*). Markup tomado de fourty/molecules/molecule-rankingNews.html.
   Cero invención de API.

   Listado numerado de noticias (<ol class="ft-list ft-list--numbered">), cada ítem con
   un epígrafe/sección (__title), un titular (__text) y, opcionalmente, una marca de
   suscriptor (__premium con badge P+). Modificadores --XL (marcador grande) y --2column.

   Estructura: una story plana interactiva "Base" (controls: variante · premium · nº de
   ítems · sección · titular) + subgrupo "Markup" async desde rankingNews.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Badge P+ "PARA SUSCRIPTORES" — SVG verbatim de molecule-rankingNews.html (.ft-helper-img-rd). */
    const PBADGE = '<svg class="ft-helper-img-rd" width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="37" height="36" fill="#DD2C39"></rect><path d="M23.9002 20.4C21.8002 22 19.0002 22.7999 15.5002 22.7999H13.6002V31.7999H5.2002V4.19995H15.7002C19.1002 4.19995 21.8002 4.99995 23.9002 6.49995C26.0002 7.99995 27.0002 10.3 27.0002 13.3C27.1002 16.4 26.0002 18.8 23.9002 20.4Z" fill="white"></path><path d="M32.7999 24.5H28.6999V20.3H25.4999V24.5H21.3999V27.7001H25.4999V31.8H28.6999V27.7001H32.7999V24.5Z" fill="white"></path></svg>';

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _rankingNews.scss ▼ */
    const DATA = {
        // .ft-mol-rankingNews--[variante]
        variants: [
            ["", "lista (defecto)"],
            ["ft-mol-rankingNews--XL", "XL · marcador grande"],
            ["ft-mol-rankingNews--2column", "2column · dos columnas ≥768px"]
        ],
        // secciones de ejemplo que cicla cada ítem (__title)
        sections: ["TRIBUNALES", "POLÍTICA", "ECONOMÍA", "DEPORTES", "CULTURA"]
    };

    /* ─── BASE — .ft-mol-rankingNews ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del ranking (.ft-mol-rankingNews--XL / --2column).", options: DATA.variants },
        { key: "premium", control: "boolean", desc: "El primer ítem muestra la marca de suscriptor (.ft-mol-rankingNews__premium con badge P+)." },
        { key: "count", control: "number", desc: "Número de noticias del ranking (rango 1-10).", min: 1, max: 10 },
        { key: "section", control: "text", desc: "Sección de cada ítem (.ft-mol-rankingNews__title)." },
        { key: "headline", control: "text", desc: "Titular de cada noticia (.ft-mol-rankingNews__text)." }
    ];
    const baseArgs = {
        variant: "",
        premium: false,
        count: "3",
        section: "TRIBUNALES",
        headline: "Novedades en el juicio contra Rocío Carrasco: se aplaza, por poco tiempo"
    };

    const link = (mod, content) => '<a href="#" title="titulo" class="ft-link ft-link--secondary ' + mod + '">' + content + "</a>";

    function item(a, i, premium) {
        let head;
        if (premium) {
            // __premium: badge P+ + leyenda (sin .ft-link, como en el showroom)
            head = '<a href="#" title="titulo" class="ft-mol-rankingNews__premium">' + PBADGE + "PARA SUSCRIPTORES</a>";
        } else {
            // __title: sección (cicla si count > secciones disponibles)
            const section = a.section || DATA.sections[i % DATA.sections.length];
            head = link("ft-mol-rankingNews__title", esc(section));
        }
        return '<li class="ft-list__item">' + head + link("ft-mol-rankingNews__text", esc(a.headline)) + "</li>";
    }

    function live(a) {
        const cls = ["ft-mol-rankingNews"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(1, Math.min(10, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 0; i < n; i++) items.push(item(a, i, a.premium && i === 0));
        return '<div class="' + cls.join(" ") + '"><ol class="ft-list ft-list--numbered">' + items.join("") + "</ol></div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Ranking News</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-rankingNews</code>): listado numerado de noticias con epígrafe, titular y marca opcional de suscriptor.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/rankingNews.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/list.css</code> + <code>link.css</code></td><td>CSS de los átomos que compone</td><td>Siempre (contiene <code>.ft-list--numbered</code> y <code>.ft-link</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: usa el átomo <code>.ft-list--numbered</code> (numeración nativa via <code>list-style:auto</code> + <code>::marker</code> coloreado) con separadores entre ítems.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>lista numerada, marcador 2rem en color primario</td></tr>
                <tr><td><code>--XL</code></td><td>marcador 4rem; imágenes a 16/9 (<code>.ft-helper-img-rd</code>)</td></tr>
                <tr><td><code>--2column</code></td><td>rejilla de 2 columnas en <code>≥768px</code></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-rankingNews</code></td></tr>
                <tr><td>Lista</td><td><code>.ft-list.ft-list--numbered</code> &gt; <code>.ft-list__item</code></td></tr>
                <tr><td>Sección</td><td><code>.ft-mol-rankingNews__title</code></td></tr>
                <tr><td>Titular</td><td><code>.ft-mol-rankingNews__text</code></td></tr>
                <tr><td>Dato</td><td><code>.ft-mol-rankingNews__data</code> (fecha/etiqueta, opcional)</td></tr>
                <tr><td>Suscriptor</td><td><code>.ft-mol-rankingNews__premium</code> (badge P+)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th><th>Diferencias</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code> · <code>ep</code> · <code>epe</code> · <code>regionales</code> · <code>sport</code></td><td><code>rankingNews-[marca].scss</code></td><td>marcador en color primario de la marca</td></tr>
                <tr><td><code>revistas</code></td><td><code>rankingNews-revistas.scss</code></td><td>marcador y datos en negro, tipografía primaria</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong> para ver cada variante.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/rankingNews/_rankingNews.scss</code> · markup: <code>fourty/molecules/molecule-rankingNews.html</code></p>
    </div>`;

    const RN = {
        id: "rankingnews",
        name: "Ranking News",
        group: "Molecules",
        overview,
        stories: [
            // full: el bloque centra a max-width 93% y --2column reparte en rejilla → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(RN);

    /* Markup original (HTML plano editable por el front) en rankingNews.html → subgrupo "Markup". */
    window.SB.loadMarkup(RN, document.currentScript && document.currentScript.src, { full: true });
})();
