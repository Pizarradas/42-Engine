/* ════════════════════════════════════════════════════════════════════════
   molecules/tabs/tabs.js — Molecules / Tabs
   Casuística REAL de scss/fourties/molecules/tabs/_tabs.scss (.ft-mol-tabs*).
   Markup tomado de fourty/molecules/molecule-tabs.html. Cero invención de API.

   Pestañas de navegación de contenido: lista de tabs (__list > __tab) + barra animada
   (__bar) + paneles (__contents > __content). En producción un JS marca la tab activa
   (aria-selected) y oculta los paneles inactivos ([hidden]); el storybook reproduce ese
   estado de forma ESTÁTICA (tab activa + panel visible). Modificadores de estilo --button,
   --pills, --capsuled, --vertical, --mobileonly.

   Estructura: una story plana interactiva "Base" (controls: estilo · nº de tabs · tab
   activa) + subgrupo "Markup" async desde tabs.html.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";
    const { esc } = window.SB.helpers;

    /* ▼ SINGLE SOURCE OF TRUTH — modificadores reales de _tabs.scss ▼ */
    const DATA = {
        variants: [
            ["", "subrayado (defecto)"],
            ["ft-mol-tabs--button", "botón (--button)"],
            ["ft-mol-tabs--pills", "píldoras (--pills)"],
            ["ft-mol-tabs--capsuled", "cápsula (--capsuled)"],
            ["ft-mol-tabs--vertical", "vertical (--vertical, ≥768px)"],
            ["ft-mol-tabs--mobileonly", "solo móvil (--mobileonly)"]
        ]
    };

    /* ─── BASE — .ft-mol-tabs ─── */
    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Estilo de las pestañas (.ft-mol-tabs--button/--pills/--capsuled/--vertical/--mobileonly).", options: DATA.variants },
        { key: "count", control: "number", desc: "Número de pestañas (rango 2-8).", min: 2, max: 8 },
        { key: "active", control: "number", desc: "Pestaña activa (1-based).", min: 1, max: 8 }
    ];
    const baseArgs = { variant: "", count: "5", active: "1" };

    function live(a) {
        const n = Math.max(2, Math.min(8, parseInt(a.count, 10) || 2));
        const active = Math.max(1, Math.min(n, parseInt(a.active, 10) || 1));
        const cls = ["ft-mol-tabs"];
        if (a.variant) cls.push(a.variant);

        let tabs = "";
        let panels = "";
        for (let i = 1; i <= n; i++) {
            const isActive = i === active;
            // Tab activa → aria-selected="true" (estado real del DS).
            tabs += '<button class="ft-mol-tabs__tab" type="button" role="tab"' + (isActive ? ' aria-selected="true"' : "") + ">Sección " + i + "</button>";
            // Panel inactivo → [hidden] (el CSS lo oculta); activo → tabindex="0" visible.
            panels += '<div class="ft-mol-tabs__content" role="tabpanel"' + (isActive ? ' tabindex="0"' : " hidden") + ">Contenido " + i + "</div>";
        }
        return '<section class="' + cls.join(" ") + '">' +
            '<div class="ft-mol-tabs__list" role="tablist" aria-label="Secciones del contenido" aria-orientation="horizontal">' + tabs + "</div>" +
            '<span class="ft-mol-tabs__bar"></span>' +
            '<div class="ft-mol-tabs__contents">' + panels + "</div>" +
        "</section>";
    }

    /* ─── Overview (única página Docs del componente) ─── */
    const overview = `<div class="cb-docs__inner">
        <h1>Tabs</h1>
        <p class="cb-docs__lead">Molécula del 42DS (<code>.ft-mol-tabs</code>): pestañas de navegación de contenido — lista de tabs, barra animada y paneles.</p>

        <div class="cb-callout"><strong>Activación por JS.</strong> Un controlador del proyecto consumidor marca la tab activa (<code>aria-selected="true"</code>), posiciona la <code>__bar</code> y oculta los paneles inactivos (<code>[hidden]</code>). El storybook reproduce ese estado de forma <strong>estática</strong> (el cambio de pestaña al hacer clic no funciona aquí).</div>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/molecules/tabs.css</code></td><td>CSS compilado del componente</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>JavaScript del consumidor</td><td>Cambio de pestaña + barra</td><td>Siempre (interacción real)</td></tr>
            </tbody>
        </table>
        </div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>pestañas con subrayado (barra animada)</td></tr>
                <tr><td><code>--button</code></td><td>pestañas con borde tipo botón</td></tr>
                <tr><td><code>--pills</code></td><td>píldoras contiguas</td></tr>
                <tr><td><code>--capsuled</code></td><td>cápsula redondeada (sin barra)</td></tr>
                <tr><td><code>--vertical</code></td><td>lista vertical a la izquierda (≥768px)</td></tr>
                <tr><td><code>--mobileonly</code></td><td>barra de secciones solo en móvil (oculta ≥768px)</td></tr>
            </tbody>
        </table>

        <h2>Anatomía</h2>
        <table class="cb-table">
            <thead><tr><th>Pieza</th><th>Clase</th></tr></thead>
            <tbody>
                <tr><td>Bloque</td><td><code>.ft-mol-tabs</code> (<code>&lt;section&gt;</code>)</td></tr>
                <tr><td>Lista</td><td><code>.ft-mol-tabs__list</code> (<code>role="tablist"</code>)</td></tr>
                <tr><td>Pestaña</td><td><code>.ft-mol-tabs__tab</code> (<code>aria-selected</code>)</td></tr>
                <tr><td>Barra</td><td><code>.ft-mol-tabs__bar</code> (subrayado animado)</td></tr>
                <tr><td>Paneles</td><td><code>.ft-mol-tabs__contents</code> &gt; <code>__content</code> (<code>[hidden]</code> inactivos)</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas (<code>tabs-[marca].scss</code>); <code>--mobileonly</code> tiñe el fondo con el color primario en <code>ep</code>/<code>epe</code>/<code>sport</code>. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/molecules/tabs/_tabs.scss</code> · markup: <code>fourty/molecules/molecule-tabs.html</code></p>
    </div>`;

    const T = {
        id: "tabs",
        name: "Tabs",
        group: "Molecules",
        overview,
        stories: [
            // full: la lista de pestañas y los paneles ocupan el ancho del contenedor.
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(T);

    /* Markup original (HTML plano editable por el front) en tabs.html → subgrupo "Markup". */
    window.SB.loadMarkup(T, document.currentScript && document.currentScript.src, { full: true });
})();
