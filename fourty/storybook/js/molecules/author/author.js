/* ════════════════════════════════════════════════════════════════════════
   molecules/author/author.js — Molecules / Author
   Casuística REAL de scss/fourties/molecules/author/_author.scss (.ft-mol-author*).
   Markup tomado de fourty/molecules/molecule-author.html. Cero invención de API.

   Ficha de autor (foto circular + nombre + cita) en dos orientaciones (vertical /
   horizontal) con varios acabados (premium, destacado, bordeado, redondeado). Una
   story plana interactiva "Base" (orientación · premium · destacado · borde · radio ·
   textos) + subgrupo "Markup" async con las combinaciones reales del showroom.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Foto real del showroom (carga remota; resuelta vía <base> del iframe). */
    const PHOTO = "https://estaticos-cdn.prensaiberica.es/clip/3a6f5b08-e602-4c48-92c8-4e7127decc37_source-aspect-ratio_default_0.jpeg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _author.scss ▼ */
    const DATA = {
        orient: [
            ["ft-mol-author--is-vertical", "vertical (centrado)"],
            ["ft-mol-author--is-horizontal", "horizontal (foto a la izquierda)"]
        ],
        borders: [
            ["", "sin borde"],
            ["ft-mol-author--is-bordered ft-mol-author--is-bordered-y", "-y · borde arriba/abajo"],
            ["ft-mol-author--is-bordered ft-mol-author--is-bordered-all", "-all · borde completo"]
        ],
        mods: [
            ["--premium", "marca de suscripción (logo +) antes de la cita"],
            ["--is-highlighted", "fondo gris claro + decoración inferior (≥1024px)"],
            ["--is-rounded", "esquinas redondeadas"]
        ],
        parts: ["__previous", "__subcategory", "__photo", "__name", "__quote"]
    };

    /* ─── BASE — .ft-mol-author ─── */
    const baseArgTypes = [
        { key: "orient", control: "radio", desc: "Orientación de la ficha.", options: DATA.orient },
        { key: "premium", control: "boolean", desc: "Modificador --premium (marca de suscripción)." },
        { key: "highlighted", control: "boolean", desc: "Modificador --is-highlighted (fondo destacado)." },
        { key: "border", control: "select", desc: "Borde (--is-bordered-y / --is-bordered-all).", options: DATA.borders },
        { key: "rounded", control: "boolean", desc: "Modificador --is-rounded (esquinas redondeadas)." },
        { key: "name", control: "text", desc: "Nombre del autor (__name)." },
        { key: "quote", control: "text", desc: "Cita destacada (__quote)." }
    ];
    const baseArgs = {
        orient: "ft-mol-author--is-vertical", premium: false, highlighted: false,
        border: "", rounded: false,
        name: "Francisco de Sert, conde de Sert",
        quote: "“Lorem ipsum dolor sit amet, consectetur adipiscing elit.”"
    };

    function live(a) {
        const cls = ["ft-mol-author", a.orient];
        if (a.premium) cls.push("ft-mol-author--premium");
        if (a.highlighted) cls.push("ft-mol-author--is-highlighted");
        if (a.border) cls.push(a.border);
        if (a.rounded) cls.push("ft-mol-author--is-rounded");
        return `<div class="${cls.join(" ")}">
    <a href="#" class="ft-mol-author__previous" title="title text">
        Lorem ipsum
        <span class="ft-mol-author__subcategory">Subategory</span>
    </a>
    <a href="#" title="title" target="_self">
        <img src="${PHOTO}" width="60" height="60" class="ft-helper-img-rd ft-mol-author__photo" alt="alt text" title="title text">
    </a>
    <a href="#" class="ft-helper-fontColor-primary ft-mol-author__name" target="_self">${esc(a.name)}</a>
    <h3 class="ft-mol-author__quote">
        <a href="#" title="title text" target="_self">${esc(a.quote)}</a>
    </h3>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Author</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-author</code>): ficha breve de autor con foto circular (en B/N que vira a color al hover), nombre y cita destacada. Pensada para firmas dentro de noticias.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/author.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/author/_author.scss</code> + <code>author-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. La foto se dessatura por defecto (<code>grayscale</code>) y recupera el color al <code>:hover</code>/<code>:focus-within</code> de la ficha. La marca <code>--premium</code> y la decoración <code>--is-highlighted</code> usan assets/iconos por marca.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--is-vertical</code></td><td>layout centrado en columna</td></tr>
                <tr><td><code>--is-horizontal</code></td><td>foto absoluta a la izquierda, texto a la derecha</td></tr>
                <tr><td><code>--premium</code></td><td>marca de suscripción (logo +) delante de la cita</td></tr>
                <tr><td><code>--is-highlighted</code></td><td>fondo gris claro + decoración inferior (≥1024px)</td></tr>
                <tr><td><code>--is-bordered</code> · <code>--is-bordered-y</code> · <code>--is-bordered-all</code></td><td>borde (lados; arriba/abajo; completo)</td></tr>
                <tr><td><code>--is-rounded</code></td><td>esquinas redondeadas</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-author</code></td></tr>
                <tr><td>Antetítulo</td><td><code>.ft-mol-author__previous</code> + <code>__subcategory</code></td></tr>
                <tr><td>Foto</td><td><code>.ft-mol-author__photo</code> (con <code>.ft-helper-img-rd</code>)</td></tr>
                <tr><td>Nombre</td><td><code>.ft-mol-author__name</code></td></tr>
                <tr><td>Cita</td><td><code>.ft-mol-author__quote</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">No confundir con <strong>Authors</strong> (<code>.ft-mol-authors</code>), la ficha de perfil ampliada (bio, RRSS, tags). Esta es la firma compacta.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/author/_author.scss</code> · markup: <code>fourty/molecules/molecule-author.html</code></p>
    </div>`;

    const AU = {
        id: "author",
        name: "Author",
        group: "Molecules",
        overview,
        stories: [
            // full: en horizontal la foto es absoluta y el padding lateral necesita ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AU);

    /* Markup original (HTML plano editable por el front) en author.html → subgrupo "Markup". */
    window.SB.loadMarkup(AU, document.currentScript && document.currentScript.src, { full: true });
})();
