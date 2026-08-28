/* ════════════════════════════════════════════════════════════════════════
   organisms/container/container.js — Organisms / Container
   Casuística REAL de scss/fourties/organism/container/_container.scss (.ft-org-container).
   Markup VERBATIM de fourty/organisms/organism-container.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante). La fidelidad la
   aporta el MARKUP — cada variante es la construcción literal del showroom, no se
   parametriza pieza a pieza. Rutas normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<section class="ft-org-container">
                                                <div class="ft-org-container__content">
                                                    <p class="ft-helper-fontSize-body-L ft-helper-text-align-center">
                                                        Contenido genérico centrado dentro del scaffold base.
                                                    </p>
                                                </div>
                                            </section>`,
        "curved-bottom": `<section class="ft-org-container ft-org-container--curved ft-org-container--curved-bottom">
                                                <div class="ft-org-container__content">
                                                    <h2 class="ft-helper-fontSize-heading-M ft-helper-text-align-center">
                                                        Sección con curva inferior
                                                    </h2>
                                                </div>
                                            </section>`,
        "curved-top": `<section class="ft-org-container ft-org-container--curved ft-org-container--curved-top">
                                                <div class="ft-org-container__content">
                                                    <h2 class="ft-helper-fontSize-heading-M ft-helper-text-align-center">
                                                        Sección con curva superior
                                                    </h2>
                                                </div>
                                            </section>`
    };

    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del organismo (markup verbatim del showroom).", options: [
            ["base", "Base"],
            ["curved-bottom", "Curvado inferior"],
            ["curved-top", "Curvado superior"]
        ] }
    ];
    const baseArgs = { variant: "base" };

    function live(a) {
        return VARIANTS[a.variant] || VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Container</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-container</code>): envoltorio de sección de ancho completo con fondo y bordes curvos opcionales — agrupa y separa bloques de portada.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/container.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: aporta fondo, padding de sección y, con <code>--curved</code>, el recorte curvo superior o inferior. El contenido vive en <code>.ft-org-container__content</code>.</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>sección con fondo</td></tr>
                <tr><td><code>--curved --curved-bottom</code></td><td>borde curvo inferior</td></tr>
                <tr><td><code>--curved --curved-top</code></td><td>borde curvo superior</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/container/_container.scss</code> · markup: <code>fourty/organisms/organism-container.html</code></p>
    </div>`;

    const DEF = {
        id: "container",
        name: "Container",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
