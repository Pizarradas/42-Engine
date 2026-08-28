/* ════════════════════════════════════════════════════════════════════════
   molecules/promoHeader/promoHeader.js — Molecules / Promo Header
   Casuística REAL de scss/fourties/molecules/promoHeader/_promoHeader.scss
   (.ft-mol-promoHeader*). Markup tomado de fourty/molecules/molecule-promoHeader.html.
   Cero invención de API.

   Cinta promocional alineada a la derecha que se incrusta en la cabecera (texto +
   badge + imagen + enlace). Se ve sobre un fondo de color → el render la envuelve en
   un .ft-helper-bgColor-primary para que el texto blanco sea legible (harness).

   Estructura: una story plana interactiva "Base" (controls: texto · destacado · badge ·
   enlace) + un subgrupo "Markup" cargado async desde promoHeader.html, que incluye la
   variante posicional --sticky.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Imagen real del showroom: SVG externo de piano (puede no cargar sin red). Verbatim. */
    const PICTURE =
        '<picture>' +
            '<source media="(min-width: 768px)" srcset="https://estaticos-cdn.epe.es/epe/piano/promoHeader-Web.svg">' +
            '<source media="(min-width: 250px)" srcset="https://estaticos-cdn.epe.es/epe/piano/promoHeader-Mobile.svg" size="(min-width: 250px) 30px">' +
            '<img src="https://estaticos-cdn.epe.es/epe/piano/promoHeader-Web.svg" class="ft-helper-img-rd" loading="lazy" alt="alt text" title="title text">' +
        '</picture>';

    /* ─── BASE — .ft-mol-promoHeader ─── */
    const baseArgTypes = [
        { key: "text", control: "text", desc: "Mensaje promocional (.ft-mol-promoHeader__text)." },
        { key: "highlight", control: "text", desc: "Fragmento en negrita dentro del texto (.ft-helper-fontWeight-700)." },
        { key: "badge", control: "text", desc: "Etiqueta destacada (.ft-mol-promoHeader__promo)." },
        { key: "linkLabel", control: "text", desc: "Texto del enlace .ft-link--block." }
    ];
    const baseArgs = {
        text: "Suscríbete a un precio único para siempre",
        highlight: "50% dto.",
        badge: "BLACK FRIDAY",
        linkLabel: "Más información"
    };

    const promoHeader = (a, mods) => {
        const cls = ["ft-mol-promoHeader"].concat(mods || []);
        return '<div class="' + cls.join(" ") + '">' +
            '<p class="ft-mol-promoHeader__text ft-helper-fontSize-body-M ft-helper-fontColor-white">' + esc(a.text) +
                ' <span class="ft-helper-fontWeight-700">' + esc(a.highlight) + "</span></p>" +
            '<div class="ft-mol-promoHeader__promo ft-helper-bgColor-black"><span class="ft-helper-fontWeight-700 ft-helper-fontSize-body-M">' + esc(a.badge) + "</span></div>" +
            PICTURE +
            '<a href="#" class="ft-link ft-link--block" title="link title" target="_self">' + esc(a.linkLabel) + "</a>" +
        "</div>";
    };

    function live(a) {
        // Harness: fondo primario para que el texto blanco de la cinta sea legible.
        return '<div class="ft-helper-bgColor-primary">' + promoHeader(a) + "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Promo Header</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-promoHeader</code>): cinta promocional alineada a la derecha que se incrusta en la cabecera (texto + badge + imagen + enlace).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/promoHeader.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/link.css</code></td><td>CSS del átomo del enlace</td><td>Siempre (contiene <code>.ft-link</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El texto es blanco: se diseña <strong>sobre un fondo de color</strong> (en el showroom, una franja <code>.ft-helper-bgColor-primary</code>; el legacy Ep/EPE usa <code>.grid-promo</code>). La imagen es un SVG externo de piano que puede no cargar sin red.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>cinta alineada a la derecha (<code>justify-content:flex-end</code>)</td></tr>
                <tr><td><code>--sticky</code></td><td>fondo blanco + triángulo (<code>:before</code>) bajo 768px — ver <strong>Markup</strong></td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-promoHeader</code></td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-promoHeader__text</code></td></tr>
                <tr><td>Badge</td><td><code>.ft-mol-promoHeader__promo</code></td></tr>
                <tr><td>Imagen</td><td><code>&lt;picture&gt;</code> &gt; <code>.ft-helper-img-rd</code></td></tr>
                <tr><td>Enlace</td><td><code>.ft-link.ft-link--block</code> (átomo Link)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code></td><td><code>promoHeader-ux.scss</code></td></tr>
                <tr><td><code>ep</code></td><td><code>promoHeader-ep.scss</code></td></tr>
                <tr><td><code>epe</code></td><td><code>promoHeader-epe.scss</code></td></tr>
                <tr><td><code>regionales</code></td><td><code>promoHeader-regionales.scss</code></td></tr>
                <tr><td><code>revistas</code></td><td><code>promoHeader-revistas.scss</code></td></tr>
                <tr><td><code>sport</code></td><td><code>promoHeader-sport.scss</code></td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong> para ver cada variante.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/promoHeader/_promoHeader.scss</code> · markup: <code>fourty/molecules/molecule-promoHeader.html</code></p>
    </div>`;

    const PH = {
        id: "promoheader",
        name: "Promo Header",
        group: "Molecules",
        overview,
        stories: [
            // full: la cinta se alinea a la derecha (justify-content) → necesita ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(PH);

    /* Markup original (HTML plano editable por el front) en promoHeader.html → subgrupo "Markup". */
    window.SB.loadMarkup(PH, document.currentScript && document.currentScript.src, { full: true });
})();
