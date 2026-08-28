/* ════════════════════════════════════════════════════════════════════════
   molecules/lnkbox/lnkbox.js — Molecules / Lnk Box
   Casuística REAL de scss/fourties/molecules/lnkbox/_lnkbox.scss (.ft-mol-lnkbox*).
   Markup tomado de fourty/molecules/molecule-lnkBox.html. Cero invención de API.

   Caja de enlaces: lista de filas (__container > __data + .ft-link--block) con chevron.
   Variantes --simple (con subtítulo, sin chevron) y --card (cada fila es una tarjeta
   clicable con badge de flecha y hover lift). Solo CSS. Una story plana interactiva
   "Base" (variante · nº de filas · título · subtítulo) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _lnkbox.scss ▼ */
    const DATA = {
        variants: [
            ["", "base (filas con borde y chevron)"],
            ["ft-mol-lnkbox--simple", "--simple · con subtítulo, sin chevron"],
            ["ft-mol-lnkbox--card", "--card · cada fila es tarjeta clicable (badge + hover lift)"]
        ],
        parts: ["__container", "__data", "__data-title", "__data-subtitle"]
    };

    /* ─── BASE — .ft-mol-lnkbox ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante de la caja de enlaces.", options: DATA.variants },
        { key: "count", control: "number", desc: "Número de filas (1–6).", min: 1, max: 6 },
        { key: "title", control: "text", desc: "Título de cada fila (__data-title)." },
        { key: "subtitle", control: "text", desc: "Subtítulo (__data-subtitle; en --simple/--card)." }
    ];
    const baseArgs = { variant: "", count: "3", title: "Lorem ipsum dolor est", subtitle: "Más texto" };

    function row(a, withSub) {
        const sub = withSub
            ? `<p class="ft-mol-lnkbox__data-subtitle"><span class="ft-helper-fontSize-body-M ft-helper-fontColor-quaternary">${esc(a.subtitle)}</span></p>`
            : "";
        return `<div class="ft-mol-lnkbox__container">
    <div class="ft-mol-lnkbox__data">
        <p class="ft-mol-lnkbox__data-title"><span class="ft-helper-fontSize-body-M">${esc(a.title)}</span></p>
        ${sub}
    </div>
    <a href="#" class="ft-link ft-link--block" title="link title" target="_self">Más información</a>
</div>`;
    }
    function live(a) {
        const cls = ["ft-mol-lnkbox"];
        if (a.variant) cls.push(a.variant);
        const withSub = a.variant !== "";   // base no lleva subtítulo; --simple/--card sí
        const n = Math.max(1, Math.min(6, parseInt(a.count, 10) || 1));
        const rows = Array.from({ length: n }, () => row(a, withSub)).join("");
        return `<div class="${cls.join(" ")}">${rows}</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Lnk Box</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-lnkbox</code>): caja de enlaces — una lista de filas, cada una con su texto y un enlace «Más información» (<code>.ft-link--block</code> que cubre toda la fila). Con chevron en base, subtítulos en <code>--simple</code> y tarjetas clicables en <code>--card</code>.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/lnkbox.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-link--block</code></td><td>CSS del átomo Link</td><td>Siempre (enlace que cubre la fila)</td></tr>
                <tr><td><code>scss/fourties/molecules/lnkbox/_lnkbox.scss</code> + <code>lnkbox-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS (chevron y hover son CSS)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>filas con borde inferior y chevron a la derecha</td></tr>
                <tr><td><code>--simple</code></td><td>añade subtítulo, sin chevron</td></tr>
                <tr><td><code>--card</code></td><td>cada fila es una tarjeta clicable con badge de flecha, barra de acento y hover lift (≥1024px)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-lnkbox</code></td></tr>
                <tr><td>Fila</td><td><code>.ft-mol-lnkbox__container</code></td></tr>
                <tr><td>Datos</td><td><code>__data</code> &gt; <code>__data-title</code> (+ <code>__data-subtitle</code>)</td></tr>
                <tr><td>Enlace</td><td><code>.ft-link--block</code> (cubre toda la fila)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/lnkbox/_lnkbox.scss</code> · markup: <code>fourty/molecules/molecule-lnkBox.html</code></p>
    </div>`;

    const LK = {
        id: "lnkbox",
        name: "Lnk Box",
        group: "Molecules",
        overview,
        stories: [
            // full: las filas son width:100% con el enlace a la derecha
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(LK);

    /* Markup original (HTML plano editable por el front) en lnkbox.html → subgrupo "Markup". */
    window.SB.loadMarkup(LK, document.currentScript && document.currentScript.src, { full: true });
})();
