/* ════════════════════════════════════════════════════════════════════════
   organisms/services/services.js — Organisms / Services
   Casuística REAL de scss/fourties/organism/services/_services.scss (.ft-org-services).
   Markup VERBATIM de fourty/organisms/organism-services.html. Cero invención de API.

   Criterio ORGANISMOS: controles MÍNIMOS (un solo select de variante, o ninguno). La
   fidelidad la aporta el MARKUP — construcción literal del showroom. Rutas normalizadas
   (../../cds-statics → /cds-statics).
   ════════════════════════════════════════════════════════════════════════ */
(function () {
    "use strict";

    /* ▼ SINGLE SOURCE OF TRUTH — markup verbatim por variante ▼ */
    const VARIANTS = {
        "base": `<!-- ORG: services -->
                                            <div class="ft-org-services" data-scrollbar data-scrollbar-axis="x"
                                                data-scrollbar-wheel-to-x="true" data-scrollbar-announce-scroll="true">
                                                <div class="ft-scrollbar__container">
                                                    <ul class="ft-list ft-list-block ft-list-block--col">
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/dardle-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-palabraoculta.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Dardle
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/crucigrama-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-crucigrama.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Crucigrama
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/sudoku-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-sudoku.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Sudoku
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/cuadro-numerico-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-cuadronumerico.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Cuadro Numérico
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/sopa-de-letras-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-sopaletras.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Sopa de letras
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                        <li class="ft-list-block__item">
                                                            <img src="/cds-statics/assets/img/icons/saltaminas-mini.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__icon" alt="alt text"
                                                                title="title text">
                                                            <img src="/cds-statics/assets/img/decorative/ft-mol-card-saltaminas.svg"
                                                                loading="lazy" width="22" height="22"
                                                                class="ft-list-block__decorative" alt="alt text"
                                                                title="title text">
                                                            <span class="ft-list-block__text">
                                                                Saltaminas
                                                            </span>
                                                            <a href="#" class="ft-link ft-link--block" title="link title"
                                                                target="_self">
                                                                Más información
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="ft-org-services">
                                                <a href="#" class="ft-link ft-link--nav ft-link--navNext" title="title text" target="_self">
                                                    Descubre todos nuestros juegos
                                                </a>
                                            </div>
                                            <!-- end // ORG: services -->`
    };

    const baseArgTypes = [];
    const baseArgs = {};

    function live() {
        return VARIANTS["base"];
    }

    const overview = `<div class="cb-docs__inner">
        <h1>Services</h1>
        <p class="cb-docs__lead">Organismo del 42DS (<code>.ft-org-services</code>): franja de servicios del medio — accesos a utilidades (esquelas, tiempo, tráfico, pasatiempos…) en una sección compacta.</p>

        <h2>Dependencias</h2>
        <div class="cb-deps">
        <table class="cb-table">
            <thead><tr><th>Dependencia</th><th>Tipo</th><th>Cuándo</th></tr></thead>
            <tbody>
                <tr><td><code>brands/[marca]/setting.css</code></td><td>CSS · variables de la marca</td><td>Siempre · <strong>primero</strong></td></tr>
                <tr><td><code>brands/[marca]/organism/services.css</code></td><td>CSS del organismo</td><td>Siempre</td></tr>
                <tr><td>Iconos de servicio</td><td>Assets</td><td>Los aporta el medio</td></tr>
                <tr><td>—</td><td>JavaScript</td><td>No necesita JS</td></tr>
            </tbody>
        </table>
        </div>
        <div class="cb-callout">Es <strong>solo CSS</strong>: franja de accesos a servicios/utilidades del medio.</div>

        <h2>Variantes por marca</h2>
        <p>Compilado para todas las marcas. Cambia la marca con la <strong>toolbar Brand</strong>.</p>

        <p class="cb-src">Fuente: <code>scss/fourties/organism/services/_services.scss</code> · markup: <code>fourty/organisms/organism-services.html</code></p>
    </div>`;

    const DEF = {
        id: "services",
        name: "Services",
        group: "Organisms",
        overview,
        stories: [
            { id: "base", name: "Base", kind: "interactive", full: true, argTypes: baseArgTypes, args: baseArgs, render: live }
        ]
    };
    window.SB.register(DEF);
    window.SB.loadMarkup(DEF, document.currentScript && document.currentScript.src, { full: true });
})();
