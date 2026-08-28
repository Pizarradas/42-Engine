/* ════════════════════════════════════════════════════════════════════════
   organisms/header-custom/header-custom.js — Organisms / Header Custom
   Casuística REAL de scss/fourties/organism/header-custom/_header-custom.scss (.ft-org-header-custom).
   Markup VERBATIM de fourty/organisms/organism-header-custom.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom, no se parametriza
   pieza a pieza. Rutas normalizadas (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<div class="ft-org-header-custom">
                                                <div class="ft-mol-header-custom">
                                                    <div class="ft-mol-header-custom__txt">
                                                      <h1 class="ft-mol-header-custom__title">
                                                        Notas de corte
                                                        <span class="ft-mol-header-custom__highlighted">
                                                          2024
                                                        </span>
                                                      </h1>
                                                      <p class="ft-mol-header-custom__subtitle">
                                                          Lorem ipsum dolor est
                                                      </p>
                                                    </div>
                                                    <figure class="ft-img">
                                                      <picture>
                                                        <source media="(min-width:640.1px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-desktop--template.png" type="image/webp" width="250" height="140">
                                                        <source media="(min-width: 320.1px) and (max-width: 640px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-mobile--template.png" type="image/webp" width="710" height="540">
                                                        <source media="(max-width: 320px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-mobile--template.png" type="image/webp" width="710" height="540">
                                                        <source media="(min-width:640.1px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-desktop--template.png" type="image/jpeg" width="250" height="140">
                                                        <source media="(min-width: 320.1px) and (max-width: 640px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-mobile--template.png" type="image/jpeg" width="710" height="540">
                                                        <source media="(max-width: 320px)" srcset="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-mobile--template.png" type="image/jpeg" width="710" height="540">
                                                        <img src="/cds-statics/assets/img/templates/ft-mol-tab-header-custom-img-desktop--template.png" alt="" width="250" height="140" loading="eager" class="ft-helper-img-rd">
                                                      </picture>
                                                    </figure>
                                                  </div>
                                            </div>`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Header Custom</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-header-custom</code>): cabecera/portadilla ilustrada de sección — bloque editorial con título, destacado e imagen. id único <code>header-custom-org</code> (colisiona con la molécula homónima <code>.ft-mol-header-custom</code>).</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/header-custom.css</code></td><td>CSS del organismo</td><td>Siempre (o el bundle <code>[marca]-core.css</code>)</td></tr>
                <tr><td>Ilustración / imagen</td><td>Asset</td><td>La aporta el consumidor</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>. No confundir con la <strong>molécula</strong> <code>.ft-mol-header-custom</code> (ya migrada); este es el organismo contenedor de sección <code>.ft-org-header-custom</code>.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/header-custom/_header-custom.scss</code> · markup: <code>fourty/organisms/organism-header-custom.html</code></p>
    </div>`;

    const DEF = {
        id: "header-custom-org",
        name: "Header Custom",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
