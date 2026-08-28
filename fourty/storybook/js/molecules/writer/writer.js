/* ════════════════════════════════════════════════════════════════════════
   molecules/writer/writer.js — Molecules / Writer
   Casuística REAL de scss/fourties/molecules/writer/_writer.scss (.ft-mol-writer*).
   Markup tomado de fourty/molecules/molecule-writer.html. Cero invención de API.

   Firma de autor/redacción: un grupo (__group) de autores (__item), cada uno con avatar
   (.ft-helper-img-rd) y un bloque de título (__title > __titleOpinion) con nombre y cargo.
   Modificadores de disposición --basis (tarjeta centrada con trust + fuente), --side (en
   fila con fecha), --sideHasimage, --cardHome y --has-rrss. Solo CSS — compone .ft-trust,
   .ft-date, .ft-link y .ft-mol-rrss-inline.

   Estructura: una story plana interactiva "Base" (controls: disposición · nº de autores ·
   nombre · cargo) + subgrupo "Markup" async desde writer.html (variantes ricas verbatim).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Avatar real del showroom (.ft-helper-img-rd). /cds-statics vía <base> del iframe. */
    const AVATAR = "/cds-statics/assets/img/templates/ft-mol-writer.png";

    /* ▼ SINGLE SOURCE OF TRUTH — disposiciones que comparten el markup avatar+nombre ▼ */
    const DATA = {
        // las variantes --basis/--side/--sideHasimage/--has-rrss tienen markup propio (ver Markup)
        variants: [
            ["", "lista (defecto)"],
            ["ft-mol-writer--cardHome", "card home (--cardHome)"]
        ],
        names: ["Albert Sáez", "Francisco de Sert", "Lucía Méndez", "Carlos Ruiz"]
    };

    /* ─── BASE — .ft-mol-writer ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Disposición de la firma (.ft-mol-writer--cardHome).", options: DATA.variants },
        { key: "count", control: "number", desc: "Número de autores (rango 1-6).", min: 1, max: 6 },
        { key: "name", control: "text", desc: "Nombre del autor (vacío = nombres de ejemplo)." },
        { key: "role", control: "text", desc: "Cargo / sección (.ft-mol-writer__titleOpinion)." }
    ];
    const baseArgs = { variant: "", count: "3", name: "", role: "Redactor Jefe de Opinión" };

    function item(a, i) {
        const name = a.name || DATA.names[i % DATA.names.length];
        return '<div class="ft-mol-writer__item">' +
            '<img src="' + AVATAR + '" alt="' + esc(name) + '" width="60" height="60" class="ft-helper-img-rd">' +
            '<div class="ft-mol-writer__title">' +
                '<p class="ft-mol-writer__titleOpinion ft-helper-fontSize-body-M--small ft-helper-fontColor-primary">' +
                    '<a href="#" class="ft-link ft-helper-fontColor-primary" title="' + esc(name) + '" target="_self">' + esc(name) + "</a></p>" +
                '<p class="ft-mol-writer__titleOpinion ft-helper-fontSize-body-S--small ft-helper-fontColor-quaternary">' + esc(a.role) + "</p>" +
            "</div>" +
        "</div>";
    }

    function live(a) {
        const cls = ["ft-mol-writer"];
        if (a.variant) cls.push(a.variant);
        const n = Math.max(1, Math.min(6, parseInt(a.count, 10) || 1));
        let items = "";
        for (let i = 0; i < n; i++) items += item(a, i);
        return '<div class="' + cls.join(" ") + '"><div class="ft-mol-writer__group">' + items + "</div></div>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Writer</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-writer</code>): firma de autor o redacción — avatar, nombre y cargo, con varias disposiciones.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/writer.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-trust</code> · <code>.ft-date</code> · <code>.ft-link</code> · <code>.ft-mol-rrss-inline</code></td><td>Componentes compuestos</td><td>Variantes <code>--basis</code> / <code>--side</code> / <code>--has-rrss</code></td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: los avatares están en escala de grises y pasan a color al hacer <code>hover</code> sobre el autor.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>grupo en columna de autores con avatar</td></tr>
                <tr><td><code>--basis</code></td><td>tarjeta centrada con sello <code>.ft-trust</code> y fuente — ver <strong>Markup</strong></td></tr>
                <tr><td><code>--side</code></td><td>autores en fila + <code>.ft-date</code> — ver <strong>Markup</strong></td></tr>
                <tr><td><code>--sideHasimage</code></td><td><code>--side</code> con avatares</td></tr>
                <tr><td><code>--cardHome</code></td><td>firma compacta para tarjeta de portada</td></tr>
                <tr><td><code>--has-rrss</code></td><td>añade una barra <code>.ft-mol-rrss-inline</code> de redes</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-writer</code></td></tr>
                <tr><td>Grupo</td><td><code>.ft-mol-writer__group</code></td></tr>
                <tr><td>Autor</td><td><code>.ft-mol-writer__item</code></td></tr>
                <tr><td>Avatar</td><td><code>.ft-helper-img-rd</code> (+ <code>.ft-mol-writer__image</code>)</td></tr>
                <tr><td>Título</td><td><code>.ft-mol-writer__title</code> &gt; <code>__titleOpinion</code></td></tr>
                <tr><td>Fuente</td><td><code>.ft-mol-writer__source</code> &gt; <code>__sourceTitle</code></td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>writer-[marca].scss</code>); en <code>sport</code> y <code>revistas</code> cambian alineación y tipografía. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/writer/_writer.scss</code> · markup: <code>fourty/molecules/molecule-writer.html</code></p>
    </div>`;

    const W = {
        id: "writer",
        name: "Writer",
        group: "Molecules",
        overview,
        stories: [
            // full: la firma reparte autores y, en --side, la fecha a lo ancho.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(W);

    /* Markup original (HTML plano editable por el front) en writer.html → subgrupo "Markup". */
    window.SB.loadMarkup(W, document.currentScript && document.currentScript.src, { full: true });
})();
