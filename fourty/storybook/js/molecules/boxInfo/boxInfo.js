/* ════════════════════════════════════════════════════════════════════════
   molecules/boxInfo/boxInfo.js — Molecules / Box Info
   Casuística REAL de scss/fourties/molecules/boxInfo/_boxInfo.scss (.ft-mol-boxInfo*).
   Markup tomado de fourty/molecules/molecule-boxInfo.html. Cero invención de API.

   Caja informativa con barra superior decorativa (::before), imagen opcional, texto
   y CTA. Varios acabados: centrado, texto enriquecido, erratum, "en medio", inline.
   Una story plana interactiva "Base" (variante · imagen · texto · botón) + subgrupo
   "Markup" async con las variantes estructurales (--ranking, --score, --between…).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const IMG = "/cds-statics/assets/img/templates/ft-mol-boxinfo70x95.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _boxInfo.scss ▼ */
    const DATA = {
        // variantes "aditivas" que comparten la estructura img + __content + .ft-btn
        variants: [
            ["", "base (borde + barra ::before)"],
            ["ft-mol-boxInfo--Aligncenter", "--Aligncenter · centrado en columna"],
            ["ft-mol-boxInfo--richtext", "--richtext · fondo gris, varios párrafos"],
            ["ft-mol-boxInfo--erratum", "--erratum · fondo gris, sin barra"],
            ["ft-mol-boxInfo--inline", "--inline · compacto en una fila"]
        ],
        // variantes con estructura propia (en Markup)
        structural: [
            ["--between", "aviso destacado con __head/__title (pico inferior)"],
            ["--ranking(+Primary…Quaternary)", "categoría con __header/__headerHasimage"],
            ["--score", "ranking con __image/__number/__subtitle"]
        ],
        parts: ["__content", "__head", "__title", "__header", "__subtitle", "__image", "__number"]
    };

    /* ─── BASE — .ft-mol-boxInfo ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Acabado de la caja (modificadores aditivos).", options: DATA.variants },
        { key: "image", control: "boolean", desc: "Muestra la imagen lateral (.ft-img)." },
        { key: "text", control: "text", desc: "Texto principal (.ft-text)." },
        { key: "btnLabel", control: "text", desc: "Texto del CTA (.ft-btn)." }
    ];
    const baseArgs = {
        variant: "", image: true,
        text: "Certificado autorresponsable de movilidad COVID de la ciudad de Vigo en PDF lorem ipsum dolorem est",
        btnLabel: "Ver PDF"
    };

    function live(a) {
        const cls = ["ft-mol-boxInfo"];
        if (a.variant) cls.push(a.variant);
        const img = a.image
            ? `<div class="ft-img"><img src="${IMG}" width="70" height="95" loading="lazy" class="ft-helper-img-rd" alt="alt text" title="title text"></div>`
            : "";
        return `<div class="${cls.join(" ")}">
    ${img}
    <div class="ft-mol-boxInfo__content">
        <p class="ft-text">${esc(a.text)}</p>
        <a href="#" class="ft-btn ft-btn--secondary ft-btn--sm" title="title text" target="_self">${esc(a.btnLabel)}</a>
    </div>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Box Info</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-boxInfo</code>): caja informativa con borde, barra decorativa superior (<code>::before</code>), imagen opcional, texto y CTA. Tiene varios acabados temáticos (centrado, texto enriquecido, erratum, aviso, categoría, ranking, inline).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/boxInfo.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-text</code> · <code>.ft-img</code> · <code>.ft-btn</code></td><td>CSS de átomos que compone</td><td>Según contenido</td></tr>
                <tr><td><code>scss/fourties/molecules/boxInfo/_boxInfo.scss</code> + <code>boxInfo-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>borde + barra superior, imagen a la izquierda, texto + CTA</td></tr>
                <tr><td><code>--Aligncenter</code></td><td>columna centrada</td></tr>
                <tr><td><code>--richtext</code></td><td>fondo gris claro, varios párrafos</td></tr>
                <tr><td><code>--erratum</code></td><td>fondo gris, borde superior, sin barra</td></tr>
                <tr><td><code>--inline</code></td><td>compacto: texto y CTA en una fila</td></tr>
                <tr><td><code>--between</code></td><td>aviso destacado con <code>__head</code>/<code>__title</code> (pico inferior)</td></tr>
                <tr><td><code>--ranking</code> (+<code>Primary…Quaternary</code>)</td><td>categoría con <code>__header</code> e imagen</td></tr>
                <tr><td><code>--score</code></td><td>ranking con <code>__image</code>/<code>__number</code>/<code>__subtitle</code></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-boxInfo</code></td></tr>
                <tr><td>Imagen</td><td><code>.ft-img</code> (átomo Img)</td></tr>
                <tr><td>Contenido</td><td><code>.ft-mol-boxInfo__content</code> (texto + CTA)</td></tr>
                <tr><td>Listas</td><td><code>ul</code>/<code>ol</code> con bullets/marker del DS</td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Las variantes con estructura propia (<strong>--between</strong>, <strong>--ranking</strong>, <strong>--score</strong>) se documentan en el subgrupo <strong>Markup</strong>; los controls de la story Base cubren los acabados aditivos sobre la estructura imagen + texto + CTA.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/boxInfo/_boxInfo.scss</code> · markup: <code>fourty/molecules/molecule-boxInfo.html</code></p>
    </div>`;

    const BI = {
        id: "boxinfo",
        name: "Box Info",
        group: "Molecules",
        overview,
        stories: [
            // full: la caja es de ancho completo; en ≥768px pasa a fila (img + contenido)
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(BI);

    /* Markup original (HTML plano editable por el front) en boxInfo.html → subgrupo "Markup". */
    window.SB.loadMarkup(BI, document.currentScript && document.currentScript.src, { full: true });
})();
