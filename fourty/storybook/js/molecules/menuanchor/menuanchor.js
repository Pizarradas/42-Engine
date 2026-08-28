/* ════════════════════════════════════════════════════════════════════════
   molecules/menuanchor/menuanchor.js — Molecules / Menu Anchor
   Casuística REAL de scss/fourties/molecules/menuanchor/_menuanchor.scss (.ft-mol-menu-anchor*).
   Markup tomado de fourty/molecules/molecule-menu-anchor.html. Cero invención de API.

   ⚠ La clase es .ft-mol-menu-anchor (kebab); carpeta "menuanchor".
   Barra de navegación por anclas (saltos a secciones de la página): nav con el átomo
   .ft-anchor (enlaces en scroll horizontal) sobre fondo de marca. Modificadores
   --is-centered / --is-sticky / --is-desktop. Solo CSS. Story plana "Base" + "Markup".
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _menuanchor.scss ▼ */
    const DATA = {
        mods: [
            ["--is-centered", "centrado en ≥1024px"],
            ["--is-sticky", "fijo arriba al hacer scroll (position:sticky)"],
            ["--is-desktop", "solo visible en ≥1024px"]
        ],
        composes: [".ft-anchor (átomo) > a"]
    };

    /* ─── BASE — .ft-mol-menu-anchor ─── */
    const baseArgTypes = [
        { key: "count", control: "number", desc: "Número de secciones (2–8).", min: 2, max: 8 },
        { key: "centered", control: "boolean", desc: "Modificador --is-centered (centrado ≥1024px)." },
        { key: "sticky", control: "boolean", desc: "Modificador --is-sticky (fijo al hacer scroll)." }
    ];
    const baseArgs = { count: "3", centered: false, sticky: false };

    function live(a) {
        const cls = ["ft-mol-menu-anchor"];
        if (a.centered) cls.push("ft-mol-menu-anchor--is-centered");
        if (a.sticky) cls.push("ft-mol-menu-anchor--is-sticky");
        const n = Math.max(2, Math.min(8, parseInt(a.count, 10) || 2));
        const links = Array.from({ length: n }, (_, i) =>
            `<a href="#id-item-${i}" role="listitem">Sección ${i}</a>`
        ).join("");
        return `<div class="${cls.join(" ")}" role="banner">
    <nav aria-label="Navegación de secciones">
        <div class="ft-anchor" role="list">${links}</div>
    </nav>
</div>`;
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Menu Anchor</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-menu-anchor</code>): barra de navegación por anclas — enlaces que saltan a secciones de la misma página, en scroll horizontal sobre el color de marca. Compone el átomo <code>.ft-anchor</code>.</p>

        <div class="cb-callout">La clase real es <code>.ft-mol-menu-anchor</code> (kebab-case), aunque la carpeta/archivo SCSS se llaman <code>menuanchor</code>.</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/menuanchor.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td><code>.ft-anchor</code></td><td>CSS del átomo Anchor</td><td>Siempre (los enlaces de salto)</td></tr>
                <tr><td><code>scss/fourties/molecules/menuanchor/_menuanchor.scss</code> + <code>-[marca].scss</code></td><td>Parcial SCSS fuente</td><td>Solo para compilar</td></tr>
                <tr><td>Scroll-spy (marcar el ancla activa)</td><td>JavaScript</td><td>Opcional, si se quiere resaltar la sección visible</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>--is-centered</code></td><td>centra los enlaces en ≥1024px</td></tr>
                <tr><td><code>--is-sticky</code></td><td>fija la barra arriba al hacer scroll (<code>position:sticky</code>)</td></tr>
                <tr><td><code>--is-desktop</code></td><td>solo visible en ≥1024px</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-menu-anchor</code> (fondo <code>--color-primary</code>)</td></tr>
                <tr><td>Navegación</td><td><code>&lt;nav&gt;</code> &gt; <code>.ft-anchor</code> (scroll-x)</td></tr>
                <tr><td>Enlace</td><td><code>&lt;a&gt;</code> (salto a <code>#id</code> de sección)</td></tr>
            </tbody>
        </table>
        <p class="cb-src">Fuente: <code>scss/fourties/molecules/menuanchor/_menuanchor.scss</code> · markup: <code>fourty/molecules/molecule-menu-anchor.html</code></p>
    </div>`;

    const MA = {
        id: "menu-anchor",
        name: "Menu Anchor",
        group: "Molecules",
        overview,
        stories: [
            // full: la barra es de ancho completo (fondo de marca, scroll-x)
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(MA);

    /* Markup original (HTML plano editable por el front) en menuanchor.html → subgrupo "Markup". */
    window.SB.loadMarkup(MA, document.currentScript && document.currentScript.src, { full: true });
})();
