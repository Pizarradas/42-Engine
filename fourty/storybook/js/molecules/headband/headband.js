/* ════════════════════════════════════════════════════════════════════════
   molecules/headband/headband.js — Molecules / Headband
   Casuística REAL de scss/fourties/molecules/headband/_headband.scss (.ft-mol-headband*).
   Markup tomado de fourty/molecules/molecule-headband.html. Cero invención de API.

   Cintillo de cabecera multipropósito: título + logo, con alineación, tamaños y
   acabados. El parcial es ENORME (~846 líneas) y cubre familias con estructura
   PROPIA (--heading, --news, --branded con __label/__trigger, --section con
   __section-img, __label--bet/--sportium). Aquí se migra el CORE + modificadores
   ADITIVOS (alineación/tamaño/top-lined); las familias con markup propio quedan
   DOCUMENTADAS, no reproducidas (no silent cap). Una story "Base" + subgrupo "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const LOGO = "/cds-statics/assets/img/templates/ft-mol-headband.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _headband.scss ▼ */
    const DATA = {
        aligns: [
            ["", "(defecto · título izq + logo der)"],
            ["ft-mol-headband--center", "--center · centrado"],
            ["ft-mol-headband--reverse", "--reverse · orden invertido"]
        ],
        sizes: [
            ["", "(defecto)"],
            ["ft-mol-headband--xs", "--xs"],
            ["ft-mol-headband--xxs", "--xxs"]
        ],
        families: ["--heading", "--news", "--branded (+__label/__trigger)", "--section (+__section-img)", "__label--bet", "__label--sportium", "--has-logo"],
        parts: ["__title", "__logo", "__img", "__label"]
    };

    /* ─── BASE — .ft-mol-headband ─── */
    const baseArgTypes = [
        { key: "title", control: "text", desc: "Texto del título (__title)." },
        { key: "align", control: "select", desc: "Alineación.", options: DATA.aligns },
        { key: "size", control: "select", desc: "Tamaño.", options: DATA.sizes },
        { key: "topLined", control: "boolean", desc: "Modificador --top-lined (línea superior)." },
        { key: "showLogo", control: "boolean", desc: "Muestra el logo (__logo)." }
    ];
    const baseArgs = { title: "Lorem Ipsum", align: "", size: "", topLined: false, showLogo: true };

    function live(a) {
        const cls = ["ft-mol-headband"];
        if (a.align) cls.push(a.align);
        if (a.size) cls.push(a.size);
        if (a.topLined) cls.push("ft-mol-headband--top-lined");
        const logo = a.showLogo
            ? `<div class="ft-mol-headband__logo"><a href="#"><img alt="headband" class="ft-mol-headband__img ft-helper-img-rd" src="${LOGO}"></a></div>`
            : "";
        return `<div class="${cls.join(" ")}">
    <div class="ft-mol-headband__title ft-helper-fontColor-primary ft-helper-fontSize-heading-XXS">${esc(a.title)}</div>
    ${logo}
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Headband</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-headband</code>): cintillo de cabecera de sección — título y, opcionalmente, logo. Multipropósito: tiene varias familias (titular, noticias, patrocinado, sección…) además de los modificadores de alineación y tamaño.</p>

        <div class="cb-callout">El parcial SCSS es muy grande (~846 líneas). Esta story cubre el <strong>core</strong> (título + logo) con los modificadores <strong>aditivos</strong> (alineación, tamaño, <code>--top-lined</code>). Las familias con <strong>estructura propia</strong> (<code>--heading</code>, <code>--news</code>, <code>--branded</code> con <code>__label</code>/<code>__trigger</code>, <code>--section</code> con <code>__section-img</code>, <code>__label--bet</code>/<code>--sportium</code>) quedan <strong>documentadas</strong>; su markup completo está en el showroom.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/headband.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/headband/_headband.scss</code> + <code>headband-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>El core no necesita JS; familias con trigger (desplegables) sí</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--center</code> · <code>--reverse</code></td><td>alineación / orden de título y logo</td></tr>
                <tr><td><code>--xs</code> · <code>--xxs</code></td><td>tamaños reducidos</td></tr>
                <tr><td><code>--top-lined</code></td><td>línea superior</td></tr>
                <tr><td><code>--heading</code> · <code>--news</code></td><td>familias tipográficas (estructura propia)</td></tr>
                <tr><td><code>--branded</code></td><td>cintillo patrocinado con logo + <code>__label</code>/<code>__trigger</code></td></tr>
                <tr><td><code>--section</code></td><td>cintillo de sección con <code>__section-img</code></td></tr>
                <tr><td><code>__label--bet</code> · <code>__label--sportium</code></td><td>etiquetas de casa de apuestas (Sport)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía (core)</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-headband</code></td></tr>
                <tr><td>Título</td><td><code>.ft-mol-headband__title</code></td></tr>
                <tr><td>Logo</td><td><code>.ft-mol-headband__logo</code> &gt; <code>__img</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Este componente es además el <em>chrome</em> de las cabeceras de los paneles del propio showroom (el <code>HTML5 / .class</code> de cada panel es un <code>.ft-mol-headband</code>).</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/headband/_headband.scss</code> · markup: <code>fourty/molecules/molecule-headband.html</code></p>
    </div>`;

    const HB = {
        id: "headband",
        name: "Headband",
        group: "Molecules",
        overview,
        stories: [
            // full: el cintillo es de ancho completo (space-between título/logo)
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(HB);

    /* Markup original (HTML plano editable por el front) en headband.html → subgrupo "Markup". */
    window.SB.loadMarkup(HB, document.currentScript && document.currentScript.src, { full: true });
})();
