/* ════════════════════════════════════════════════════════════════════════
   molecules/footerbasic/footerbasic.js — Molecules / Footer Basic
   Casuística REAL de scss/fourties/molecules/footerbasic/_footerbasic.scss (.ft-mol-footerbasic*).
   Markup tomado de fourty/molecules/molecule-footerbasic.html. Cero invención de API.

   Pie de página simple: logo + lista de enlaces en línea (.ft-list--inline), sobre
   fondo de marca (--color-primary). Solo CSS. Una story plana interactiva "Base"
   (logo blanco · enlaces) + subgrupo "Markup" async.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    const LOGO = "/cds-statics/assets/img/logos/logo-multibrand-la-nueva-espana-blanco.svg";

    /* ▼ SINGLE SOURCE OF TRUTH — piezas reales de _footerbasic.scss ▼ */
    const DATA = {
        parts: ["__logo", "__nav"],
        composes: [".ft-list.ft-list--inline", ".ft-list__link"]
    };

    /* ─── BASE — .ft-mol-footerbasic ─── */
    const baseArgTypes = [
        { key: "links", control: "text", desc: "Enlaces del pie, separados por coma." }
    ];
    const baseArgs = { links: "Contacto, Aviso legal, Sorteos" };

    function live(a) {
        const items = String(a.links).split(",").map(s => s.trim()).filter(Boolean).map(t =>
            `<li class="ft-list__item"><a href="/" class="ft-list__link" title="title text" target="_self">${esc(t)}</a></li>`
        ).join("");
        return `<footer class="ft-mol-footerbasic">
    <div class="ft-mol-footerbasic__logo">
        <a href="/" title="Ir a la página de inicio"><img src="${LOGO}" class="ft-helper-img-rd" alt="alt text" loading="lazy"></a>
    </div>
    <nav class="ft-mol-footerbasic__nav" aria-label="Navegación de pie de página">
        <ul class="ft-list ft-list--inline">${items}</ul>
    </nav>
</footer>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Footer Basic</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-footerbasic</code>): pie de página simple — logo a un lado y una lista de enlaces en línea, sobre el color de marca (<code>--color-primary</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/footerbasic.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-list</code> (<code>--inline</code>, <code>__link</code>)</td><td>CSS del átomo List</td><td>Siempre (los enlaces)</td></tr>
                <tr><td><code>scss/fourties/molecules/footerbasic/_footerbasic.scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">El fondo es <code>var(--color-primary)</code> y los enlaces van en blanco: el aspecto cambia con la marca activa. El logo debe ser la versión en blanco.</div>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-footerbasic</code> (<code>&lt;footer&gt;</code>)</td></tr>
                <tr><td>Logo</td><td><code>.ft-mol-footerbasic__logo</code></td></tr>
                <tr><td>Navegación</td><td><code>.ft-mol-footerbasic__nav</code> &gt; <code>.ft-list--inline</code></td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/footerbasic/_footerbasic.scss</code> · markup: <code>fourty/molecules/molecule-footerbasic.html</code></p>
    </div>`;

    const FB = {
        id: "footerbasic",
        name: "Footer Basic",
        group: "Molecules",
        overview,
        stories: [
            // full: el footer es width:100% con space-around; necesita ancho
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(FB);

    /* Markup original (HTML plano editable por el front) en footerbasic.html → subgrupo "Markup". */
    window.SB.loadMarkup(FB, document.currentScript && document.currentScript.src, { full: true });
})();
