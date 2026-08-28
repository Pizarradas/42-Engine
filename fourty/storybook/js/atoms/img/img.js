/* ════════════════════════════════════════════════════════════════════════
   atoms/img/img.js — Atoms / Img
   Casuística REAL de scss/fourties/atoms/img/_img.scss (clases .ft-img*).
   Markup tomado de fourty/atoms/atom-img.html. Cero invención de API.

   ╔══════════════════════════════════════════════════════════════════════╗
   ║  DATA-DRIVEN: la casuística vive en el objeto DATA (SSOT).             ║
   ╚══════════════════════════════════════════════════════════════════════╝

   .ft-img es el <figure> contenedor de imágenes responsive: envuelve un
   <picture> (con sus <source>) y un <figcaption> opcional. La imagen suele
   llevar el helper .ft-helper-img-rd (width:100%). Único modificador: --mw
   (max-width: centra el <picture> y limita la imagen a su tamaño natural).
   CONVENCIÓN: la pieza fundamental se llama siempre "Base".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc, spec } = window.SB.helpers;

    /* ══════════════════════════════════════════════════════════════════════
       ▼▼▼  SINGLE SOURCE OF TRUTH — reflejan 1:1 _img.scss  ▼▼▼
       ══════════════════════════════════════════════════════════════════════ */
    const DATA = {
        // Único modificador real del SCSS.
        variants: [["", "Base (ancho completo)"], ["mw", "Max-width (--mw)"]]
    };
    // Imagen de muestra (CDN del DS, carga por https).
    const SRC = "https://estaticos-cdn.prensaiberica.es/clip/7a2874d8-365c-49a2-9dad-b5c2f92bd5d6_16-9-discover-aspect-ratio_default_0.jpg";
    /* ▲▲▲  fin SINGLE SOURCE OF TRUTH  ▲▲▲ */

    /* ─── Constructor del markup ─── */
    const imgEl = (mw, a) => {
        const cls = ["ft-img"];
        if (mw) cls.push("ft-img--mw");
        const imgClass = a.rounded ? ' class="ft-helper-img-rd"' : "";
        const cap = a.caption
            ? `<figcaption><p class="ft-helper-fontColor-quaternary ft-helper-fontSize-body-S ft-helper-spacer-t-xxs">${esc(a.caption)}</p></figcaption>`
            : "";
        const figure = `<figure class="${cls.join(" ")}"><picture><img src="${SRC}" alt="" width="1200" height="675" loading="lazy"${imgClass}></picture>${cap}</figure>`;
        // Harness: la imagen se ACOTA a un ancho realista para no llenar el canvas.
        return `<div style="max-width:480px;width:100%;">${figure}</div>`;
    };

    /* ══════════════════════════════════════════════════════════════════════
       BASE — .ft-img. Cada eje = un operador en Controls.
       ══════════════════════════════════════════════════════════════════════ */
    const baseArgTypes = [
        { key: "mw", control: "boolean", desc: "Max-width (.ft-img--mw): centra el picture y limita la imagen a su tamaño natural." },
        { key: "rounded", control: "boolean", desc: "Imagen con .ft-helper-img-rd (width:100% + bordes redondeados del helper)." },
        { key: "caption", control: "text", desc: "Pie de foto (<figcaption>). Vacío = sin pie." }
    ];
    const baseArgs = { mw: false, rounded: true, caption: "Pie de foto opcional" };
    function liveBase(a) { return imgEl(a.mw, a); }

    /* ══════════════════════════════════════════════════════════════════════
       GALERÍA — variantes
       ══════════════════════════════════════════════════════════════════════ */
    const galleryVariants = () =>
        DATA.variants.map(v => spec(v[1], imgEl(v[0] === "mw", { rounded: true, caption: "Pie de foto" }))).join("");

    /* ══════════════════════════════════════════════════════════════════════
       OVERVIEW
       ══════════════════════════════════════════════════════════════════════ */
    const overview = `<div class="cb-docs__inner">
        <h1>Img</h1>
        <p class="cb-docs__lead">Átomo contenedor de imagen (<code>.ft-img</code>): un <code>&lt;figure&gt;</code> que envuelve un <code>&lt;picture&gt;</code> responsive (con sus <code>&lt;source&gt;</code>) y un <code>&lt;figcaption&gt;</code> opcional. Único modificador: <code>--mw</code> (max-width centrado).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
            <table class="cb-table">
                <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
                <tbody>
                    <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                    <tr><td><code>brands/[marca]/atoms/img.css</code></td><td>CSS compilado del átomo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                    <tr><td><code>scss/fourties/atoms/img/_img.scss</code> + <code>img-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                    <tr><td>—</td><td>JavaScript</td><td>No necesita JS · responsive nativo de <code>&lt;picture&gt;</code></td></tr>
                </tbody>
            </table>
        </div>
        <div class="cb-callout">El responsive lo resuelve <code>&lt;picture&gt;</code> con varios <code>&lt;source media&gt;</code>. El helper <code>.ft-helper-img-rd</code> (width:100%) hace que la imagen ocupe el ancho del contenedor; con <code>--mw</code> la imagen no se estira más allá de su tamaño natural y se centra.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>Imagen a ancho completo del contenedor</td></tr>
                <tr><td><code>--mw</code></td><td>Picture centrado (flex) · figcaption centrado · imagen <code>max-width:100%</code> (no se estira)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía · BEM</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase / tag</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-img</code> (sobre <code>&lt;figure&gt;</code>)</td></tr>
                <tr><td>Imagen</td><td><code>&lt;picture&gt;</code> + <code>&lt;img class="ft-helper-img-rd"&gt;</code></td></tr>
                <tr><td>Pie</td><td><code>&lt;figcaption&gt;</code></td></tr>
                <tr><td>Modificador</td><td><code>--mw</code></td></tr>
            </tbody>
        </table>

        <h2>Accesibilidad</h2>
        <div class="cb-callout">La <code>&lt;img&gt;</code> siempre con <code>alt</code> descriptivo (vacío <code>alt=""</code> solo si es decorativa) y <code>width</code>/<code>height</code> para reservar espacio y evitar saltos de layout (CLS).</div>

        <p class="cb-src">Fuente: <code>scss/fourties/atoms/img/_img.scss</code> · markup: <code>fourty/atoms/atom-img.html</code></p>
    </div>`;

    /* ─── Registro ─── */
    const IMG = {
        id: "img",
        name: "Img",
        group: "Atoms",
        overview,
        stories: [
            { id: "base", name: "Base", hint: ".ft-img", kind: "interactive",
              argTypes: baseArgTypes, args: baseArgs, render: liveBase }
        ],
        subgroups: [
            { id: "galleries", name: "Galleries", collapsed: true,
              stories: [
                  { id: "variants", name: "Variantes", hint: "base · --mw", kind: "gallery", render: galleryVariants }
              ]
            }
        ]
    };
    window.SB.register(IMG);
    window.SB.loadMarkup(IMG, document.currentScript && document.currentScript.src);
})();
