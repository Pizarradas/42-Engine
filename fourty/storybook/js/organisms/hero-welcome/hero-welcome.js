/* ════════════════════════════════════════════════════════════════════════
   organisms/hero-welcome/hero-welcome.js — Organisms / Hero Welcome
   Casuística REAL de scss/fourties/organism/hero/_hero.scss (.ft-org-hero-welcome).
   Markup VERBATIM de fourty/organisms/organism-hero-welcome.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom, no se parametriza
   pieza a pieza. Rutas normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-hero-welcome">
                                                <div class="ft-org-hero-welcome__content">
                                                    <h2 class="ft-helper-fontSize-heading-M ft-helper-text-align-center">
                                                        Bienvenido a Cerca
                                                    </h2>
                                                    <p class="ft-helper-fontSize-body-L ft-helper-fontColor-quaternary ft-helper-text-align-center">
                                                        Todas las noticias que te importan, en un único lugar.
                                                    </p>
                                                </div>
                                            </div>`,
        "near-search": `<div class="ft-org-hero-welcome ft-org-hero-welcome--near-search">
                                                <div class="ft-org-hero-welcome__content">
                                                    <h2 class="ft-helper-fontSize-heading-M ft-helper-text-align-center">
                                                        CERCA
                                                    </h2>
                                                    <p class="ft-helper-fontSize-body-L ft-helper-fontColor-quaternary ft-helper-text-align-center">
                                                        <strong>Selecciona</strong> tus localidades y personaliza tu portada de noticias locales.
                                                    </p>
                                                </div>
                                            </div>`
    };

    const baseArgTypes = [
        { key: "variant", control: "select", desc: "Variante del organismo (markup verbatim del showroom).", options: [
            ["base", "Base"],
            ["near-search", "Con buscador (--near-search)"]
        ] }
    ];
    const baseArgs = { variant: "base" };

    function live(a) {
        return VARIANTS[a.variant] || VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Hero Welcome</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-hero-welcome</code>): cabecera de bienvenida a sección/portada — bloque hero con contenido destacado y, opcionalmente, buscador integrado (<code>--near-search</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/hero.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Buscador (autocomplete)</td><td>JavaScript</td><td>Solo en <code>--near-search</code> (búsqueda real). Aquí estático.</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong> en su forma base. La variante <code>--near-search</code> integra un buscador cuya lógica la aporta el consumidor (aquí, estado estático).</div>

        <h2>Modificadores</h2>
        <table class="cb-table">
            <thead><tr><th>Clase</th><th>Efecto</th></tr></thead>
            <tbody>
                <tr><td><code>(base)</code></td><td>hero de bienvenida</td></tr>
                <tr><td><code>--near-search</code></td><td>integra el buscador local/cercanía</td></tr>
            </tbody>
        </table>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/hero/_hero.scss</code> · markup: <code>fourty/organisms/organism-hero-welcome.html</code></p>
    </div>`;

    const DEF = {
        id: "hero-welcome",
        name: "Hero Welcome",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
