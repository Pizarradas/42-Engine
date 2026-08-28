/* ════════════════════════════════════════════════════════════════════════
   molecules/masonry/masonry.js — Molecules / Masonry
   Casuística REAL de scss/fourties/molecules/masonry/_masonry.scss (.ft-mol-masonry*).
   Markup tomado de fourty/molecules/molecule-masonry.html. Cero invención de API.

   Ítem de cuadrícula irregular (noticia con media): imagen + contenido (antetítulo,
   título, texto). Modificadores de tipo de media (--has-photo/--has-video/--has-audio,
   que pintan un icono overlay sobre la imagen vía SVG en el CSS) y de layout (Is-lft/
   Is-rgt/Is-btm). Solo CSS. Una story plana interactiva "Base" + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "https://estaticos-cdn.prensaiberica.es/clip/c1c91040-9844-47c9-9bab-d7c93f1c1d8f_16-9-aspect-ratio_25p_0.jpg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _masonry.scss ▼ */
    const DATA = {
        media: [
            ["", "(sin icono)"],
            ["ft-mol-masonry--has-photo", "--has-photo · icono cámara"],
            ["ft-mol-masonry--has-video", "--has-video · icono play"],
            ["ft-mol-masonry--has-audio", "--has-audio · icono micro"]
        ],
        layouts: [
            ["", "(defecto · imagen arriba)"],
            ["ft-mol-masonryIs-lft", "Is-lft · imagen a la izquierda"],
            ["ft-mol-masonryIs-rgt", "Is-rgt · imagen a la derecha"],
            ["ft-mol-masonryIs-btm", "Is-btm · imagen abajo"]
        ],
        parts: ["__picture", "__icon", "__previous", "__content", "__contentTitle", "__contentText"]
    };

    /* ─── BASE — .ft-mol-masonry ─── */
    const baseArgTypes = [
        { key: "media", control: "select", desc: "Tipo de media (icono overlay sobre la imagen).", options: DATA.media },
        { key: "layout", control: "select", desc: "Disposición de imagen y contenido.", options: DATA.layouts },
        { key: "previous", control: "text", desc: "Antetítulo (__previous)." },
        { key: "title", control: "text", desc: "Titular (__contentTitle)." },
        { key: "text", control: "text", desc: "Entradilla (__contentText)." }
    ];
    const baseArgs = {
        media: "", layout: "",
        previous: "Lorem ipsum dolor est",
        title: "¿Cuántos partidos ha jugado Busquets con el Barça?",
        text: "Lorem ipsum dolor sit amet consecteur"
    };

    function live(a) {
        const cls = ["ft-mol-masonry"];
        if (a.media) cls.push(a.media);
        if (a.layout) cls.push(a.layout);
        const icon = a.media ? `<span class="ft-mol-masonry__icon"></span>` : "";
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-masonry__picture">
        <a href="#" title="titulo">
            <picture>
                <source media="(min-width: 768px)" srcset="${IMG}">
                <img src="${IMG}" loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text" width="420" height="215">
            </picture>
        </a>
        ${icon}
    </div>
    <div class="ft-mol-masonry__content">
        <a href="#" class="ft-mol-masonry__previous" title="title text" target="_self">${esc(a.previous)}</a>
        <h2 class="ft-mol-masonry__contentTitle"><a href="#" title="titulo" class="ft-link ft-link--secondary">${esc(a.title)}</a></h2>
        <p class="ft-mol-masonry__contentText">${esc(a.text)}</p>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Masonry</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-masonry</code>): ítem de cuadrícula irregular — imagen + contenido (antetítulo, titular, entradilla). Marca el tipo de contenido (foto/vídeo/audio) con un icono sobre la imagen y admite cuatro disposiciones.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/masonry.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-link</code></td><td>CSS del átomo Link</td><td>Siempre (el titular)</td></tr>
                <tr><td><code>scss/fourties/molecules/masonry/_masonry.scss</code> + <code>masonry-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (los iconos de media son SVG embebidos en el CSS)</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El icono de media (<code>__icon</code>) se pinta con un SVG <code>data:</code> en el CSS según el modificador del padre (<code>--has-photo</code>/<code>--has-video</code>/<code>--has-audio</code>); en el markup basta con el <code>&lt;span class="ft-mol-masonry__icon"&gt;</code> vacío.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--has-photo</code> · <code>--has-video</code> · <code>--has-audio</code></td><td>icono overlay sobre la imagen</td></tr>
                <tr><td><code>Is-lft</code> · <code>Is-rgt</code></td><td>imagen a un lado (50%), contenido al otro</td></tr>
                <tr><td><code>Is-btm</code></td><td>imagen debajo del contenido</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-masonry</code></td></tr>
                <tr><td>Imagen</td><td><code>__picture</code> (+ <code>__icon</code> overlay)</td></tr>
                <tr><td>Contenido</td><td><code>__content</code> &gt; <code>__previous</code> + <code>__contentTitle</code> + <code>__contentText</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/masonry/_masonry.scss</code> · markup: <code>fourty/molecules/molecule-masonry.html</code></p>
    </div>`;

    const MS = {
        id: "masonry",
        name: "Masonry",
        group: "Molecules",
        overview,
        stories: [
            // full: las disposiciones Is-lft/Is-rgt reparten al 50%; necesitan ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MS);

    /* Markup original (HTML plano editable por el front) en masonry.html → subgrupo "Markup". */
    window.SB.loadMarkup(MS, document.currentScript && document.currentScript.src, { full: true });
})();
