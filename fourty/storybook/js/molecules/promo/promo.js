/* ════════════════════════════════════════════════════════════════════════
   molecules/promo/promo.js — Molecules / Promo
   Casuística REAL de scss/fourties/molecules/promo/_promo.scss (.ft-mol-promo*).
   Markup tomado de fourty/molecules/molecule-promo.html. Cero invención de API.

   Estructura: una story plana interactiva "Base" (controls: variante claro/oscuro ·
   pretítulo · título · texto · precio · nº de ítems · texto del botón) + un subgrupo
   "Markup" cargado async desde promo.html. Molécula contenedora: compone una imagen
   (.ft-helper-img-rd), texto y un átomo .ft-btn dentro de .ft-mol-btnGroup.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Imagen decorativa real del showroom (/cds-statics) — el <base> del iframe la resuelve. */
    const IMG = "/cds-statics/assets/img/decorative/ft-mol-promo.png";

    /* Icono de check del listado — verbatim de molecule-promo.html (.ft-mol-promo__icon). */
    const CHECK = '<svg class="ft-mol-promo__icon" width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6 10.2L3.8 8l-1.4 1.4L6 13 14 5l-1.4-1.4L6 10.2z" fill="currentColor"/></svg>';

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _promo.scss ▼ */
    const DATA = {
        // .ft-mol-promo--[variante]
        variants: [
            ["", "claro (defecto)"],
            ["dark", "oscuro (--dark · fondo secundario, texto blanco)"]
        ],
        // ítems del listado (.ft-mol-promo__list > __item) — textos del showroom
        items: [
            "Sin anuncios",
            "Acceso total a contenidos exclusivos",
            "Newsletter exclusiva para socios"
        ]
    };

    /* ─── BASE — .ft-mol-promo ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de color (.ft-mol-promo--dark).", options: DATA.variants },
        { key: "pretitle", control: "text", desc: "Pretítulo en mayúsculas (.ft-mol-promo__pretitle)." },
        { key: "title", control: "text", desc: "Título (.ft-mol-promo__title)." },
        { key: "txt", control: "text", desc: "Texto descriptivo (.ft-mol-promo__txt)." },
        { key: "price", control: "text", desc: "Precio destacado (.ft-mol-promo__txtDestacado dentro de __txtPrecio)." },
        { key: "count", control: "number", desc: "Número de ítems del listado (rango 0-8; si n > 3 los textos ciclan).", min: 0, max: 8 },
        { key: "btnLabel", control: "text", desc: "Texto del botón .ft-btn (dentro de .ft-mol-btnGroup)." }
    ];
    const baseArgs = {
        variant: "",
        pretitle: "Suscríbete",
        title: "Edición digital",
        txt: "Fragancia y labial Yves Saint Laurent y elige entre sus cremas faciales y serums boosters que más se adapten a tu rutina.",
        price: "54€",
        count: "3",
        btnLabel: "Suscríbete"
    };

    function live(a) {
        const dark = a.variant === "dark";
        const cls = ["ft-mol-promo"];
        if (dark) cls.push("ft-mol-promo--dark");
        // El botón es --primary en claro y --tertiary en oscuro (espejo del showroom).
        const btnKind = dark ? "tertiary" : "primary";
        const n = Math.max(0, Math.min(8, parseInt(a.count, 10) || 0));
        const items = [];
        for (let i = 0; i < n; i++) {
            items.push('<li class="ft-mol-promo__item">' + CHECK + esc(DATA.items[i % DATA.items.length]) + "</li>");
        }
        return '<div class="' + cls.join(" ") + '">' +
            '<div class="ft-mol-promo__media">' +
                '<img loading="lazy" class="ft-helper-img-rd" src="' + IMG + '" width="570" height="390" alt="' + esc(a.title) + '">' +
            "</div>" +
            '<div class="ft-mol-promo__content">' +
                '<div class="ft-mol-promo__pretitle">' + esc(a.pretitle) + "</div>" +
                '<h2 class="ft-mol-promo__title">' + esc(a.title) + "</h2>" +
                '<p class="ft-mol-promo__txt"><span class="ft-mol-promo__txtDestacado">+ </span>' + esc(a.txt) +
                    ' <span class="ft-mol-promo__txtPrecio">por solo <span class="ft-mol-promo__txtDestacado">' + esc(a.price) + "</span></span></p>" +
                '<ul class="ft-mol-promo__list">' + items.join("") + "</ul>" +
                '<div class="ft-mol-btnGroup">' +
                    '<a href="#" class="ft-btn ft-btn--' + btnKind + ' ft-btn--md" title="' + esc(a.btnLabel) + '" target="_self">' + esc(a.btnLabel) + "</a>" +
                "</div>" +
            "</div>" +
        "</div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Promo</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-promo</code>): bloque promocional con imagen, texto, listado de ventajas y botón de acción.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/promo.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>brands/[marca]/atoms/btn.css</code></td><td>CSS del átomo del botón</td><td>Siempre (contiene <code>.ft-btn</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. La imagen sobresale del contenedor por <code>margin-top</code> negativo en <code>.ft-helper-img-rd</code>; en escritorio (<code>≥1080px</code>) el bloque pasa a fila (media + contenido).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>fondo gris claro (<code>--color-lightGrey</code>), botón <code>--primary</code></td></tr>
                <tr><td><code>--dark</code></td><td>fondo secundario, todo el texto en blanco, botón <code>--tertiary</code></td></tr>
                <tr><td><code>--grey</code></td><td>utilidad de alineación a la derecha (sin padding) — no usada en el showroom</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-promo</code></td></tr>
                <tr><td>Caja de imagen</td><td><code>.ft-mol-promo__media</code> &gt; <code>.ft-helper-img-rd</code></td></tr>
                <tr><td>Caja de texto</td><td><code>.ft-mol-promo__content</code></td></tr>
                <tr><td>Pretítulo</td><td><code>.ft-mol-promo__pretitle</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-promo__title</code></td></tr>
                <tr><td>Texto</td><td><code>.ft-mol-promo__txt</code> (+ <code>__txtPrecio</code>, <code>__txtDestacado</code>)</td></tr>
                <tr><td>Listado</td><td><code>.ft-mol-promo__list</code> &gt; <code>.ft-mol-promo__item</code> (+ <code>__icon</code>)</td></tr>
                <tr><td>Acción</td><td><code>.ft-mol-btnGroup</code> &gt; <code>.ft-btn</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <table class="cb-table">
            <thead><tr><th>Marca</th><th>Archivo</th><th>Diferencias</th></tr></thead>
            <tbody>
                <tr><td><code>ux</code></td><td><code>promo-ux.scss</code></td><td>showroom / universal</td></tr>
                <tr><td><code>ep</code></td><td><code>promo-ep.scss</code></td><td>variante El Periódico</td></tr>
                <tr><td><code>epe</code></td><td><code>promo-epe.scss</code></td><td>variante El Periódico de España</td></tr>
                <tr><td><code>regionales</code></td><td><code>promo-regionales.scss</code></td><td>variante regionales</td></tr>
                <tr><td><code>revistas</code></td><td><code>promo-revistas.scss</code></td><td>tipografía/espaciado mayores (Cuore, Stilo, Woman, Viajar)</td></tr>
                <tr><td><code>sport</code></td><td><code>promo-sport.scss</code></td><td>variante Sport</td></tr>
            </tbody>
        </table>
        <div class="cb-callout">Cambia la marca con la <strong>toolbar Brand</strong> para ver cada variante; no se duplican stories por marca.</div>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/promo/_promo.scss</code> · markup: <code>fourty/molecules/molecule-promo.html</code></p>
    </div>`;

    const P = {
        id: "promo",
        name: "Promo",
        group: "Molecules",
        overview,
        stories: [
            // full: el bloque ocupa el ancho → en ≥1080px pasa a fila (media + contenido).
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(P);

    /* Markup original (HTML plano editable por el front) en promo.html → subgrupo "Markup". */
    window.SB.loadMarkup(P, document.currentScript && document.currentScript.src, { full: true });
})();
