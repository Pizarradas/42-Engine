/* ════════════════════════════════════════════════════════════════════════
   molecules/accordion/accordion.js — Molecules / Accordion
   Casuística REAL de scss/fourties/molecules/accordion/_accordion.scss (.ft-mol-accordion*).
   Markup tomado de fourty/molecules/molecule-accordion.html. Cero invención de API.

   Disclosure NATIVO: usa <details>/<summary> del navegador (sin JS). El motor
   ya respeta el toggle nativo (onStageClick no hace preventDefault dentro de
   <summary>). Una story plana interactiva "Base" (nº de paneles · --xs · --has-icon
   · --has-data-rgt · subtítulo · primer panel abierto) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* Icono real del showroom (resuelto vía <base> del iframe → /cds-statics). */
    const ICON = "/cds-statics/assets/img/icons/ft-list-functions-icon-template.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _accordion.scss ▼ */
    const DATA = {
        // .ft-mol-accordion--[modificador]
        mods: [
            ["--xs", "tipografía reducida (body-L/M)"],
            ["--has-icon", "deja hueco para __icon a la izquierda del summary"],
            ["--has-data-rgt", "dato numérico (__data-rgt) anclado a la derecha"]
        ],
        // elementos (BEM)
        parts: ["__details", "__summary", "__subtitle", "__icon", "__text", "__data-rgt"]
    };

    /* ─── BASE — .ft-mol-accordion (contenedor de <details>) ─── */
    const baseArgTypes = [
        { key: "count", control: "number", desc: "Número de paneles <details> (rango 1–5).", min: 1, max: 5 },
        { key: "title", control: "text", desc: "Texto del resumen (<summary>)." },
        { key: "openFirst", control: "boolean", desc: "Abre el primer panel (atributo nativo open)." },
        { key: "subtitle", control: "boolean", desc: "Muestra el __subtitle bajo el título." },
        { key: "xs", control: "boolean", desc: "Modificador --xs (tipografía reducida)." },
        { key: "hasIcon", control: "boolean", desc: "Modificador --has-icon + __icon a la izquierda." },
        { key: "hasDataRgt", control: "boolean", desc: "Modificador --has-data-rgt + __data-rgt (dato a la derecha)." }
    ];
    const baseArgs = { count: "2", title: "Acordeón", openFirst: true, subtitle: true, xs: false, hasIcon: false, hasDataRgt: false };

    function panel(a, i, open) {
        const icon = a.hasIcon
            ? `<img src="${ICON}" alt="" width="18" height="13" class="ft-mol-accordion__icon" aria-hidden="true">`
            : "";
        const sub = a.subtitle
            ? `<p class="ft-mol-accordion__subtitle">Lorem <a href="#" class="ft-link" title="title text" target="_self">ispum dolor</a> sit amet</p>`
            : "";
        const data = a.hasDataRgt
            ? `<span class="ft-mol-accordion__data-rgt" aria-hidden="true">XX,XX</span>`
            : "";
        return `<details class="ft-mol-accordion__details"${open ? " open" : ""}>
    <summary class="ft-mol-accordion__summary" id="ac-s-${i}" aria-controls="ac-p-${i}">
        ${icon}${esc(a.title)} ${i}${sub}${data}
    </summary>
    <div class="ft-mol-accordion__text" id="ac-p-${i}" role="region" aria-labelledby="ac-s-${i}">
        <p class="ft-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
</details>`;
    }
    function live(a) {
        const cls = ["ft-mol-accordion"];
        if (a.xs) cls.push("ft-mol-accordion--xs");
        if (a.hasIcon) cls.push("ft-mol-accordion--has-icon");
        if (a.hasDataRgt) cls.push("ft-mol-accordion--has-data-rgt");
        const n = Math.max(1, Math.min(5, parseInt(a.count, 10) || 1));
        const items = [];
        for (let i = 1; i <= n; i++) items.push(panel(a, i, a.openFirst && i === 1));
        return `<div class="${cls.join(" ")}" role="region" aria-label="Acordeón de ejemplo">${items.join("")}</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Accordion</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-accordion</code>) que agrupa varios paneles plegables <code>&lt;details&gt;</code>/<code>&lt;summary&gt;</code> nativos. El plegado lo gestiona el navegador: <strong>no necesita JavaScript</strong>.</p>

        <h2>Dependencias</h2>
        <p>Lo que necesita un proyecto consumidor para renderizar <code>.ft-mol-accordion</code>:</p>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/accordion.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>scss/fourties/molecules/accordion/_accordion.scss</code> + <code>accordion-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar (importa <code>abstracts</code> + <code>vendors/bourbon</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS · <code>&lt;details&gt;</code> es nativo</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS sobre HTML nativo</strong>: el chevron, su rotación al abrir (<code>[open]</code>) y el color del título activo (<code>var(--color-primary)</code>) son reglas CSS. El icono <code>--has-icon</code> usa un <code>filter</code> por marca.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>paneles plegables con chevron y borde inferior</td></tr>
                <tr><td><code>--xs</code></td><td>tipografía reducida (<code>body-L</code> → <code>body-M</code>)</td></tr>
                <tr><td><code>--has-icon</code></td><td>reserva espacio a la izquierda del summary para <code>__icon</code></td></tr>
                <tr><td><code>--has-data-rgt</code></td><td>ancla un dato numérico (<code>__data-rgt</code>) a la derecha</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase / etiqueta</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-accordion</code></td></tr>
                <tr><td>Panel</td><td><code>&lt;details&gt;.ft-mol-accordion__details</code></td></tr>
                <tr><td>Cabecera (clic)</td><td><code>&lt;summary&gt;.ft-mol-accordion__summary</code></td></tr>
                <tr><td>Subtítulo</td><td><code>.ft-mol-accordion__subtitle</code></td></tr>
                <tr><td>Icono</td><td><code>.ft-mol-accordion__icon</code> (con <code>--has-icon</code>)</td></tr>
                <tr><td>Dato derecha</td><td><code>.ft-mol-accordion__data-rgt</code> (con <code>--has-data-rgt</code>)</td></tr>
                <tr><td>Contenido</td><td><code>.ft-mol-accordion__text</code></td></tr>
            </tbody>
        </table>

        <div class="cb-callout">Accesibilidad: cada <code>&lt;summary&gt;</code> y su <code>__text</code> se enlazan con <code>id</code> + <code>aria-controls</code>/<code>aria-labelledby</code>; el panel de contenido lleva <code>role="region"</code>.</div>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/accordion/_accordion.scss</code> · markup: <code>fourty/molecules/molecule-accordion.html</code></p>
    </div>`;

    const AC = {
        id: "accordion",
        name: "Accordion",
        group: "Molecules",
        overview,
        stories: [
            // full: el acordeón ocupa todo el ancho (borde inferior y dato a la derecha lo necesitan)
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(AC);

    /* Markup original (HTML plano editable por el front) en accordion.html → subgrupo "Markup". */
    window.SB.loadMarkup(AC, document.currentScript && document.currentScript.src, { full: true });
})();
