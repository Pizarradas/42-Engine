/* ════════════════════════════════════════════════════════════════════════
   molecules/modNews/modNews.js — Molecules / Mod News
   Casuística REAL de scss/fourties/molecules/modNews/_modNews.scss (.ft-mol-modNews*).
   Markup tomado de fourty/molecules/molecule-modNews.html. Cero invención de API.

   Módulo de recirculación de noticias: título de sección + lista de artículos
   (contenido con badge premium + titular + fecha, e imagen). Modificadores
   --recirculation, --last y --taboola (contenido patrocinado). Solo CSS. Una story
   plana interactiva "Base" (título · nº artículos · premium) + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const THUMB = "https://content-thumbnail.cxpublic.com/content/dominantthumbnail/3a8f7ef1dc3b13d620bf637d8a6ccc365948d0d2.jpg?645b6ad1";
    /* Badge premium (P+ rojo) real del showroom. */
    const SUBS = `<svg class="ft-helper-img-rd" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4C0 1.79086 1.79086 0 4 0H25.9998C28.2089 0 29.9998 1.79086 29.9998 4V25.9998C29.9998 28.2089 28.2089 29.9998 25.9998 29.9998H4C1.79086 29.9998 0 28.2089 0 25.9998V4Z" fill="#F53036" /><path d="M19.4341 17.4777C17.7907 18.7299 15.5995 19.3559 12.8605 19.3559H11.3736V26.3991H4.79993V4.79999H13.017C15.6778 4.79999 17.7907 5.42605 19.4341 6.59992C21.0775 7.77378 21.8601 9.57371 21.8601 11.9214C21.9384 14.3474 21.0775 16.2256 19.4341 17.4777Z" fill="white" /><path d="M26.4001 20.6857H23.1916V17.3989H20.6873V20.6857H17.4788V23.1899H20.6873V26.3985H23.1916V23.1899H26.4001V20.6857Z" fill="white" /></svg>`;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _modNews.scss ▼ */
    const DATA = {
        mods: [
            ["--recirculation", "recirculación: bordes finos, título en flex"],
            ["--last", "bloque final (imágenes 95px)"],
            ["--taboola", "contenido patrocinado (branded, columna en móvil)"]
        ],
        parts: ["__title", "__article", "__content", "__contentTitle", "__contentText", "__contentImage", "__contentImage--logo", "__data", "__data--primary", "__footer"]
    };

    const article = (a) => `<div class="ft-mol-modNews__article">
    <div class="ft-mol-modNews__content">
        ${a.premium ? `<p class="ft-mol-modNews__contentTitle">${SUBS}<a href="#" title="titulo" class="ft-link ft-link--primary">PARA SUSCRIPTORES</a></p>` : ""}
        <h3 class="ft-mol-modNews__contentText"><a href="#" title="titulo" class="ft-link ft-link--secondary">${esc(a.headline)}</a></h3>
        <time datetime="10/05/2023" class="ft-mol-modNews__data">10/05/2023</time>
    </div>
    <a href="#" title="titulo"><img loading="lazy" class="ft-mol-modNews__contentImage" alt="article" title="title text" width="640" height="360" src="${THUMB}"></a>
</div>`;

    /* ─── BASE — .ft-mol-modNews ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Título de la sección (__title)." },
        { key: "count", control: "number", desc: "Número de artículos (1–5).", min: 1, max: 5 },
        { key: "premium", control: "boolean", desc: "Marca los artículos como «PARA SUSCRIPTORES» (badge premium)." },
        { key: "headline", control: "text", desc: "Titular de los artículos (__contentText)." }
    ];
    const baseArgs = { title: "Contenido para ti", count: "2", premium: true, headline: "¿Cuántos partidos ha jugado Busquets con el Barça? ¿Quién le supera?" };

    function live(a) {
        const n = Math.max(1, Math.min(5, parseInt(a.count, 10) || 1));
        const arts = Array.from({ length: n }, () => article(a)).join("");
        return `<div class="ft-mol-modNews">
    <header class="ft-mol-modNews__title">${esc(a.title)}</header>
    ${arts}
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Mod News</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-modNews</code>): módulo de recirculación de noticias — título de sección y una lista de artículos (titular + fecha + miniatura, con badge premium opcional). Variantes para recirculación, bloque final y contenido patrocinado.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/modNews.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-link</code> · <code>.ft-mol-headband</code></td><td>CSS de piezas que compone</td><td>Enlaces y cintillos internos</td></tr>
                <tr><td><code>scss/fourties/molecules/modNews/_modNews.scss</code> + <code>amp-modNews.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (<code>--taboola</code> sí lo carga el proveedor)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>título con borde inferior de marca + artículos</td></tr>
                <tr><td><code>--recirculation</code></td><td>bordes finos, título en flex (recirculación interna)</td></tr>
                <tr><td><code>--last</code></td><td>bloque final con imágenes algo menores (95px)</td></tr>
                <tr><td><code>--taboola</code></td><td>contenido patrocinado (branded; columna en móvil)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-modNews</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-modNews__title</code></td></tr>
                <tr><td>Artículo</td><td><code>__article</code> &gt; <code>__content</code> + imagen</td></tr>
                <tr><td>Contenido</td><td><code>__contentTitle</code> (badge) · <code>__contentText</code> (titular) · <code>__data</code> (fecha)</td></tr>
                <tr><td>Imagen</td><td><code>__contentImage</code> (+ <code>--logo</code>)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/modNews/_modNews.scss</code> · markup: <code>fourty/molecules/molecule-modNews.html</code></p>
    </div>`;

    const MN = {
        id: "modnews",
        name: "Mod News",
        group: "Molecules",
        overview,
        stories: [
            // full: el artículo es width:100% con imagen a la derecha
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MN);

    /* Markup original (HTML plano editable por el front) en modNews.html → subgrupo "Markup". */
    window.SB.loadMarkup(MN, document.currentScript && document.currentScript.src, { full: true });
})();
